import React from 'react'

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0
    }
  }

  increment(state) {
    this.setState({
      count: this.state.count + 1
    });
  }

  render() {
    return (
      <h2 onClick={this.increment.bind(this)}>
        Click me! {this.state.count}
      </h2>
    );
  }
}