const express = require("express");

const {register , login, getUserData, addFaveMovie, deleteMovie} = require("../controllers/userControllers")

const router = express.Router();

router.route("/register").post(register)
router.route("/login").post(login)
router.route("/").get(getUserData)
router.route("/:id").post(addFaveMovie)
router.route("/:id").patch(deleteMovie)


module.exports = router;