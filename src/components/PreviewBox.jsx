import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import styles from '../styles'

const PreviewBox = ({ style, html }) => (
  <div style={_.merge({}, styles.previewBox, style)}>
    <div className="markdown-body">
      <div
        style={styles.preview}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  </div>
)


PreviewBox.propTypes = {
  html: PropTypes.string.isRequired,
  style: PropTypes.objectOf(PropTypes.any),
}
export default PreviewBox
