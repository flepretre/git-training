import React from 'react';
import CommitList from '../visualisationFramework/CommitList';
import Clikable from '../Clikable';

const commits = {
  c0: { children: ['c1'] },
  c1: { children: ['c2', 'c4'] },
  c2: { children: ['c3'] },
  c3: {},
  c4: { children: ['c5'] },
  c5: {},
};

const branches = {
  c3: { name: 'master', color: '#80cbc4' },
  c5: { name: 'foo', color: '#b366cb' },
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
        c3: { children: ['m35'] },
        c5: { children: ['m35'] },
        m35: {},
      },
      branches: {
        m35: { name: 'master', color: '#80cbc4' },
        c5: { name: 'foo', color: '#b366cb' },
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
