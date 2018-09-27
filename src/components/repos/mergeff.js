import React from 'react';
import CommitList from '../visualisationFramework/CommitList';
import Clikable from '../Clikable';

const commits = {
  c0: { children: ['c1'] },
  c1: { children: ['c2'] },
  c2: { children: ['c3'] },
  c3: { children: ['c4'] },
  c4: { children: [] },
};

const branches = {
  c2: { name: 'master', color: '#80cbc4' },
  c4: { name: 'foo', color: '#b366cb' },
};

export default class Merge extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { commits, branches };
  }

  onClick() {
    this.setState({
      commits: {
        ...this.state.commits,
        c3: {
          ...this.state.commits.c3,
          color: '#80cbc4',
        },
      },
      branches: {
        c4: { name: 'master', color: '#80cbc4' },
      },
    });
  }

  render() {
    return (
      <Clikable onClick={this.onClick.bind(this)}>
        <CommitList commits={this.state.commits} branches={this.state.branches} roots={['c1']} />
      </Clikable>
    );
  }
}
