import React from 'react';
import { View, Text } from 'react-native';
import { shallow } from 'enzyme';
import { Line } from '../../line/line';
import { Placeholder } from '../placeholder';

describe('placeholder', () => {
  let props;

  const getWrapper = () => shallow(
    <Placeholder {...props}>
      <Line />
      <Line />
      <Line />
    </Placeholder>,
  );

  beforeEach(() => {
    props = {
      isReady: false,
      whenReadyRender: () => <View testID="when-ready-render" />,
    };
  });

  it('should match snapshot', () => {
    expect(getWrapper()).toMatchSnapshot();
  });

  it('shouldnt display anything when whenReadyRender is undefined', () => {
    props.isReady = true;
    props.whenReadyRender = undefined;
    expect(getWrapper()).toMatchSnapshot();
  });

  it('should display the whenReadyRender when isReady is true', () => {
    props.isReady = true;
    expect(getWrapper()).toMatchSnapshot();
  });

  it('should be wrapped with an Animation when animate prop is set to "fade"', () => {
    props.animation = 'fade';

    expect(getWrapper()).toMatchSnapshot();
  });

  it('should throw an error when the animation name is not found', () => {
    props.animation = 'toto';

    expect(() => getWrapper()).toThrow('Animation "toto" doesn\'t exist in the library');
  });

  it('should be wrapped with a CustomAnimation when the customAnimation prop is set', () => {
    props.customAnimation = componentProps => (
      <View testID="custom-animation" {...componentProps} />
    );

    expect(getWrapper()).toMatchSnapshot();
  });

  it('should have a component on the left side when renderLeft is provided', () => {
    props.renderLeft = otherProps => <Text {...otherProps}>Left content</Text>;

    expect(getWrapper()).toMatchSnapshot();
  });

  it('should have a component on the right side when renderRight is provided', () => {
    props.renderRight = otherProps => <Text {...otherProps}>Right content</Text>;

    expect(getWrapper()).toMatchSnapshot();
  });
});
