import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import styles from '../styles'

class EditBox extends React.Component {
  componentDidMount() {
    document.addEventListener('click', this.onBlur)
  }
  componentWillUnmount() {
    document.removeEventListener('click', this.onBlur)
  }
  onBlur = (e) => {
    if (e.target !== this.editarea) {
      this.props.onBlur()
    }
  }
  onSelect = () => {
    const el = this.editarea
    let start = 0
    let end = 0
    if (document.selection) {
      const range = document.selection.createRange()
      const drange = range.duplicate()
      drange.moveToElementText(el)
      drange.setEndPoint('EndToEnd', range)
      start = drange.text.length - range.text.length
      end = start + range.text.length
    } else if (window.getSelection) {
      start = el.selectionStart
      end = el.selectionEnd
    }
    this.props.setSelectedPosition({ start, end })
  }
  render() {
    const { value, style, onChange, focus, onFocus } = this.props
    return (
      <div style={_.merge({}, styles.editBox, style)}>
        <div style={{ display: 'flex', flex: '1' }}>
          <textarea
            ref={(t) => { this.editarea = t }}
            value={value}
            onFocus={onFocus}
            onBlur={this.onBlur}
            onSelect={this.onSelect}
            onChange={e => onChange(e.target.value)}
            style={_.merge({}, styles.editarea, focus && styles.editareaFocus)}
          />
        </div>
        <div style={_.merge({}, styles.editFooter, focus && styles.editFooterFocus)} />
      </div>
    )
  }
}
EditBox.defaultProps = {
  value: '',
}
EditBox.propTypes = {
  onChange: PropTypes.func.isRequired,
  style: PropTypes.objectOf(PropTypes.any),
  value: PropTypes.string.isRequired,
  onFocus: PropTypes.func.isRequired,
  focus: PropTypes.bool.isRequired,
  onBlur: PropTypes.func.isRequired,
  // selectedPosition: PropTypes.object.isRequired,
  setSelectedPosition: PropTypes.func.isRequired,
}
export default EditBox
