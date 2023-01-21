import { createPortal } from 'react-dom';
import { Component } from 'react';
// import PropTypes from 'prop-types';
import { Overlay, ModalBody } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

export default class Modal extends Component {
  //   static defaultProps = {
  //     contacts: PropTypes.arrayOf(
  //       PropTypes.shape({
  //         id: PropTypes.string.isRequired,
  //         name: PropTypes.string.isRequired,
  //         number: PropTypes.string.isRequired,
  //       }).isRequired
  //     ),
  //     filter: PropTypes.string.isRequired,
  //  };
  state = {};

  componentDidMount() {
    window.addEventListener('keydown', this.handleEscDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleEscDown);
  }

  handleEscDown = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };

  handleBackdropClick = e => {
    if (e.target === e.currentTarget) {
      this.props.onClose();
    }
  };

  render() {
    return createPortal(
      <Overlay onClick={this.handleBackdropClick}>
        <ModalBody>{this.props.children}</ModalBody>
      </Overlay>,
      modalRoot
    );
  }
}
