const axios = require("axios");
exports.search = (req, res) => {
  const { q } = req.query;
  const search = `https://animax.mn/api/search?q=${q}`;
  axios
    .get(search)
    .then((response) => res.json(response.data))
    .catch((err) => console.log("UwU"));
};
exports.episodes = (req, res) => {
  const { id } = req.params;
  const episode = `https://animax.mn/api/m/episodes/${id}`;
  axios
    .get(episode)
    .then((response) => res.json(response.data))
    .catch((err) => console.log("UwU"));
};
exports.detail = (req, res) => {
  const { id } = req.params;
  const anime = `https://animax.mn/api/m/anime/detail/${id}`;
  axios
    .get(anime)
    .then((response) => res.json(response.data))
    .catch((err) => console.log("UwU"));
};
exports.latest = (req, res) => {
  axios
    .get("https://animax.mn/api/m/latest/anime")
    .then((response) => res.json(response.data))
    .catch((err) => console.log("UwU"));
};
