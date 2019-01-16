import React from 'react'
import renderer from 'react-test-renderer'
import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
Enzyme.configure({ adapter: new Adapter() })
import Root from './component'

it('<Root /> without children', () => {
  const component = renderer.create(<Root />)
  const tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
