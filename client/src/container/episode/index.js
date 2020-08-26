import React, { useState, useEffect } from "react";
import { MDCRipple } from "@material/ripple";
import { MDCMenuSurface } from "@material/menu-surface";
import { Link } from "react-router-dom";
import "./style.scss";
const Episode = (props) => {
  const anime = props.match.url.split("/")[2];
  const [episode, setEpisode] = useState({});
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
            setVideo(data.vid2);
            setEpisode({ title, video: data });
          });
      });
  }, [props.match.params.id]);
  useEffect(() => {
    const icons = document.querySelectorAll(".mdc-icon-button");
    icons.forEach((icon) => (new MDCRipple(icon).unbounded = true));
  }, [episode, video]);
  const VideoPlayer = ({ url }) => {
    return (
      <video controls className="video" key={url}>
        <source src={url} type="video/mp4" />
      </video>
    );
  };
  return (
    <div className="list episode">
      {Object.keys(episode).length ? (
        <div id="main-container">
          <div className="title">
            <Link
              to={`/anime/${anime}?highlight=${props.match.params.id}`}
              className="mdc-icon-button material-icons header-button"
            >
              arrow_back
            </Link>
            <div className="settings-container">
              <span>
                <span className="anime-title">{episode.title}</span>
                {episode.video && ` ${episode.video.number} -р анги`}
              </span>
              <div className="mdc-menu-surface--anchor">
                <div
                  className="mdc-icon-button material-icons header-button video-settings"
                  onClick={() => {
                    const menuSurface = new MDCMenuSurface(
                      document.querySelector(".mdc-menu-surface")
                    );
                    menuSurface.open();
                  }}
                >
                  keyboard_arrow_down
                </div>
                <div className="mdc-menu-surface">
                  <div className="mdc-list">
                    {episode.video
                      ? Object.entries(
                          Object.fromEntries(
                            Object.entries(
                              episode.video
                            ).filter(([key, value]) =>
                              ["vid1", "vid2", "vid3", "vid4", "vid5"].includes(
                                key
                              )
                            )
                          )
                        ).map(([key, value], index) => {
                          if (value) {
                            return (
                              <div
                                className=""
                                key={index}
                                onClick={() => setVideo(value)}
                                className={
                                  value === video
                                    ? "mdc-list-item active"
                                    : "mdc-list-item"
                                }
                              >
                                Video {key}
                              </div>
                            );
                          }
                        })
                      : null}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="episode-container">
            {episode.video ? (
              <div className="video-container">
                <VideoPlayer url={video} />
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
