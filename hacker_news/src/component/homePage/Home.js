import Navbar from "./NavBar";
import React, { useState, useEffect } from "react";

import axios from "axios";
import NewsData from "./NewsData";
import Pagination from "./Pagination";
import Filter from "./Filter";

const HomePage = () => {
  const [isloading, setIsloading] = useState(true);
  const [news, setNews] = useState([]);
  const [page, setPage] = useState(1);
  const [hitsPerPage, sethitsPerPage] = useState(10);
  const [tag, setTag] = useState("topstories");
  const [filter, setFilter] = useState("none");

  useEffect(() => {
    const data = async () => {
      setIsloading(true);
      if (filter === "none") {
        try {
          let response = await axios.get(
            `http://localhost:5000/api/${tag}?storyperpage=${hitsPerPage}&pagenumber=${
              page - 1
            }`
          );
          setNews(response.data);
          setIsloading(false);
        } catch (err) {
          console.error(err);
        }
      } else {
        try {
          let response = await axios.get(
            `http://localhost:5000/api/${filter}?storyperpage=${hitsPerPage}&pagenumber=${
              page - 1
            }`
          );
          setNews(response.data);
          setIsloading(false);
        } catch (err) {
          console.error(err);
        }
      }
    };
    data();
  }, [page, tag, hitsPerPage, filter]);

  return (
    <div>
      <Navbar />
      {isloading ? (
        <div className="progress">
          <div className="indeterminate"></div>
        </div>
      ) : (
        <div>
          <Filter
            tag={tag}
            filter={filter}
            hitsPerPage={hitsPerPage}
            setTag={(e) => setTag(e)}
            setFilter={(e) => setFilter(e)}
            setHitsPerPage={(e) => {
              sethitsPerPage(e);
            }}
          />
          <div className="container">
            {news.map((stories) => (
              <NewsData key={stories.id} stories={stories} />
            ))}
          </div>
          <Pagination page={(e) => setPage(e)} active={page} />
        </div>
      )}
    </div>
  );
};

export default HomePage;
