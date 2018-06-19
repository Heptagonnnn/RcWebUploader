import {Commander} from "../Commander/Commander";
import {Queue} from "../Queue/Queue";


/*
module只支持4种 View， Queue， File， Request
除非有特殊需求，不然推荐默认Commander，否则稳定性不做保证
 */

export class Uploader {
    constructor(options, Commander = Commander) {
        this.options = options;
        this.Commander = Commander;
    }

    init() {
        this.commander = new this.Commander();
        this.commander.setModule('Queue', new Queue());
    }


    addView(viewName, module) {
        this.commander.addView(viewName, module);
    }

    setView(viewName, module) {
        this.commander.setView(viewName, module);
    }

    deleteView(viewName) {
        this.commander.deleteView(viewName);
    }

    setModule(moduleName, module) {
        this.commander.setModule(moduleName, module);
    }

    deleteModule(moduleName) {
        this.commander.deleteModule(moduleName);
    }

    trigger(funcPath, ...args) {
        this.commander.trigger(funcPath, ...args);
    }
}