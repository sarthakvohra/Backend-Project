const cookieParser = require("cookie-parser");
const express = require("express");
const app = express();
const authRoutes = require("./routes/authRoutes");
const { requireAuth, checkUser } = require("./middleware/authMiddleware");

const mongoose = require("mongoose");
const Blog = require("./models/blog");
const dbURI =
  "mongodb+srv://sarthakv:test2468@cluster0.wqowg.mongodb.net/node-practice?retryWrites=true&w=majority";

mongoose
  .connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));
app.set("view engine", "ejs");
//app.set('views', 'views');

//app.listen(3000);   //moved to mongoose.connect()

//const uri =
// "mongodb+srv://sarthakv:<password>@cluster0.wqowg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(express.json());

app.get("/add-blog", (req, res) => {
  const blog = new Blog({
    title: "second blog",
    snippet: "created by Yash",
    body: "body of this blog",
  });
  blog
    .save()
    .then((result) => res.send(result))
    .catch((err) => console.log(err));
});

app.get("/all-blogs", (req, res) => {
  Blog.find()
    .then((result) => res.send(result))
    .catch((err) => console.log(err));
});

app.get("/single-blog", (req, res) => {
  Blog.findById("6062a9606d791b1e24227d68")
    .then((result) => res.send(result))
    .catch((err) => console.log(err));
});

// app.get("/", (req, res) => {
//   const blogs = [
//     {
//       title: "Sarthak ka blog",
//       snippet:
//         "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt,",
//     },
//     {
//       title: "Yash ka blog",
//       snippet:
//         "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt,",
//     },
//     {
//       title: "Harshit ka blog",
//       snippet:
//         "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt,",
//     },
//   ];
//   res.render("index", { title: "Home", blogs });
// });

app.get("*", checkUser);

app.get("/", (req, res) => res.redirect("/home"));

app.get("/blogs", requireAuth, (req, res) => {
  Blog.find()
    .sort({ createdAt: -1 }) //newest first
    .then((result) => {
      res.render("index", { title: "All Blogs", blogs: result });
    })
    .catch((err) => console.log(err));
});

app.post("/blogs", (req, res) => {
  const blog = new Blog(req.body);
  blog
    .save()
    .then((result) => res.redirect("/blogs"))
    .catch((err) => console.log(err));
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

app.get("/blogs/create", (req, res) => {
  res.render("create", { title: "Create Blog" });
});

app.get("/home", (req, res) => {
  res.render("home", { title: "Home" });
});

app.use(authRoutes);

app.get("/blogs/:id", (req, res) => {
  const id = req.params.id;
  Blog.findById(id)
    .then((result) =>
      res.render("details", { blog: result, title: result.title })
    )
    .catch((err) => res.status(404).render("404", { title: "Page not found" }));
});

app.delete("/blogs/:id", (req, res) => {
  const id = req.params.id;
  Blog.findByIdAndDelete(id)
    .then((result) => {
      res.json({ redirect: "/blogs" });
    })
    .catch((err) => console.log(err));
});

app.use((req, res) => {
  res.status(404).render("404", { title: "Create Blog" });
});
