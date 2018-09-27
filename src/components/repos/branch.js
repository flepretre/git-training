import React from 'react';
import CommitList from '../visualisationFramework/CommitList';

const commits = {
  c0: { children: ['c1'] },
  c1: { children: ['c2', 'c4'] },
  c2: { children: ['c3'] },
  c3: { children: ['c5'] },
  c4: { children: ['c6'] },
  c5: {},
  c6: {},
};

const branches = {
  c2: { name: 'master', color: '#80cbc4' },
  c5: { name: 'foo', color: '#cba933' },
  c6: { name: 'bar', color: '#b366cb' },
};

export default () => <CommitList commits={commits} branches={branches} roots={['c0']} />;
