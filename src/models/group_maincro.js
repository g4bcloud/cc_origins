const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return group_maincro.init(sequelize, DataTypes);
}

class group_maincro extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    groupcroId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'groupCro',
        key: 'id'
      }
    },
    maincroId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'maincro',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'group_maincro',
    schema: 'public',
    timestamps: false,
    freezeTableName: false,
    indexes: [
      {
        name: "gm_idx",
        unique: true,
        fields: [
          { name: "groupcroId" },
          { name: "maincroId" },
        ]
      },
      {
        name: "group_maincro_id_ix",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "group_maincro_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  }
}
