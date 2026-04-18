import React from "react";
import AriaModal from "react-aria-modal";

import Button from "shared/Button";

const DEFAULT_CONFIRM_TEXT = "Are you sure?";
const DEFAULT_BUTTON_TEXT = "Delete";

import utils from "stylesheets/utils.module.scss"

class ConfirmModal extends React.Component {
  state = {
    active: false,
    timestamp: null,
  };

  openConfirm = e => {
    e.preventDefault();
    this.setState({
      active: true,
      timestamp: Date.now(),
    });
  };

  closeConfirm = () => {
    this.setState({
      active: false
    });
  };

  handleConfirm = e => {
    e.preventDefault();
    if (typeof this.props.onConfirm === "function") {
      this.props.onConfirm(e);
    }
  };

  render() {
    const { active } = this.state;
    const { className, text, buttonText: buttonTextProp } = this.props;
    const confirmText = text || DEFAULT_CONFIRM_TEXT;
    const buttonText = buttonTextProp || DEFAULT_BUTTON_TEXT;
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
                {buttonText}
              </Button>
            </div>
          </form>
        </AriaModal>
      : <></>;
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
