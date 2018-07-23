import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';

class FormatMessage extends Component {
  state = {
    hasError: false
  }

  componentDidCatch(error, info) {
    // Display fallback UI
    this.setState({ hasError: true });
  }

  render() {
    if (this.state.hasError) {
      return(
        <span id={this.props.id}>
          {this.props.defaultMessage || "Something went wrong"}
        </span>
      )
    }
    return(<FormattedMessage {...this.props} />);
  }
}

export default FormatMessage;
