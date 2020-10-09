import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom'
import { GlobalStyle } from '@/components/common/global-style'
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
import Mobile from '@/components/common/mobile'
import Cylinder from '@/pages/detail/cylinder'
import Twelve from '@/pages/detail/twelve'
import Thirteen from '@/pages/detail/thirteen'
import { CSSTransition } from 'react-transition-group'
import styled from 'styled-components'

const DeskTop = styled.div`
  background-color: #0b0b0b;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  .page-enter {
    opacity: 0;
    transition: 200ms opacity ease;
  }

  .page-enter-active,
  .page-exit {
    transition: 200ms opacity ease;
    opacity: 1;
  }

  .page-exit-done,
  .page-exit-active {
    opacity: 0;
    transition: 200ms opacity ease;
  }
`
const routes = [
  { path: '/', name: 'Index', Component: Index },
  { path: '/particle', Component: Particle },
  { path: '/samplebox', Component: SampleBox },
  { path: '/samplebox2', Component: SampleBox2 },
  { path: '/lines', Component: Lines },
  { path: '/slash', Component: Slash },
  { path: '/usestrict', Component: Usestrict },
  { path: '/usestrict2', Component: Usestrict2 },
  { path: '/circle', Component: Circle },
  { path: '/fragmentshader', Component: FragmentShader },
  { path: '/glitch', Component: Glitch },
  { path: '/loading', Component: Loading },
  { path: '/cylinder', Component: Cylinder },
  { path: '/twelve', Component: Twelve },
  { path: '/thirteen', Component: Thirteen },
]
ReactDOM.render(
  <HashRouter>
    <GlobalStyle />
    <Mobile />
    <DeskTop id="desktoppc">
      {routes.map(({ path, Component }) => (
        <Route key={path} exact path={path}>
          {({ match }) => (
            <CSSTransition in={match != null} timeout={300} classNames="page" unmountOnExit mountOnEnter>
              <Component />
            </CSSTransition>
          )}
        </Route>
      ))}
    </DeskTop>
  </HashRouter>,
  document.getElementById('app')
)
