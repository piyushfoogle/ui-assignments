import React, { useEffect } from "react";
import "./MovieDetailsModal.scss";
import CloseIcon from "../../../../assets/icons/close-circle.svg";
import MovieBanner from "../../../../assets/img/no-image.png";
import { useDispatch, useSelector } from "react-redux";
import { getMovieDetails, getSimilarMovie, setMovieList } from "../../../Home/redux/reducer";
import { IMAGE_URL } from "../../../../config";
import moment from "moment";
import SimilarMovie from "../SimilarMovies";

export default function MovieDetailsModal() {
  const dispatch = useDispatch();
  const movieId = useSelector((state) => state.movies.movieId);
  const movieDetails = useSelector((state) => state.movies.movieDetails);
  const similarMovie = useSelector((state) => state.movies.similarMovie);

  useEffect(() => {
    dispatch(getMovieDetails({ id: movieId }));
    dispatch(getSimilarMovie({ id: movieId }));
  }, [movieId]);

  return (
    <div className="movie-details-modal-alignment">
      <div className="movie-details-modal-wrapper">
        <div className="movie-details-modal-box-alignment">
          <div className="movie-details-heading-alignment">
            <h4>{movieDetails?.title}</h4>

            <div
              className="movie-details-close-icon"
              onClick={() => dispatch(setMovieList({ movieId: "", openMovieDetail: false, movieDetails: {} }))}
            >
              <img src={CloseIcon} alt="CloseIcon" />
            </div>
          </div>

          <div className="movie-details-modal-body-alignment">
            <div className="search-details-movie-details-img-alignment">
              <img src={movieDetails?.poster_path ? `${IMAGE_URL}${movieDetails?.poster_path}` : MovieBanner} alt="MovieBanner" />
            </div>

            <div className="search-movie-description-details-alignment">
              <h6>{movieDetails?.title}</h6>
              <p>{movieDetails?.overview}</p>

              <div className="search-movie-sub-details-alignment">
                <div className="sub-details-all-details-alignment">
                  <p>Genre</p>
                  <p>
                    {movieDetails?.genres?.map((attri, index) => {
                      return `${attri?.name}${index === movieDetails?.genres?.length - 1 ? "" : ","} `;
                    })}
                  </p>
                </div>

                <div className="sub-details-all-details-alignment">
                  <p>Im Db Rating</p>
                  <p>{movieDetails?.vote_average}</p>
                </div>
                <div className="sub-details-all-details-alignment">
                  <p>Im Db Rating Votes</p>
                  <p>{movieDetails?.vote_count}</p>
                </div>

                <div className="sub-details-all-details-alignment">
                  <p>Release Year</p>
                  <p>{moment(movieDetails?.release_date).format("YYYY")}</p>
                </div>
              </div>
            </div>
          </div>
          {similarMovie?.length > 0 && <SimilarMovie similarMovie={similarMovie} />}
        </div>
      </div>
    </div>
  );
}
