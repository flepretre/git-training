import React from 'react';
import CommitList from '../visualisationFramework/CommitList';

const commits = {
  c1: { children: ['c2'] },
  c2: { children: ['c3', 'c4', 'c5'] },
  c3: {},
  c4: { children: ['c6'] },
  c5: { children: ['c6'] },
  c6: {},
};

const branches = {
  c3: { name: 'master', color: '#80cbc4' },
  c4: { color: '#cb5140' },
  c5: { color: '#5dcb6f' },
  c6: { name: 'stash@{1}', color: '#cbbc48' },
};

export default () => <CommitList commits={commits} branches={branches} roots={['c1']} />;
