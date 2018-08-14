import React from "react";
import AriaModal from "react-aria-modal";

import Button from "shared/Button";

import utils from "stylesheets/utils.scss";

const DEFAULT_CONFIRM_TEXT = "Are you sure?";
const DEFAULT_BUTTON_TEXT = "Delete";
const DEFAULT_CONFIRM_BUTTON_TEXT = "Delete";

class ConfirmModal extends React.Component {
  state = {
    confirmText: DEFAULT_CONFIRM_TEXT,
    buttonText: DEFAULT_BUTTON_TEXT,
    confirmButtonText: DEFAULT_CONFIRM_BUTTON_TEXT,
    onConfirm: null
  };

  componentDidMount() {
    this.setState({
      confirmText: this.props.text || DEFAULT_CONFIRM_TEXT,
      buttonText: this.props.buttonText || DEFAULT_BUTTON_TEXT,
      confirmButtonText: this.props.buttonText || DEFAULT_CONFIRM_BUTTON_TEXT,
      onConfirm: this.props.onConfirm
    });
  }

  openConfirm = e => {
    e.preventDefault();
    this.setState({
      active: true
    });
  };

  closeConfirm = e => {
    this.setState({
      active: false
    });
  };

  handleConfirm = e => {
    e.preventDefault();
    this.state.onConfirm(e);
  };

  render() {
    const { active, confirmButtonText, buttonText, confirmText } = this.state;
    const { className } = this.props;
    const modal = active
      ? <AriaModal
          titleText={confirmText}
          onExit={this.closeConfirm}
          initialFocus="#confirm-cancel_button"
          getApplicationNode={this.getApplicationNode}
        >
          <form
            action=""
            className={utils.modalForm}
            onSubmit={this.handleConfirm}
            key={this.state.timestamp}
            aria-live="assertive"
          >
            <h2 className={utils.modalTitle}>
              {confirmText}
            </h2>
            <div className={utils.modalContinueCancelButtons}>
              <Button
                className={utils.modalCancelButton}
                type="ghost"
                id="confirm-cancel_button"
                onClick={this.closeConfirm}
                name="confirm-cancel_button"
              >
                Cancel
              </Button>
              <Button
                type="primary"
                mustSubmit={true}
                className={utils.modalContinueButton}
              >
                {confirmButtonText}
              </Button>
            </div>
          </form>
        </AriaModal>
      : null;
    return (
      <div className={className}>
        <Button
          type="primary"
          id="confirm-open_button"
          onClick={this.openConfirm}
          name="confirm-open_button"
        >
          {buttonText}
        </Button>
        <div role="dialog">
          {modal}
        </div>
      </div>
    );
  }
}

export default ConfirmModal;
