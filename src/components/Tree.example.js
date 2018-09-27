import React from 'react';
import Bloc from './Bloc';
import styled from 'styled-components';

const Grid = styled.div`
  display: grid;
  grid-template-columns: auto auto auto;
  grid-gap: 10px 40px;
`;

export default () => (
  <Bloc headers="289b43ce665a86db713694be3e1d22cd937b1427">
    <Grid>
      <div>tree</div>
      <div>0993944362cbf948778a942599b3f11c4ab2b14d</div>
      <div>bar</div>

      <div>blob</div>
      <div>24c285a25e8bbd261f03dc9ecd34345df4ee76a4</div>
      <div>foo.txt</div>
    </Grid>
  </Bloc>
);
