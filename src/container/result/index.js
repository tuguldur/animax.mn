import React, { useContext, useEffect } from "react";
import { MDCMenuSurface } from "@material/menu-surface";
import "./index.scss";
import Search from "../../context/search";
const Result = () => {
  const { search } = useContext(Search);
  useEffect(() => {
    const menuEls = Array.from(document.querySelectorAll(".mdc-menu-surface"));
    menuEls.forEach((menuEl) => {
      const menu = new MDCMenuSurface(menuEl);
      const dropdownToggle = menuEl.parentElement.querySelector(
        ".download-dropdown"
      );
      dropdownToggle.addEventListener("click", () => {
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
                    <div className="episode-title">
                      <strong>{episode.number}.</strong> {episode.title}
                    </div>
                    <div className="episode-action">
                      <div className="mdc-menu-surface--anchor">
                        <button
                          type="button"
                          className="mdc-icon-button material-icons download-dropdown"
                        >
                          more_vert
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
