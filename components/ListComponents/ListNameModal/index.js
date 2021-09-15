import React from "react";
import AriaModal from "react-aria-modal";

import Button from "shared/Button";

const DEFAULT_NAME = "Untitled list";
const DEFAULT_TYPE = "create";
const NAME_CHAR_LIMIT = 64;

import utils from "stylesheets/utils.module.scss"

class ListNameModal extends React.Component {
  state = {
    active: false,
    value: "",
    onChange: null
  };

  componentDidMount() {
    this.setState({
      value: this.props.value,
      onChange: this.props.onChange
    });
  }

  openForm = e => {
    e.preventDefault();
    this.setState({
      active: true
    });
  };

  closeForm = e => {
    this.setState({
      value: this.props.value,
      active: false
    });
  };

  onValueChange = e => {
    this.setState({
      value: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    let tempName = this.state.value.trim();
    if (tempName === "") {
      tempName = DEFAULT_NAME;
    }
    this.setState({ value: "", active: false });
    this.state.onChange(tempName);
  };

  render() {
    let { name, type, className } = this.props;
    type = type ? type : DEFAULT_TYPE;
    const { active, value } = this.state;
    const modal = active
      ? <AriaModal
          titleText="Name your list"
          onExit={this.closeForm}
          initialFocus="#list-cancel_button"
          getApplicationNode={this.getApplicationNode}
        >
          <form
            action=""
            className={'.modalForm'}
            onSubmit={this.handleSubmit}
            key={this.state.timestamp}
            aria-live="assertive"
          >
            <h2 className={utils.modalTitle}>
              <label htmlFor="list-name">
                Name your list
              </label>
            </h2>
            <input
              className={'.modalTextInput'}
              id="list-name"
              name="list-name"
              placeholder="Untitled list"
              maxLength={NAME_CHAR_LIMIT}
              defaultValue={type === DEFAULT_TYPE ? "" : value}
              onChange={this.onValueChange}
              aria-label="Name your list"
            />
            <div className={'.modalContinueCancelButtons'}>
              <Button
                className={'.modalCancelButton'}
                type="ghost"
                id="list-cancel_button"
                onClick={this.closeForm}
                name="list-cancel_button"
              >
                Cancel
              </Button>
              <Button
                type="primary"
                mustSubmit={true}
                className={'.modalContinueButton'}
              >
                {type === DEFAULT_TYPE ? "Create" : "Rename"}
              </Button>
            </div>
          </form>
        </AriaModal>
      : null;
    return (
      <div className={className}>
        <Button
          type={type === DEFAULT_TYPE ? "primary" : "ghost"}
          id="list-edit"
          onClick={this.openForm}
          name="list-edit_button"
        >
          {name}
        </Button>
        <div role="dialog">
          {modal}
        </div>
      </div>
    );
  }
}

export default ListNameModal;
