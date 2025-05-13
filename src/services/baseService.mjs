import { Sequelize } from 'sequelize';
import config from "../db.config.json" assert { "type": "json" };
import certs from "../file/certs.json" assert { "type": "json" };
import { initModels } from "../models/init-models.js";

export class BaseService {
    constructor(secrets, endPoint) {
        const region = process.env.AWS_REGION || process.env.AWS_DEFAULT_REGION;
        const cert = certs[region];
        config.dialectOptions["ssl"]["ca"] = cert;
        console.log(`config =======> ${JSON.stringify({
            dialect: config.dialect,
            host: process.env.ADMIN_PSQL_ENDPOINT,
            port: config.port,
            username: secrets.username,
            password: secrets.password,
            database: config.database,
            logging: console.log,
            pool: config.pool,
            dialectOptions: config.dialectOptions,
            retry: config.retry
        })}`)

        this.sequelize = new Sequelize({
            dialect: config.dialect,
            host: process.env.ADMIN_PSQL_ENDPOINT,
            port: config.port,
            username: secrets.username,
            password: secrets.password,
            database: config.database,
            logging: console.log,
            pool: config.pool,
            dialectOptions: config.dialectOptions,
            retry: config.retry
        });

        this.baseModels = initModels(this.sequelize);
    }

    async getAll() {

    }
    async get(id) {

    }
    async getByKey(key) {

    }
    async create(entity) {

    }
    async delete(id) {

    }

    getQuery(query, params) {
        let q = {};
        let qCount = {};

        if (query) {
            q = qCount = query;
        }
        let pageNumber = 1;
        let pageSize = 20;

        if (!params) {
            params = {};
        }

        Object.keys(params).forEach(param => {
            switch (param) {
                case "pageSize":
                    if (params[param] && params[param].length > 0) {
                        pageSize = parseInt(params[param]);
                    }
                    break;
                case "pageNumber":
                    if (params[param] && params[param].length > 0) {
                        pageNumber = parseInt(params[param]);
                    }
                    break;
                case "sort":
                    if (params[param]) {
                        q["order"] = [
                            [params[param]]
                        ];
                    }
                    break;
                case "sense":
                    break;
                default:
                    if (params[param] && params[param].length > 0) {
                        if (!q["where"]) q["where"] = {};
                        if (!qCount["where"]) qCount["where"] = {};
                        q["where"][param] = params[param];
                        qCount["where"][param] = params[param];
                    }
                    else {
                        if (!q["where"]) q["where"] = {};
                        if (!qCount["where"]) qCount["where"] = {};
                        q["where"][param] = null;
                        qCount["where"][param] = null;
                    }
                    break;
            }
        });

        if (q["order"] && q["order"].length > 0) {
            if (params["sense"]) {
                q["order"][0].push(params["sense"]);
            }
            else {
                q["order"][0].push("ASC");
            }
        }

        q["offset"] = (pageNumber - 1) * pageSize;
        q["limit"] = pageSize;

        qCount["col"] = "id";
        qCount["distinct"] = true;


        return {
            query: q,
            countQuery: qCount
        };

    }

    getErrorMessage(error) {

        if (error?.errors && error.errors.length > 0) {
            let message = "";
            error.errors.forEach(e => {
                message += e.message + "\n";
            });
            return message;
        }

        if (error?.message) {
            return error.message;
        }

        return "Unknown error";
    }

}