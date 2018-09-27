import React from 'react';
import CommitList from '../visualisationFramework/CommitList';
import Clikable from '../Clikable';

const commits = {
  c0: { children: ['c1'] },
  c1: { children: ['c2', 'c4'] },
  c2: { children: ['c3'] },
  c3: {},
  c4: { children: ['c5'] },
  c5: { children: ['c6'] },
  c6: { children: ['c7'] },
  c7: {},
};

const branches = {
  c3: { name: 'master', color: '#80cbc4' },
  c5: { name: 'foo', color: '#b366cb' },
  c7: { name: 'myBranch', color: '#cb4a53' },
};

const newCommits = [
  { c3: { children: [`s1`] }, s1: { color: '#b366cb' } },
  {
    s1: { children: ["c6'"] },
    "c6'": { children: ["c7'"] },
    "c7'": {},
    c6: { children: ['c7'] },
  },
];

const newBranches = [
  {
    c3: null,
    s1: { name: 'master', color: '#80cbc4' },
    c5: { color: '#b366cb' },
  },
  { c7: null, c5: null, "c7'": { name: 'myBranch', color: '#cb4a53' } },
];

export default class RebaseOnto extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { commits, branches, clicks: 0 };
  }

  onClick() {
    if (this.state.clicks < newCommits.length)
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
