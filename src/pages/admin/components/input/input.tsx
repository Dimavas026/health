import React, { FC } from 'react'
import './input.scss'

interface InputProps {
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void
  value?: string
  name?: string
  type?: string
  id?: string
}

export const Input: FC<InputProps> = ({
  value, id, name, type, onBlur, onChange,
}) => (
  <input id={id} type={type} value={value} onBlur={onBlur} onChange={onChange} name={name} className="input" />
)
