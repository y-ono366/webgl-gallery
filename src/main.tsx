import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { HashRouter, Route, Switch, Link } from 'react-router-dom'
import Test from './pages/test'
import Index from './pages/index'

ReactDOM.render(
  <HashRouter>
    <div>
      <Link to="/">Home</Link>
      <Link to="/test">test</Link>
    </div>
    <Switch>
      <Route exact path="/" component={Index} />
      <Route exact path="/test" component={Test} />
    </Switch>
  </HashRouter>,
  document.getElementById('app')
)
