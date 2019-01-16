import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import { ConnectedRouter } from 'connected-react-router'
import { Provider } from 'react-redux'
import Root from '../components/Root'
import configureStore from 'store/configureStore'
import { createHashHistory } from 'history'
const history = createHashHistory()
const store = configureStore(history)()
const app = (Root) => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Router>
        <Root />
      </Router>
    </ConnectedRouter>
  </Provider>
)
const rootEl = document.querySelector('.root')
let render = (component) => {
  ReactDOM.render(component, rootEl)
}

if ((module as any).hot) {
  const renderApp = render
  const renderError = (error) => {
    // const RedBox = require("redbox-react")
    ReactDOM.render(<div>{error}</div>, rootEl)
  }

  render = (component) => {
    try {
      renderApp(component)
    } catch (error) {
      renderError(error)
    }
  }

  // tslint:disable-next-line:whitespace
  ;(module as any).hot.accept('../components/Root', () => {
    // eslint-disable-next-line global-require
    const RootContainer = require('../components/Root').default
    setTimeout(() => {
      render(app(RootContainer))
    })
  })
}

render(app(Root))
