import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import { Grid, Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';

import * as actions from '../../actions/location';
import SquaredContainer from '../../components/squaredContainer';
import ImageWithErrorHandler from '../../components/imageWithErrorHandler';

require('./location.scss');

class Location extends PureComponent {
  static fetchData(store, params) {
    const { slug } = params;
    return store.dispatch(actions.getLocation(slug));
  }

  static renderImg(img, index) {
    const imageUrl = img.url.replace('arfotos', 'ar/fotos');
    return (
      <Col xs={6} sm={4} md={3} lg={2} key={index}>
        <SquaredContainer>
          <ImageWithErrorHandler src={imageUrl} />
        </SquaredContainer>
      </Col>
    );
  }

  static renderData(data, index) {
    return (
      <p key={index}>
        <strong>{data.title}: </strong>
        {data.text}
      </p>
    );
  }

  componentDidMount() {
    // const { slug } = this.props.match.params;
    // const { location, getLocation } = this.props;

    // if (!location || Number(location.id) !== Number(slug)) {
    //   getLocation(slug);
    // }
  }

  render() {
    const { location, staticContext } = this.props;

    console.log(this.props);

    if (!location || !location.id) {
      staticContext.status = 404;
      return null;
    }

    const { name } = location;

    return (
      <Grid componentClass="div" className="Location">
        <Row>
          <Col sm={12}>
            <h1>{name}</h1>
          </Col>
          <hr />
          <Col xs={12}>
            {location.cabanaImgs.map((img, index) => Location.renderImg(img, index))}
            {location.cabanaData.map((data, index) => Location.renderData(data, index))}
          </Col>
        </Row>
      </Grid>
    );
  }
}

const mapStateToProps = state => ({
  location: state.location.location,
});

const mapDispatchToProps = dispatch => ({
  getLocation: slug => dispatch(actions.getLocation(slug)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Location);
