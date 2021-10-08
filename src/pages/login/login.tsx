import React, { useEffect } from 'react'
import { useFormik } from 'formik'
import { Link } from 'react-router-dom'

import { api } from '../../api/interceptors'
import { Input } from '../../components/input'

export const Login = () => {
  useEffect(() => {
    api
      .get('/todos')
      .then((response) => {
        console.log(response)
      })
  }, [])

  const formik = useFormik<{ login: string; password: string }>({
    initialValues: {
      login: '',
      password: '',
    },
    onSubmit: (values) => {
      console.log(values)
    },
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
  return (
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
      <button type="submit">Submit</button>
      {formik.touched.login && formik.errors.login}
      {formik.touched.password && formik.errors.password}
      <Link to="/">HOME</Link>
    </form>
  )
}
