import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom'
import GlobalStyle from '@/components/common/global-style'
import Index from '@/pages/index'
import Particle from '@/pages/detail/particle'
import SampleBox from '@/pages/detail/samplebox'
import SampleBox2 from '@/pages/detail/samplebox2'
import Lines from '@/pages/detail/lines'
import Slash from '@/pages/detail/slash'
import Usestrict from '@/pages/detail/usestrict'
import Usestrict2 from '@/pages/detail/usestrict2'
import Circle from '@/pages/detail/circle'
import FragmentShader from '@/pages/detail/fragmentshader'
import Glitch from '@/pages/detail/glitch'
import Loading from '@/pages/detail/loading'

ReactDOM.render(
  <HashRouter>
    <GlobalStyle />
    <React.Suspense fallback={<div>laoding...</div>}>
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
        <Route exact path="/glitch" component={Glitch} />
        <Route exact path="/loading" component={Loading} />
        <Redirect to="/" />
      </Switch>
    </React.Suspense>
  </HashRouter>,
  document.getElementById('app')
)
