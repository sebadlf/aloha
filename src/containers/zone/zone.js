import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import { Grid, Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';

import * as actions from '../../actions/zone';
import SquaredContainer from '../../components/squaredContainer';
import ImageWithErrorHandler from '../../components/imageWithErrorHandler';

require('./zone.scss');

class Zone extends PureComponent {
  static fetchData(store, params) {
    const { slug } = params;
    return store.dispatch(actions.getZone(slug));
  }

  static renderLocation(location, index) {
    const imageURL = location.cabanaImgs && location.cabanaImgs.length ?
      location.cabanaImgs[0].url.replace('arfotos', 'ar/fotos') : null;

    return (
      <Col xs={6} sm={4} md={3} lg={2} key={index}>
        <Link href={`/location/${location.id}`} to={`/location/${location.id}`}>
          <SquaredContainer>
            <ImageWithErrorHandler src={imageURL} />
          </SquaredContainer>
          <div className="Location-Name">{location.name}</div>
        </Link>
      </Col>
    );
  }

  componentDidMount() {
    const { slug } = this.props.match.params;
    const { city, getZone } = this.props;

    if (!city || !city.id !== slug) {
      getZone(slug);
    }
  }

  render() {
    const { city } = this.props;

    if (!city || !city.id) {
      return null;
    }

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
  getZone: slug => dispatch(actions.getZone(slug)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Zone);
