import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const AuthorPage = () => {
  let { id } = useParams();
  const [user, setUser] = useState({});
  const [date, setDate] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // console.log(id);
    const fetchData = async () => {
      const result = await axios(`http://localhost:5000/api/user/${id}`);
      setUser(result.data);
      //   console.log(result.data);
      setIsLoading(false);
    };
    fetchData();
  }, [id]);

  useEffect(() => {
    const date = new Date(user.created);
    setDate(date.toLocaleDateString());
  }, [user.created]);

  return (
    <div>
      <nav>
        <div className="nav-wrapper row">
          <div className="col s3">
            <a href="/" className="brand-logo">
              Hacker News
            </a>
          </div>
        </div>
      </nav>
      {isLoading ? (
        <div className="progress">
          <div className="indeterminate"></div>
        </div>
      ) : (
        <div className="row container">
          <div className="col s12 m12">
            <div className="card ">
              <div className="card-content ">
                <span className="card-title">Author Details</span>
                <div className="row">
                  <span className="col s3">Username :</span>
                  <span className="col s6"> {user.id}</span>
                </div>
                <div className="row">
                  <span className="col s3">About : </span>
                  <span
                    className="col s6"
                    dangerouslySetInnerHTML={{ __html: user.about }}
                  ></span>
                </div>
                <div className="row">
                  <span className="col s3">Karma :</span>
                  <span className="col s6"> {user.karma}</span>
                </div>
                <div className="row">
                  <span className="col s3">Submission :</span>
                  <span className="col s6">
                    {" "}
                    {user.submitted ? user.submitted.length : ""}
                  </span>
                </div>
                <div className="row">
                  <span className="col s3">Created At :</span>
                  <span className="col s6"> {date}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AuthorPage;
