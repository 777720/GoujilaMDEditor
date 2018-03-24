import React from 'react'
import _ from 'lodash'
import PropTypes from 'prop-types'
import styles from '../../../styles'

class HeaderPopup extends React.Component {
  render() {
    const { hover, onClick } = this.props
    return (
      <div style={_.merge({}, styles.headerPopup, hover && styles.headerPopupHover)}>
        <div
          aria-hidden
          style={{ fontSize: '1.8em', padding: '4px 3px', cursor: 'pointer' }}
          onClick={e => onClick(1)}
        >
          标题1
        </div>
        <div
          aria-hidden
          style={{ fontSize: '1.5em', padding: '4px 3px', cursor: 'pointer' }}
          onClick={e => onClick(2)}
        >
          标题2
        </div>
        <div
          aria-hidden
          style={{ fontSize: '1.3em', padding: '4px 3px', cursor: 'pointer' }}
          onClick={e => onClick(3)}
        >
          标题3
        </div>
      </div>
    )
  }
}
HeaderPopup.propTypes = {
  hover: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
}

export default HeaderPopup
