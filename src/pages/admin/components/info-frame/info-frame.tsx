import React, { FC } from 'react'
import './info-frame.scss'

interface InfoFrameProps {
  title: string
  Icon: any
  value: string
}

export const InfoFrame: FC<InfoFrameProps> = ({ title, Icon, value }) => (
  <div className="info-frame">
    <div className="info-frame__left">
      <div className="info-frame__value">{value}</div>
      <div className="info-frame__title">{title}</div>
    </div>
    <div className="info-frame__right">
      <Icon width={40} height={40} />
    </div>
  </div>
)
