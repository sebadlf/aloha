import React, { PureComponent } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import Select from 'react-select';

import { searchInputChange } from '../../actions/home';

class Home extends PureComponent {
  // static fetchData(store) {
  //   return store.dispatch(searchInputChange(''));
  // }

  render() {
    const {
      searchInputValue, cities, loading, searchInputChange,
    } = this.props;
    return (
      <Grid componentClass="footer">
        <Row>
          <Col sm={12}>
            <h1>Alójate Aquí</h1>
            <Select
              name="form-field-name"
              value={searchInputValue}
              options={cities}
              loading={loading}
              onInputChange={searchInputChange}
            />

          </Col>
        </Row>
      </Grid>
    );
  }
}

const mapStateToProps = state => ({
  searchInputValue: state.home.searchInputValue,
  cities: state.home.cities,
  loading: state.home.loading,
});

const mapDispatchToProps = dispatch => ({
  searchInputChange: (value) => {
    console.log(value);
    dispatch(searchInputChange(value));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
