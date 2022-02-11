import React,{useState} from 'react';

import MoviesList from './components/MoviesList';
import './App.css';
import PulseLoader from "react-spinners/PulseLoader";

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

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
  // let content;
  // if(!isLoading && movies.length > 0){
  //   content = <MoviesList movies={movies} />
  // }else if(!isLoading && movies.length === 0){
  //   content = <p>Found No Movies</p>;
  // }else if(isLoading){
  //   content = <p> Loading .... </p>;
  // }
  // setelah dicoba, ternyata lebih bagus menggunakan yang di bawah, lebih cepat dan gak error
  // let [loading, setLoading] = useState(true);

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchDataMovieHandler}>Fetch Movies</button>
      </section>
      <section>
        {!isLoading && movies.length > 0 && <MoviesList movies={movies} />}
        {!isLoading && movies.length === 0 && <p>Found No Movies</p>}
        {isLoading && <PulseLoader color={"#230052"} loading={isLoading} size={20} />}
      
      </section>
    </React.Fragment>
  );
}

export default App;
