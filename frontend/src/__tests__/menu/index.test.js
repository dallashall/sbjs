import React from 'react';
import { shallow } from 'enzyme';
import Menu from '../../menu';

describe('Menu', () => {
  let menu;
  beforeEach(() => {
    menu = shallow(<Menu />);
  });
  it('renders', () => {
    expect(menu).toBeDefined();
  });

  it('allows changing fields', () => {
    menu.find('#username').simulate('change', { target: { value: 'a' } });
    menu.find('#room-code').simulate('change', { target: { value: 'b' } });
    expect(menu.state().username).toBe('a');
    expect(menu.state().roomCode).toBe('b');
  });
});
