import React, { PureComponent } from 'react';
import styled from 'styled-components';
import _ from 'lodash';
import Commit from './Commit';
import CommitLink from './CommitLink';
import Branch from './Branch';

const List = styled.div`
  position: relative;
  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;
`;

const Links = styled.svg`
  top: 0px;
  left: 0px;
  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;
`;

const buildBranches = (commitsByRef, branchesByRef, ref, result = { currentBranch: [], branches: {}, colors: {} }) => {
  result.currentBranch.push(ref);
  if (_.get(branchesByRef, ref)) {
    const { color, name } = branchesByRef[ref];
    // Set color for all the commits of this branch
    _.forEach(result.currentBranch, refToColor => (result.colors[refToColor] = color));
    result.branches[ref] = name;
    // Reset the current branch to put next commits in an other one
    result.currentBranch = [];
  }

  let children = commitsByRef[ref].children;
  if (children) {
    _.forEach(children, childRef => {
      buildBranches(commitsByRef, branchesByRef, childRef, result);
    });
  } else {
    // the branch is over, but commits are dandling, so they will get the default color
    result.currentBranch = [];
  }

  return result;
};

const buildGraph = (
  commits,
  branches,
  root,
  defaultColor = '#a9a9a9',
  result = {
    commits: [],
    paths: [],
    branches: [],
    knownCommits: {},
    xLevel: 0,
    yLevel: 0,
    maxX: 0,
    maxY: 0,
  },
) => {
  let ref = root;
  // Get the current ref location
  const { xLevel: x, yLevel: y } = result;
  result.knownCommits[ref] = { x, y };

  const commit = commits[ref];
  const color = branches.colors[ref] || defaultColor;
  result.commits.push({ x, y, ...commit, ref, color });

  const children = _.get(commit, 'children');
  const nbChildren = _.get(children, 'length', 0);

  if (branches.branches[ref]) {
    result.branches.push({
      name: branches.branches[ref],
      color,
      x,
      y,
    });
  }

  if (nbChildren === 0) {
    // Last commit
    result.xLevel++;
    result.xLevel > result.maxX && result.maxX++;
    result.yLevel++;
  } else if (nbChildren === 1) {
    if (result.knownCommits[children]) {
      // If we already know that ref, it is a merge ref (or this branch is fast-forward with a previous one)
      result.paths.push({
        from: { x, y },
        to: result.knownCommits[children],
        color: branches.colors[children] || color,
      });
      result.yLevel++;
    } else {
      // Add the path between the current ref and the next one
      result.xLevel++;
      result.xLevel > result.maxX && result.maxX++;
      result.paths.push({
        from: { x, y },
        to: { x: result.xLevel, y: result.yLevel },
        color: branches.colors[children[0]] || color,
      });
      return buildGraph(commits, branches, children[0], defaultColor, result);
    }
  } else {
    // In-deep course of the branches
    _.forEach(children, newChild => {
      if (result.knownCommits[newChild]) {
        // If we already know that ref, it is a merge ref (or this branch is fast-forward with a previous one)
        result.paths.push({
          from: { x, y },
          to: result.knownCommits[newChild],
          color,
        });
      } else {
        result.xLevel = x + 1;
        result.xLevel > result.maxX && result.maxX++;
        result.paths.push({
          from: { x, y },
          to: { x: result.xLevel, y: result.yLevel },
          color: branches.colors[newChild] || color,
        });
        buildGraph(commits, branches, newChild, defaultColor, result);
      }
    });
  }

  result.yLevel > result.maxY && result.maxY++;

  return result;
};

export default class CommitList extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  static getDerivedStateFromProps(props) {
    return {
      graph: _.reduce(
        props.roots,
        (acc, root) => {
          if (acc) {
            acc.xLevel = 0;
            acc.yLevel++;
          }

          const branches = buildBranches(props.commits, props.branches, root);
          return buildGraph(props.commits, branches, root, acc);
        },
        undefined,
      ),
    };
  }

  render() {
    const size = typeof window === 'undefined' ? 50 : Math.round(window.innerWidth / 25);
    const { graph } = this.state;

    let dist = size * 1.2;
    let width = graph.maxX * size + (graph.maxX - 1) * dist;
    let height = graph.maxY * size + (graph.maxY - 1) * dist;
    return (
      <List width={width} height={height}>
        <Links width={width} height={height}>
          {_.map(graph.paths, props => (
            <CommitLink
              key={`(${props.from.x};${props.from.y})(${props.to.x};${props.to.y})`}
              {...props}
              size={size}
              dist={dist + size}
            />
          ))}
        </Links>
        {_.map(graph.commits, ({ ref, ...props }) => (
          <Commit key={ref} size={size} dist={dist} {...props}>
            {ref}
          </Commit>
        ))}
        {_.map(graph.branches, ({ name, ...props }) => (
          <Branch key={name} size={size} dist={dist} {...props}>
            {name}
          </Branch>
        ))}
      </List>
    );
  }
}
