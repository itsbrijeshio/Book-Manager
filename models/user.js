module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      username: {
        type: DataTypes.STRING,
        required: true,
        unique: true,
      },
      email: {
        type: DataTypes.STRING,
        required: true,
        unique: true,
      },
    },
    {
      tableName: "users",
    }
  );

  User.associate = (models) => {
    User.hasMany(models.Book, { foriegnKey: "userId" });
  };

  return User;
};
