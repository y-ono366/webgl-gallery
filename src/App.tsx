import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom'
import Index from './pages/index'
import Particle from './pages/detail/particle'
import SampleBox from './pages/detail/samplebox'
import SampleBox2 from './pages/detail/samplebox2'
import Lines from './pages/detail/lines'
import Slash from './pages/detail/slash'
import Usestrict from './pages/detail/usestrict'
import Usestrict2 from './pages/detail/usestrict2'
import Circle from './pages/detail/circle'
import FragmentShader from './pages/detail/fragmentshader'

ReactDOM.render(
  <HashRouter>
    <Switch>
      <Route exact path="/" component={Index} />
      <Route exact path="/particle" component={Particle} />
      <Route exact path="/samplebox" component={SampleBox} />
      <Route exact path="/samplebox2" component={SampleBox2} />
      <Route exact path="/lines" component={Lines} />
      <Route exact path="/slash" component={Slash} />
      <Route exact path="/usestrict" component={Usestrict} />
      <Route exact path="/usestrict2" component={Usestrict2} />
      <Route exact path="/circle" component={Circle} />
      <Route exact path="/fragmentshader" component={FragmentShader} />
      <Redirect to="/" />
    </Switch>
  </HashRouter>,
  document.getElementById('app')
)
