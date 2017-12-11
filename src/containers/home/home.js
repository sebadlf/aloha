import React, { PureComponent } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import Select from 'react-select';

import { setMessage } from '../../actions/home';


class TypeAhead extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedOption: '',
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(selectedOption) {
    this.setState({ selectedOption });
    console.log(`Selected: ${selectedOption.label}`);
  }

  render() {
    return (
      <Select
        name="form-field-name"
        value={this.state.value}
        onChange={this.handleChange}
        options={[
          { value: 'one', label: 'One' },
          { value: 'two', label: 'Two' },
        ]}
      />
    );
  }
}

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
            <TypeAhead />
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
