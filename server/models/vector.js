module.exports = (sequelize, DataTypes) => {
 const Vector = sequelize.define('Vector', {
    optimizedDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    optimizedPath: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    optimizedSVG: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    originalPath: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    originalSVG: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    dropboxId: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });
 return Vector;
};