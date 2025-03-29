module.exports = (sequelize, DataTypes) => {
  const BookTag = sequelize.define(
    "BookTag",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      bookId: {
        type: DataTypes.INTEGER,
        required: true,
        references: {
          model: "books",
          key: "id",
        },
      },
      tagId: {
        type: DataTypes.INTEGER,
        required: true,
        references: {
          model: "tags",
          key: "id",
        },
      },
    },
    { tableName: "bookTags" }
  );

  return BookTag;
};
