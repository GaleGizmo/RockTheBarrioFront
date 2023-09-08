import React from 'react'
import "./Legend.css"
import LegendItem from '../LegendItem/LegendItem'

const Legend = () => {
  return (
    <div className="legend">
    <LegendItem color="legend-event" label="Día con evento(s)" />
    <LegendItem color="legend-selected" label="Día seleccionado" />
    <LegendItem color="legend-actual" label="Día actual" />
  </div>
  )
}

export default Legend
