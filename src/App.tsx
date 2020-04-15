import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom'
const Index = React.lazy(() => import('@/pages/index'))
const Particle = React.lazy(() => import('@/pages/detail/particle'))
const SampleBox = React.lazy(() => import('@/pages/detail/samplebox'))
const SampleBox2 = React.lazy(() => import('@/pages/detail/samplebox2'))
const Lines = React.lazy(() => import('@/pages/detail/lines'))
const Slash = React.lazy(() => import('@/pages/detail/slash'))
const Usestrict = React.lazy(() => import('@/pages/detail/usestrict'))
const Usestrict2 = React.lazy(() => import('@/pages/detail/usestrict2'))
const Circle = React.lazy(() => import('@/pages/detail/circle'))
const FragmentShader = React.lazy(() => import('@/pages/detail/fragmentshader'))
const Glitch = React.lazy(() => import('@/pages/detail/glitch'))
const Loading = React.lazy(() => import('@/pages/detail/loading'))
const Intaract = React.lazy(() => import('@/pages/detail/intaract'))

ReactDOM.render(
  <HashRouter>
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
        <Route exact path="/intaract" component={Intaract} />
        <Redirect to="/" />
      </Switch>
    </React.Suspense>
  </HashRouter>,
  document.getElementById('app')
)
