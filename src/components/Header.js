import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { startLogout } from '../actions/auth'

const Header = ({ startLogout }) => {
  return (
    <header className="header">
      <div className="content-container">
        <div className="header__content">
          <Link className="header__title" to="/dashboard" exact>
          <h1>Expensify</h1>
        </Link>
        
          <button onClick={startLogout} className="button button--link">Logout</button>
        </div>
      </div>
    </header>
  )
}

const mapDispatchToProps = dispatch => ({
  startLogout: () => dispatch(startLogout())
})

export default connect(null, mapDispatchToProps)(Header)
//<NavLink to="/edit" activeClassName="is-active">Edit</NavLink>