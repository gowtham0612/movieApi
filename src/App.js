import React, { useState, useEffect } from "react";
import "./styles.css";
import logo from "./logo1.png"
export default function App() {
  const [movies, setMovies] = useState([]);
  const [searchData, setSearchData] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState({});

  const API_URL =
    "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=1";
  const IMG_PATH = "https://image.tmdb.org/t/p/w1280";
  const SEARCH_API =
    'https://api.themoviedb.org/3/search/movie?api_key=3fd2be6f0c70a2a598f084ddfb75487c&query="';

  async function getMovies(url) {
    const res = await fetch(url);
    const data = await res.json();

    setMovies(data.results);
    console.log(data.results);
  }

  useEffect(() => {
    getMovies(API_URL);
  }, []);

  function onChangeHandler(e) {
    setSearchData(e.target.value);
  }

  function onSubmitHandler(e) {
    e.preventDefault();
    getMovies(SEARCH_API + searchData);
  }

  function getClassByRate(vote) {
    if (vote >= 8) {
      return "green";
    } else if (vote >= 5) {
      return "orange";
    } else {
      return "red";
    }
  }

  function showModalHandler(data) {
    setShowModal(showModal === true ? false : true);
    setModalData(data);
  }
  function closeModalOnContainer(e) {
    if (e.target.className === "modalContainer") {
      setShowModal(showModal === true ? false : true);
    }
  }

  return (
    <div className="App">
      <form className="logo" id="form" onSubmit={onSubmitHandler}>
        {/* <h4 className="text1">Movie App</h4> */}
        <img src={logo} alt="logo" className="logoimg" />
          <input
            type="text"
            className="search"
            placeholder="Search"
            value={searchData}
            onChange={onChangeHandler}
          />
      </form>
      <hr/>
      <h1 className="heading">Movie Recent Movies</h1>
      <main>
        {movies.map((movie, i) => {
          const { title, poster_path, vote_average, overview } = movie;
          return (
            <div
              key={i}
              className="movie"
              onClick={() => showModalHandler(movie)}
            >
              <div className="rate">
                <span className={getClassByRate(vote_average)}>
                  {vote_average}
                </span>
              </div>
              <img src={IMG_PATH + poster_path} alt={title} />
              <div className="movie-info">
                <h3>{title}</h3>
              </div>
            </div>
          );
        })}
      </main>
      {showModal && (
        <div className="modalContainer" onClick={closeModalOnContainer}>
          <div className="modal">
            <div>
              <img
                src={IMG_PATH + modalData.poster_path}
                alt={modalData.title}
              />
            </div>
            <div>
              <h3 className="road">{modalData.title}</h3>
              <p className="over">{modalData.overview}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
