import React, { Component } from 'react';
import _ from 'lodash';
import classNames from 'classnames';

require('./ImageWithErrorHandler.scss');

class ImageWithOrientation extends Component {
  constructor() {
    super();

    this.handleImageLoaded = this.handleImageLoaded.bind(this);
  }

  componentDidMount() {
    this.setState({
      mounted: true,
    });

    if (this.props.onLoad) {
      this.props.onLoad();
    }
  }

  handleImageLoaded() {
    this.setState({ imageStatus: 'loaded' });
  }

  render() {
    const { className } = this.props;

    const size = this.refs.imagen && this.refs.imagen.getBoundingClientRect() || { width: 0, height: 0 };

    const cs = classNames({
      [className]: !!className,
      ImageWithOrientation: 'ImageWithOrientation',
      'ImageWithOrientation-Horizontal': size.width >= size.height,
      'ImageWithOrientation-Vertical': size.height > size.width,
    });

    return <img ref="imagen" {...this.props} onLoad={this.handleImageLoaded} className={cs} />;
  }
}

class ImageWithErrorHandler extends Component {
  constructor() {
    super();
    this.state = {
      hasError: false,
    };

    this.onErrorHandler = this.onErrorHandler.bind(this);
  }

  onErrorHandler() {
    const { onError } = this.props;

    this.setState({
      hasError: true,
    });

    if (onError) {
      onError();
    }
  }

  render() {
    const { hasError } = this.state;
    const { useErrorImage, errorImage } = this.props;

    const filteredProps = _.omit(this.props, ['useErrorImage', 'errorImage']);

    return (
      hasError ? (useErrorImage && errorImage ? <ImageWithOrientation {...filteredProps} src={errorImage} onError={() => null} /> : null)
        : <ImageWithOrientation {...filteredProps} onError={this.onErrorHandler} />
    );
  }
}

ImageWithErrorHandler.defaultProps = {
  useErrorImage: true,
  errorImage: '/images/admin/utils/placeholder.png',
};

export default ImageWithErrorHandler;
