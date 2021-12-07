// import {MiddlewareSequence, RequestContext} from '@loopback/rest';

import {DefaultSequence, RequestContext} from '@loopback/rest';
require('dotenv').config();
// export class MySequence extends MiddlewareSequence {
//   log(msg: string) {
//     console.log(msg);
//   }
//   async handle(context: RequestContext) {
//     const {request, response} = context;
//     console.log('request data:--->', request.socket.remoteAddress);
//     // console.log('request data:--->', request);
//     this.log('before request');
//     await super.handle(context);
//     this.log('after request');
//   }
// }
export class MySequence extends DefaultSequence {
  async handle(context: RequestContext) {
    try {
      // Invoke registered Express middleware
      const finished = await this.invokeMiddleware(context);
      if (finished) {
        // The response been produced by the middleware chain
        return;
      }
      // console.log('request origin:--->>', context.request.headers);
      console.log('request origin:--->>', context.request.headers.host);
      console.log('request user-agent:--->>', context.request.headers['user-agent']);
      console.log('request ip Address:--->>', context.request.socket.remoteAddress);
      console.log('request referer:--->>', context.request.headers.referer);
      console.log('env variable :---->>', process.env.ALLOWED_ORIGIN);
      if (process.env.ALLOWED_ORIGIN == context.request.headers.referer) {
        throw new Error('invalid input');
      }
      // findRoute() produces an element
      const route = this.findRoute(context.request);
      // parseParams() uses the route element and produces the params element
      const params = await this.parseParams(context.request, route);
      // invoke() uses both the route and params elements to produce the result (OperationRetVal) element
      const result = await this.invoke(route, params);
      // send() uses the result element
      this.send(context.response, result);
    } catch (error) {
      this.reject(context, error);
    }
  }
}
