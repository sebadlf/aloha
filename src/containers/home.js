import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import { setMessage } from '../actions/home';

class Home extends PureComponent {
  fetchData() {
    console.log('fetch');
    return this.props.setMessage();
  }

  render() {
    const message = this.props;
    return (
      <div>
        <span>Home!!!</span>
        <div>{this.props.message}</div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  message: state.home.message,
});

const mapDispatchToProps = dispatch => ({
  setMessage: () => dispatch(setMessage()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
