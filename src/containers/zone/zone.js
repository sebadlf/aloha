import React, { PureComponent } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';

import { getZone } from '../../actions/zone';

class Zone extends PureComponent {
  static fetchData(store, params) {
    const { slug } = params;
    return store.dispatch(getZone(slug));
  }

  render() {
    const { name } = this.props.city;

    return (
      <Grid componentClass="footer">
        <Row>
          <Col sm={12}>
            <h1>Zone {name}</h1>
          </Col>
        </Row>
      </Grid>
    );
  }
}

const mapStateToProps = (state) => {
  console.log(state);

  return ({
    city: state.zone.city,
  });
};

const mapDispatchToProps = dispatch => ({
  // setMessage: () => dispatch(setMessage()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Zone);
