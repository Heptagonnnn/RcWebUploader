




export class Queue {
    constructor(files = [], options = {
        length: 0,
        maxSize: 0
    }) {
        this.files = files;
        this.options = options;
    }

    filesGrep = () => {
        console.log(this.files);
    };

    filesExport = () => {
        return [...this.result_files];
    }
}