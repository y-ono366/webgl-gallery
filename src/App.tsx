import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom'
import Index from './pages/index'
import Particle from './pages/detail/particle'
import SampleBox from './pages/detail/samplebox'
import SampleBox2 from './pages/detail/samplebox2'
import Lines from './pages/detail/lines'

ReactDOM.render(
  <HashRouter>
    <Switch>
      <Route exact path="/" component={Index} />
      <Route exact path="/particle" component={Particle} />
      <Route exact path="/samplebox" component={SampleBox} />
      <Route exact path="/samplebox2" component={SampleBox2} />
      <Route exact path="/lines" component={Lines} />
      <Redirect to="/" />
    </Switch>
  </HashRouter>,
  document.getElementById('app')
)
