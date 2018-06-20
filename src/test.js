import React from 'react';
import Mediator from "./mediator/Mediator";
import {Uploader} from "./Uploader/Uploader";


@Mediator
class TestClass {
    constructor(test) {
        this.test = test;
    }
}


export class TestComponent extends React.Component {
    render() {
        const test = new Uploader();
        test.init();
        return (
            <div>
                <input type="file"  multiple="multiple" onChange={e => {
                    const src = e.target.files[0];
                    const uploader = new Uploader();
                    uploader.init();
                    uploader.trigger('Queue.addFile', src);
                    console.log(uploader.trigger('Queue.outputFile'));
                }}/>
            </div>
        )
    }
}