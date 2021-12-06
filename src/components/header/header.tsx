import './header.scss'
import { useHistory } from 'react-router-dom'
import { useObserver } from 'mobx-react'
import { useStores } from '../../store/root'

export const Header = () => {
  const { authStore } = useStores()
  const { push } = useHistory()

  return useObserver(() => (
    <div className="header">
      <div className="header__left">
        {authStore.isAuth
          && (
          <>
            <div className="header__button" onClick={() => push('/product/create')}>Create product</div>
            <div className="header__button" onClick={() => push('/dish/create')}>Create dish</div>
            <div className="header__button" onClick={() => push('/product/list')}>List</div>
          </>
          )}
      </div>
      <div className="header__right">
        {authStore.isAuth
          ? (
            <>
              <div className="header__label">{authStore.user.email}</div>
              <div
                className="header__button"
                onClick={() => {
                  authStore.logout()
                }}
              >
                Logout
              </div>
            </>
          )
          : (
            <>
              <div className="header__button" onClick={() => push('/login?signIn=true')}>Sign In</div>
              <div className="header__button" onClick={() => push('/login')}>Sign Up</div>
            </>
          )}
      </div>
    </div>
  ))
}
