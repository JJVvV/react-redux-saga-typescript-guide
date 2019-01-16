import { createStandardAction, createAction } from 'typesafe-actions'
import { ReposTypes, TRepo } from './types'

export const fetchReposStart = createAction(
  ReposTypes.FETCH_REPOS_BY_USER_START
)
export const fetchRepos = createStandardAction(ReposTypes.FETCH_REPOS_BY_USER)<
  string
>()

export const fetchReposSuccess = createStandardAction(
  ReposTypes.FETCH_REPOS_BY_USER_SUCCESS
)<TRepo[]>()
export const fetchReposFail = createStandardAction(
  ReposTypes.FETCH_REPOS_BY_USER_FAIL
)<string>()
