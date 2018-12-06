/* eslint-disable react/no-array-index-key */
import React from 'react';
import { View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { Line } from '../components';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
});

function MultiWords({ words, textSize, backgroundColor }) {
  const borderStyle = {
    borderRightWidth: textSize,
    borderRightColor: 'transparent',
  };

  const lastIndex = words.length - 1;

  return (
    <View style={(styles.container, { backgroundColor })}>
      {words.map((word, index) => (
        <View key={index} style={[lastIndex !== index && borderStyle, { width: word.width }]}>
          <Line textSize={textSize} color={word.color} />
        </View>
      ))}
    </View>
  );
}

MultiWords.propTypes = {
  words: PropTypes.arrayOf(
    PropTypes.shape({
      color: PropTypes.string,
      width: PropTypes.string.isRequired,
    }),
  ),
  textSize: PropTypes.number,
  backgroundColor: PropTypes.string,
};

MultiWords.defaultProps = {
  words: [],
  textSize: 12,
  backgroundColor: '#FFFFFF',
};

export default MultiWords;
