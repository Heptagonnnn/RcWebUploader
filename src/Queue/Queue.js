export class Queue {
    constructor(options = {
        maxFileCounts: 0,
        maxSize: 0,
        type: '',
    }) {
        this.options = options;
        this.files = [];
        this.resultFiles = [];
    }

    beforeInputQueue(file) {
        return Promise.reject(file);
        // return new Promise(resolve => {
        //     setTimeout(() => {
        //         resolve(file);
        //     }, 2000);
        // })
    }

    inputQueue(files) {
        const beforeInputFiles = this.beforeInputQueue(files);

        beforeInputFiles.then(() => {
            !(files instanceof Array) && (files = [files]);
            this.files = files;
            this.grepQueue();
        }).catch(() => {
            this.trigger('Runtime', 'catchGlobalError', 'test');
        })
        /* inputAction */
    };


    grepQueue() {
        this.resultFiles = [...this.files];
        this.outputQueue();
    }

    outputQueue() {
        const beforeOutputQueue = this.beforeOutputQueue(files);

        beforeOutputQueue.then(() => {
            console.log(this.resultFiles);
            return [...this.resultFiles];
        })


    }

    beforeOutputQueue(files) {
        return Promise.resolve(files);
    }
}