import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom'
import Index from './pages/index'
import Particle from './pages/detail/particle'

ReactDOM.render(
  <HashRouter>
    <Switch>
      <Route exact path="/" component={Index} />
      <Route exact path="/particle" component={Particle} />
      <Redirect to="/" />
    </Switch>
  </HashRouter>,
  document.getElementById('app')
)
