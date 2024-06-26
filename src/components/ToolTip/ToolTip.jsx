import React from 'react'
import "./ToolTip.css"
const ToolTip = ({content, specificClass}) => {
  return (
    <span className={`base-tooltip ${specificClass}`}>
      {content}
    </span>
  )
}

export default ToolTip
