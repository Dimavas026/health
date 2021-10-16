import React, { useState } from 'react'
import { useFormik } from 'formik'
import { useHistory } from 'react-router-dom'

import { useObserver } from 'mobx-react'
import { Input } from '../../components/input'
import { useStores } from '../../store/root'

export const Login = () => {
  // eslint-disable-next-line no-unused-vars
  const [isLoginPage, setIsLoginPage] = useState(false)
  const { authStore } = useStores()
  const { push } = useHistory()

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

  return useObserver(() => (
    <form onSubmit={formik.handleSubmit}>
      <Input
        name="login"
        label="логин"
        value={formik.values.login}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      />
      <Input
        name="password"
        label="пароль"
        type="password"
        value={formik.values.password}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      />
      <button type="submit">
        {isLoginPage ? 'войти' : 'зарегистрироваться'}
      </button>
    </form>
  ))
}
