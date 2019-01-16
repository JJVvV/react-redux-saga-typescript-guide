import { all, call, fork, put, takeLatest } from 'redux-saga/effects'
import { delay } from 'redux-saga'
import { getType } from 'typesafe-actions'

import * as reposActions from './actions'
import { loadReposByUserName } from 'apis/repos'

function* fetchRepos(action) {
  yield put(reposActions.fetchReposStart())
  yield delay(300)
  try {
    const res = yield call(loadReposByUserName, action.payload)
    yield put(reposActions.fetchReposSuccess(res))
  } catch (e) {
    yield put(reposActions.fetchReposFail(e.message))
  }
}

function* watchFetchReposByUser() {
  yield takeLatest(getType(reposActions.fetchRepos), fetchRepos)
}

function* reposSaga() {
  yield all([fork(watchFetchReposByUser)])
}

export default reposSaga
