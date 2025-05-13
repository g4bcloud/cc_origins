const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return maincro.init(sequelize, DataTypes);
}

class maincro extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    maincro: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'maincro',
    schema: 'public',
    timestamps: false,
    freezeTableName: false,
    indexes: [
      {
        name: "maincro_id_ix",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "maincro_idx",
        unique: true,
        fields: [
          { name: "maincro" },
        ]
      },
      {
        name: "maincro_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  }
}
