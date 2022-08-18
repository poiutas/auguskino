const User = require("../models/userModel");
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');


exports.register = async (req, res) => {
	console.log(req.body)
  try {
    let email = req.body.email;
    let user = await User.findOne({ email });
    if (user) return res.status(400).send("User already registered.");

    const salt = await bcrypt.genSalt(10);
    var password = await bcrypt.hash(req.body.password,salt);

    var result = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: password,
      films: req.body.films,
    });

    

    res.status(200).json({
      status: "success",
      data: {
        user: result,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
}

exports.addFaveMovie = async (req, res) => {
  try {
    const updatedFilms = await User.findOneAndUpdate(
      { _id: req.params.id },
      { $addToSet:  req.body  },
    );
    res.status(200).json({
      status: "success",
      data: {
        limit: updatedFilms,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

exports.deleteMovie = async (req, res) => {
  // console.log(req.params)
  // console.log(req.body)
  try {
    await User.findOneAndUpdate(
      { _id: req.params.id },
      {
        $pull: {
          "faveMovies":   req.body.faveMovies ,
        },
      }
    
    );
    res.status(200).json({
      status: "success",
      data: null,
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};



exports.getUserData = async (req, res) => {

    //get json web token from bearer and turn it into it
    const token = req.headers.authorization.split(" ")[1]
    const decoded = jwt.verify(token, 'slaptas_env_var')
    console.log(decoded)

    try {
        const user = await User.findById(decoded.id);
        res.status(200).json({
          status: "success",
          data: {
            users: user,
          },
        });
      } catch (err) {
        res.status(404).json({
          status: "fail",
          message: err,
        });
      }

}

exports.login = async (req, res) => {
        const user = await User.findOne({
            email: req.body.email,
        })
    
        if (!user) {
            return res.status(404).json({
          status: "fail",
          message: "Couldn't find an account with this email",
        });
        }
      
        const isPasswordValid = await bcrypt.compare(
            req.body.password,
            user.password
        )
    
        if (isPasswordValid) {
            const token = jwt.sign(
                {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                },
                'slaptas_env_var',
                // {
                //     expiresIn: "1d",
                // }
            )
    
            return res.json({ status: 'ok', user: token })
        } else {
            return res.status(400).json({ status: 'error', user: false })
        }
    }