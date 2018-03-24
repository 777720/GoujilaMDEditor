import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import styles from './styles'
import EditBox from './components/EditBox'
import markedRenderFn from './utils/markFn'
import PreviewBox from './components/PreviewBox'
import Tools from './components/tools/Tools'
import './css/katex.min.css'
import 'github-markdown-css';

const Tabs = {
  edit: '编辑',
  preview: '预览',
}


class MDEditor extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      tab: props.tab,
      focus: false,
      selectedPosition: {
        start: 0,
        end: 0,
      },
      scale: 'normal',
    }
  }

  onTabChange = (k) => {
    this.setState({
      tab: k,
    })
  }
  setFocus = focus => this.setState({ focus })
  setSelectedPosition = selectedPosition => this.setState({ selectedPosition })

  format = (before, after) => {
    const { selectedPosition } = this.state
    const { value, onValueChange } = this.props
    let firstPart = value.substring(0, selectedPosition.start)
    const selectPart = value.substring(selectedPosition.start, selectedPosition.end)
    let lastPart = value.substring(selectedPosition.end)
    if (firstPart.substring(firstPart.length - before.length) === before &&
    lastPart.substring(0, after.length) === after) {
      firstPart = firstPart.substring(0, firstPart.length - before.length)
      lastPart = lastPart.substring(after.length)
    } else {
      firstPart += before
      lastPart = after + lastPart
    }
    onValueChange(firstPart + selectPart + lastPart)
    this.setSelectedPosition({
      start: firstPart.length,
      end: firstPart.length + selectPart.length,
    })
  }


  render() {
    const { onValueChange, value, markFn, minHeight } = this.props
    const { focus, selectedPosition, scale, tab } = this.state

    let editBoxStyle = minHeight ? { minHeight: `${minHeight}px` } : {}
    let previewBoxStyle = {}
    if (tab === 'edit' && scale === 'normal') {
      previewBoxStyle = { display: 'none' }
    }
    if (tab === 'edit' && scale === 'full') {
      editBoxStyle = { width: '50%' }
      previewBoxStyle = { position: 'absolute', width: '50%', left: '50%', top: 0 }
    }
    if (tab === 'preview') {
      editBoxStyle = { display: 'none' }
    }
    return (
      <div style={_.merge({}, styles.stage, styles[scale])}>
        <div style={styles.controlPanel}>
          <div style={styles.togglePanel}>
            {
              _.map(Tabs, (t, k) => (
                <span
                  aria-hidden
                  key={k}
                  style={_.merge({}, styles.toggleTab, tab === k && styles.selectedTab)}
                  onClick={() => this.onTabChange(k)}
                >
                  {t}
                </span>
              ))
            }
            <div style={{ flex: 1 }} />
            <Tools
              format={this.format}
            />
          </div>
        </div>
        <div style={styles.contentBox}>
          <EditBox
            value={value}
            onChange={onValueChange}
            focus={focus}
            onBlur={() => this.setFocus(false)}
            onFocus={() => this.setFocus(true)}
            style={editBoxStyle}
            selectedPosition={selectedPosition}
            setSelectedPosition={this.setSelectedPosition}
            format={this.format}
          />
          <PreviewBox
            html={markFn(value)}
            style={previewBoxStyle}
          />
        </div>
      </div>
    )
  }
}
MDEditor.defaultProps = {
  value: '',
  tab: Tabs.edit,
  markFn: markedRenderFn,
}
MDEditor.propTypes = {
  value: PropTypes.string.isRequired,
  tab: PropTypes.oneOf(_.keys(Tabs)).isRequired,
  onValueChange: PropTypes.func.isRequired,
  markFn: PropTypes.func,
  minHeight: PropTypes.number,
}
export default MDEditor
