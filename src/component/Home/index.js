import React, { useEffect, useState } from "react";
import "./Home.scss";
import TrendingShows from "../Home/components/TrendingShows";
import TrendingMovies from "../Home/components/TrendingMovies";
import SearchPage from "./components/SearchPage";
import MovieDetailsModal from "../Home/components/MovieDetailsModal";
import { useDispatch, useSelector } from "react-redux";
import {  getPopularMovieData, getSerchedMovieData, getTopMovieData } from "./redux/reducer";
import { useHistory } from "react-router-dom";
import { urlSearchParams } from "../../utils";
import { toast } from "react-hot-toast";
import { genreNames } from "../../config";


export default function Home() {
  const dispatch = useDispatch();
  const history = useHistory();
  const search = urlSearchParams("search");
  const openMovieDetail = useSelector((state) => state.movies.openMovieDetail);
  const [searchMovies, setSearchMovies] = useState("");
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPages, setCurrentPages] = useState(1);
  const [totalResults, setTotalResults] = useState(1);
  const [serchedMovies, setSerchedMovies] = useState([]);
  const [latestMovies, setLatestMovies] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);



  useEffect(() => {
    if (search) {
      setSearchMovies(search);
      getSerchedMovie();
    } else {
      setSearchMovies("");
      setSerchedMovies([]);
      getMostPopularMovies();
      getTrandingMovie();
    }
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, [search, currentPages]);

  useEffect(() => {
    if (openMovieDetail) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [openMovieDetail]);

  const getSerchedMovie = async () => {
    try {
      setLoading(true);
      dispatch(getSerchedMovieData({ page: currentPages, title: search }))
        .then((response) => {
          if (response?.meta?.requestStatus === "fulfilled") {
            const movies = response?.payload?.results;
            const MovieGenres = getDataWithMovieGenres(movies);
            setSerchedMovies(MovieGenres);
            setTotalPages(response?.payload?.total_pages);
            setTotalResults(response?.payload?.total_results);
          }
          setLoading(false);
        })
        .catch((error) => {
          toast.error(error);
          setLoading(false);
        });
    } catch (err) {
      toast.error(err);
    }
  };

  const getTrandingMovie = async () => {
    try {
      setLoading(true);
      dispatch(getPopularMovieData())
        .then((response) => {
          if (response?.meta?.requestStatus === "fulfilled") {
            const movies = response?.payload?.results;
            const MovieGenres = getDataWithMovieGenres(movies);
            setLatestMovies(MovieGenres);
          }
          setLoading(false);
        })
        .catch((error) => {
          toast.error(error);
          setLoading(false);
        });
    } catch (err) {
      toast.error(err);
    }
  };

  const getMostPopularMovies = async () => {
    try {
      setLoading(true);
      dispatch(getTopMovieData())
        .then((response) => {
          if (response?.meta?.requestStatus === "fulfilled") {
            const movies = response?.payload?.results;
            const MovieGenres = getDataWithMovieGenres(movies);
            setPopularMovies(MovieGenres);
          }
          setLoading(false);
        })
        .catch((error) => {
          toast.error(error);
          setLoading(false);
        });
    } catch (err) {
      toast.error(err);
    }
  };

  const getDataWithMovieGenres = (movies) => {
    const genreIdsMap = {};
    const genres = genreNames;
    genres.forEach((genre) => {
      genreIdsMap[genre.id] = genre.name;
    });
    const moviesWithGenres = movies.map((movie) => {
      const genreIds = movie.genre_ids;
      const genreNames = genreIds.map((genreId) => genreIdsMap[genreId]);
      const genreNamesString = genreNames.join(", ");
      return {
        ...movie,
        genre_names: genreNamesString,
      };
    });

    return moviesWithGenres;
  };

  const HandleMovieSearch = () => {
    setCurrentPages(1);
    if (searchMovies) {
      history.push(`/?search=${searchMovies}`);
    } else {
      history.push(`/`);
    }
  };

  const handleOnKeyPressSubmit = (e) => {
    if (e.key === "Enter" && searchMovies) {
      history.push(`/?search=${searchMovies}`);
      setCurrentPages(1);
    }
  };

  const handleSerchData=(e)=>{
    history.push(`/`);
    setSearchMovies(e.target.value)
  }
  return (
    <>
      <div className="home-section">
        <div className="home-alignment">
          <div className="search-sticky-alignment">
            <div className="new-search-alignment">
              <input
                type="text"
                value={searchMovies}
                onKeyPress={(e) => handleOnKeyPressSubmit(e)}
                onChange={(e) => {
                  e.target.value === "" ? handleSerchData(e) : setSearchMovies(e.target.value);
                }}
                placeholder="Search movie by name..."
              />
              <div className="new-search-icon-alignment">
                <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512">
                  <path
                    d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"
                    fill="#fff"
                  />
                </svg>
              </div>
              {searchMovies && <a onClick={() => HandleMovieSearch()}>Search</a>}
            </div>
          </div>
          {search ? (
            <SearchPage
              serchedMovies={serchedMovies}
              totalPages={totalPages}
              currentPages={currentPages}
              setCurrentPages={setCurrentPages}
              totalResults={totalResults}
              loading={loading}
            />
          ) : (
            <>
              <TrendingMovies latestMovies={latestMovies} loading={loading} />
              <TrendingShows popularMovies={popularMovies} loading={loading} />
            </>
          )}
        </div>
      </div>
      {openMovieDetail && <MovieDetailsModal />}
    </>
  );
}
