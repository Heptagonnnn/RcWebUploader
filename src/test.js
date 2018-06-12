import React from 'react';
import Mediator from "./mediator/Mediator";




@Mediator
class TestClass {
    constructor(test) {
        this.test = test;
    }
}


export class TestComponent extends React.Component {
    render() {

        const foo = new TestClass(1230);
        foo.once('test1', () => {
            console.log(2);
        });

        foo.on('test', function() {console.log(1)});


        foo.trigger('test');
        // foo.off('test');
        // console.log(foo);

        // foo.trigger('test1');
        console.log(foo);
        return (
            <div>test</div>
        )
    }
}