import React from 'react'
import { Router, Route, Switch } 
from 'react-router-dom'
import createHistory from 'history/createBrowserHistory'
import ExpenseDahsboardPage from '../components/ExpenseDahsboardPage'
import AddExpensePage from '../components/AddExpensePage'
import EditExpensePage from '../components/EditExpensePage'
import HelpPage from '../components/HelpPage'
import NotFoundPage from '../components/NotFoundPage'

import LoginPage from '../components/LoginPage'
import PrivateRoute from './PrivateRoute'
import PublicRoute from './PublicRoute'

export const history = createHistory()

const AppRouter = () => (
  <Router history={history}>
    <div>
      

      <Switch>
        <PublicRoute exact path="/" component={LoginPage} />
        <PrivateRoute path="/dashboard" component={ExpenseDahsboardPage} />
        <PrivateRoute path="/create" component={AddExpensePage} />
        <PrivateRoute path="/edit/:id" component={EditExpensePage} />
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  </Router>
)


export default AppRouter