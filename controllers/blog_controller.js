const db = require("../models");
const Blogs = require("../models/Blog");

exports.createBlog = (req, res) => {
  let data = JSON.parse(req.body.data);
  try {
    db.Blog.create(new Blogs(data)).then((result) => {
      result
        ? res.status(200).json({ result: result })
        : res.status(400).json({ error: "Error @createBlog Else-Block" });
    });
  } catch (e) {
    res
      .status(400)
      .json({ error: "Error @createBlog Catch-Block:" + String(e) });
    console.log(String(e));
  }
};
exports.getBlogsByid = (req, res) => {
  db.Blog.find({ organizer_id: req.params.user_id }).exec((err, result) => {
    result
      ? res.status(200).json({ result: result })
      : err
      ? res.status(400).json({ error: "Error @createBlog" + err })
      : res.status(400).json({ error: "Error @createBlog Else-Block" });
  });
};
exports.deleteBlog = (req, res) => {
  db.Blog.deleteOne({ _id: req.params.id }).exec((err, result) => {
    result
      ? res.status(200).json({ result: result })
      : err
      ? res.status(400).json({ error: "Error @createBlog" + err })
      : res.status(400).json({ error: "Error @createBlog Else-Block" });
  });
};
