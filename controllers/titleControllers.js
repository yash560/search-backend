const { default: axios } = require("axios");
const asyncHandler = require("express-async-handler");

const title = asyncHandler(async (req, res) => {
  const title = req.query.title;
  if (!title) res.status(400);
  const titles = await axios.get(
    `http://www.omdbapi.com/?t=${title}&apikey=${process.env.OMDBKEY}`
  );
  console.log(titles.data.Response);

  if (!titles || titles.data.Response === "False")
    res.status(400).send({ data: titles.data.Error || "No titles" });
  else res.status(200).json(titles.data);
});

module.exports = { title };
