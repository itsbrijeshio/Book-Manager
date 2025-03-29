module.exports = (sequelize, DataTypes) => {
  const Tag = sequelize.define(
    "Tag",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      tagName: {
        type: DataTypes.STRING,
        required: true,
      },
    },
    { tableName: "tags" }
  );

  Tag.associate = (models) => {
    Tag.belongsToMany(models.Book, {
      through: models.BookTag,
      foriegnKey: "bookId",
    });
  };

  return Tag;
};
