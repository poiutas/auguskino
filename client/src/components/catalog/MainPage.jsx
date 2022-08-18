import movieSample from "../layout/models/movieSample.json"
import { useState, useEffect } from 'react'
import Input from '@mui/material/Input';
import FavMovies from "./FavMovies";
import axios from 'axios'


export default function MainPage() {
    const [search, setSearch] = useState('');
    const [movieList, setMovieList] = useState(movieSample.Search);
    const [movieId, setMovieId] = useState('');
    const [favoriteMovies, setFavoriteMovies] = useState([]);
    const [userData, setUserData] = useState([]);
    const [render, setRender] = useState(false);


    const movieRequest = async (search) => {
        const url = `http://omdbapi.com/?s=${search}&apikey=a26f7624`
        const response = await fetch(url)
        const data = await response.json()
        if (data.Search) {
            setMovieList(data.Search)
        }
    }
    useEffect(() => {
        setTimeout(() => {
            setRender(!render)
        }, 500)
    }, [])

    useEffect(() => {
        let token = JSON.parse(localStorage.getItem("user"))
        if (token === null) {
            return
        } else {
            getFavoriteMovies(token)
        }
    }, [render])

    async function getFavoriteMovies(token) {
        const url = `http://localhost:8000/api`
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        })
        const data = await response.json()
        setUserData(data)
        localStorage.setItem("name", userData.data.users.name)
        localStorage.setItem("faveMovies", userData.data.users.faveMovies)
        localStorage.setItem("userId", userData.data.users._id)
    }

    let userId = localStorage.getItem("userId")

    const addToFavorites = async (movieId) => {
        const url = `http://localhost:8000/api/${userId}`
        const response = await axios.post(url, {
            faveMovies: movieId
        })
        console.log(response)
        setRender(!render)
    }

    useEffect(() => {
        movieRequest(search)
    }, [search])

    let vardas
    let movieArr
    let movieArr2
    let info1
    let info2

    if (localStorage.getItem("name") == null) {
        vardas = "user"
        movieArr2 = "Log in if you want to see your added movies."

    } else {
        vardas = localStorage.getItem("name")
        movieArr = localStorage.getItem("faveMovies").split(",")
        info1 = "you may want to refresh page if added movies doesn't show up automatically."
        info2 = "click on an image if you want to remove a movie from your list"
        movieArr2 = movieArr.map((movie, index) => (
            <FavMovies key={index} movie={movie} />
        ))
    }

    return (
        <>
            <h2>hi {vardas}! Check ours/imdb's movie collection and add some to your favorites!</h2>
            <Input height="50px"
                fullWidth={true}
                placeholder="search for a movie"
                value={search}
                name={search}
                onChange={(e) => setSearch(e.target.value)}
            ></Input>


            <div className="movieList">
                {movieList.map(movie => (
                    <div key={movie.imdbID} className="image-container" onClick={() => addToFavorites(movie.imdbID)}>
                        <img src={movie.Poster} width="200px"></img>

                    </div>
                ))
                }
            </div>

            <hr />
            <h2>Here are the movies you've added so far:</h2>
            <small>{info1}</small> <br />
            <small>{info2}</small>

            <div className="movieList">
                {movieArr2}

            </div>
        </>
    )
}