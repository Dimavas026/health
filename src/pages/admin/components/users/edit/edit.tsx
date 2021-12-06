import React, { FC, useEffect, useState } from 'react'
import { Redirect, RouteComponentProps } from 'react-router-dom'
import Select from 'react-select'
import { UserService } from '../../../../../services/user'
import { IUser } from '../../../../../models/user'
import { Input } from '../../input/input'
import './edit.scss'
import { Button } from '../../button/button'

interface RouterProps {
  id: string
}

export const UserEdit: FC<RouteComponentProps<RouterProps>> = ({ match }) => {
  const [user, setUser] = useState<IUser>()
  const [roles, setRoles] = useState<string[]>([])
  const [email, setEmail] = useState('')
  const [role, setRole] = useState<string[]>([])

  useEffect(() => {
    UserService.getUser((match.params.id)).then((response) => {
      setUser(response.data)
    })
    UserService.getRoles().then((response) => {
      setRoles(response.data[0].roles)
    })
  }, [])

  useEffect(() => {
    setEmail(user?.email || '')
    setRole(user?.roles || [])
  }, [user])

  const handleSubmit = () => {
    UserService.patchUser(match.params.id, email, role).then(() => <Redirect to="admin/users" />)
  }

  return (
    <div className="edit">
      <div className="edit__block">
        <div className="edit__title">
          <span>Email</span>
        </div>
        <div className="edit__form">
          <Input value={email} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)} />
        </div>
      </div>
      <div className="edit__block">
        <div className="edit__title">
          <span>Roles</span>
        </div>
        <div className="edit__form">
          <Select
            isMulti
            value={
              role.map((r) => ({
                value: r,
                label: r,
              }))
            }
            styles={customStyles}
            options={
              roles.map((r) => ({
                value: r,
                label: r,
              }))
            }
          />
        </div>
      </div>
      <div className="edit__block">
        <Button onClick={handleSubmit}>Сохранить</Button>
      </div>
    </div>
  )
}

export const customStyles = {
  control: (base: any) => ({
    ...base,
    padding: '10px',
    borderRadius: '15px',
    border: '2px solid #999',
    outline: 'none',
    fontSize: '20px',
    width: '100%',
    '&:hover': {
      borderColor: '#287bff',
    },
    '&:focus': {
      borderColor: '#287bff',
    },
  }),
  valueContainer: (base: any) => ({
    ...base,
    padding: '0',
  }),
  input: (base: any) => ({
    ...base,
    height: '30px',
    padding: '0',
    margin: '0',
  }),
  indicatorsContainer: (base: any) => ({
    ...base,
    padding: '0',
    margin: '0',
    '& div': {
      padding: '0',
    },
  }),
  indicatorSeparator: (base: any) => ({
    ...base,
    margin: '0 10px',
  }),
}
