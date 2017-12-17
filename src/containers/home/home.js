import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
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
      searchInputValue, cities, loading, inputChange,
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
              isLoading={loading}
              onInputChange={inputChange}
            />

          </Col>
        </Row>
      </Grid>
    );
  }
}

const cityAutocompleShape = PropTypes.shape({
  value: PropTypes.number.isRequired,
  label: PropTypes.string.isRequired,
});

Home.propTypes = {
  searchInputValue: PropTypes.string.isRequired,
  cities: PropTypes.arrayOf(cityAutocompleShape).isRequired,
  loading: PropTypes.bool.isRequired,
  inputChange: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  searchInputValue: state.home.searchInputValue,
  cities: state.home.cities,
  loading: state.home.loading,
});

const mapDispatchToProps = dispatch => ({
  inputChange: value => dispatch(searchInputChange(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
