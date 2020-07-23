import React, { useState, useEffect } from "react";
import { MDCRipple } from "@material/ripple";
import { Link } from "react-router-dom";
import "./style.scss";
const Episode = (props) => {
  const anime = props.match.url.split("/")[2];
  const [episode, setEpisode] = useState(null);
  const [video, setVideo] = useState("");
  useEffect(() => {
    fetch("/api/proxy/detail/" + anime)
      .then((response) => response.json())
      .then((data) => {
        var title = data.title;
        setEpisode({ title });
        fetch("/api/proxy/episode/" + props.match.params.id)
          .then((response) => response.json())
          .then((data) => {
            console.log(episode);
            setEpisode({ title, video: data });
          });
      });
  }, [props.match.params.id]);
  useEffect(() => {
    const icons = document.querySelectorAll(".mdc-icon-button");
    icons.forEach((icon) => (new MDCRipple(icon).unbounded = true));
  }, [episode]);
  return (
    <div className="list episode">
      {episode ? (
        <div id="main-container">
          <div className="title">
            <Link
              to={"/anime/" + anime}
              className="mdc-icon-button material-icons header-button"
            >
              arrow_back
            </Link>
            <div className="settings-container">
              <span>
                <span className="anime-title">{episode.title}</span>
                {episode.video && ` ${episode.video.number} -р анги`}
              </span>
              {episode.video ? (
                <div
                  className="mdc-icon-button material-icons header-button video-settings"
                  onClick={() => {
                    episode.video.vid2 === video
                      ? setVideo(episode.video.vid1)
                      : setVideo(episode.video.vid2);
                  }}
                >
                  {episode.video.vid2 === video
                    ? "signal_wifi_4_bar"
                    : "signal_cellular_4_bar"}
                </div>
              ) : null}
            </div>
          </div>
          <div className="episode-container">
            {episode.video ? (
              <div className="video-container">
                <video controls className="video">
                  <source
                    src={video ? video : episode.video.vid2}
                    type="video/mp4"
                  />
                </video>
              </div>
            ) : (
              <div className="loading">
                <span>Loading...</span>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="loading">
          <span>Loading...</span>
        </div>
      )}
    </div>
  );
};
export default Episode;
