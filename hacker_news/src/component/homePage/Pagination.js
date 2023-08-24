import React, { useState } from "react";

const Pagination = ({ page, active }) => {
  const pageNav = (e) => {
    if (e === "next") {
      page(active + 1);
    } else if (e === "prev") {
      page(active - 1);
    } else {
      page(e);
    }
  };
  return (
    <div>
      <footer>
        <div className="center footer-copyright">
          <ul className="pagination">
            <li className={active < 2 ? "disabled" : "waves-effect"}>
              <a href="#!" onClick={() => pageNav("prev")}>
                <i className="material-icons">chevron_left</i>
              </a>
            </li>
            <li className={"waves-effect"}>
              <a
                href="#!"
                onClick={() => pageNav(active - 2)}
                style={{ display: active < 3 && "none" }}
              >
                {active - 2}
              </a>
            </li>
            <li className={"waves-effect"} onClick={() => pageNav(active - 1)}>
              <a
                href="#!"
                onClick={() => pageNav(active - 1)}
                style={{ display: active < 2 && "none" }}
              >
                {active - 1}
              </a>
            </li>
            <li className={"active"}>
              <a href="#!" onClick={() => pageNav(active)}>
                {active}
              </a>
            </li>
            <li className="waves-effect">
              <a href="#!" onClick={() => pageNav(active + 1)}>
                {active + 1}
              </a>
            </li>
            <li className="waves-effect">
              <a href="#!" onClick={() => pageNav(active + 2)}>
                {active + 2}
              </a>
            </li>
            <li className={"waves-effect"}>
              <a
                href="#!"
                onClick={() => pageNav(active - 2)}
                style={{ display: active > 2 && "none" }}
              >
                {active + 3}
              </a>
            </li>
            <li className={"waves-effect"} onClick={() => pageNav(active - 1)}>
              <a
                href="#!"
                onClick={() => pageNav(active - 1)}
                style={{ display: active > 1 && "none" }}
              >
                {active + 4}
              </a>
            </li>
            <li className={active > 20 ? "disabled" : "waves-effect"}>
              <a href="#!" onClick={() => pageNav("next")}>
                <i className="material-icons">chevron_right</i>
              </a>
            </li>
          </ul>
        </div>
      </footer>
    </div>
  );
};

export default Pagination;
