import React, { PureComponent } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';

import { getZone } from '../../actions/zone';
import SquaredContainer from '../../components/squaredContainer';
import ImageWithErrorHandler from '../../components/imageWithErrorHandler';

require('./zone.scss');

class Zone extends PureComponent {
  static fetchData(store, params) {
    const { slug } = params;
    return store.dispatch(getZone(slug));
  }

  static renderLocation(location, index) {
    const imageURL = location.cabanaImgs && location.cabanaImgs.length ?
      location.cabanaImgs[0].url.replace('arfotos', 'ar/fotos') : null;

    // {location.cityName} -
    return (
      <Col xs={6} sm={4} md={3} lg={2} key={index}>
        <SquaredContainer>
          <ImageWithErrorHandler src={imageURL} />
        </SquaredContainer>
        <div className="Location-Name">{location.name}</div>
      </Col>
    );
  }

  render() {
    const { city } = this.props;
    const { name, cabanaLocations } = city;

    return (
      <Grid componentClass="div" className="Zone">
        <Row>
          <Col sm={12}>
            <h1>{name}</h1>
          </Col>
          {cabanaLocations.map((location, index) => Zone.renderLocation(location, index))}
        </Row>
      </Grid>
    );
  }
}

const mapStateToProps = state => ({
  city: state.zone.city,
});

const mapDispatchToProps = dispatch => ({
  // setMessage: () => dispatch(setMessage()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Zone);
