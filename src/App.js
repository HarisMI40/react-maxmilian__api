import React,{useState} from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {
  const [movies, setMovies] = useState([]);

  function fetchDataMovieHandler() {
    fetch("https://swapi.dev/api/films").then( (response) => {
      return response.json();
    }).then((data) => {
      const movieList = data.results.map((data) => {
        return {
          id: data.episode_id,
          title : data.title,
          releaseDate : data.created,
          openingText : data.opening_crawl
        };
      });
      setMovies(movieList);
    });
  }

  // console.log(movies);

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchDataMovieHandler}>Fetch Movies</button>
      </section>
      <section>
        <MoviesList movies={movies} />
      </section>
    </React.Fragment>
  );
}

export default App;
