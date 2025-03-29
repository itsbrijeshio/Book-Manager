const express = require("express");
const {
  handleCreateUser,
  handleSearchBooks,
  handleSaveBook,
  handleAddTag,
  handleSearchBookByTag,
} = require("./controllers/index");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to Bookstore API");
});

app.post("/api/users", handleCreateUser);
app.get("/api/books/search", handleSearchBooks);
app.post("/api/books/save", handleSaveBook);
app.post("/api/books/tag", handleAddTag);
app.get("/api/books/searchByTag", handleSearchBookByTag);

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
