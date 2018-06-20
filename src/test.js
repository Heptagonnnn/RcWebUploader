import React from 'react';
import {Uploader} from "./Uploader/Uploader";




export class TestComponent extends React.Component {
    render() {
        const uploader = new Uploader();
        return (
            <div>
                <input type="file" multiple="multiple" onChange={e => {
                    const src = e.target.files[0];
                    const rst = uploader.trigger('Queue.addFile', src);
                    console.log(rst);
                }}/>
            </div>
        )
    }
}