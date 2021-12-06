import {MiddlewareSequence, RequestContext} from '@loopback/rest';

export class MySequence extends MiddlewareSequence {
  log(msg: string) {
    console.log(msg);
  }
  async handle(context: RequestContext) {
    this.log('before request');
    await super.handle(context);
    this.log('after request');
  }
}
