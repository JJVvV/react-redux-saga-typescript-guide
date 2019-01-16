import React from 'react'
import renderer from 'react-test-renderer'
import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
Enzyme.configure({ adapter: new Adapter() })
import Repos from './component'

it('<Repos /> without children', () => {
  const component = renderer.create(<Repos />)
  const tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
