import React from 'react'
import "./LegendItem.css"

const LegendItem = ({ color, label }) => {
  return (
    <div className="legend-item">
      <div className={`legend-dot ${color}`}></div>
      <div className="legend-label">{label}</div>
    </div>
  )
}

export default LegendItem
