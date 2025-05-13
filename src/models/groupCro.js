const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return groupCro.init(sequelize, DataTypes);
}

class groupCro extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'groupCro',
    schema: 'public',
    timestamps: false,
    freezeTableName: false,
    indexes: [
      {
        name: "groupCro_id_ix",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "groupcro_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "name_idx",
        unique: true,
        fields: [
          { name: "name" },
        ]
      },
    ]
  });
  }
}
