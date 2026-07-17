import React from 'react'
import "./Legend.css"
import LegendItem from '../LegendItem/LegendItem'
import { useTranslation } from 'react-i18next';

const Legend = () => {
  const { t } = useTranslation();
  return (
    <div className="legend">
    <LegendItem color="legend-event" label={t('legend.eventDay')} />
    <LegendItem color="legend-selected" label={t('legend.selectedDay')} />
    <LegendItem color="legend-actual" label={t('legend.currentDay')} />
  </div>
  )
}

export default Legend
