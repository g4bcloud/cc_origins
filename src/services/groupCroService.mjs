import { BaseService } from "./baseService.mjs";

export class GroupCroService extends BaseService {
    constructor(secrets, endPoint) {
        super(secrets, endPoint);
        this.groupCro = this.baseModels.groupCro;
        this.group_maincro = this.baseModels.group_maincro;
        this.maincro = this.baseModels.maincro;
        this.subcro = this.baseModels.subcro;
        this.maincro_subcro = this.baseModels.maincro_subcro;
        this.agent = this.baseModels.agent;
    }

    async get(params) {
        try {
            let query = {
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

            const q = super.getQuery(query, params);

            const count = await this.groupCro.count(q.countQuery);
            const res = await this.groupCro.findAll(q.query);
            await this.sequelize.close();

            let groupCros = [];

            res.forEach(gc => {
                groupCros.push({
                    id: gc.dataValues.id,
                    name: gc.dataValues.name,
                    subcros: gc?.dataValues?.group_maincros.map(gm =>
                        gm.maincro.dataValues.maincro_subcros.map(ms => {
                            return {
                                maincroSubcroId: ms.id,
                                maincro: gm.maincro.dataValues.maincro,
                                subcro: ms.dataValues.subcro.subcro
                            }
                        })
                    )
                });
            });

            return {
                statusCode: "OK",
                body: JSON.stringify({
                    groupCros: groupCros,
                    count: count
                })
            };

        }
        catch (error) {
            await this.sequelize.close();
            return {
                statusCode: "KO",
                body: JSON.stringify({
                    message: this.getErrorMessage(error)
                })
            };
        }
    }

    async create(groupCro) {

        const t = await this.sequelize.transaction();
        const groupCroTpInsert = {
            "name": groupCro.name
        };

        try {
            const groupCroInerted = await this.groupCro.create(groupCroTpInsert, { transaction: t });
            let group_maincros = [];
            groupCro.maincroIds.forEach(id => {
                group_maincros.push({ "groupcroId": groupCroInerted.id, "maincroId": id });
            });

            await this.group_maincro.bulkCreate(group_maincros, { transaction: t });

            await t.commit();
            await this.sequelize.close();
            return {
                statusCode: "OK",
                body: JSON.stringify({
                    message: "GroupCro created"
                })
            };
        }
        catch (error) {
            await t.rollback();
            await this.sequelize.close();
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
                    message: "no groupCro id(s) provided"
                })
            };
        }

        const t = await this.sequelize.transaction();

        try {
            //agents attached to groupCro are not deleted
            this.agent.update({
                "groupcroId": null
            }, {
                where: {
                    "groupcroId": ids
                }
            }, { transaction: t });

            await this.group_maincro.destroy({
                where: {
                    "groupcroId": ids
                }
            }, { transaction: t });

            await this.groupCro.destroy({
                where: {
                    "id": ids
                }
            }, { transaction: t });

            await t.commit();
            await this.sequelize.close();

            return {
                statusCode: "OK",
                body: JSON.stringify({
                    message: 'GroupCro(s) deleted'
                })
            };
        }
        catch (error) {
            await t.rollback();
            await this.sequelize.close();
            return {
                statusCode: "KO",
                body: JSON.stringify({
                    message: this.getErrorMessage(error)
                })
            };
        }
    }
    async update(groupCro) {
        console.log(`put groupCro ============> ${JSON.stringify(groupCro)}`);
        const gc = {
            "name": groupCro.name
        }
        const t = await this.sequelize.transaction();

        try {
            const res = await this.groupCro.update(gc, {
                where: {
                    id: groupCro.id
                }
            }, { transaction: t });

            await this.group_maincro.destroy({
                where: {
                    "groupcroId": groupCro.id
                }
            }, { transaction: t });

            if (groupCro.maincroIds && groupCro.maincroIds.length > 0) {
                let group_maincros = [];
                groupCro.maincroIds.forEach(id => {
                    group_maincros.push({ "groupcroId": groupCro.id, "maincroId": id });
                });

                await this.group_maincro.bulkCreate(group_maincros, { transaction: t });
            }


            await t.commit();
            await this.sequelize.close();
            return {
                statusCode: "OK",
                body: JSON.stringify({
                    message: 'GroupCros(s) updated'
                })
            };
        }
        catch (error) {
            await t.rollback();
            await this.sequelize.close();
            return {
                statusCode: "KO",
                body: JSON.stringify({
                    message: this.getErrorMessage(error)
                })
            };
        }
    }
}