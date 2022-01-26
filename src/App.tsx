import "./App.css";
import React from "react";
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
  return (
    <div className="App">
      <Header />
      <GuessingGame />
    </div>
  );
}

export default App;
