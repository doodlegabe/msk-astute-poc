'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('VectorFiles', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
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
        type: Sequelize.JSON,
        allowNull: true,
      },
      originalPath: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      originalSVG: {
        type: Sequelize.JSON,
        allowNull: true,
      },
      dropboxID: {
        type: Sequelize.STRING,
        allowNull: true,
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('VectorFiles');
  }
};