import React from 'react';
import Bloc from './Bloc';
import styled from 'styled-components';

const Grid = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  grid-gap: 10px 40px;
  padding-bottom: 50px;
`;

export default () => (
  <Bloc headers="460573193e454f44c87a07c454e51cea92d6bde1">
    <Grid>
      <div>tree</div>
      <div>a93c850defa344fa86fbf10b3d071467ffefc432</div>
      <div>parent</div>
      <div>9034352a174023326ff1720dd78ec211c0a31ac1</div>
      <div>author</div>
      <div>Florent Lepretre florent.lepretre@gmail.com1533635024 +0200</div>
      <div>committer</div>
      <div>Florent Lepretre florent.lepretre@gmail.com 1533635024 +0200</div>
    </Grid>
    Example files for blob, tree, and commit<br />
    <br />
    Commit description
  </Bloc>
);
