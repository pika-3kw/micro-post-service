const express = require("express");
const { randomBytes } = require("crypto");
const cors = require("cors");
const fs = require("fs");
const axios = require("axios");

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

let posts = [];

app.get("/posts", (req, res) => {
  res.json(posts);
});

app.post("/posts", (req, res) => {
  const _id = randomBytes(4).toString("hex");
  const { title, content } = req.body;

  const post = {
    _id,
    title,
    content,
  };

  posts.push(post);

  axios.post("http://localhost:4000/events", {
    type: "PostCreated",
    data: post,
  });

  res.status(200).json(post);
});

app.post("/events", (req, res) => {
  const data = req.body;
  console.log("Received Event:", data.type);

  res.json({});
});

app.listen(4001, () => {
  console.log("Post Service running at 4001");
});
