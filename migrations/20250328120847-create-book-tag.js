"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("bookTags", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      bookId: {
        type: Sequelize.INTEGER,
        required: true,
        references: {
          model: "books",
          key: "id",
        },
      },
      tagId: {
        type: Sequelize.INTEGER,
        required: true,
        references: {
          model: "tags",
          key: "id",
        },
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("bookTags");
  },
};
