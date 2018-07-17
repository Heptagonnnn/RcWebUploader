/*
module只支持4种 View， Queue， File， Request
除非有特殊需求，不然推荐默认Commander，否则稳定性不做保证
 */

import {Queue} from "../Queue/Queue";
import Runtime from "../Runtime";

export class Uploader {
  constructor() {
    this.__Runtime = new Runtime();
    this.__Queue = new Queue();
    this.__Runtime.mountModule(this.__Queue);
  }


  setModuleMethod(moduleName, methodName, method) {
    this.__Runtime.setModuleMethod(moduleName, methodName, method);
  }
}