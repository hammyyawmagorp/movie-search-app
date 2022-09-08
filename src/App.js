import React from 'react';
import { useState, useEffect } from 'react';
import './App.css';
import SearchIcon from './search.svg';
import MovieCard from './MovieCard';

const API_URL = 'http://www.omdbapi.com?apikey=ae0f5de8';


const App = () => {
    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState([]);
    
    const searchMovies = async (title) => {
        const res = await fetch(`${API_URL}&s=${title}`);
        const data = await res.json();

        setMovies(data.Search);
    } 
    useEffect(()=>{
        searchMovies('Man from UNCLE');

    }, []);

    return (
     <div className='app'>    
        <h1>Movie Land</h1>

        <div className='search'>
            <input
                placeholder='Search for movies'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <img
                src={SearchIcon}
                alt="search"
                onClick={() => searchMovies(searchTerm)}
            />
        </div>

        {
            movies?.length > 0
            ? (
                <div className='container'>
                    {movies.map((movie)=> (
                        <MovieCard movie={movie}/>
                    ))}
                </div>
            ) :
            (
                <div className='empty'>
                    <h2>No Movies Found</h2>
                </div>
            )
        }

    </div>
    );
}

export default App;