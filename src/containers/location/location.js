import React, { PureComponent } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';

import { setMessage } from '../../actions/home';

class Location extends PureComponent {
  static fetchData(store) {
    return store.dispatch(setMessage());
  }

  render() {
    return (
      <Grid componentClass="footer">
        <Row>
          <Col sm={12}>
            <h1>Location</h1>
          </Col>
        </Row>
      </Grid>
    );
  }
}

const mapStateToProps = state => ({
  // message: '',
});

const mapDispatchToProps = dispatch => ({
  // setMessage: () => dispatch(setMessage()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Location);
