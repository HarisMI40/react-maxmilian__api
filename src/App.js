import React,{useState} from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false)

  async function fetchDataMovieHandler() {
    setIsLoading(true);
    const response = await fetch("https://swapi.dev/api/films");
    const data  = await response.json();
  
    const movieList = data.results.map((data) => {
      return {
        id: data.episode_id,
        title : data.title,
        releaseDate : data.created,
        openingText : data.opening_crawl
      };
    });
    
    setMovies(movieList);
    setIsLoading(false);
  }

  // console.log(movies);

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchDataMovieHandler}>Fetch Movies</button>
      </section>
      <section>
        {!isLoading && movies.length > 0 && <MoviesList movies={movies} />}
        {!isLoading && movies.length === 0 && <p>Found No Movies</p>}
        {isLoading && <p> Loading .... </p>}
      </section>
    </React.Fragment>
  );
}

export default App;
