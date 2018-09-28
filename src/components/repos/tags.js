import React from 'react';
import CommitList from '../visualisationFramework/CommitList';
import Clikable from '../Clikable';

const master = { name: 'master', color: '#80cbc4' };
const fixv1 = { name: 'fixv1', color: '#8ccb81' };
const fixv11 = { name: 'fixv11', color: '#8ccb81' };
const foo = { name: 'foo', color: '#8ccb81' };

const v100 = { name: 'v1.0.0', color: '#cbba52' };
const v101 = { name: 'v1.0.1', color: '#cbba52' };
const v110 = { name: 'v1.1.0', color: '#cbba52' };
const v111 = { name: 'v1.1.1', color: '#cbba52' };

const commits = {
  c0: { children: ['c1'] },
  c1: { },
  c2: { },
  c3: { },
  c4: { },
  c5: { },
  c6: { },
  c7: { },
};

const branches = {
  c1: master
};

const newCommits = [
  { c1: {children: ['c2']}},
  { c1: {children: ['c2', 'c3']},},
  { c2: {children: ['m23']}, c3: {children: ['m23']}, m23: {}},
  { m23: { children: ['c4']}},
  { c4: {children: ['c5', 'c6']},},
  { c5: {children: ['c6\'']}, 'c6\'': {}},
];
const newBranches = [
  { c1: v100, c2: master},
  { c3: fixv1},
  { c3: v101, m23: master, c2: null},
  { c4: master, m23: null},
  { c5: master, c4: v110, c6: foo},
  { c6: v111, c5: null, 'c6\'': master }
];

export default class Tags extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { commits, branches, clicks: 0 };
  }

  onClick() {
    if (this.state.clicks < newBranches.length)
      this.setState({
        commits: {
          ...this.state.commits,
          ...newCommits[this.state.clicks],
        },
        branches: {
          ...this.state.branches,
          ...newBranches[this.state.clicks],
        },
        clicks: this.state.clicks + 1,
      });
  }

  render() {
    return (
      <Clikable onClick={this.onClick.bind(this)}>
        <CommitList commits={this.state.commits} branches={this.state.branches} roots={['c0']} />
      </Clikable>
    );
  }
}

