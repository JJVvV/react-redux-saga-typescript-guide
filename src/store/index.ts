import { combineReducers, Dispatch, Action, AnyAction } from 'redux'
import { all, fork } from 'redux-saga/effects'
import {
  RouterState,
  connectRouter,
  LocationChangeAction,
} from 'connected-react-router'
import { History } from 'history'
import { reposReducer, ReposActions } from 'store/repos/reducer'
import reposSaga from 'store/repos/sagas'
import { ReposState } from './repos/types'
// import popularsSaga from 'store/populars/sagas'
// import { ReposState } from 'store/repos/types'
export type ApplicationState = Readonly<{
  repos: ReposState
  router: RouterState
}>

type AllActions = ReposActions & LocationChangeAction
// & PopularsActions

export const rootReducer = (history: History) =>
  combineReducers<ApplicationState, AllActions>({
    repos: reposReducer,
    router: connectRouter(history),
  })

export interface ConnectedReduxProps<A extends Action = AnyAction> {
  dispatch: Dispatch<A>
}

export function* rootSaga() {
  yield all([fork(reposSaga)])
}

export type TConnectType<
  S extends (...args: any[]) => any,
  D extends (...args: any[]) => any
> = ReturnType<S> & ReturnType<D>
