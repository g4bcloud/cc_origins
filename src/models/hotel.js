const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return hotel.init(sequelize, DataTypes);
}

class hotel extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    codeHotel: {
      type: DataTypes.STRING,
      allowNull: false
    },
    maincroSubcroId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'maincro_subcro',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'hotel',
    schema: 'public',
    timestamps: false,
    freezeTableName: false,
    indexes: [
      {
        name: "codehotel_idx",
        unique: true,
        fields: [
          { name: "codeHotel" },
        ]
      },
      {
        name: "hotel_id_idx",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "hotel_id_ix",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "hotel_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "maincroSubcroId_ix",
        fields: [
          { name: "maincroSubcroId" },
        ]
      },
    ]
  });
  }
}
