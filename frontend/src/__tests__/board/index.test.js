import React from 'react';
import { shallow } from 'enzyme';
import Board from '../../board';

describe('Board', () => {
  const board = shallow(<Board />);
  it('has a div', () => {
    const element = board.find('div');
    expect(element).toBeDefined();
  });
});
