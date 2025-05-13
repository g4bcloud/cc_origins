import { BaseOp } from './baseOp.mjs';

export class GroupCroOp extends BaseOp {
    constructor(request, service) {
        super(request);
        this.service = service;
    }
    async onGet(response) {
        const res = await this.service.get(this.getQueryParams());

        res.statusCode = res.statusCode == "OK" ? BaseOp.Constants.StatusCodes.OK : BaseOp.Constants.StatusCodes.INTERNAL_ERROR
        res["headers"] = this.getCors();

        return res;
    }

    // groupCro must be something like that:
    //  {
    //     "name": "Toto Group",
    //     "maincroIds": [8, 10, 11]
    // }
    async onPost(response) {
        const groupCro = this.getBody();
        let res = await this.service.create(groupCro);

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

    async onPut() {
        const body = this.getBody();
        let res = await this.service.update(body);

        res["statusCode"] = res.statusCode == "OK" ? BaseOp.Constants.StatusCodes.OK : BaseOp.Constants.StatusCodes.INTERNAL_ERROR;
        res["headers"] = this.getCors();

        return res;
    }
}