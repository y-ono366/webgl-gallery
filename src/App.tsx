import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { HashRouter, Route, Switch } from 'react-router-dom'
import Detail from './pages/detail'
import Index from './pages/index'

ReactDOM.render(
  <HashRouter>
    <Switch>
      <Route exact path="/" component={Index} />
      <Route exact path="/test" component={Detail} />
    </Switch>
  </HashRouter>,
  document.getElementById('app')
)
