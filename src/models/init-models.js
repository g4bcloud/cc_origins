const DataTypes = require("sequelize").DataTypes;
const _agent = require("./agent");
const _agent_subcro = require("./agent_subcro");
const _groupCro = require("./groupCro");
const _group_maincro = require("./group_maincro");
const _hotel = require("./hotel");
const _maincro = require("./maincro");
const _maincro_subcro = require("./maincro_subcro");
const _subcro = require("./subcro");

function initModels(sequelize) {
  const agent = _agent(sequelize, DataTypes);
  const agent_subcro = _agent_subcro(sequelize, DataTypes);
  const groupCro = _groupCro(sequelize, DataTypes);
  const group_maincro = _group_maincro(sequelize, DataTypes);
  const hotel = _hotel(sequelize, DataTypes);
  const maincro = _maincro(sequelize, DataTypes);
  const maincro_subcro = _maincro_subcro(sequelize, DataTypes);
  const subcro = _subcro(sequelize, DataTypes);

  agent_subcro.belongsTo(agent, { as: "agent", foreignKey: "agentId"});
  agent.hasMany(agent_subcro, { as: "agent_subcros", foreignKey: "agentId"});
  agent.belongsTo(groupCro, { as: "groupcro", foreignKey: "groupcroId"});
  groupCro.hasMany(agent, { as: "agents", foreignKey: "groupcroId"});
  group_maincro.belongsTo(groupCro, { as: "groupcro", foreignKey: "groupcroId"});
  groupCro.hasMany(group_maincro, { as: "group_maincros", foreignKey: "groupcroId"});
  group_maincro.belongsTo(maincro, { as: "maincro", foreignKey: "maincroId"});
  maincro.hasMany(group_maincro, { as: "group_maincros", foreignKey: "maincroId"});
  maincro_subcro.belongsTo(maincro, { as: "maincro", foreignKey: "maincroId"});
  maincro.hasMany(maincro_subcro, { as: "maincro_subcros", foreignKey: "maincroId"});
  agent_subcro.belongsTo(maincro_subcro, { as: "maincroSubcro", foreignKey: "maincroSubcroId"});
  maincro_subcro.hasMany(agent_subcro, { as: "agent_subcros", foreignKey: "maincroSubcroId"});
  hotel.belongsTo(maincro_subcro, { as: "maincroSubcro", foreignKey: "maincroSubcroId"});
  maincro_subcro.hasMany(hotel, { as: "hotels", foreignKey: "maincroSubcroId"});
  maincro_subcro.belongsTo(subcro, { as: "subcro", foreignKey: "subcroId"});
  subcro.hasMany(maincro_subcro, { as: "maincro_subcros", foreignKey: "subcroId"});

  return {
    agent,
    agent_subcro,
    groupCro,
    group_maincro,
    hotel,
    maincro,
    maincro_subcro,
    subcro,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
