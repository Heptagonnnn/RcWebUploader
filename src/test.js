import React from 'react';
import Mediator from "./mediator/Mediator";
import {addBtn} from "./dom/dom";
import {File} from "./file/file";
import {Queue} from "./Queue/Queue";


@Mediator
class TestClass {
    constructor(test) {
        this.test = test;
    }
}


export class TestComponent extends React.Component {
    render() {
        return (
            <div>
                <input type="file"  multiple="multiple" onChange={e => {
                    const src = e.target.files[0];
                    // const file = new File(src);
                    // file.makeChunks()
                    //     .then(e => {
                    //         console.log(e);
                    //     });
                    // console.log(file);
                    const queue = new Queue(src);
                    console.log(queue.filesExport());
                }}/>
            </div>
        )
    }
}