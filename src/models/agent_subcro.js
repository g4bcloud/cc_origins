const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return agent_subcro.init(sequelize, DataTypes);
}

class agent_subcro extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    agentId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'agent',
        key: 'id'
      }
    },
    maincroSubcroId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'maincro_subcro',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'agent_subcro',
    schema: 'public',
    timestamps: false,
    freezeTableName: false,
    indexes: [
      {
        name: "agent_idx",
        unique: true,
        fields: [
          { name: "agentId" },
          { name: "maincroSubcroId" },
        ]
      },
      {
        name: "agent_subcro_id_ix",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "agent_subcro_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  }
}
