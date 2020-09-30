import React, { PureComponent, Fragment } from 'react';

export default class View extends PureComponent {
  queryList() {
    // console.log('queryList')
  }

  componentDidMount() {
    this.queryList();
  }

  render() {
    return (
      <Fragment>
        <div>Hello</div>
        <p>React</p>
      </Fragment>
    );
  }
}
