import React from 'react';
import Mediator from "./mediator/Mediator";
import {addBtn} from "./dom/dom";
import {File} from "./file/file";


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
                <input type="file" onChange={e => {
                    const src = e.target.files[0];
                    const file = new File(src);
                    console.log(file);
                }}/>
            </div>
        )
    }
}