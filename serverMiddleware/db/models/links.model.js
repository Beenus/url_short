module.exports = (sequelize, Sequelize) => {
  return sequelize.define('links', {
    shortUrl: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    originalUrl: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: false
    },
    clicks: {
      type: Sequelize.INTEGER,
    },

  })
}
