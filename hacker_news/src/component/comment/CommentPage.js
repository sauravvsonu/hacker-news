import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import CommentCard from "./CommentCard";

const CommentPage = ({ storyId }) => {
  const [comment, setComment] = useState([]);
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [sectionNumber, setSectionNumber] = useState(0);
  let navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        `http://localhost:5000/api/comments/${id}?sectionnumber=${sectionNumber}`
      );
      setComment(result.data);
      // console.log(result.data);
      setIsLoading(false);
    };
    fetchData();
  }, [sectionNumber]);

  const timeSince = (timestamp) => {
    let date = new Date(timestamp);
    let now = new Date();
    let timeDiff = now - date;
    let diffMinutes = Math.round(timeDiff / (1024 * 60));
    let diffHours = Math.round(diffMinutes / 60);
    let diffDays = Math.round(diffHours / 24);
    let diffWeeks = Math.round(diffDays / 7);
    let diffMonths = Math.round(diffWeeks / 4);
    let diffYears = Math.round(diffMonths / 12);

    if (diffYears >= 1) {
      return diffYears + " years ago";
    } else if (diffMonths >= 1) {
      return diffMonths + " months ago";
    } else if (diffWeeks >= 1) {
      return diffWeeks + " weeks ago";
    } else if (diffDays >= 1) {
      return diffDays + " days ago";
    } else if (diffHours >= 1) {
      return diffHours + " hours ago";
    } else if (diffMinutes >= 0) {
      return diffMinutes + " minutes ago";
    }
  };

  const redirectAuthorPage = (cmt) => {
    navigate(`/author/${cmt}`);
  };

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
        <div className="row container ">
          <div className="card">
            <div className="card-content">
              <div className="card-title">
                <a
                  href={comment.url}
                  className="center"
                  style={{ color: "black", opacity: "0.9" }}
                >
                  <h5>{comment.title}</h5>
                </a>
              </div>
              <div style={{ height: "5rem" }}>
                <div className="right" style={{ display: "block" }}>
                  <span
                    href="#"
                    style={{ color: "black", opacity: "0.9" }}
                    onClick={() => redirectAuthorPage(comment.author)}
                  >
                    <p>
                      by {comment.author} | {timeSince(comment.time)}
                    </p>
                  </span>
                </div>
              </div>
              <div>
                {comment.kids &&
                  comment.kids.map((cmt, index) => (
                    <CommentCard key={index} cmt={cmt} />
                  ))}
              </div>
              {comment.kids && comment.totalKids > 10 * (sectionNumber + 1) && (
                <div
                  style={{
                    justifyContent: "center",
                    width: "100%",
                    display: "flex",
                    cursor: "pointer",
                  }}
                  onClick={() => setSectionNumber(sectionNumber + 1)}
                >
                  <span>Show More 🔽</span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CommentPage;
