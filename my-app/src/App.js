import React from "react";
import { useState, useEffect} from "react";
import './App.css';
import SearchIcon from './search.svg';
import MovieCard from "./MovieCard";
// import { TokenContext } from './TokenContext';


console.log("print api key start");
const apiKey = process.env.REACT_APP_API_KEY;
console.log(apiKey);
console.log("print api key end");
console.log(process.env.REACT_APP_API_KEY);
const API_URL = 'http://www.omdbapi.com?apikey=' + apiKey;
// let myTitle = "";
const apiUrl = "https://localhost:44337/weatherforecast/Title";


const callApiWithAuth = async (url, token) => {
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${token}`
    }
  }).then(() => {
    console.log(response);
    console.log("bruce test 12");
  }).catch(() => {
    console.log("bruce test 11");
  });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  const json = await response.json();
  return json;
};



const App = ({props}) => {

  //const token = useContext(TokenContext);
  const token = "test";

console.log("bruce test 5");
  console.log("bruce test 6");
    const [searchTerm, setSearchTerm] = useState("");
    const [movies, setMovies] = useState([]);
    // const [myTitle, setMyTitle] = useState("Initial Title");

  
    useEffect(() => {
      searchMovies("Batman");
      const fetchData = async () => {
        try {

          const response = await callApiWithAuth(apiUrl, {token});
          console.log(response);
          // setMyTitle(response.Text);
        } catch (e) {
          console.log(e);
        } finally {
          console.log("end");
          console.log(response);
        }
      };
      fetchData();
    }, []);
  
    const searchMovies = async (title) => {
      const response = await fetch(`${API_URL}&s=${title}`);
      const data = await response.json();
  
      setMovies(data.Search);
    };
  
    return (
      <div className="app">
        {/* <h1>{myTitle}</h1> */}
        {/* <h1>JWT Token: {token}</h1> */}
  
        <div className="search">
          <input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search for movies"
          />
          <h1>this is my test</h1>
          <img
            src={SearchIcon}
            placeholder="search"
            alt="search"
            onClick={() => searchMovies(searchTerm)}
          />
        </div>
  
        {movies?.length > 0 ? (
          <div className="container">
            {movies.map((movie) => (
              <MovieCard movie={movie} key={movie.Poster}/>
            ))}
          </div>
        ) : (
          <div className="empty">
            <h2>No movies found</h2>
          </div>
        )}
      </div>
    );
  };
  
  export default App;