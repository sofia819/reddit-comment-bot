const {
  MIN_KEYWORD_LENGTH,
  DAYS_TO_SEARCH,
  S_TO_MS,
  MIN_SCORE,
  MAX_SCORE,
} = require("./constants");

const getRandomNumber = (max) =>
  Math.floor(Math.random() * Math.floor(max + 1));

const getRandomElement = (arr) => {
  return arr[getRandomNumber(arr.length - 1)];
};

const getDateForSearch = () => {
  const timeAfter = new Date();
  timeAfter.setDate(timeAfter.getDate() - DAYS_TO_SEARCH);
  return Math.round(timeAfter.getTime() / S_TO_MS);
};

const getIsNSFW = () => (getRandomNumber(1) ? "on" : "off");

const formatApiEndpoint = (keyword) => {
  const timeAfter = getDateForSearch();
  return `https://api.pushshift.io/reddit/search?q=${keyword}&after=${timeAfter}&score=>${MIN_SCORE}`;
};

// Separate the arguments from the command prefix and filter out words that are too short
const filterArgs = ({ content }) =>
  content
    .split(" ")
    .splice(1)
    .filter((word) => word.length >= MIN_KEYWORD_LENGTH);

module.exports = {
  formatApiEndpoint,
  getRandomNumber,
  getRandomElement,
  filterArgs,
};
