


export const DEFAULT_FILE_OPTIONS = {
    chunk: true,
    chunkSize: 2 * 1024 * 1024,
    md5: true
};


export const UPLOAD_STATUS = {
    PENDING: 0,
    CHUNKING: 1,
    CHUNKED: 2,
    UPLOADING: 3,
    FINISH: 4,
    FAILED: 5
};