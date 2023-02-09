
// homeroutes contains all the view routes that do not require any authentication
const router = require("express").Router();
const { Post, Comment, User } = require("../models/");

// TODO - work on GET route for getting all posts
// this page can be viewed without logging in
router.get("/", async (req, res) => {
  // TODO - retrieve all posts from the database
  // render the homepage template with the posts retrieved from the database
  try {
    const postData = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ["name"],
        },
      ],
    });
    const posts = postData.map((post) => post.get({ plain: true }));
    res.render("homepage", { posts });
  } catch (err) {
    res.status(500).json(err);
  }
});

// TODO - create a GET route for getting a single post with its id
// this page can be viewed without logging in
router.get("/post/:id", async (req, res) => {
  // TODO - retrieve a single post from the database
  // render the single post template with the post retrieved from the database
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ["name"],
        },
        {
          model: Comment,
          attributes: ["comment_text", "created_at"],
          include: {
            model: User,
            attributes: ["name"],
          },
        },
      ],
    });
    const post = postData.get({ plain: true });
    res.render("single-post", { post });
  } catch (err) {
    res.status(500).json(err);
  }
});



// This route renders the login page, which has been completed for you
router.get("/login", (req, res) => {
  //if users has an existing valid session, they will be redirected to the homepage
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }
  //render the login view otherwise, refer to login.handlebars
  res.render("login");
});



// This route renders the signup page, which has been completed for you
router.get("/signup", (req, res) => {
  //if users has an existing valid session, they will be redirected to the homepage
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }
  //render the login view otherwise, refer to signup.handlebars
  res.render("signup");
});

module.exports = router;

