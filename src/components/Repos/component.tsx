/**
 * Repos 组件实现文件
 *
 * @version  1.0
 * @author   JJVvV <drowning524@gmail.com>
 */

import React from 'react'

import { connect } from 'react-redux'
import { push } from 'connected-react-router'
import queryString from 'query-string'
import { ApplicationState, TConnectType } from 'store'
import * as reposActions from 'store/repos/actions'
import { usernameSelector } from 'store/repos/selector'
// import styles from './component.mts.scss'

export interface ReposProps {}
export interface ReposState {
  username: string
}
type AllProps = ReposProps &
  TConnectType<typeof mapStateToProps, typeof mapDispatchToProps>
class Repos extends React.Component<AllProps, ReposState> {
  state: ReposState = {
    username: '',
  }
  private input: HTMLInputElement

  constructor(props: AllProps) {
    super(props)
  }

  componentDidUpdate(prevProps) {
    if (prevProps.username !== this.props.username) {
      this.setValue(this.props.username)
      this.fetch()
    }
  }
  componentDidMount() {
    this.fetch()
  }

  fetch() {
    const { username, fetchRepos } = this.props
    if (username) {
      fetchRepos(username)
    }
  }

  setUser(search) {
    const { username } = queryString.parse(search)
    if (username) {
      this.setState({
        username,
      })
    }
  }

  getValue() {
    if (this.input) {
      return this.input.value
    }
    return ''
  }
  setValue(value) {
    if (this.input) {
      this.input.value = value
    }
  }

  onKeyUp = (e) => {
    if (e.keyCode === 13) {
      this.onSearch()
    }
  }

  onSearch = () => {
    const { push, username } = this.props
    const inputValue = this.getValue()
    if (username !== inputValue) {
      push(`/repos/?username=${inputValue}`)
    }
  }

  renderError() {
    const { error } = this.props
    if (error) {
      return <div>{error}</div>
    }
    return null
  }
  renderLoading() {
    const { loading } = this.props
    if (loading) {
      return <div>loading</div>
    }
    return null
  }
  renderList() {
    const { repos } = this.props
    if (!Array.isArray(repos)) {
      return null
    }
    if (!repos.length) {
      return <div>no data</div>
    }
    return (
      <ul>
        {repos.map(({ full_name, stargazers_count }) => (
          <li key={full_name}>
            <a target="_blank" href={`https://github.com/${full_name}`}>
              {full_name} ___ star {stargazers_count}
            </a>
          </li>
        ))}
      </ul>
    )
  }

  render() {
    const { username } = this.props

    return (
      <div>
        <input
          ref={(input) => (this.input = input)}
          defaultValue={username}
          onKeyUp={this.onKeyUp}
          placeholder="input github username"
        />
        <button onClick={this.onSearch}>search</button>
        {this.renderLoading()}
        {this.renderError()}
        {this.renderList()}
      </div>
    )
  }
}

const mapStateToProps = (state: ApplicationState) => {
  const username = usernameSelector(state)

  return {
    ...state.repos,
    username,
  }
}

const mapDispatchToProps = (dispatch, getState) => {
  return {
    push: (url) => dispatch(push(url)),
    fetchRepos: (value) => dispatch(reposActions.fetchRepos(value)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Repos)
