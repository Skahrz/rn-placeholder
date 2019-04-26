import React from 'react';
import PropTypes from 'prop-types';
import Line from '../line/line';
import Placeholder from '../placeholder/placeholder';

const Paragraph = ({
  lineNumber,
  textSize,
  color,
  width,
  lastLineWidth,
  firstLineWidth,
  ...props
}) => {
  const lines = [];

  for (let i = 0; i < lineNumber; i++) {
    if (i === 0) {
      lines.push(<Line textSize={textSize} color={color} width={firstLineWidth} key={i} />);
    } else if (i === lineNumber - 1) {
      lines.push(<Line textSize={textSize} color={color} width={lastLineWidth} key={i} />);
    } else {
      lines.push(<Line textSize={textSize} color={color} width={width} key={i} />);
    }
  }
  return <Placeholder {...props}>{lines}</Placeholder>;
};

Paragraph.propTypes = {
  lineNumber: PropTypes.number.isRequired,
  textSize: PropTypes.number,
  color: PropTypes.string,
  width: PropTypes.string,
  lastLineWidth: PropTypes.string,
  firstLineWidth: PropTypes.string,
  style: PropTypes.oneOfType([PropTypes.number, PropTypes.shape({})]),
};

Paragraph.defaultProps = {
  textSize: 12,
  color: '#efefef',
  width: '100%',
  lastLineWidth: '100%',
  firstLineWidth: '100%',
  style: {},
};

export default Paragraph;
