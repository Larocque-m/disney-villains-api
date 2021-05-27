const Villains = (connection, Sequelize) => {
  return connection.define('wrongdoers',
    {
      name: { type: Sequelize.STRING, primaryKey: true },
      movie: { type: Sequelize.STRING },
      slug: { type: Sequelize.STRING },

    }, { paranoid: true })
}

module.exports = Villains

