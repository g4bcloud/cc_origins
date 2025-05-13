import { BaseService } from "./baseService.mjs";

export class AgentService extends BaseService {
    constructor(secrets, endPoint) {
        super(secrets, endPoint);
        this.agent = this.baseModels.agent;
        this.agent_subcro = this.baseModels.agent_subcro;
        this.maincro = this.baseModels.maincro;
        this.subcro = this.baseModels.subcro;
        this.maincro_subcro = this.baseModels.maincro_subcro;
        this.groupCro = this.baseModels.groupCro;
        this.group_maincro = this.baseModels.group_maincro;
    }

    async get(params) {
        try {
            let query = {
                include: [
                    {
                        model: this.agent_subcro,
                        as: "agent_subcros",
                        include: [
                            {
                                model: this.maincro_subcro,
                                as: "maincroSubcro",
                                include: [
                                    {
                                        model: this.maincro,
                                        as: "maincro",
                                    },
                                    {
                                        model: this.subcro,
                                        as: "subcro",
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        model: this.groupCro,
                        as: "groupcro",
                        include: [
                            {
                                model: this.group_maincro,
                                as: "group_maincros",
                                include: [
                                    {
                                        model: this.maincro,
                                        as: "maincro",
                                        include: [
                                            {
                                                model: this.maincro_subcro,
                                                as: "maincro_subcros",
                                                include: [
                                                    {
                                                        model: this.subcro,
                                                        as: "subcro"
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                ]
            };

            const q = super.getQuery(query, params);
            
            const count = await this.agent.count(q.countQuery);
            const res = await this.agent.findAll(q.query);

            //await this.sequelize.close();

            let agents = [];

            res.forEach(a => {
                agents.push({
                    id: a.dataValues.id,
                    emailAddress: a.dataValues.emailAddress,
                    firstName: a.dataValues.firstName,
                    lastName: a.dataValues.lastName,
                    subcros: a?.agent_subcros?.map(ms => {
                        return {
                            maincroSubcroId: ms.maincroSubcro?.dataValues.id,
                            maincro: ms.maincroSubcro?.dataValues.maincro == null ? null : ms.maincroSubcro.dataValues.maincro.dataValues.maincro,
                            subcro: ms.maincroSubcro?.dataValues.subcro.dataValues.subcro
                        }
                    })
                        .concat(
                            a?.dataValues?.groupcro?.dataValues.group_maincros.flatMap(gm =>
                                gm.maincro.dataValues.maincro_subcros.map(ms => ({
                                    maincroSubcroId: ms.id,
                                    maincro: gm.maincro.dataValues.maincro,
                                    subcro: ms.dataValues.subcro.subcro
                                }))
                            ) ?? []
                        )
                })
            });

            return {
                statusCode: "OK",
                body: JSON.stringify({
                    agents: agents,
                    count: count
                })
            };
        }
        catch (error) {
            console.log("error ========>", error);;
            //await this.sequelize.close();
            return {
                statusCode: "KO",
                body: JSON.stringify({
                    message: this.getErrorMessage(error)
                })
            };
        }
    }

    async create(agent) {
        const body = {
            "emailAddress": agent.emailAddress.toLowerCase(),
            "firstName": agent.firstName,
            "lastName": agent.lastName,
            "groupcroId": agent.groupcroId,
        }

        const t = await this.sequelize.transaction();

        try {
            const agentInserted = await this.agent.create(body, { transaction: t });

            if (agent.maincroSubcroIds && agent.maincroSubcroIds.length > 0) {
                let agent_maincroSubcros = [];
                agent.maincroSubcroIds.forEach(id => {
                    agent_maincroSubcros.push({ "agentId": agentInserted.id, "maincroSubcroId": id });
                });

                await this.agent_subcro.bulkCreate(agent_maincroSubcros, { transaction: t });
            }

            await t.commit();
            //await this.sequelize.close();

            return {
                statusCode: "OK",
                body: JSON.stringify({
                    message: 'Agent created'
                })
            };
        }
        catch (error) {
            console.log("error ========>", error);
            await t.rollback();
            //await this.sequelize.close();
            return {
                statusCode: "KO",
                body: JSON.stringify({
                    message: this.getErrorMessage(error)
                })
            };
        }
    }

    async delete(ids) {
        if (!ids) {
            return {
                statusCode: "KO",
                body: JSON.stringify({
                    message: "no agent id(s) provided"
                })
            };
        }

        const t = await this.sequelize.transaction();

        try {
            await this.agent_subcro.destroy({
                where: {
                    "agentId": ids
                }
            }, { transaction: t });

            await this.agent.destroy({
                cascade: true,
                where: {
                    "id": ids
                }
            }, { transaction: t });

            await t.commit();
            //await this.sequelize.close();

            return {
                statusCode: "OK",
                body: JSON.stringify({
                    message: 'Agent(s) deleted'
                })
            };
        }
        catch (error) {
            console.log("error ========>", error);;
            await t.rollback();
            //await this.sequelize.close();
            return {
                statusCode: "KO",
                body: JSON.stringify({
                    message: this.getErrorMessage(error)
                })
            };
        }
    }
    async update(agent) {
        console.log("update =========> agent")
        const t = await this.sequelize.transaction();

        try {
            const res = await this.agent.update({
                "emailAddress": agent.emailAddress.toLowerCase(),
                "firstName": agent.firstName,
                "lastName": agent.lastName,
                "groupcroId": agent?.groupcroId ? agent.groupcroId : null
            }, {
                where: {
                    id: agent.id
                }
            }, { transaction: t });

            await this.agent_subcro.destroy({
                where: {
                    "agentId": [agent.id]
                }
            }, { transaction: t });

            if (agent.maincroSubcroIds && agent.maincroSubcroIds.length > 0) {
                let agent_subcros = [];

                agent.maincroSubcroIds.forEach(id => {
                    agent_subcros.push({ "agentId": agent.id, "maincroSubcroId": id })
                });

                const insertedRows = await this.agent_subcro.bulkCreate(agent_subcros, { transaction: t });
                console.log(insertedRows)
            }

            await t.commit();
            //await this.sequelize.close();
            return {
                statusCode: "OK",
                body: JSON.stringify({
                    message: 'Agent(s) updated'
                })
            };
        }
        catch (error) {
            console.log("error ========>", error);;
            await t.rollback();
            //await this.sequelize.close();
            return {
                statusCode: "KO",
                body: JSON.stringify({
                    message: this.getErrorMessage(error)
                })
            };
        }
    }
}