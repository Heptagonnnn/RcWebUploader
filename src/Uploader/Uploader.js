import {Commander} from "../Commander/Commander";
import {Queue} from "../Queue/Queue";
import {QueueBox} from "../Queue/QueueBox";


/*
module只支持4种 View， Queue， File， Request
除非有特殊需求，不然推荐默认Commander，否则稳定性不做保证
 */

export class Uploader {
    constructor(options, Commander = Commander) {
        this.options = options;
        this.Commander = Commander;
        this.init();
    }

    init() {
        this.commander = new this.Commander();
        this.commander.inject('Queue', QueueBox);
        new QueueBox().init();
    }
    trigger = (funcPath, ...args) => {
        return this.commander.trigger()(funcPath, ...args);
    }
}