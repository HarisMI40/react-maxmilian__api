import React,{useState, useEffect, useCallback} from 'react';
import AddMovie from './components/AddMovie';
import MoviesList from './components/MoviesList';
import './App.css';
import SyncLoader from "react-spinners/SyncLoader";

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchDataMovieHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try{
      const response = await fetch("https://react-bd3d8-default-rtdb.firebaseio.com/movies.json");
      if(!response.ok){
        throw new Error("something went wrong");
      }

   
      const data  = await response.json();
      const loadedDataMovies = [];
      for(const key in data){
        loadedDataMovies.push({
          id : key,
          title : data[key].title,
          openingText : data[key].openingText,
          releaseDate : data[key].releaseDate
        });
      }
      
      setMovies(loadedDataMovies);
    }catch(error){
      setError(error.message);
    }
    setIsLoading(false);
  },[]);

  useEffect(() => {
    fetchDataMovieHandler();
  }, [fetchDataMovieHandler]);

  async function addMovieHandler(movie) {
    const response = await fetch("https://react-bd3d8-default-rtdb.firebaseio.com/movies.json", {
      method:'POST',
      body: JSON.stringify(movie),
      headers: {
        'Content-type' : 'application/json'
      }
    });

    const data  = await response.json();
    console.log(data);
  }
  
  return (
    <React.Fragment>
      <section>
        <AddMovie onAddMovie={addMovieHandler} />
      </section>
      <section>
        <button onClick={fetchDataMovieHandler}>Fetch Movies</button>
      </section>
      <section>
        {!isLoading && movies.length > 0 && <MoviesList movies={movies} />}
        {!isLoading && movies.length === 0 && !error && <p>Found No Movies</p>}
        {!isLoading && error && <p> {error} </p>}
        {isLoading && <SyncLoader color={"#230052"} loading={isLoading} size={20} />}
      </section>
    </React.Fragment>
  );
}

export default App;
