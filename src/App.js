import './App.css';
import api from './api/axiosConfig';
import { useState, useEffect } from 'react';
import Layout from './components/Layout';
import Header from './components/header/Header';
import Home from './components/home/home';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Trailer from './components/trailer/Trailer';
import Reviews from './components/reviews/Reviews';


function App() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true); // Agregar un estado de carga
  const [movie, setMovie] = useState();
  const [reviews, setReviews] = useState([]);

  const getMovies = async () => {
    try {
      const response = await api.get("/api/v1/movies");
      console.log(response.data);
      setMovies(response.data);
      setLoading(false); // Cuando los datos estén listos, cambia el estado de carga
    } catch (err) {
      console.log("Error:", err);
      setLoading(false); // También cambia el estado si ocurre un error
    }
  };

  
  const getMovieData = async (movieId) => {
     
    try 
    {
        const response = await api.get(`/api/v1/movies/${movieId}`);

        const singleMovie = response.data;
        console.log(singleMovie)

        setMovie(singleMovie);

        setReviews(singleMovie.reviewIds);

       
        

    } 
    catch (error) 
    {
      console.error(error);
    }

  }

  useEffect(() => {
    getMovies();
  }, []);

  
  

  return (
    <div className="App">
     
      <BrowserRouter>
        <Header/>
        <Routes>
          <Route path="/" element={<Layout />}>
            {/* Verifica si 'loading' es verdadero antes de renderizar 'Home' */}
            {!loading ? (
              <Route path="/" element={<Home movies={movies} />} />
            ) : (
              <Route path="/" element={<p>Loading...</p>} />
            )}
            
          </Route>
          <Route path='/Trailer/:ytTrailerId' element={<Trailer/>}></Route>
          <Route path="/Reviews/:movieId" element ={<Reviews getMovieData = {getMovieData} movie={movie} reviews ={reviews} setReviews = {setReviews} />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
