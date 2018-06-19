import {DEFAULT_FILE_OPTIONS, UPLOAD_STATUS} from "../constant/UploadStatusConstant";
import SparkMD5 from "../util/md5";


class FileChunk {
    constructor(source, md5, status) {
        console.log(source);
        this.source = source;
        this.md5 = md5;

        // 同file
        this.status = status || UPLOAD_STATUS.PENDING;

    }
}

export class File {

    constructor(source, options) {
        this.source = source || {};
        this.options = {...DEFAULT_FILE_OPTIONS, ...options};

        !this.options.chunk && (this.options.chunkSize = this.source.size);

        // todo localstorage检测决定初始状态，暂无

        this.source.status = UPLOAD_STATUS.PENDING;

        //分片后的队列
        this.chunkArray = [];
    }

    //todo 利用缓存做检测 checkChunks() {}

    async makeChunks() {
        console.time('start');
        const _this = this;
        const fr = new FileReader();
        const spark = new SparkMD5.ArrayBuffer();
        const allSpark = new SparkMD5.ArrayBuffer();

        const blob = this.source;
        console.log(this.options);
        const {chunk, chunkSize} = this.options;

        let start = 0, end, chunkCount, currentChunk = 0;

        chunkCount = Math.ceil(blob.size / chunkSize);

        function loadNext(resolve, reject) {
            start = currentChunk * chunkSize;
            end = Math.min(start + chunkSize, blob.size);
            _this.source.status = 1;
            fr.onload = function (e) {
                spark.append(e.target.result);
                allSpark.append(e.target.result);
                _this.chunkArray.push(new FileChunk(e.target.result, spark.end(), 2));
            };

            fr.onerror = function (e) {
                reject(e);
            };


            fr.onloadend = function (e) {
                fr.onloadend = fr.onload = null;
                if (++currentChunk < chunkCount) {
                    loadNext(resolve, reject);
                } else {
                    _this.source.status = 2;
                    _this.source.md5 = allSpark.end();
                    console.timeEnd('start');
                    resolve(_this);
                }
            };

            fr.readAsArrayBuffer(blob.slice(start, end));
        }

        return await new Promise((resolve, reject) => {
            loadNext(resolve, reject);
        });
    }
}