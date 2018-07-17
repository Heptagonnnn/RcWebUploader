import React from 'react';
import RcUploader from "./rc-uploader";


export class TestComponent extends React.Component {
  render() {
    const uploader = new RcUploader();
    return (
      <div>
        <input type="file" multiple="multiple" onChange={e => {
          const src = e.target.files[0];
          uploader.__Runtime.trigger('Queue', 'inputQueue', src);
        }}/>
      </div>
    )
  }
}