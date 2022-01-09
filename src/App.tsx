import "./App.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_KEY } from "./constants/api-key";
import Header from "./components/Header";
import GuessingGame from "./components/GuessingGame";

export type TVShow = {
  backdrop_path: string;
  first_air_date: string;
  genre_ids: Array<number>;
  id: number;
  name: string;
  origin_country: Array<string>;
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  vote_average: number;
  vote_count: number;
};

function App() {
  const [shows, setShows] = useState<Array<TVShow>>([]);
  useEffect(() => {
    axios
      .get("https://api.themoviedb.org/3/tv/top_rated?api_key=" + API_KEY)
      .then((response) => setShows(response.data.results));
  }, []);

  return (
    <div className="App">
      <Header />
      <GuessingGame shows={shows} />
    </div>
  );
}

export default App;
