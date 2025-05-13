// src/operations/baseOp.mjs
import { Sequelize } from 'sequelize';
import config from "../db.config.json" assert { "type": "json" };
import { initModels } from "../models/init-models.js";

export class BaseOp {
    static Constants = {
        AllowMethods: [
            'POST',
            'PUT',
            'PATCH',
            'GET',
            'DELETE',
            'OPTIONS',
        ],
        AllowHeaders: [
            'Authorization',
            'Host',
            'Content-Type',
            'X-Amz-Date',
            'X-Api-Key',
            'X-Amz-Security-Token',
            'x-amz-content-sha256',
            'x-amz-user-agent',
        ],
        StatusCodes: {
            OK: 200,
            CREATED: 201,
            BAD_REQUEST: 400,
            UNAUTHORIZED: 401,
            FORBIDDEN: 403,
            NOT_FOUND: 404,
            METHOD_NOT_ALLOWED: 405,
            INTERNAL_ERROR: 500
        }
    };

    constructor(request) {
        this.$request = request;
        this.$responseData = null;
        this.$methodHandlers = {
            'GET': this.onGet.bind(this),
            'POST': this.onPost.bind(this),
            'PUT': this.onPut.bind(this),
            'PATCH': this.onPatch.bind(this),
            'DELETE': this.onDelete.bind(this),
            'OPTIONS': this.onOptions.bind(this)
        };

    }

    getCors(data) {
        const h0 = this.request.headers;
        return {
            'Content-Type': (typeof data === 'string')
                ? 'text/plain'
                : 'application/json',
            'Access-Control-Allow-Methods': BaseOp.Constants.AllowMethods.join(', '),
            'Access-Control-Allow-Headers': BaseOp.Constants.AllowHeaders.join(', '),
            'Access-Control-Allow-Origin': h0.Origin || h0.origin || h0['X-Forwarded-For'] || '*',
            'Access-Control-Allow-Credentials': 'true',
        };
    }


    get request() {
        return this.$request;
    }

    get responseData() {
        return this.$responseData;
    }
    get queryStringParameters() {
        return this.request.queryStringParameters;
    }

    set responseData(val) {
        this.$responseData = val;
    }

    async onOptions() {
        return {
            statusCode: BaseOp.Constants.StatusCodes.OK,
            headers: this.getCors(),
            body: ''
        };
    }

    async onGet(response) {
        return this.onSucceed(response);
    }

    async onPut(response) {
        return this.onSucceed(response);
    }

    async onPatch(response) {
        return this.onSucceed(response);
    }

    async onPost(response) {
        return this.onSucceed(response);
    }

    async onDelete(response) {
        return this.onSucceed(response);
    }

    onMethodNotAllowed() {
        return {
            statusCode: BaseOp.Constants.StatusCodes.METHOD_NOT_ALLOWED,
            headers: this.getCors(),
            body: JSON.stringify({
                errorCode: BaseOp.Constants.StatusCodes.METHOD_NOT_ALLOWED,
                errorMessage: `Method ${this.request.method} not allowed`
            })
        };
    }

    onSucceed(payload, statusCode = BaseOp.Constants.StatusCodes.OK) {
        return {
            statusCode,
            headers: this.getCors(payload),
            body: this._formatResponse(payload)
        };
    }

    onError(e) {
        const payload = {
            errorCode: e.statusCode || BaseOp.Constants.StatusCodes.INTERNAL_ERROR,
            errorMessage: `${this.request.method} ${this.request.path} - ${e.code || e.message || 'unknown error'}`
        };

        console.error(JSON.stringify({
            error: payload,
            stack: e.stack
        }, null, 2));

        return {
            statusCode: payload.errorCode,
            headers: this.getCors(payload),
            body: JSON.stringify(payload)
        };
    }

    _formatResponse(payload) {
        if (payload === null || payload === undefined) return '';
        if (typeof payload === 'string') return payload;
        return JSON.stringify(payload);
    }

    // Utility methods
    getQueryParams() {
        if (this.request.query) return this.request.query;
        return this.queryStringParameters;
    }

    getQueryParam(name) {
        if (this.request.query) return this.request.query?.[name];
        return this.queryStringParameters?.[name];
    }

    getHeader(name) {
        return this.request.headers?.[name];
    }

    getBody() {
        try {
            if (!this.request.body) return null;

            if (typeof this.request.body === 'object') {
                return this.request.body;
            }

            if (typeof this.request.body === 'string') {
                return JSON.parse(this.request.body);
            }
        } catch (e) {
            throw new Error('Invalid JSON body');
        }
    }

    validateRequired(params, requiredFields) {
        const missing = requiredFields.filter(field => !params[field]);
        if (missing.length > 0) {
            throw new Error(`Missing required fields: ${missing.join(', ')}`);
        }
    }

}