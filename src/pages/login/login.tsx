import React, { useEffect, useState } from 'react'
import { useFormik } from 'formik'
import { useHistory, useLocation } from 'react-router-dom'

import { useObserver } from 'mobx-react'
// import { Input } from '../../components/input'
import { useStores } from '../../store/root'
import { Input } from '../admin/components/input/input'
import './login.scss'
import { Button } from '../admin/components/button/button'

export const Login = () => {
  // eslint-disable-next-line no-unused-vars
  const [isLoginPage, setIsLoginPage] = useState(false)
  const { authStore } = useStores()
  const { push } = useHistory()
  // const { signIn } = useParams<{ signIn: string }>()
  const location = useLocation()

  const formik = useFormik<{ login: string; password: string }>({
    initialValues: {
      login: '',
      password: '',
    },
    onSubmit: async (values) => (
      isLoginPage
        ? authStore.login(values.login, values.password).then((_) => {
          push('/')
        })
        : authStore.registration(values.login, values.password).then((_) => {
          push('/')
        })
    ),
    // todo: validation schema
    validateOnChange: true,
    validate: (values) => {
      const errors: { login?: string; password?: string } = {}

      if (values.login.length < 3) {
        errors.login = 'should be greater then 2'
      }

      if (!values.password) {
        errors.password = 'Required'
      }
      return errors
    },
  })

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search)
    if (searchParams.get('signIn')) {
      setIsLoginPage(true)
    } else {
      setIsLoginPage(false)
    }
  }, [location])

  return useObserver(() => (
    <div className="login">
      <form className="login__form" onSubmit={formik.handleSubmit}>
        <div>
          <Input
            name="login"
            value={formik.values.login}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </div>
        <div>
          <Input
            name="password"
            type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </div>
        <div>
          <Button onClick={() => null} type="submit">
            {isLoginPage ? 'войти' : 'зарегистрироваться'}
          </Button>
        </div>
      </form>
    </div>
  ))
}
