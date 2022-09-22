// Setting up Imports
const { default: axios } = require("axios");
const asyncHandler = require("express-async-handler");

const title = asyncHandler(async (req, res) => {
  //  Request body should contain a title

  const title = req.query.title;
  if (!title) res.status(400);

  //  Making a request to OMDB api

  const titles = await axios.get(
    `http://www.omdbapi.com/?t=${title}&apikey=${process.env.OMDBKEY}`
  );
  //  Handling errors

  if (!titles || titles.data.Response === "False")
    res.status(400).send({ data: titles.data.Error || "No titles" });
  else res.status(200).json(titles.data);
});

// exporting module
module.exports = { title };
