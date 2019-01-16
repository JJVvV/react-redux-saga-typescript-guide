import { createSelector } from 'reselect'
import { ApplicationState } from 'store'
import queryString from 'query-string'

export const usernameSelector = createSelector(
  [(state: ApplicationState) => state.router.location.search],
  (search: string) => queryString.parse(search).username || ''
)
