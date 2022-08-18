import { useState, useEffect } from 'react'
import { Divider, Grid, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from "@mui/material";

export default function Test() {
    const [movie, setMovie] = useState({});
    useEffect(() => {
        fetch("https://omdbapi.com/?i=tt3896198&apikey=a26f7624")
            .then(res => res.json())
            .then(data => setMovie(data));
    }, [])

    console.log(movie);
    return (
        <div>

            <Grid container spacing={6}>
                <Grid item xs={6}>
                    <img src={movie.Poster} alt={movie.Title} style={{ width: '100%' }} />
                </Grid>
                <Grid item xs={6}>
                    <Typography variant='h3'>{movie.Title}</Typography>
                    <Divider sx={{ mb: 2 }} />
                    {/* <Typography variant='h4' color='secondary'>${(movie.price / 100).toFixed(2)}</Typography> */}
                    <TableContainer>
                        <Table>
                            <TableBody>
                                <TableRow>
                                    <TableCell>Title</TableCell>
                                    <TableCell>{movie.Title}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Description</TableCell>
                                    <TableCell>{movie.Plot}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Year:</TableCell>
                                    <TableCell>{movie.Year}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Genre</TableCell>
                                    <TableCell>{movie.Genre}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Runtime</TableCell>
                                    <TableCell>{movie.Runtime}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Actors</TableCell>
                                    <TableCell>{movie.Actors}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Director</TableCell>
                                    <TableCell>{movie.Director}</TableCell>
                                </TableRow>

                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>
        </div>
    )
}