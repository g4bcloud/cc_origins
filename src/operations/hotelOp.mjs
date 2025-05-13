import { BaseOp } from './baseOp.mjs';

export class HotelOp extends BaseOp {
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

    // hotel must be something like that:
    //  {
    //     "emailAddress": "fguigui@gmail.com",
    //     "firstName": "Fred",
    //     "lastName": "GUIGUI",
    //     "agent_subcros": [
    //         {
    //             "maincroSubcroId": 11
    //         },
    //         {
    //             "maincroSubcroId": 10
    //         },
    //         {
    //             "maincroSubcroId": 9
    //         },
    //         {
    //             "maincroSubcroId": 8
    //         }
    //     ],
    //     "groupcroId": 2
    // }
    async onPost(response) {
        const hotel = this.getBody();
        let res = await this.service.create(hotel);

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