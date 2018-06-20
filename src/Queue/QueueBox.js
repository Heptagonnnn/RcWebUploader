import {Queue} from "./Queue";

export class QueueBox {
    init(options) {
        this.queue = new Queue(options);
        this.registerAll();
    }

    registerAll = () => {
        this.register('addFile', (files) => {
            this.queue.fileInput(files);
            this.queue.fileGrep();
            return this.trigger('Queue.outputFile');
        });
        this.register('outputFile', () => {
            return this.queue.fileOutput();
        })
    }
}