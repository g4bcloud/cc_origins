'use strict';

import { handler } from '../../src/index.mjs';
import { expect } from 'chai';
var context;

describe('Tests index', function () {
    it('verifies successful response', async () => {
        const event = {
            "resource": "/user/{operation}",
            "path": "/user/subcros",
            "httpMethod": "GET",
            "headers": {
                "Accept": "*/*",
                "Accept-Encoding": "gzip, deflate, br",
                "Cache-Control": "no-cache",
                "Host": "2fxmt427b4.execute-api.ap-southeast-1.amazonaws.com",
                "Postman-Token": "90085b69-2758-4e6e-875b-e0f34392c606",
                "User-Agent": "PostmanRuntime/7.43.3",
                "X-Amzn-Trace-Id": "Root=1-68029122-307e021228823f8d65c9148a",
                "X-Forwarded-For": "194.9.98.87",
                "X-Forwarded-Port": "443",
                "X-Forwarded-Proto": "https"
            },
            "multiValueHeaders": {
                "Accept": [
                    "*/*"
                ],
                "Accept-Encoding": [
                    "gzip, deflate, br"
                ],
                "Cache-Control": [
                    "no-cache"
                ],
                "Host": [
                    "2fxmt427b4.execute-api.ap-southeast-1.amazonaws.com"
                ],
                "Postman-Token": [
                    "90085b69-2758-4e6e-875b-e0f34392c606"
                ],
                "User-Agent": [
                    "PostmanRuntime/7.43.3"
                ],
                "X-Amzn-Trace-Id": [
                    "Root=1-68029122-307e021228823f8d65c9148a"
                ],
                "X-Forwarded-For": [
                    "194.9.98.87"
                ],
                "X-Forwarded-Port": [
                    "443"
                ],
                "X-Forwarded-Proto": [
                    "https"
                ]
            },
            "queryStringParameters": null,
            "multiValueQueryStringParameters": null,
            "pathParameters": {
                "operation": "subcros"
            },
            "stageVariables": null,
            "requestContext": {
                "resourceId": "j7fbud",
                "resourcePath": "/user/{operation}",
                "httpMethod": "GET",
                "extendedRequestId": "JOudfFiJyQ0EH-w=",
                "requestTime": "18/Apr/2025:17:51:30 +0000",
                "path": "/v0/user/subcros",
                "accountId": "491548784801",
                "protocol": "HTTP/1.1",
                "stage": "v0",
                "domainPrefix": "2fxmt427b4",
                "requestTimeEpoch": 1744998690770,
                "requestId": "40c2707e-630b-4cec-b6c6-2a63bde018eb",
                "identity": {
                    "cognitoIdentityPoolId": null,
                    "accountId": null,
                    "cognitoIdentityId": null,
                    "caller": null,
                    "sourceIp": "194.9.98.87",
                    "principalOrgId": null,
                    "accessKey": null,
                    "cognitoAuthenticationType": null,
                    "cognitoAuthenticationProvider": null,
                    "userArn": null,
                    "userAgent": "PostmanRuntime/7.43.3",
                    "user": null
                },
                "domainName": "2fxmt427b4.execute-api.ap-southeast-1.amazonaws.com",
                "deploymentId": "xdm3b6",
                "apiId": "2fxmt427b4"
            },
            "body": null,
            "isBase64Encoded": false
        }

        context =
        {
            "callbackWaitsForEmptyEventLoop": true,
            "functionVersion": "$LATEST",
            "functionName": "lambda_api_user_channels",
            "memoryLimitInMB": "128",
            "logGroupName": "/aws/lambda/lambda_api_user_channels",
            "logStreamName": "2025/04/18/[$LATEST]229beaf84ccd48918a1c74231aa845bc",
            "invokedFunctionArn": "arn:aws:lambda:ap-southeast-1:491548784801:function:lambda_api_user_channels",
            "awsRequestId": "b8193ce3-c7f1-4d43-ada0-8a087d9fd893"
        };

        const result = await handler(event, context)

        expect(result).to.be.an('object');
        expect(result.statusCode).to.equal(200);
        expect(result.body).to.be.an('string');

        let response = JSON.parse(result.body);

        expect(response).to.be.an('object');
    });
});
