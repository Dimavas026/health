import React, { useEffect, useState } from 'react'
import {
  Redirect, Route, Switch, useHistory,
} from 'react-router-dom'
import classNames from 'classnames'
import { UserService } from '../../../../services/user'
import { IUser } from '../../../../models/user'
import { IColumn, Table } from '../table/table'
import { InfoFrame } from '../info-frame/info-frame'
import { Icons } from '../../../../common/Icons'
import { UserEdit } from './edit/edit'
import './users.scss'

const columns: IColumn[] = [
  {
    title: 'id',
    fieldName: '_id',
    widthPercent: 40,
  },
  {
    title: 'email',
    fieldName: 'email',
    widthPercent: 40,
  },
  {
    title: 'roles',
    fieldName: 'roles',
    widthPercent: 15,
  },
  {
    title: '',
    fieldName: '',
    widthPercent: 5,
  },
]

export const Users = () => {
  const [users, setUsers] = useState<IUser[]>([])
  const [loading, setLoading] = useState(false)
  const history = useHistory()

  useEffect(() => {
    getUsers()
  }, [])

  const getUsers = async () => {
    setLoading(true)
    UserService.getUsers()
      .then((response) => {
        setUsers(response.data)
        setTimeout(() => {
          setLoading(false)
        }, 1000)
      })
  }

  const handleUserDelete = async (e: React.MouseEvent<HTMLDivElement>) => {
    const dataset = (e.target as HTMLDivElement)
      ?.parentElement?.parentElement?.parentElement?.parentElement?.parentElement?.dataset
    await UserService.deleteUser(dataset?.id || '')
    await getUsers()
  }

  const handleUserEdit = (e: React.MouseEvent<HTMLDivElement>) => {
    const dataset = (e.target as HTMLDivElement)?.parentElement?.parentElement?.parentElement?.parentElement?.dataset
    history.push(`/admin/users/user/${dataset?.id || ''}`)
  }

  return (
    <div className="users-page">
      <div className="users-page__info-frames">
        <div className="users-page__info-frame">
          <InfoFrame title="уникальные" Icon={Icons.User} value={users.length.toString()} />
        </div>
        <div className="users-page__info-frame">
          <InfoFrame title="админы" Icon={Icons.User} value="5" />
        </div>
        <div className="users-page__info-frame">
          <InfoFrame title="посетители" Icon={Icons.User} value="292" />
        </div>
      </div>
      <Switch>
        <Route path="/admin/users" exact>
          <div className={classNames('users-page__table', {
            'users-page__table--center': loading,
          })}
          >
            {loading
              ? <div><Icons.Spinner width={40} height={40} /></div>
              : (
                <Table columns={columns} data={users as any}>
                  <div className="users-page__additional-column">
                    <div onClick={handleUserEdit} className="users-page__pencil-icon">
                      <Icons.Pencil width={20} height={20} />
                    </div>
                    <div onClick={handleUserDelete} className="users-page__trash-icon">
                      <Icons.Trash width={20} height={20} />
                    </div>
                  </div>
                </Table>
              )}
          </div>
        </Route>
        <Route path="/admin/users/user/:id" component={UserEdit} />
        <Redirect to="/admin/users" />
      </Switch>
    </div>
  )
}
