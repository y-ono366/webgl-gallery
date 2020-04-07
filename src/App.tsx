import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom'
import Index from './pages/index'
import Particle from './pages/detail/particle'
import SampleBox from './pages/detail/samplebox'

ReactDOM.render(
  <HashRouter>
    <Switch>
      <Route exact path="/" component={Index} />
      <Route exact path="/particle" component={Particle} />
      <Route exact path="/samplebox" component={SampleBox} />
      <Redirect to="/" />
    </Switch>
  </HashRouter>,
  document.getElementById('app')
)
