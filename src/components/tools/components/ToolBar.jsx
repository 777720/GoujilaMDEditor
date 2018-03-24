import React from 'react'
import _ from 'lodash'
import PropTypes from 'prop-types'
import styles from '../../../styles'

class ToolBar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      hover: false,
    }
  }
  onHoverChange = hover => this.setState({ hover })

  render() {
    const { hover } = this.state
    const { icon, Popup, onClick } = this.props
    const { paths, transform, ...others } = icon
    return (
      <div
        aria-hidden
        style={styles.iconWrap}
        onClick={onClick}
        onMouseOver={() => this.onHoverChange(true)}
        onMouseOut={() => this.onHoverChange(false)}
      >
        <svg
          {...others}
          style={_.merge({}, styles.icon, hover && styles.iconHover)}
        >
          <g transform={transform}>
            {
              paths.map((p, i) => (
                <path key={i} d={p} />
              ))
            }
          </g>
        </svg>
        {Popup && <Popup hover={hover} />}
      </div>
    )
  }
}
ToolBar.propTypes = {
  icon: PropTypes.objectOf(PropTypes.any).isRequired,
  Popup: PropTypes.func,
  onClick: PropTypes.func,
}
export default ToolBar
