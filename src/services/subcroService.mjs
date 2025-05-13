import { BaseService } from "./baseService.mjs";

export class SubcroService extends BaseService {
    constructor(secrets, endPoint) {
        super(secrets, endPoint);
        this.subcro = this.baseModels.subcro;
        this.maincro_subcro = this.baseModels.maincro_subcro;
        this.agent_subcro = this.baseModels.agent_subcro;
        this.hotel = this.baseModels.hotel;
        this.maincro = this.baseModels.maincro;
    }

    async get(params) {

        try {
            let query = {
                include: [
                    {
                        model: this.maincro_subcro,
                        as: "maincro_subcros",
                        include: [
                            {
                                model: this.maincro,
                                as: "maincro",
                            }
                        ]
                    }
                ]
            };

            const q = super.getQuery(query, params);

            const count = await this.subcro.count(q.countQuery);
            const res = await this.subcro.findAll(q.query);
            await this.sequelize.close();

            let ms = [];
            res.forEach(s => {
                ms.push({
                    id: s.dataValues.id,
                    subcro: s.dataValues.subcro,
                    label: s.dataValues.label,
                    flagcro: s.dataValues.flagcro,
                    webcallback: s.dataValues.webcallback,
                    maincros: s.maincro_subcros.map(m => {
                        return {
                            maincroSubcroId: m.dataValues.id,
                            maincro: m.maincro == null ? null : m.maincro.maincro
                        }

                    })
                })
            });

            return {
                statusCode: "OK",
                body: JSON.stringify({
                    subcros: ms,
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

    async create(subcro) {

        const t = await this.sequelize.transaction();

        try {
            const subcroInserted = await this.subcro.create(subcro, { transaction: t });

            let maincroSubcro = [];
            if (subcro.maincroIds && subcro.maincroIds.length > 0) {
                subcro.maincroIds.forEach(maincroId => {
                    maincroSubcro.push({
                        maincroId: maincroId,
                        subcroId: subcroInserted.dataValues.id
                    });
                });
            }
            else {
                maincroSubcro.push({
                    maincroId: null,
                    subcroId: subcroInserted.dataValues.id
                });
            }

            await this.maincro_subcro.bulkCreate(maincroSubcro, { transaction: t });
            await t.commit();
            await this.sequelize.close();

            return {
                statusCode: "OK",
                body: JSON.stringify({
                    message: 'Subcro created'
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
                    message: "no subcro id(s) provided"
                })
            };
        }

        const t = await this.sequelize.transaction();

        try {

            const res = await this.maincro_subcro.findAll({
                where: {
                    "subcroId": ids
                }
            }, { transaction: t })

            let maincroSubcroIds = [];
            res.forEach(ms => {
                maincroSubcroIds.push(ms.dataValues.id);
            });

            await this.hotel.update(
                { maincroSubcroId: null },
                {
                    where: {
                        "maincroSubcroId": maincroSubcroIds
                    }
                }
                , { transaction: t });

            await this.agent_subcro.destroy(
                {
                    where: {
                        "maincroSubcroId": maincroSubcroIds
                    }
                }
                , { transaction: t });


            const deletedRows = await this.maincro_subcro.destroy({
                where: {
                    "id": maincroSubcroIds
                }
            }, { transaction: t });

            await this.subcro.destroy({
                cascade: true,
                where: {
                    "id": ids
                }
            }, { transaction: t });

            await t.commit();
            await this.sequelize.close();

            return {
                statusCode: "OK",
                body: JSON.stringify({
                    message: 'Subcro(s) deleted'
                })
            };
        }
        catch (error) {
            await t.rollback();
            await this.sequelize.close();
            return {
                statusCode: "KO",
                body: JSON.stringify({
                    message: error.message
                })
            };
        }
    }
    async update(subcro) {
        const t = await this.sequelize.transaction();

        try {
            const res = await this.subcro.update(subcro, {
                where: {
                    id: subcro.id
                }
            }, { transaction: t });

            await this.maincro_subcro.destroy({
                where: {
                    "subcroId": subcro.id
                }
            }, { transaction: t })

            let maincroSubcro = [];
            if (subcro.maincroIds && subcro.maincroIds.length > 0) {
                subcro.maincroIds.forEach(maincroId => {
                    maincroSubcro.push({
                        maincroId: maincroId,
                        subcroId: subcro.id
                    });
                });
            }
            else {
                maincroSubcro.push({
                    maincroId: null,
                    subcroId: subcro.id
                });
            }

            await this.maincro_subcro.bulkCreate(maincroSubcro, { transaction: t });
            await t.commit();
            await this.sequelize.close();

            return {
                statusCode: "OK",
                body: JSON.stringify({
                    message: 'Subcro(s) updated'
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