/**
 * Root 组件实现文件
 *
 * @version  1.0
 * @author   JJVvV <drowning524@gmail.com>
 */
import { Route, HashRouter, Switch } from 'react-router-dom'
import React from 'react'
// import styles from './component.mts.scss'
import Repos from 'components/Repos'
export interface RootProps {}

class Root extends React.Component<RootProps, {}> {
  constructor(props: RootProps) {
    super(props)
  }

  render() {
    return (
      <HashRouter>
        <Switch>
          <Route path="/" component={Repos} />
        </Switch>
      </HashRouter>
    )
  }
}

export default Root
