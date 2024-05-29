import React, {useEffect, useState} from 'react';
import './App.css';
import MovieCard from './MovieCard';
import SearchIcon from './search.svg';

const API_URL = 'https://omdbapi.com?apikey=3bbbd62d'

// const movie1 = {
//     "Title": "Spider-Man Title Reveal",
//     "Year": "2021",
//     "imdbID": "tt14122734",
//     "Type": "movie",
//     "Poster": "https://m.media-amazon.com/images/M/MV5BNjRjMmQ2NDQtNmI5NC00N2EwLTkwYWQtOTM2OGZjMmI5YmRjXkEyXkFqcGdeQXVyMTI0NTA1MDI3._V1_SX300.jpg"
// }

function App() {
    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    const searchMovies = async (title) => {
        const response = await fetch(`${API_URL}&s=${title}`);
        const data = await response.json();

        setMovies(data.Search);
    };

    useEffect(() => {
        searchMovies('La La Land');
    }, [])


    return (
        <div className='app'>
            <h1>MovieLand</h1>
            <div className='search'>
                <input
                    placeholder='Search for movies'
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <img
                    src={SearchIcon}
                    alt='Search'
                    onClick={() => searchMovies(searchTerm)}
                />
            </div>

            { movies?.length > 0
                ? (
                    <div className='container'>
                        {movies.map((movie) => (
                            <MovieCard movie={movie}/>
                        ) 
                    )}
                    </div>
                ) : (
                    <div className='empty'>
                        <h2>No movies found</h2>
                    </div>
                )
            }
        </div>
    );
}

export default App;
