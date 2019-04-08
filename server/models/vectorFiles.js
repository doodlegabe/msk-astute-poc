module.exports = (sequelize, DataTypes) => {
  const VectorFile = sequelize.define('VectorFile', {
    optimizedDate: {
      type: DataTypes.Date,
      allowNull: false,
    },
    optimizedPath: {
      type: DataTypes.String,
      allowNull: true,
    },
    optimizedSVG: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    originalPath: {
      type: DataTypes.String,
      allowNull: true,
    },
    originalSVG: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    dropboxID: {
      type: DataTypes.String,
      allowNull: true,
    },
  });

  return VectorFile
};

