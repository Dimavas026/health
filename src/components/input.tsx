import React, { ChangeEvent, FocusEvent, FC } from 'react'

interface InputProps {
  label?: string
  value: string
  name?: string
  type?: string
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  onBlur?: (e: FocusEvent<HTMLInputElement>) => void
}

export const Input: FC<InputProps> = ({
  label, value, name, type = 'text', onChange, onBlur,
}) => (
  <div>
    {label && <span>{label}</span>}
    <input type={type} name={name} value={value} onChange={onChange} onBlur={onBlur} />
  </div>
)
