import React from "react";
import { useState, useEffect, useContext} from "react";
import './App.css';
import SearchIcon from './search.svg';
import MovieCard from "./MovieCard";
import { TokenContext } from './TokenContext';

console.log("print api key start");
const apiKey = process.env.REACT_APP_API_KEY;
console.log(apiKey);
console.log("print api key end");
console.log(process.env.REACT_APP_API_KEY);
const API_URL = 'http://www.omdbapi.com?apikey=' + apiKey;
let myTitle = "";
const apiUrl = "https://localhost:44337/weatherforecast/Title";


const callApiWithAuth = async (url, token) => {
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${token}`
    }
  }).then(() => {
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

  const token = useContext(TokenContext);

console.log("bruce test 5");
  console.log("bruce test 6");
    const [searchTerm, setSearchTerm] = useState("");
    const [movies, setMovies] = useState([]);
    const [myTitle, setMyTitle] = useState("Initial Title");

  
    useEffect(() => {
      searchMovies("Batman");
      const fetchData = async () => {
        try {


let testToken = "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJxUWlFWDB2T2Z1SlBuWUw4MWo0Q2tDOHVPdEJ1aFZvM0xBd2ppczZWbHRzIn0.eyJleHAiOjE2NzU3ODU2OTIsImlhdCI6MTY3NTc4NTM5MiwiYXV0aF90aW1lIjoxNjc1Nzg0NTk2LCJqdGkiOiJmNzI5NzU0Yi05MTQyLTRjMjUtODVlNS00YzVmY2JiMWY2ZjkiLCJpc3MiOiJodHRwczovL2Rldi5sb2dpbnByb3h5Lmdvdi5iYy5jYS9hdXRoL3JlYWxtcy9zdGFuZGFyZCIsImF1ZCI6InRyYW5zLWFjdGlvbi0zOTc5Iiwic3ViIjoiZGQwZmFlZjRjNzg4NDUwMGFhNGM2ZGM1Njg2OWY5YTVAaWRpciIsInR5cCI6IkJlYXJlciIsImF6cCI6InRyYW5zLWFjdGlvbi0zOTc5Iiwibm9uY2UiOiIwODgxNDdjZC05N2MzLTQ0ZmEtODVkMC0xYTgwODlmMTk1MTgiLCJzZXNzaW9uX3N0YXRlIjoiYTkwM2NiMTktOWViNi00Mjg0LWIzMDMtNjI0ZmFjMTcyMTM2Iiwic2NvcGUiOiJvcGVuaWQgaWRpciBlbWFpbCBwcm9maWxlIiwic2lkIjoiYTkwM2NiMTktOWViNi00Mjg0LWIzMDMtNjI0ZmFjMTcyMTM2IiwiaWRpcl91c2VyX2d1aWQiOiJERDBGQUVGNEM3ODg0NTAwQUE0QzZEQzU2ODY5RjlBNSIsImlkZW50aXR5X3Byb3ZpZGVyIjoiaWRpciIsImlkaXJfdXNlcm5hbWUiOiJCUldBTkciLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsIm5hbWUiOiJXYW5nLCBCcnVjZSBUUkFOOkVYIiwicHJlZmVycmVkX3VzZXJuYW1lIjoiZGQwZmFlZjRjNzg4NDUwMGFhNGM2ZGM1Njg2OWY5YTVAaWRpciIsImdpdmVuX25hbWUiOiJCcnVjZSIsImRpc3BsYXlfbmFtZSI6IldhbmcsIEJydWNlIFRSQU46RVgiLCJmYW1pbHlfbmFtZSI6IldhbmciLCJlbWFpbCI6ImJydWNlLndhbmdAZ292LmJjLmNhIn0.fmbFRYsnwEyEPtvXc082Kjf4xY92NakE-pTwfiMNHxG-w0zU8vfNCLAHwBvI34KY8kbR_cC2MVydHUFvoVSaG0GSQcOW-lzYTr8mOM4Y8g-Nrqh3F4T4t9lrcrww0BMq1gT2UTEKO2Z8HR182aeFFwX75Nj6U6X-BBMTWb1x84ixrpCthtibV_NA8dyQlOwLvig3v0UNqzHxKAU_4pyhqOeY64uaeTcaUIfGrjpZ9kgr6M_LwX_zp9C1WFIaZP9CitmaS1vkn1c3b4xVf2mzZ4BMkmCp-h568dbQoGba5dR7qfzVO7yBIKMVOiqnZzPD9Q3zeUyo48nx_Y5ViYztCw";

          const response = await callApiWithAuth(apiUrl, {token});
          setMyTitle(response.Text);
        } catch (e) {
          console.log(e);
        } finally {
          console.log("end");
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
        <h1>{myTitle}</h1>
        <h1>JWT Token: {token}</h1>
  
        <div className="search">
          <input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search for movies"
          />
          <h1>this is my test</>
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