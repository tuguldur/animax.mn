import React, { useState, useEffect, useContext } from "react";
import { MDCRipple } from "@material/ripple";
import "./index.scss";
import Search from "../../context/search";
const Header = () => {
  const { search, setSearch } = useContext(Search);
  const [value, setValue] = useState("");
  const [show, setShow] = useState(false);
  const change = (e) => {
    setValue(e.target.value);
  };
  useEffect(() => {
    const icons = document.querySelectorAll(".mdc-icon-button");
    icons.forEach((icon) => (new MDCRipple(icon).unbounded = true));
  }, [search]);
  return (
    <div id="header" className={`${show ? "show-search" : ""}`}>
      <div className="left">
        <div className="left-spacer">
          <h1>Animax Downloader</h1>
        </div>
      </div>
      <div className="center">
        <div
          className={`search${value ? " has-text" : ""}`}
          onClick={(_) => document.getElementById("searchInput").focus()}
        >
          <button
            type="button"
            className="mdc-icon-button material-icons"
            onClick={(_) => {
              setShow(true);
              document.getElementById("searchInput").focus();
            }}
          >
            search
          </button>
          <div id="searchTerm">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSearch("loading");
                var id = value.split("/");
                const anime = `https://animax.mn/api/m/anime/detail/${
                  id[id.length - 1]
                }`;
                const episode = `https://animax.mn/api/m/episodes/${
                  id[id.length - 1]
                }`;
                const options = {
                  method: "GET",
                  headers: {
                    accept: "application/json",
                    "Access-Control-Allow-Origin": "*",
                    mode: "no-cors",
                  },
                };
                fetch(anime, options)
                  .then((response) => response.json())
                  .then((data) => {
                    var title = data.title;
                    setSearch({ title });
                    fetch(episode, options)
                      .then((response) => response.json())
                      .then((data) => {
                        console.log(search);
                        setSearch({ title, episode: data });
                      });
                  });
              }}
            >
              <label id="prompt" htmlFor="searchInput" aria-hidden="true">
                https://animax.mn/#/anime/####
              </label>
              <input
                id="searchInput"
                aria-labelledby="prompt"
                type="url"
                onChange={change}
                value={value}
                autoFocus=""
                onBlur={(e) => setShow(e.target.value ? true : false)}
              />
            </form>
          </div>
          <button
            type="button"
            className="mdc-icon-button material-icons clear-button"
            onClick={(_) => {
              setValue("");
              setSearch(null);
              document.getElementById("searchInput").focus();
            }}
          >
            cancel
          </button>
        </div>
      </div>
      <div className="right"></div>
    </div>
  );
};
export default Header;
