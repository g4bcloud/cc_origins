import { BaseService } from "./baseService.mjs";

export class HotelService extends BaseService {
    constructor(secrets, endPoint) {
        super(secrets, endPoint);
        this.hotel = this.baseModels.hotel;
        this.maincro = this.baseModels.maincro;
        this.subcro = this.baseModels.subcro;
        this.maincro_subcro = this.baseModels.maincro_subcro;
    }

    async get(params) {
        try {
            let query = {
                include: [
                    {
                        model: this.maincro_subcro,
                        as: "maincroSubcro",
                        include: [
                            {
                                model: this.maincro,
                                as: "maincro"
                            },
                            {
                                model: this.subcro,
                                as: "subcro"
                            }
                        ]
                    }
                ]
            };

            const q = super.getQuery(query, params);

            const count = await this.hotel.count(q.countQuery);
            const res = await this.hotel.findAll(q.query);
            await this.sequelize.close();

            let hotels = [];

            res.forEach(h => {
                hotels.push({
                    id: h.dataValues.id,
                    codeHotel: h.dataValues.codeHotel,
                    subcro: {
                        maincroSubcroId: h.dataValues.maincroSubcro.id,
                        maincro: h?.dataValues?.maincroSubcro?.maincro?.dataValues?.maincro ? h.dataValues.maincroSubcro.maincro.dataValues.maincro : null,
                        subcro: h.dataValues.maincroSubcro.subcro.dataValues.subcro
                    }
                })
            });

            return {
                statusCode: "OK",
                body: JSON.stringify({
                    hotels: hotels,
                    count: count
                }),
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

    async create(hotel) {
        const t = await this.sequelize.transaction();

        try {
            const ag = await this.hotel.create(hotel, { transaction: t });

            await t.commit();
            await this.sequelize.close();

            return {
                statusCode: "OK",
                body: JSON.stringify({
                    message: 'Hotel created'
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
                    message: "no agent id(s) provided"
                })
            };
        }

        const t = await this.sequelize.transaction();

        try {

            await this.hotel.destroy({
                where: {
                    "id": ids
                }
            }, { transaction: t });

            await t.commit();
            await this.sequelize.close();

            return {
                statusCode: "OK",
                body: JSON.stringify({
                    message: 'Hotel(s) deleted'
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
    async update(hotel) {
        const t = await this.sequelize.transaction();

        try {
            const res = await this.hotel.update(hotel, {
                where: {
                    id: hotel.id
                }
            }, { transaction: t });

            await t.commit();
            await this.sequelize.close();
            return {
                statusCode: "OK",
                body: JSON.stringify({
                    message: 'Hotel(s) updated'
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