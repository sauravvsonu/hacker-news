import React, { useState, useEffect } from "react";
import M from "materialize-css/dist/js/materialize.min.js";

const Filter = ({
  tag,
  hitsPerPage,
  filter,
  setFilter,
  setTag,
  setHitsPerPage,
}) => {
  useEffect(() => {
    var elems = document.querySelectorAll("select");
    var instances = M.FormSelect.init(elems);
  }, []);

  const handleHitsPerPage = (hitsPerPage) => {
    setHitsPerPage(hitsPerPage.target.value);
  };

  const handleTag = (tag) => {
    if (tag !== "newstories") {
      setFilter("none");
    }
    setTag(tag.target.value);
  };

  const handleFilter = (filter) => {
    setFilter(filter.target.value);
  };

  return (
    <div>
      <div className="row" style={{ marginTop: "1rem" }}>
        <div className="input-field col s6 m3 l2">
          <select onChange={(e) => handleTag(e)} value={tag}>
            <option value="topstories">Top Stories</option>
            <option value="newstories">New Stories</option>
            <option value="beststories">Best Stories</option>
          </select>
          <label>Select Type</label>
        </div>
        <div
          className="input-field col s6 m3 l2"
          style={{ display: tag !== "newstories" && "none" }}
        >
          <select onChange={(e) => handleFilter(e)} value={filter}>
            <option value="none">None</option>
            <option value="showstories">Show Stories</option>
            <option value="askstories">Ask Stories</option>
            <option value="jobstories">Job Stories</option>
          </select>
          <label>Filter By</label>
        </div>

        <div className="input-field right col s6 m3 l2">
          <select onChange={(e) => handleHitsPerPage(e)} value={hitsPerPage}>
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
          </select>
          <label>Hits Per Page</label>
        </div>
      </div>
    </div>
  );
};

export default Filter;
