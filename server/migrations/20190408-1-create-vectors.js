'use strict';
module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('Vectors', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      optimizedDate: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      optimizedPath: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      optimizedSVG: {
        type: Sequelize.BLOB,
        allowNull: true,
      },
      originalPath: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      originalSVG: {
        type: Sequelize.BLOB,
        allowNull: true,
      },
      dropboxId: {
        type: Sequelize.STRING,
        allowNull: true,
        unique: true,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
  }),
  down: (queryInterface /* , Sequelize */) => queryInterface.dropTable('Vectors')
};