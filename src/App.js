import "./App.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_KEY } from "./constants/api-key";
import Header from "./components/Header";
import GuessingGame from "./components/GuessingGame";

function App() {
  const [shows, setShows] = useState([]);
  useEffect(() => {
    axios
      .get("https://api.themoviedb.org/3/tv/top_rated?api_key=" + API_KEY)
      .then((response) => {
        console.log(response.data.results);
        return setShows(response.data.results);
      });
  }, []);

  return (
    <div className="App">
      <Header />
      <GuessingGame shows={shows} />
    </div>
  );
}

export default App;
