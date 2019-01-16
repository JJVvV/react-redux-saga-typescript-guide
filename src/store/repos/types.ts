/**
 * types.ts 存放 action.type 和 Interface
 */

export const enum ReposTypes {
  FETCH_REPOS_BY_USER = 'repos/FETCH_REPOS_BY_USER',
  FETCH_REPOS_BY_USER_START = 'repos/FETCH_REPOS_BY_USER_START',
  FETCH_REPOS_BY_USER_SUCCESS = 'repos/FETCH_REPOS_BY_USER_SUCCESS',
  FETCH_REPOS_BY_USER_FAIL = 'repos/FETCH_REPOS_BY_USER_FAIL',
}

export type TRepo = {
  id: number
  url: string
  full_name: string
  stargazers_count: number
}

export interface ReposState {
  repos: TRepo[]
  error: string
  loading: boolean
}
