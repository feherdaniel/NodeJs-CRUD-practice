import './App.css';
import { useState, useEffect } from 'react';
import Axios from 'axios';

function App() {

  const [movieName, setMovieName] = useState('');
  const [review, setReview] = useState('');
  const [movieReviewList, setMovieReviewList] = useState([]);
  const [newReview, setNewReview] = useState('');

  useEffect(()=> {
    Axios.get('http://localhost:3001/api/get')
    .then((response) => {
      setMovieReviewList(response.data);
    });
  });

  const submitReview = () => {
    Axios.post('http://localhost:3001/api/insert', {
      movieName: movieName, 
      movieReview: review
    })

    setMovieReviewList([...movieReviewList, {movieName: movieName, movieReview: review}]);
  };
  
  const deleteReview = (movie) => {
    Axios.delete(`http://localhost:3001/api/delete/${movie}`);
  };

  const updateReview = (movie) => {
    Axios.put('http://localhost:3001/api/update', {
      movieName: movie,
      movieReview: newReview
    });
    setNewReview('');
  };

  return (
    <div className="App">
      <div className="form">
        <label>Movie Name:</label>
        <input type="text" name="movieName" onChange={(e)=> {
          setMovieName(e.target.value);
        }}/>
        <label>Review:</label>
        <input type="text" name="review" onChange={(e)=> {
          setReview(e.target.value);}}/>
        <button type="submit" onClick={submitReview}>Submit</button>
        {movieReviewList.map((v) => {
          return (
            <div className="movieList">
              <h4>MovieName: {v.movieName} | MovieReview: {v.movieReview}</h4>
              <button onClick={()=> {deleteReview(v.movieName)}}>Delete</button> <button onClick={()=>{updateReview(v.movieName)}}>Update</button> <input onChange={(e)=> {setNewReview(e.target.value)}} type="text" name="updateInput"></input>
            </div>
          )
        })}
      </div>
    </div>
  );
}

export default App;
