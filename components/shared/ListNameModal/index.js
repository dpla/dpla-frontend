import React from "react";
import AriaModal from "react-aria-modal";

import Button from "shared/Button";

import css from "./ListNameModal.scss";

const NAME_CHAR_LIMIT = 64;

class ListNameModal extends React.Component {
  state = {
    active: false,
    value: ""
  };

  openForm = e => {
    e.preventDefault();
    this.setState({
      active: true
    });
  };

  closeForm = e => {
    this.setState({
      value: "",
      active: false
    });
  };

  onValueChange = e => {
    this.setState({
      value: e.target.value
    });
  };

  render() {
    const { active } = this.state;
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
            onSubmit={this.handleNameSubmit}
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
                Create
              </Button>
            </div>
          </form>
        </AriaModal>
      : null;
    return (
      <div>
        <Button
          type="ghost"
          id="edit"
          onClick={this.openForm}
          name="edit_button"
        >
          Edit
        </Button>
        <div role="dialog">
          {modal}
        </div>
      </div>
    );
  }
}

export default ListNameModal;
