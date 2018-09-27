import React from 'react';
import CommitList from '../visualisationFramework/CommitList';
import Clikable from '../Clikable';

const commits = {
  c0: { children: ['c1'] },
  c1: { children: ['c2', 'c4'] },
  c2: { children: ['c3', 'c5'] },
  c3: {},
  c4: {},
  c5: {},
};

const branches = {
  c3: { name: 'master', color: '#80cbc4' },
  c4: { name: 'a', color: '#b366cb' },
  c5: { name: 'b', color: '#73cb76' },
};

const newCommits = [{ c3: { children: [`c4'`] }, "c4'": {} }, { "c4'": { children: [`c5'`] }, "c5'": {} }];

const newBranches = [
  { "c4'": { name: 'master', color: '#80cbc4' }, c3: null },
  { "c5'": { name: 'master', color: '#80cbc4' }, "c4'": null },
];

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
