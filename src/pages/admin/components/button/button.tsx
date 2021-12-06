import React, { FC } from 'react'
import './button.scss'

interface ButtonProps {
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void
  type?: 'submit' | 'reset' | 'button'
}

export const Button: FC<ButtonProps> = ({ onClick, type = 'button', children }) => (
  <button onClick={onClick} type={type} className="button">
    {children}
  </button>
)
