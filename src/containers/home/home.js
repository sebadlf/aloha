import React, { PureComponent } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import Select from 'react-select';

import { searchInputChange, valueChange } from '../../actions/home';

class Home extends PureComponent {
  // static fetchData(store) {
  //   return store.dispatch(searchInputChange(''));
  // }

  render() {
    const {
      value, inputValue, options, loading, onInputChange, onChange,
    } = this.props;
    return (
      <Grid componentClass="footer">
        <Row>
          <Col sm={12}>
            <h1>Alójate Aquí</h1>
            <Select
              name="form-field-name"
              value={value}
              options={options}
              loading={loading}
              onInputChange={onInputChange}
              onChange={onChange}
            />

          </Col>
        </Row>
      </Grid>
    );
  }
}

const mapStateToProps = state => ({
  inputValue: state.home.searchInputValue,
  value: state.home.searchValue,
  options: state.home.cities,
  loading: state.home.loading,
});

const mapDispatchToProps = dispatch => ({
  onInputChange: value => dispatch(searchInputChange(value)),
  onChange: value => dispatch(valueChange(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
