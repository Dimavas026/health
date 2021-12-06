import React from 'react'
import { useObserver } from 'mobx-react'
import './home.scss'

export const Home = () => useObserver(() => (
  <div className="home" />
))
