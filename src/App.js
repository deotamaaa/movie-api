import './App.css';
import { getMovieList, searchMovie } from './api'
import { useEffect, useState } from 'react';

const App = () => {

  const [popularMovies, setPopularMovies] = useState([]);

  useEffect(() => {
    getMovieList().then((result) => {
      setPopularMovies(result)
    })
  }, [])

  const PopularMovieList = () => {
    return popularMovies.map((movie, i) => {
      return (
        <div className="movie-wrapper" key={i}>
          <div className="movie-title">{movie.title}</div>
          <img className="movie-image" src={`${process.env.REACT_APP_BASEIMG}/${movie.poster_path}`} alt='' />
          <div className="movie-date">release date : {movie.release_date}</div>
          <div className="movie-rate">rating : {movie.vote_average}</div>
        </div>
      )
    })
  }
  const search = async (q) => {
    if (q.length > 3) {
      const query = await searchMovie(q)
      setPopularMovies(query.results)
      console.log({ query: query })
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>
          THE MOVIE DB API
        </h1>
        <input
          type="text"
          className='movie-search'
          placeholder='What movies you want to search ?'
          onChange={({ target }) => search(target.value)}
        />
        <div className="movie-container">
          <PopularMovieList />
        </div>
      </header>
    </div>
  );
}

export default App;
