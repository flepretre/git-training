import React, { PureComponent } from 'react';
import styled from 'styled-components';

const Branch = styled.div`
  position: absolute;
  left: ${({ x, size, dist }) => x * (size + dist) + 0.7 * size}px;
  top: ${({ y, size, dist }) => y * (size + dist) - 0.7 * size}px;
  transform: rotate(-40deg);

  padding: 2px 10px 2px 10px;
  border-color: white;
  border-style: solid;
  border-width: 2px;
  border-radius: 8px;
  background-color: ${({ color }) => color};

  text-align: center;
  color: #2d2d2d;
  font-size: ${({ size }) => size / 4}px;
  font-weight: bold;
`;

export default ({ children, ...props }) => <Branch {...props}>{children}</Branch>;
