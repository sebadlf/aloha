import React from 'react';

require('./squaredContainer.scss');

const SquaredContainer = (props) => {
  const { children } = props;
  return (
    <div className="SquaredContainer square">
      <div className="content">
        {children}
      </div>
    </div>
  );
};

export default SquaredContainer;

// import React, { PureComponent } from 'react';
// import { connect } from 'react-redux';
// import classNames from 'classnames';

// require('./squaredContainer.scss');

// class SquaredContainer extends PureComponent {
//   componentDidMount() {
//     this.setState({
//       mounted: true,
//     });
//   }

//   render() {
//     const { children, className, onClick } = this.props;
//     const width = this.refs.container ? `${this.refs.container.getBoundingClientRect().width}px` : '';

//     return (
//       <div
//         onClick={onClick}
//         ref="container"
//         className={classNames({ SquaredContainer: width, [className]: className && width })}
//         style={{
//           position: 'relative',
//           width: '100%',
//           height: width,
//         }}
//       >
//         {width ? children : null}
//       </div>
//     );
//   }
// }

// const mapStateToProps = (state, ownProps) => ({
//   width: state.app.size.width,
//   height: state.app.size.height,
// });

// const mapDispatchToProps = (dispatch, ownProps) => ({});

// export default connect(mapStateToProps, mapDispatchToProps)(SquaredContainer);
