import React, { useEffect, useState } from "react";
import { MDCMenuSurface } from "@material/menu-surface";
import { MDCRipple } from "@material/ripple";
import { Link } from "react-router-dom";
import "./index.scss";
const Result = (props) => {
  const [search, setSearch] = useState("loading");
  const options = {
    method: "GET",
  };
  useEffect(() => {
    setSearch("loading");
    var id = props.match.params.id;
    console.log(id);
    fetch("/api/proxy/detail/" + id, options)
      .then((response) => response.json())
      .then((data) => {
        var title = data.title;
        setSearch({ title });
        fetch("/api/proxy/episodes/" + id, options)
          .then((response) => response.json())
          .then((data) => {
            console.log(search);
            setSearch({ title, episode: data });
          });
      });
  }, [props.match.params.id]);
  useEffect(() => {
    const icons = document.querySelectorAll(".mdc-icon-button");
    icons.forEach((icon) => (new MDCRipple(icon).unbounded = true));
    const menuEls = Array.from(document.querySelectorAll(".mdc-menu-surface"));
    menuEls.forEach((menuEl) => {
      const menu = new MDCMenuSurface(menuEl);
      const dropdownToggle = menuEl.parentElement.querySelector(
        ".download-dropdown"
      );
      dropdownToggle.addEventListener("click", (e) => {
        e.preventDefault();
        menu.open();
      });
    });
  }, [search]);
  return (
    <div className="list">
      {search ? (
        search === "loading" ? (
          <div className="loading">
            <span>Loading...</span>
          </div>
        ) : (
          <div id="main-container">
            <div className="title">{search.title}</div>
            {search.episode ? (
              search.episode.map((episode) => {
                const { vid1, vid2, vid3, vid4, vid5 } = episode;
                const result = [vid1, vid2, vid3, vid4, vid5];
                return (
                  <div className="item-container" key={episode.id}>
                    <Link
                      to={`/anime/${props.match.params.id}/episode/${episode.id}`}
                      className="episode-link"
                    >
                      <div className="episode-title">
                        {episode.number}-р анги {episode.title}
                      </div>
                    </Link>
                    <div className="episode-action">
                      <div className="mdc-menu-surface--anchor">
                        <button
                          type="button"
                          className="mdc-icon-button material-icons download-dropdown"
                        >
                          play_arrow
                        </button>
                        <div className="mdc-menu-surface">
                          <div className="mdc-list">
                            {result.map((link, index) =>
                              link ? (
                                <a
                                  href={link}
                                  className="mdc-list-item"
                                  key={index}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  Video {index + 1}
                                </a>
                              ) : null
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="item-container">
                <div className="episode-title text-center">Loading...</div>
              </div>
            )}
          </div>
        )
      ) : null}
    </div>
  );
};
export default Result;
