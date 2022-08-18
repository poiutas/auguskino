import axios from 'axios'
import { useEffect, useState } from 'react'


function FavMovies(props) {
    const [movieImage, setMovieImage] = useState(true)

    let userId = localStorage.getItem("userId")

    const deleteMovie = async (movieId) => {
        const url = `http://localhost:8000/api/${userId}`
        const response = await axios.patch(url, {
            faveMovies: movieId.imdbID
        })
        console.log(response)
        setMovieImage(!movieImage)
    }


    useEffect(() => {
        fetch(`http://omdbapi.com/?i=${props.movie}&apikey=a26f7624`)
            .then(res => res.json())
            .then(data => setMovieImage(data))
            .catch(error => console.log(error))
    }, [])

    return (
        <>
            <div className="image-container" onClick={() => deleteMovie(movieImage)}>
                <img src={movieImage.Poster} style={{ width: '200px' }} />
            </div>
        </>
    )
}

export default FavMovies