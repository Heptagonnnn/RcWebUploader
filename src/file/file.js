import {DEFAULT_FILE_OPTIONS, UPLOAD_STATUS} from "../constant/UploadStatusConstant";
import SparkMD5 from "../util/md5";


export class File {
    constructor(source, options) {
        this.source = source;
        this.options = {...DEFAULT_FILE_OPTIONS, ...options};



        // todo localstorage检测决定初始状态，暂无

        this.stataus = UPLOAD_STATUS.PENDING;
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

    }
}