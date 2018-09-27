import React from 'react';
import styled from 'styled-components';

const Line = styled.line`
  position: absolute;
  stroke: ${({ color }) => color};
  stroke-width: 2px;
`;

export default ({ from: { x: x1, y: y1 }, to: { x: x2, y: y2 }, size, dist, color }) => (
  <Line
    x1={x1 * dist + size / 2}
    y1={y1 * dist + size / 2}
    x2={x2 * dist + size / 2}
    y2={y2 * dist + size / 2}
    color={color}
  />
);
