import {DEFAULT_FILE_OPTIONS, UPLOAD_STATUS} from "../constant/UploadStatusConstant";
import SparkMD5 from "../util/md5";


class FileChunk {
    constructor(source, md5, status) {
        this.source = source;
        this.md5 = md5;

        // 同file
        this.status = UPLOAD_STATUS.PENDING;

    }
}

export class File {
    constructor(source, options) {
        this.source = source;
        this.options = {...DEFAULT_FILE_OPTIONS, ...options};

        !this.options.chunk && (this.options.chunkSize = this.source.size);

        // todo localstorage检测决定初始状态，暂无

        this.stataus = UPLOAD_STATUS.PENDING;

        //分片后的队列
        this.pending = [];
        //
        // const tmp = new FileReader();
        //
        // tmp.readAsArrayBuffer(source);
        // console.log(tmp);
        // const spark = new SparkMD5.ArrayBuffer();
        // spark.append(tmp);
        // console.log(spark.end());
    }


    makeChunks() {
        const _this = this;
        const fr = new FileReader();
        const spark = new SparkMD5.ArrayBuffer();

        const blob = this.source;
        console.log(this.options);
        const {chunk, chunkSize} = this.options;

        console.log(chunkSize);
        let start = 0, end, chunkCount, currentChunk = 0;

        chunkCount = Math.ceil(blob.size / chunkSize);

        // fr.readAsArrayBuffer(blob);
        //
        // spark.append(fr);
        // this.md5 = spark.end();
        // if (!chunk) {
        //     return null;
        // }

        function loadNext() {
            start = currentChunk * chunkSize;
            end = Math.min(start + chunkSize, blob.size);

            fr.onload = function(e) {
                console.log(1);
                spark.append(e.target.result);
                console.log(spark);
            };


            fr.onloadend = function(e) {
                fr.onloadend = fr.onload = null;
                if (++currentChunk < chunkCount) {
                    setTimeout(loadNext, 1);
                } else {
                    setTimeout(function() {
                        _this.md5 = spark.end();
                    })
                }
            };

            fr.readAsArrayBuffer(blob.slice(start, end));
        }
        loadNext();
    }
}