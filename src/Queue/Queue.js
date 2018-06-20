export class Queue {
    constructor(options = {
        maxFileCounts: 0,
        maxSize: 0,
        type: '',
    }) {


        // if (!(files instanceof Array)) {
        //     files = [files];
        // }
        // options.maxFileCounts < 0 && (options.maxFileCounts = 0);
        // options.maxSize < 0 && (options.maxSize = 0);
        this.options = options;
    }
    //
    // registerAll = () => {
    //     this.register('addFile', (files) => {
    //         this.filesInput(files);
    //         this.filesGrep();
    //     })
    // };


    fileInput = (files) => {
        !(files instanceof Array) && (files = [files]);

        this.files = files;
    };

    fileGrep = () => {

        let counter = 0;

        const {maxSize, maxFileCounts, type} = this.options;

        this.resultFiles = this.files.filter((file) => {
            let maxSizeValid = true;
            let typeValid = true;


            // 文件数量校验
            if (maxFileCounts > 0 && counter === maxFileCounts) {
                return false;
            }

            // 文件大小校验
            if (maxSize > 0 && file.size > maxSize) {
                maxSizeValid = false;
            }
            return maxSizeValid && typeValid;

        });
    };


    fileOutput = () => {
        return [...this.resultFiles];
    }
}