import React from "react";
import AriaModal from "react-aria-modal";

import Button from "shared/Button";

import css from "./ListNameModal.scss";

const DEFAULT_NAME = "Untitled list";
const DEFAULT_TYPE = "create";
const NAME_CHAR_LIMIT = 64;

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
    if (this.state.value === this.props.value) {
      this.setState({ active: false });
      return;
    }
    console.log("changed");
    let tempName = this.state.value.trim();
    if (tempName === "") {
      tempName = DEFAULT_NAME;
    }
    this.setState({ value: tempName, active: false });
    this.state.onChange(tempName);
  };

  render() {
    let { name, type } = this.props;
    type = type ? type : DEFAULT_TYPE;
    const { active, value } = this.state;
    const modal = active
      ? <AriaModal
          titleText="Name your list"
          onExit={this.closeForm}
          initialFocus="#cancel-name"
          getApplicationNode={this.getApplicationNode}
        >
          <form
            action=""
            className={css.nameForm}
            onSubmit={this.handleSubmit}
            key={this.state.timestamp}
            aria-live="assertive"
          >
            <h2 className={css.nameLabel}>
              <label htmlFor="list-name">
                Name your list
              </label>
            </h2>
            <input
              className={css.listName}
              id="list-name"
              name="list-name"
              placeholder="Untitled list"
              maxLength={NAME_CHAR_LIMIT}
              defaultValue={value}
              onChange={this.onValueChange}
              aria-label="Name your list"
            />
            <div className={css.saveCancelButtons}>
              <Button
                className={css.cancelButton}
                type="ghost"
                id="cancel-name"
                onClick={this.closeForm}
                name="close_button"
              >
                Cancel
              </Button>
              <Button
                type="primary"
                mustSubmit={true}
                className={css.createButton}
              >
                {type === DEFAULT_TYPE ? "Create" : "Rename"}
              </Button>
            </div>
          </form>
        </AriaModal>
      : null;
    return (
      <div>
        <Button
          type={type === DEFAULT_TYPE ? "primary" : "ghost"}
          id="edit"
          onClick={this.openForm}
          name="edit_button"
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
