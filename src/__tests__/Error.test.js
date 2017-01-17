import React from 'react';
import { shallow } from 'enzyme';
import Error from '../components/Error';

describe('The Error component', () => {
  it('displays the error message', () => {
    const wrapper = shallow(
        <Error error="ERROR MESSAGE"/>
    );
    expect(wrapper.find('Message').html()).toContain('ERROR MESSAGE');
  });

  it('displays the error detail message', () => {
    const wrapper = shallow(
        <Error error="ERROR MESSAGE" errorDetail="ERROR DETAIL"/>
    );
    expect(wrapper.find('Message').html()).toContain('ERROR MESSAGE');
    expect(wrapper.find('Message').html()).toContain('ERROR DETAIL');
  });
});