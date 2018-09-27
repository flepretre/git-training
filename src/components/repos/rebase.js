import React from 'react';
import CommitList from '../visualisationFramework/CommitList';
import Clikable from '../Clikable';

const commits = {
  c0: { children: ['c1'], color: '#80cbc4' },
  c1: { children: ['c2', 'c4'] },
  c2: { children: ['c3'] },
  c3: {},
  c4: { children: ['c5'], color: '#b366cb' },
  c5: {},
};

const branches = {
  c3: { name: 'master', color: '#80cbc4' },
  c5: { name: 'myBranch', color: '#b366cb' },
};

const newCommits = [
  { c3: { children: [`c4'`] }, "c4'": { color: '#a9a9a9' } },
  {
    "c4'": { children: [`c5'`], color: '#b366cb' },
    "c5'": {},
    c4: { children: ['c5'], color: '#a9a9a9' },
  },
];

const newBranches = [{}, { c5: undefined, "c5'": { name: 'myBranch', color: '#b366cb' } }];

export default class Rebase extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { commits, branches, clicks: 0 };
  }

  onClick() {
    if (this.state.clicks < 2)
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
