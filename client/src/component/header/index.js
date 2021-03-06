import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { MDCRipple } from "@material/ripple";
import "./index.scss";
const Header = () => {
  const [value, setValue] = useState("");
  const [show, setShow] = useState(false);
  const [suggestions, setSuggestions] = useState(null);
  const change = (e) => {
    setSuggestions(null);
    setValue(e.target.value);
    if (e.target.value)
      fetch(`/api/proxy/search?q=${e.target.value}`)
        .then((response) => response.json())
        .then((data) => setSuggestions(data));
    else setSuggestions(null);
  };
  useEffect(() => {
    const icons = document.querySelectorAll(".mdc-icon-button");
    icons.forEach((icon) => (new MDCRipple(icon).unbounded = true));
  }, []);
  return (
    <div id="header" className={`${show ? "show-search" : ""}`}>
      <div className="left">
        <div className="left-spacer">
          <Link to="/">
            <h1>Animax - Free</h1>
          </Link>
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
            <label id="prompt" htmlFor="searchInput" aria-hidden="true">
              Search anime
            </label>
            <input
              id="searchInput"
              aria-labelledby="prompt"
              type="text"
              onChange={change}
              value={value}
              autoFocus=""
              autoComplete="off"
              onBlur={(e) => setShow(e.target.value ? true : false)}
            />
          </div>
          <button
            type="button"
            className="mdc-icon-button material-icons clear-button"
            onClick={(_) => {
              setValue("");
              document.getElementById("searchInput").focus();
            }}
          >
            cancel
          </button>
          <div className={`suggestions${suggestions ? " h-auto" : ""}`}>
            <div className="preview">
              {suggestions ? (
                suggestions.map((suggestion) => (
                  <div className="preview-item" key={suggestion.id}>
                    <Link
                      to={`/anime/${suggestion.id}`}
                      onClick={(_) => setValue("")}
                    >
                      {suggestion.title}
                    </Link>
                  </div>
                ))
              ) : (
                <div className="loading">Loading...</div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="right"></div>
    </div>
  );
};
export default Header;
