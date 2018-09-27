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
  c4: { name: 'a', color: '#b366cb' },
  c6: { name: 'b', color: '#75cb69' },
  c7: { name: 'c', color: '#cb4a53' },
};

const newCommits = [
  {
    c3: { children: ['m34'] },
    c4: { children: ['c5', 'm34'] },
    m34: {},
  },
  { m34: { children: [`c7'`] }, "c7'": {} },
  { "c7'": { children: [`c5'`] }, "c5'": {} },
  { "c5'": { children: [`c6'`] }, "c6'": {} },
];

const newBranches = [
  { c3: null, m34: { name: 'master', color: '#80cbc4' } },
  { m34: null, "c7'": { name: 'master', color: '#80cbc4' } },
  {},
  { "c5'": null, c6: null, "c6'": { name: 'b', color: '#75cb69' } },
];

export default class RebaseOnto extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { commits, branches, clicks: 0 };
  }

  onClick() {
    if (this.state.clicks < 4)
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
