import "antd/dist/antd.css";
import { useEffect, useState } from "react";
import { Input, Card, Drawer, message, Divider, Empty } from "antd";
import { StarFilled, StarOutlined, LoadingOutlined } from "@ant-design/icons";
import "../../styles.css";
import { useDebounce } from "./../../Hooks/useDebounce";
import { ContentOfDrawer } from "./../../Components/ContentOfDrawer/ContentOfDrawer";
import { getMovieBySearch } from "../../Services/getMovieBySearch/getMovieBySearch";
import { getInfoOfMovie } from "../../Services/getInfoOfMovie.js/getInfoOfMovie";
import { useFavContext } from "../../Context/favourites";
import { FavouritesAction } from "../../Components/FavouritesAction/favouritesAction";

const { Meta } = Card;
const { Search } = Input;

const Homepage = () => {
  const [loading, setLoading] = useState(false);
  const [loadingDrawer, setLoadingDrawer] = useState(true);
  const [visible, setVisible] = useState(false);
  const [movies, setMovies] = useState([]);
  const [contentDrawer, setContentDrawer] = useState([]);
  const [value, setValue] = useState(localStorage.getItem("searchData"));
  const search = useDebounce(value, 1000);
  const { addMovie, removeMovie } = useFavContext();

  useEffect(() => {
    localStorage.setItem("searchData", search);
    onSearch(search);
  }, [search]);

  const onSearch = async (search) => {
    if (search) {
      setLoading(true);
      const { data } = await getMovieBySearch(search);
      setMovies(data);
      setLoading(false);
    }
  };

  const Rating = (movie) => {
    const listRatings = movie.Ratings.map((Ratings) => Ratings);
    if (listRatings[1] === undefined) {
      return "0";
    } else {
      return listRatings[1].Value;
    }
  };

  const addMovieToFavourites = (movie) => {
    addMovie(movie);
    message.success("Movie favorited");
  };

  const showLargeDrawer = async (id) => {
    setVisible(true);
    setLoadingDrawer(true);
    const { data } = await getInfoOfMovie(id);
    const content = (
      <div key={data.imdbID}>
        <ContentOfDrawer
          Runtime={data.Runtime}
          Year={data.Year}
          Plot={data.Plot}
          Poster={data.Poster}
          Title={data.Title}
          imdbRating={data.imdbRating}
          Rating={Rating(data)}
          buttonFavourites={
            <FavouritesAction
              data={data}
              contentFavorited={[
                <button
                  key={data.imdbID}
                  onClick={() => removeMovieOfFavourites(data)}
                  className="buttonTag"
                >
                  {<StarFilled style={{ color: "#ff9f1c" }} />} REMOVE OF
                  FAVOURITES
                </button>,
              ]}
              contentNoFavorited={[
                <button
                  key={data.imdbID}
                  onClick={() => addMovieToFavourites(data)}
                  className="buttonTag"
                >
                  {<StarOutlined style={{ color: "#ff9f1c" }} />} ADD TO
                  FAVOURITES
                </button>,
              ]}
            />
          }
        />
      </div>
    );
    setContentDrawer(content);
    setLoadingDrawer(false);
  };

  const removeMovieOfFavourites = (movie) => {
    removeMovie(movie);
    message.success("Movie removed of favourites");
  };

  return (
    <>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Search
          size="large"
          id="search"
          onChange={(ev) => setValue(ev.target.value)}
          placeholder="Search"
          allowClear
          value={value}
          onSearch={onSearch}
          enterButton="Search"
          style={{ width: 1000 }}
        />
      </div>
      <Divider />
      {loading ? (
        <div
          style={{ display: "flex", justifyContent: "center", marginTop: 30 }}
        >
          <LoadingOutlined />
        </div>
      ) : movies.Search === undefined ? (
        <div
          style={{ display: "flex", justifyContent: "center", marginTop: 30 }}
        >
          <Empty
            style={{ opacity: 0.5 }}
            description={<p>SEARCH ON MOVIE</p>}
          />
        </div>
      ) : (
        <div className="container">
          {movies.Search.map((data) => {
            return (
              <Card
                id="card"
                key={Math.floor(Math.random() * 1000000)}
                cover={
                  <img
                    alt={data.Title}
                    src={data.Poster}
                    onClick={() => showLargeDrawer(data.imdbID)}
                  />
                }
                actions={[
                  <FavouritesAction
                    data={data}
                    contentFavorited={[
                      <StarFilled
                        key="favorite"
                        onClick={() => removeMovieOfFavourites(data)}
                        style={{ color: "#ff9f1c" }}
                      />,
                    ]}
                    contentNoFavorited={[
                      <StarOutlined
                        key="favorite"
                        onClick={() => addMovieToFavourites(data)}
                        style={{ color: "#ff9f1c" }}
                      />,
                    ]}
                  />,
                ]}
              >
                <Meta
                  onClick={() => showLargeDrawer(data.imdbID)}
                  title={data.Title}
                  description={data.Year}
                />
              </Card>
            );
          })}
        </div>
      )}
      <Drawer
        id="drawer"
        placement="right"
        width={836}
        onClose={() => setVisible(false)}
        visible={visible}
        contentWrapperStyle={{ color: "black" }}
      >
        {loadingDrawer ? <LoadingOutlined /> : contentDrawer}
      </Drawer>
    </>
  );
};

export default Homepage;
