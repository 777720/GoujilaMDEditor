import React from 'react'
import _ from 'lodash'
import PropTypes from 'prop-types'
import styles from '../../styles'
import icons from './icons.json'
import ToolBar from './components/ToolBar'
import HeaderPopup from './components/HeaderPopup';

const formatIcons = ['header', 'quote', 'blod', 'italic', 'code', 'link', 'ol', 'ul']

class Tools extends React.Component {
  header = (i) => {
    const levels = ['', '#', '##', '###']
    this.props.format(`${levels[i]} `, '')
  }
  quote = () => {
    this.props.format('> ', '')
  }
  blod = () => {
    this.props.format('**', '**')
  }
  italic = () => {
    this.props.format('*', '*')
  }
  code = () => {
    this.props.format('```\n', '\n```')
  }
  link = () => {
    this.props.format('[', ']()')
  }
  ol = () => {
    this.props.format('1. ', '')
  }
  ul = () => {
    this.props.format('- ', '')
  }
  render() {
    return (
      <div style={styles.tools}>
        {
          _.map(formatIcons, (icon) => {
            let popup
            let onClick
            if (icon === 'header') {
              popup = props =>
                (
                  <HeaderPopup
                    {...props}
                    onClick={this[icon]}
                  />
                )
            } else {
              onClick = this[icon]
            }
            return (
              <ToolBar
                key={icon}
                icon={icons[icon]}
                Popup={popup}
                onClick={onClick}
              />
            )
          })
        }
      </div>
    )
  }
}
Tools.propTypes = {
  format: PropTypes.func.isRequired,
}
export default Tools
