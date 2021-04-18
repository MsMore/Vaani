import React from 'react';
import color from 'color';
import { Text, StyleSheet, Animated } from 'react-native';
import { withTheme } from '../../../core/theming';
import { AdornmentSide } from './enums';
const AFFIX_OFFSET = 12;
const AffixContext = /*#__PURE__*/React.createContext({
  textStyle: {
    fontFamily: '',
    color: ''
  },
  topPosition: null,
  side: AdornmentSide.Left
});

const AffixAdornment = ({
  affix,
  side,
  textStyle,
  topPosition,
  onLayout,
  visible,
  paddingHorizontal
}) => {
  return /*#__PURE__*/React.createElement(AffixContext.Provider, {
    value: {
      side,
      textStyle,
      topPosition,
      onLayout,
      visible,
      paddingHorizontal
    }
  }, affix);
};

const TextInputAffix = ({
  text,
  textStyle: labelStyle,
  theme
}) => {
  const {
    textStyle,
    onLayout,
    topPosition,
    side,
    visible,
    paddingHorizontal
  } = React.useContext(AffixContext);
  const textColor = color(theme.colors.text).alpha(theme.dark ? 0.7 : 0.54).rgb().string();
  const offset = typeof paddingHorizontal === 'number' ? paddingHorizontal : AFFIX_OFFSET;
  const style = {
    top: topPosition,
    [side]: offset
  };
  return /*#__PURE__*/React.createElement(Animated.View, {
    style: [styles.container, style, {
      opacity: (visible === null || visible === void 0 ? void 0 : visible.interpolate({
        inputRange: [0, 1],
        outputRange: [1, 0]
      })) || 1
    }],
    onLayout: onLayout
  }, /*#__PURE__*/React.createElement(Text, {
    style: [{
      color: textColor
    }, textStyle, labelStyle]
  }, text));
};

TextInputAffix.displayName = 'TextInput.Affix';
const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center'
  }
});
export default withTheme(TextInputAffix); // @component-docs ignore-next-line

export { TextInputAffix, AffixAdornment };
//# sourceMappingURL=TextInputAffix.js.map