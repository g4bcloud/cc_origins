import { BaseOp } from "./baseOp.mjs";

export class MaincroOp extends BaseOp {
    constructor(request, service) {
        super(request);
        this.service = service;
    }

    async onGet() {
        const res = await this.service.get(this.getQueryParams());

        res.statusCode = res.statusCode == "OK" ? BaseOp.Constants.StatusCodes.OK : BaseOp.Constants.StatusCodes.INTERNAL_ERROR
        res["headers"] = this.getCors();

        return res;
    }

    async onPost() {
        const body = this.getBody();
        const res = await this.service.create(body);

        res.statusCode = res.statusCode == "OK" ? BaseOp.Constants.StatusCodes.OK : BaseOp.Constants.StatusCodes.INTERNAL_ERROR
        res["headers"] = this.getCors();

        return res;
    }

    async onPut() {
        const body = this.getBody();
        const res = await this.service.update(body);

        res.statusCode = res.statusCode == "OK" ? BaseOp.Constants.StatusCodes.OK : BaseOp.Constants.StatusCodes.INTERNAL_ERROR
        res["headers"] = this.getCors();

        return res;
    }

    async onDelete() {
        const body = this.getBody();
        let res = await this.service.delete(body.ids);

        res["statusCode"] = res.statusCode == "OK" ? BaseOp.Constants.StatusCodes.OK : BaseOp.Constants.StatusCodes.INTERNAL_ERROR;
        res["headers"] = this.getCors();

        return res;

    }
}