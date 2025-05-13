// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import { ApiRequest } from './apiRequest.mjs';

export const handler = async (event, context) => {
  try {
    console.log(`
      event = ${JSON.stringify(event, null, 2)}
      context = ${JSON.stringify(context, null, 2)}`);

    const request = await ApiRequest.create(event, context);
    const processor = request.getProcessor();

    console.log(`processing ${processor.constructor.name}.${request.method} request`);
    switch (request.method) {
      case 'OPTIONS':
        return processor.onOptions().catch(e =>
          processor.onError(e));
      case 'GET':
        return processor.onGet().catch(e =>
          processor.onError(e));
      case 'POST':
        return processor.onPost().catch(e =>
          processor.onError(e));
      case 'DELETE':
        return processor.onDelete().catch(e =>
          processor.onError(e));
      case 'PUT':
        return processor.onPut().catch(e =>
          processor.onError(e));
      case 'PATCH':
        return processor.onPatch().catch(e =>
          processor.onError(e));
      default:
        throw new Error(`${request.method} not supported`);
    }
  } catch (e) {
    console.error(`fatal: exports.onRequest = ${e.message} ${e.stack}`);
    throw e;
  }
};
