import React from 'react';

import ReactDOM from 'react-dom';

export function addBtn(Btn) {
    console.log(Btn.props.onClick);
    return class extends React.Component {
        render() {
            let c = Btn.props.onClick;
            c(1);
            console.log(c);
            c = () => {
                console.log(12312313);
            };
            c();
            console.log(c);
            const type = typeof Btn;
            return (
                <React.Fragment>
                    {/*<Btn/>*/}
                    {
                        type === 'object' ? Btn : <Btn/>
                    }
                    <input type="file"
                           style={{visibility: 'hidden', display: 'inline-block', width: 0, height: 0}}
                           onChange={(e) => {
                               console.log(e);
                           }}/>
                </React.Fragment>
            )
        }
    }
}


//
// export class TestButton extends React.Component {
//     render () {
//         return  (
//             <div>
//                 <button>
//                   12312321
//                 </button>
//                 <input  style={{visibility: 'hidden', display:'inline-block', width: 0, height: 0}} type="file" onChange={(e) => {console.log(e)}}/>
//
//                 {/*<label style={{display:'inline-block', width: 0, height: 0}}>*/}
//                 {/*</label>*/}
//                 {/*<button>123123</button>*/}
//             </div>
//         )
//     }
// }