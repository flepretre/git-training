import React from 'react';
import styled from 'styled-components';

const Commit = styled.div`
  position: absolute;
  top: ${({ y, size, dist }) => y * (size + dist)}px;
  left: ${({ x, size, dist }) => x * (size + dist)}px;

  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  border-radius: ${({ size }) => size / 2}px;
  background-color: ${({ color }) => color};

  border-color: white;
  border-style: solid;
  padding-top: ${({ size }) => size / 4}px;

  text-align: center;
  color: #2d2d2d;
  font-size: ${({ size }) => size / 4}px;
  font-weight: bold;
`;

export default ({ children, ...props }) => <Commit {...props}>{children}</Commit>;
