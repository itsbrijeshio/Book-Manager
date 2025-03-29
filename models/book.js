module.exports = (sequelize, DataTypes) => {
  const Book = sequelize.define(
    "Book",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      title: {
        type: DataTypes.STRING,
        required: true,
      },
      author: {
        type: DataTypes.STRING,
        required: true,
      },
      thumbnail: {
        type: DataTypes.STRING,
      },
      userId: {
        type: DataTypes.INTEGER,
        required: true,
        references: {
          model: "users",
          key: "id",
        },
      },
    },
    { tableName: "books" }
  );

  Book.associate = (models) => {
    Book.belongsTo(models.User, { foriegnKey: "userId" });
    Book.belongsToMany(models.Tag, { through: models.BookTag, foriegnKey: "tagId" });
  };

  return Book;
};
