import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { HashRouter, Route, Switch } from 'react-router-dom'
import SampleBox from './pages/detail/samplebox'
import Index from './pages/index'

ReactDOM.render(
  <HashRouter>
    <Switch>
      <Route exact path="/" component={Index} />
      <Route exact path="/samplebox" component={SampleBox} />
      <Route component={Index} />
    </Switch>
  </HashRouter>,
  document.getElementById('app')
)
