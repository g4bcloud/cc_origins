const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return subcro.init(sequelize, DataTypes);
}

class subcro extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    subcro: {
      type: DataTypes.STRING,
      allowNull: false
    },
    label: {
      type: DataTypes.STRING,
      allowNull: true
    },
    flagcro: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    webcallback: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'subcro',
    schema: 'public',
    timestamps: false,
    freezeTableName: false,
    indexes: [
      {
        name: "subcro_id_ix",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "subcro_idx",
        unique: true,
        fields: [
          { name: "subcro" },
        ]
      },
      {
        name: "subcro_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  }
}
