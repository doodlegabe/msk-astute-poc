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
      type: DataTypes.BLOB,
      allowNull: true,
    },
    originalPath: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    originalSVG: {
      type: DataTypes.BLOB,
      allowNull: true,
    },
    dropboxId: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });
 return Vector;
};