import { ActionType, getType } from 'typesafe-actions'
import { Reducer } from 'redux'
import { ReposState } from './types'
import * as reposActions from './actions'

export type ReposActions = ActionType<typeof reposActions>
/** *** reducer *** */
const initialState: ReposState = {
  repos: null,
  error: '',
  loading: false,
}

const reducer: Reducer<ReposState, ReposActions> = (
  state = initialState,
  action: ReposActions
) => {
  switch (action.type) {
    case getType(reposActions.fetchReposSuccess):
      return { ...state, repos: action.payload, error: '', loading: false }
    case getType(reposActions.fetchReposFail):
      return { ...state, error: action.payload, loading: false }
    case getType(reposActions.fetchReposStart):
      return { ...state, loading: true }

    default:
      return state
  }
}

export { reducer as reposReducer }
