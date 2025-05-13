const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return maincro_subcro.init(sequelize, DataTypes);
}

class maincro_subcro extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    maincroId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'maincro',
        key: 'id'
      }
    },
    subcroId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'subcro',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'maincro_subcro',
    schema: 'public',
    timestamps: false,
    freezeTableName: false,
    indexes: [
      {
        name: "maincro_notnull_main_idx",
        unique: true,
        fields: [
          { name: "maincroId" },
          { name: "subcroId" },
        ]
      },
      {
        name: "maincro_null_main_idx",
        unique: true,
        fields: [
          { name: "subcroId" },
        ]
      },
      {
        name: "maincro_subcro_id_ix",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "maincro_subcro_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  }
}
