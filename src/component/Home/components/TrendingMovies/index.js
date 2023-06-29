import React from "react";
import { useDispatch } from "react-redux";
import MovieBanner3 from "../../../../assets/img/no-image.png";
import { setMovieList } from "../../redux/reducer";
import Skeleton from "react-loading-skeleton";
import { IMAGE_URL } from "../../../../config";

export default function TrendingMovies(props) {
  const { latestMovies, loading } = props;
  const dispatch = useDispatch();
  const handleOpenDetail = (id) => {
    dispatch(setMovieList({ movieId: id, openMovieDetail: true }));
  };


  return (
    <div className="home-details-section">
      <div className="container">
        <h4>Trending Movies</h4>

        <div className="home-details-alignment">
          <div className="home-details-grid">
            {loading
              ? [0, 1, 2, 3, 4, 5]?.map(() => {
                  return <Skeleton duration={1} height={375} width={270} />;
                })
              : latestMovies?.slice(0, 10).map((movie, i) => {
                  return (
                    <div className="home-details-gridItem" key={i} onClick={() => handleOpenDetail(movie?.id)}>
                      <div className="movie-details-box-alignment">
                        <img loading="lazy" src={ movie?.poster_path ? `${IMAGE_URL}${movie?.poster_path}` : MovieBanner3} alt="MovieBanner" />

                        <div className="movie-like-alignment">
                          <p>IMDB Ratings :- {movie?.vote_average}</p>
                        </div>
                      </div>

                      <div className="movie-name-alignment">
                        <h6>{movie?.title}</h6>
                        <p>{movie?.genre_names}</p>
                      </div>
                    </div>
                  );
                })}
          </div>
        </div>
      </div>
    </div>
  );
}
