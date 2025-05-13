import { BaseService } from "./baseService.mjs";

export class MaincroService extends BaseService {
    constructor(secrets, endPoint) {
        super(secrets, endPoint);
        this.maincro = this.baseModels.maincro;
        this.subcro = this.baseModels.subcro;
        this.maincro_subcro = this.baseModels.maincro_subcro;
        this.agent_subcro = this.baseModels.agent_subcro;
        this.group_maincro = this.baseModels.group_maincro;
        this.hotel = this.baseModels.hotel;

        this.s_m = this.maincro.belongsToMany(this.subcro, { through: this.maincro_subcro });
    }


    async get(params) {

        try {
            let query = {
                include: this.s_m,
            }

            const q = super.getQuery(query, params);

            const count = await this.maincro.count(q.countQuery);
            const res = await this.maincro.findAll(q.query);
            await this.sequelize.close();

            let ms = [];
            res.forEach(m => {
                ms.push({
                    id: m.dataValues.id,
                    maincro: m.dataValues.maincro,
                    subcros: m.dataValues.subcros.map(s => {
                        return {
                            maincroSubcroId: s.dataValues.maincro_subcro.dataValues.id,
                            subcro: s.dataValues.subcro
                        }
                    })
                })
            });

            return {
                statusCode: "OK",
                body: JSON.stringify({
                    maincros: ms,
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

    async create(maincro) {

        const t = await this.sequelize.transaction();

        try {
            const maincroInserted = await this.maincro.create(maincro, { transaction: t });

            if (maincro.subcroIds && maincro.subcroIds.length > 0) {
                const subcros = [];
                maincro.subcroIds.forEach(id => {
                    subcros.push({ "maincroId": maincroInserted.id, "subcroId": id });
                });

                await this.maincro_subcro.bulkCreate(subcros, { transaction: t });
            }

            await t.commit();
            await this.sequelize.close();

            return {
                statusCode: "OK",
                body: JSON.stringify({
                    message: 'Maincro created'
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
                    message: "no maincro id(s) provided"
                })
            };
        }

        const t = await this.sequelize.transaction();

        try {
            const maincro_subcros = await this.maincro_subcro.findAll({
                where: {
                    "maincroId": ids
                }
            });
            let maincroSubcroIds = [];
            maincro_subcros.forEach(ms => {
                maincroSubcroIds.push(ms.dataValues.id);
            });

            await this.agent_subcro.destroy({
                where: {
                    "maincroSubcroId": maincroSubcroIds
                }
            }, { transaction: t });

            await this.hotel.destroy({
                where: {
                    "maincroSubcroId": maincroSubcroIds
                }
            }, { transaction: t });

            await this.maincro_subcro.destroy({
                where: {
                    "id": maincroSubcroIds
                }
            }, { transaction: t });

            await this.group_maincro.destroy({
                where: {
                    "maincroId": ids
                }
            }, { transaction: t });

            await this.maincro.destroy({
                where: {
                    "id": ids
                }
            }, { transaction: t });

            await t.commit();
            await this.sequelize.close();

            return {
                statusCode: "OK",
                body: JSON.stringify({
                    message: 'Maincro(s) deleted'
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
    async update(maincro) {
        const t = await this.sequelize.transaction();

        try {
            const res = await this.maincro.update(maincro, {
                where: {
                    id: maincro.id
                }
            }, { transaction: t });

            this.maincro_subcro.destroy({
                where: {
                    "maincroId": maincro.id
                }
            }, { transaction: t });

            if (maincro.subcroIds && maincro.subcroIds.length > 0) {
                let ms = [];
                maincro.subcroIds.forEach(id => {
                    ms.push({ "maincroId": maincro.id, "subcroId": id });
                });
                await this.maincro_subcro.bulkCreate(ms, { transaction: t });
            }

            await t.commit();
            await this.sequelize.close();
            return {
                statusCode: "OK",
                body: JSON.stringify({
                    message: 'Maincro(s) updated'
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