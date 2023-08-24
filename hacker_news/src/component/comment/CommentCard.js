import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CommentCard = ({ cmt }) => {
  const navigate = useNavigate();

  const redirectAuthorPage = (cmt) => {
    navigate(`/author/${cmt}`);
  };

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
  const [sectionNumber, setSectionNumber] = useState(0);
  const [showKids, setShowKids] = useState(false);
  const [kidsData, setKidsData] = useState([]);
  const [setshowText, setSetshowText] = useState(true);

  const handleCommentClick = () => {
    setSetshowText(!setshowText);
  };

  const handleShowKids = async (KidId, secNumber) => {
    const result = await axios(
      `http://localhost:5000/api/comments/${KidId}?sectionnumber=${secNumber}`
    );
    setKidsData(result.data.kids);
    setShowKids(true);
    setSectionNumber(secNumber);
  };

  return (
    <div
      style={
        cmt.text
          ? { marginBottom: "1em", marginLeft: "3em" }
          : { display: "none" }
      }
    >
      <div
        className="grey-text"
        style={{
          fontSize: "small",
          display: "list-item",
          listStyleType: setshowText ? "disclosure-open" : "disclosure-closed",
          color: "gray",
          cursor: "pointer",
        }}
        onClick={handleCommentClick}
      >
        <span
          style={{ color: "#9e9e9e", cursor: "pointer" }}
          onClick={() => redirectAuthorPage(cmt.author)}
        >
          <span>by {cmt.author}</span>
        </span>{" "}
        |<span> {timeSince(cmt.time)}</span>
      </div>
      <div
        dangerouslySetInnerHTML={{ __html: cmt.text }}
        style={{
          color: "black",
          opacity: "0.90",
          display: setshowText ? "block" : "none",
        }}
      ></div>
      {cmt.kids &&
        setshowText &&
        (showKids ? (
          <>
            <div>
              {kidsData.map((kid) => (
                <CommentCard key={kid.id} cmt={kid} />
              ))}
            </div>
            <div>
              {cmt.kids.length > (sectionNumber + 1) * 10 && (
                <div
                  style={{
                    color: "#9e9e9e",
                    marginLeft: "1em",
                    cursor: "pointer",
                  }}
                  onClick={() => handleShowKids(cmt.id, sectionNumber + 1)}
                >
                  ~ view more reply
                </div>
              )}
            </div>
          </>
        ) : (
          <div
            style={{
              color: "#9e9e9e",
              marginLeft: "1em",
              cursor: "pointer",
            }}
            onClick={() => handleShowKids(cmt.id, sectionNumber)}
          >
            ~ view {cmt.kids && cmt.kids.length} reply
          </div>
        ))}
    </div>
  );
};

export default CommentCard;
