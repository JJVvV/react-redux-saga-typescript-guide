import React from 'react'
import renderer from 'react-test-renderer'
import Enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
Enzyme.configure({adapter: new Adapter()})
import {{name}} from './component'

it('<{{name}} /> without children', () => {
  const component = renderer.create(
    <{{name}}></{{name}}>,
  )
  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()

})