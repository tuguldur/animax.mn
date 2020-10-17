import React, { useEffect, useState } from "react";
import { MDCMenuSurface } from "@material/menu-surface";
import { MDCRipple } from "@material/ripple";
import { Link } from "react-router-dom";
const Home = () => {
  const [search, setSearch] = useState("loading");
  useEffect(() => {
    setSearch("loading");
    fetch("/api/proxy/latest")
      .then((response) => response.json())
      .then((data) => setSearch({ episode: data }));
  }, []);
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
            <div className="title overflow-hidden">Latest Episodes</div>
            {search.episode ? (
              search.episode.map((episode) => {
                const { vid1, vid2, vid3, vid4, vid5 } = episode;
                const result = [vid1, vid2, vid3, vid4, vid5];
                return (
                  <div className="item-container" key={episode.id}>
                    <Link
                      to={`/anime/${episode.anime_id}/episode/${episode.id}`}
                      className="episode-link"
                    >
                      <div className="episode-title">
                        {episode.atitle} • {episode.number}-р анги
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
export default Home;
