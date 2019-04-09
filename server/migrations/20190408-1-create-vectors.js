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
        type: Sequelize.TEXT,
        allowNull: true,
      },
      originalPath: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      originalSVG: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      dropboxId: {
        type: Sequelize.STRING,
        allowNull: true,
        unique: true,
      }
  }),
  down: (queryInterface /* , Sequelize */) => queryInterface.dropTable('Vectors')
};