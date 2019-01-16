import { createStore, applyMiddleware, compose } from 'redux'
import { createLogger } from 'redux-logger'
import createSagaMiddleware from 'redux-saga'
import { routerMiddleware } from 'connected-react-router'
import { History } from 'history'
import { rootReducer, rootSaga, ApplicationState } from './index'
export type ConfigStoreState = ReturnType<typeof configStore>
const loggerMiddleware = createLogger()
const configStore = (history: History) => (
  preloadedState?: ApplicationState
) => {
  const sagaMiddleware = createSagaMiddleware()
  const store = createStore(
    rootReducer(history),
    preloadedState,
    compose(
      applyMiddleware(
        routerMiddleware(history),
        sagaMiddleware,
        loggerMiddleware
      )
    )
  )

  if ((module as any).hot) {
    ;(module as any).hot.accept('./index.ts', () => {
      store.replaceReducer(rootReducer(history))
    })
  }
  sagaMiddleware.run(rootSaga)
  return store
}

export default configStore
