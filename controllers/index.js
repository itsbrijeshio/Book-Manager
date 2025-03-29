const { Op, where } = require("sequelize");
const { User, Book, Tag } = require("../models");
const { getBooks } = require("../lib");

const response = (res, { status = 200, message, ...data }) => {
  return res.status(status).json({
    message,
    ...data,
  });
};

const parseBooks = (books = []) =>
  books?.map((book) => {
    return {
      title: book?.volumeInfo?.title,
      author: book.volumeInfo?.authors?.join(", "),
      thumbnail: book?.volumeInfo?.imageLinks?.thumbnail,
    };
  });

const formatBooks = (books = []) =>
  books.map((book) => {
    return {
      id: book?.id,
      title: book?.title,
    };
  });

const handleCreateUser = async (req, res) => {
  try {
    const { username, email } = req.body;
    if (!username || !email) {
      return response(res, {
        status: 400,
        message: "Please provider all fields",
      });
    }

    const isUserExists = await User.findOne({
      where: { [Op.or]: [{ username }, { email }] },
    });
    if (isUserExists) {
      return response(res, {
        status: 409,
        message: "Username or email already exists?",
      });
    }

    const user = await User.create({ username, email });
    response(res, { status: 201, message: "User created successfully!", user });
  } catch (error) {
    return response(res, { status: 500, message: error.message });
  }
};

const handleSearchBooks = async (req, res) => {
  try {
    const { query } = req.query;
    if (!query) {
      return response(res, { status: 400, message: "Please provider query " });
    }
    const fetchedBooks = await getBooks(query);
    if (fetchedBooks?.success === false) {
      return response(res, { status: 400, message: "Something went wrong!" });
    }

    const books = parseBooks(fetchedBooks);
    response(res, { status: 200, books });
  } catch (error) {
    return response(res, { status: 500, message: error?.message });
  }
};

const handleSaveBook = async (req, res) => {
  try {
    const { userId, title, author, thumbnail } = req.body;
    if (!userId || !title || !author || !thumbnail) {
      return response(res, {
        status: 400,
        message: "Please Provide all fields",
      });
    }

    const isUserExists = await User.findByPk(userId);
    if (!isUserExists) {
      return response(res, { status: 400, message: "User not found" });
    }

    const book = await Book.create({ title, author, thumbnail, userId });
    response(res, { status: 201, message: "Book added successfully!", book });
  } catch (error) {
    response(res, { status: 500, message: error.message });
  }
};

const handleAddTag = async (req, res) => {
  try {
    const { bookId, tagName } = req.body;
    if (!bookId || !tagName) {
      return response(res, {
        status: 400,
        message: "Please provide all fields",
      });
    }

    const book = await Book.findByPk(bookId);
    if (!book) {
      return response(res, { status: 400, message: "Book not found" });
    }

    const tag = await Tag.create({ tagName });
    console.log(tag);
    const bookTag = await tag.addBook(book);

    response(res, {
      status: 201,
      tag,
      message: "Tag added successfully!",
    });
  } catch (error) {
    response(res, { status: 500, message: error.message });
  }
};

const handleSearchBookByTag = async (req, res) => {
  try {
    const { tagName } = req.query;
    if (!tagName) {
      return response(res, {
        status: 400,
        message: "Please provide tagName query",
      });
    }
    const rowBooks = await Tag.findOne({
      where: { tagName },
      include: Book,
    });

    const books = formatBooks(rowBooks?.Books);
    const tag = rowBooks?.tagName;
    if (!tag) {
      return response(res, { status: 400, message: "Book not found?" });
    }

    response(res, { status: 200, tag, books });
  } catch (error) {
    response(res, { status: 500, message: error.message });
  }
};

module.exports = {
  handleCreateUser,
  handleSearchBooks,
  handleSaveBook,
  handleAddTag,
  handleSearchBookByTag,
};
