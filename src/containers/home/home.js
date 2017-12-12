import React, { PureComponent } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Async } from 'react-select';
import axios from 'axios';

import { setMessage } from '../../actions/home';

// const getOptions = text => axios.get('/api')
//   .then((response) => {
//     return response.data
//   })
//   .catch((error) => {
//     console.log(error);
//   });

const getOptions = (input, callback) => {
  axios.get('/api')
    .then((response) => {
      const data = response.data.map(elem => ({ value: elem.id, label: elem.name }));

      console.log(data);

      callback(null, { options: data });
    })
    .catch((error) => {
      console.log(error);
    });
};

class Home extends PureComponent {
  static fetchData(store) {
    return store.dispatch(setMessage());
  }

  render() {
    const { message } = this.props;
    return (
      <Grid componentClass="footer">
        <Row>
          <Col sm={12}>
            <h1>Alójate Aquí</h1>
            <Async
              name="form-field-name"
              value="two"
              loadOptions={getOptions}
            />

          </Col>
        </Row>
      </Grid>
    );
  }
}

const mapStateToProps = state => ({
  message: state.home.message,
});

const mapDispatchToProps = dispatch => ({
  setMessage: () => dispatch(setMessage()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
