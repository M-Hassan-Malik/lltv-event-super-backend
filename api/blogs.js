const router = require("express").Router();
const Controller = require("../controllers");

router.post(`/create-blog`, Controller.Blog.createBlog);
router.get(`/get-blogs-by-userid/:user_id`, Controller.Blog.getBlogsByid);
router.delete(`/delete-blog/:id`, Controller.Blog.deleteBlog);

module.exports = router;
