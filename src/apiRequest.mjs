import { HotelOp } from './operations/hotelOp.mjs';
import { AgentOp } from './operations/agentOp.mjs';
import { SubcroOp } from './operations/subcroOp.mjs';
import { MaincroOp } from './operations/maincroOp.mjs';
import { AgentService } from './services/agentService.mjs'
import { HotelService } from './services/hotelService.mjs';
import { SubcroService } from './services/subcroService.mjs';
import { MaincroService } from './services/maincroService.mjs';
import { GroupCroService } from './services/groupCroService.mjs';
import { GroupCroOp } from './operations/groupCroOp.mjs';
import {
    SecretsManagerClient,
    GetSecretValueCommand,
} from "@aws-sdk/client-secrets-manager";

export class ApiRequest {
    constructor(event, context, data) {
        this.$context = context;
        this.$event = event;
        this.operation = event.path.substring(event.path.lastIndexOf("/") + 1);
        this.secrets = data;

        this.endPoint = process.env.USER_PSQL_ENDPOINT;

        const role = this.headers["role"];

        if (role == "admin") {
            this.endPoint = process.env.ADMIN_PSQL_ENDPOINT;
        }

        console.log(`Using endpoint: ${this.endPoint}`);
    }

    static async create(event, context) {
        const data = await ApiRequest.getSecrets();
        return new ApiRequest(event, context, data);
    }

    getQueryParam(name) {
        return this.queryParams?.[name];
    }

    getHeader(name) {
        return this.headers?.[name];
    }

    getBody() {
        if (this.$event.body) {
            try {
                return JSON.parse(this.$event.body);
            } catch (e) {
                return this.$event.body;
            }
        }
        return null;
    }

    getProcessor() {
        console.log(`Creating processor for operation: ${this.operation} with endpoint: ${this.endPoint}`);

        switch (this.operation) {
            case "hotels":
                return new HotelOp(this.$event, new HotelService(this.secrets, this.endPoint));
            case "agents":
                return new AgentOp(this.$event, new AgentService(this.secrets, this.endPoint));
            case "subcros":
                return new SubcroOp(this.$event, new SubcroService(this.secrets, this.endPoint));
            case "maincros":
                return new MaincroOp(this.$event, new MaincroService(this.secrets, this.endPoint));
            case "groupCros":
                return new GroupCroOp(this.$event, new GroupCroService(this.secrets, this.endPoint));
            default:
                throw new Error(`operation '${(this.pathParameters || {}).operation}' not supported`);
        }
    }

    get event() {
        return this.$event;
    }

    get context() {
        return this.$context;
    }

    get method() {
        return this.event.httpMethod;
    }

    get path() {
        return this.event.path;
    }

    get headers() {
        return this.event.headers || {};
    }

    get queryString() {
        return this.event.queryStringParameters;
    }

    get pathParameters() {
        return this.event.pathParameters;
    }

    get body() {
        if (this.$event.body) {
            try {
                return JSON.parse(this.$event.body);
            } catch (e) {
                return this.$event.body;
            }
        }
        return null;
    }

    static staticSecrets = null;

    static async getSecrets() {
        console.log(`ApiRequest.staticSecrets ======> ${ApiRequest.staticSecrets == null}`)
        if (!ApiRequest.staticSecrets) {
            try {
                const client = new SecretsManagerClient();
                const command = new GetSecretValueCommand({
                    SecretId: process.env.SECRET_ID,
                });
                console.log(`Fetching secrets from ${process.env.SECRET_ID}`);
                const api = await client.send(command);

                const apiParams = JSON.parse(api.SecretString);

                ApiRequest.staticSecrets = {
                    username: apiParams["username"],
                    password: apiParams["password"]
                };
                console.log("Successfully retrieved secrets");
            } catch (error) {
                console.error(`Error retrieving secrets: ${error.message}`);
                throw error;
            }
        }

        return ApiRequest.staticSecrets;
    }
}