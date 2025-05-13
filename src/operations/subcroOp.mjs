import { BaseOp } from "./baseOp.mjs";

export class SubcroOp extends BaseOp {
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
        const subcro = this.getBody();
        const res = await this.service.create(subcro);

        res.statusCode = res.statusCode == "OK" ? BaseOp.Constants.StatusCodes.OK : BaseOp.Constants.StatusCodes.INTERNAL_ERROR
        res["headers"] = this.getCors();

        return res;
    }

    async onPut() {
        const subcro = this.getBody();
        const res = await this.service.update(subcro);

        res.statusCode = res.statusCode == "OK" ? BaseOp.Constants.StatusCodes.OK : BaseOp.Constants.StatusCodes.INTERNAL_ERROR
        res["headers"] = this.getCors();

        return res;
    }
    async onDelete() {
        const body = this.getBody();
        const res = await this.service.delete(body.ids);

        res.statusCode = res.statusCode == "OK" ? BaseOp.Constants.StatusCodes.OK : BaseOp.Constants.StatusCodes.INTERNAL_ERROR
        res["headers"] = this.getCors();

        return res;
    }
}