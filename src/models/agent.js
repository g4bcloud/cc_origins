const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return agent.init(sequelize, DataTypes);
}

class agent extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    emailAddress: {
      type: DataTypes.STRING,
      allowNull: false
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: true
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: true
    },
    groupcroId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'groupCro',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'agent',
    schema: 'public',
    timestamps: false,
    freezeTableName: false,
    indexes: [
      {
        name: "agent_id_ix",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "agent_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "emailaddress_idx",
        unique: true,
        fields: [
          { name: "emailAddress" },
        ]
      },
      {
        name: "groupcroId_ix",
        fields: [
          { name: "groupcroId" },
        ]
      },
    ]
  });
  }
}
