import React from "react";
import "./SearchPage.scss";
import MovieBanner from "../../../../assets/img/no-image.png";
import { useDispatch } from "react-redux";
import { setMovieList } from "../../redux/reducer";
import { IMAGE_URL } from "../../../../config";
import NoSearchData from "../../../Home/components/NoSearchData/index";
import { Pagination } from "../../../Common/Pagination";
import Skeleton from "react-loading-skeleton";

export default function SearchPage(props) {
  const { serchedMovies, totalResults, totalPages, currentPages, setCurrentPages, loading } = props;
  const dispatch = useDispatch();
  const handleOpenDetail = (id) => {
    dispatch(setMovieList({ movieId: id, openMovieDetail: true }));
  };

  return (
    <div className="search-page-section">
      <div className="simillar-details-section">
        <div className="container">
          <h4>
            Search Results (Showing {serchedMovies?.length} out of {totalResults})
          </h4>

          <div className="simillar-details-alignment">
            {totalResults > 0 ? (
              loading ? (
                <div className="simillar-details-grid">
                  {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]?.map(() => {
                    return <Skeleton duration={1} height={375} width={240} />;
                  })}
                </div>
              ) : (
                <>
                  <div className="simillar-details-grid">
                    {serchedMovies?.map((movie, i) => {
                      return (
                        <div className="simillar-details-gridItem" key={i} onClick={() => handleOpenDetail(movie?.id)}>
                          <div className="simillar-movie-details-box-alignment">
                            <img src={movie?.poster_path ? `${IMAGE_URL}${movie?.poster_path}` : MovieBanner} alt="MovieBanner" />

                            <div className="movie-like-alignment">
                              <p>IMDB Ratings :- {movie?.imDbRating}</p>
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
                  <Pagination pages={totalPages} current={currentPages} onClick={setCurrentPages} />
                </>
              )
            ) : (
              <NoSearchData/>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
