import React from 'react'
import MDEditor from '../../src/MDEditor'
import markedRenderFn from '../../src/utils/markFn'

class EditorApp extends React.Component {
  state = {
    value: '123',
  }
  onMDValueChange = (value) => {
    this.setState({
      value,
    })
  }
  render() {
    const { value } = this.state
    return (
      <div>
        <MDEditor
          value={value}
          tab="edit"
          onValueChange={this.onMDValueChange}
          minHeight={400}
        />
        <div dangerouslySetInnerHTML={{ __html: markedRenderFn(value) }} />
      </div>
    )
  }
}
export default EditorApp
