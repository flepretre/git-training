import _ from 'lodash';
import React from 'react';

import styled from 'styled-components';

const GREY = '#424242';

const Box = styled.div`
  background-color: #80cbc4;
  border-radius: 10px;
  padding: 24px 24px 24px 24px;
  margin: 12px 12px 12px 12px;
  text-align: left;
  color: ${GREY};

  min-width: 275px;
  min-height: 175px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;

  div {
    padding-left: 4px;
    padding-right: 4px;
  }
`;

const Line = styled.hr`
  border-color: ${GREY};
  border-style: solid;
`;

export default ({ headers, children }) => (
  <Box>
    <Header>{_.isArray(headers) ? headers.map((e, i) => <div key={`heard-${i}`}>{e}</div>) : headers}</Header>
    <Line />
    {children}
  </Box>
);
