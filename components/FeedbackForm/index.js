import React from "react";
import fetch from "isomorphic-fetch";
import AriaModal from "react-aria-modal";

import Button from "components/shared/Button";

import css from "./FeedbackForm.scss";

class FeedbackForm extends React.Component {
  state = {
    timestamp: Date.now(),
    isSending: false,
    isSent: false,
    url: JSON.stringify(this.props.route),
    modalActive: false,
    type: "comment",
    step: 1,
    email: "",
    message: undefined
  };

  closeForm = e => {
    this.setState({
      timestamp: this.state.timestamp,
      isSending: false,
      isSent: false,
      url: this.state.url,
      modalActive: false,
      type: "comment",
      step: 1,
      email: "",
      message: undefined
    });
  };

  openForm = e => {
    e.preventDefault();
    this.setState({
      timestamp: Date.now(),
      isSending: false,
      isSent: false,
      url: this.state.url,
      modalActive: true,
      type: "comment",
      step: 1,
      email: "",
      message: undefined
    });
  };

  onTypeChange = e => {
    this.setState({
      timestamp: this.state.timestamp,
      isSending: this.state.isSending,
      isSent: this.state.isSent,
      url: this.state.url,
      modalActive: this.state.modalActive,
      type: e.target.value,
      step: this.state.step,
      email: this.state.email,
      message: this.state.message
    });
  };

  onMessageChange = e => {
    this.setState({
      timestamp: this.state.timestamp,
      isSending: this.state.isSending,
      isSent: this.state.isSent,
      url: this.state.url,
      modalActive: this.state.modalActive,
      type: this.state.type,
      step: this.state.step,
      email: this.state.email,
      message: e.target.value
    });
  };

  onEmailChange = e => {
    this.setState({
      timestamp: this.state.timestamp,
      isSending: this.state.isSending,
      isSent: this.state.isSent,
      url: this.state.url,
      modalActive: this.state.modalActive,
      type: this.state.type,
      step: this.state.step,
      email: e.target.value,
      message: this.state.message
    });
  };

  activateRequired = e => {
    this.setState({
      timestamp: this.state.timestamp,
      isSending: this.state.isSending,
      isSent: this.state.isSent,
      url: this.state.url,
      modalActive: this.state.modalActive,
      type: this.state.type,
      step: this.state.step,
      email: this.state.email,
      message: this.state.message || ""
    });
  };

  formIsValid() {
    return this.state.message && this.state.message.length > 0;
  }

  touchedAll() {
    return this.state.message !== undefined;
  }

  handleSubmit = async e => {
    let close_button = e.target.elements.close_button;
    e.preventDefault();
    if (!this.formIsValid()) return;

    this.setState({
      timestamp: this.state.timestamp,
      isSending: true,
      isSent: false,
      url: this.state.url,
      modalActive: this.state.modalActive,
      type: this.state.type,
      step: 2,
      email: this.state.email,
      message: this.state.message
    });

    let url = this.state.url;
    let message = this.state.message;
    let type = this.state.type;
    let email = this.state.email;
    let miel = e.target.elements.i_prefer_usps_mail.value;

    let body = JSON.stringify({
      url: url,
      type: type,
      message: message,
      email: email,
      miel: miel
    });
    const res = await fetch("/g/feedback", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      },
      body: body
    });
    const data = await res.text();

    this.setState({
      timestamp: this.state.timestamp,
      isSending: false,
      isSent: true,
      url: this.state.url,
      modalActive: this.state.modalActive,
      type: this.state.type,
      step: this.state.step,
      email: this.state.email,
      message: this.state.message
    });

    close_button.focus();
  };

  render() {
    const charLimit = 400;
    const step = this.state.step;
    const url = this.state.url;
    const modalActive = this.state.modalActive;
    const isSending = this.state.isSending;
    const isSent = this.state.isSent;
    const type = this.state.type;
    const message = this.state.message;
    const email = this.state.email;
    const characters = charLimit - (message ? message.length : 0);
    const messageProps = { required: this.state.message !== undefined };
    const buttonProps = {
      mustSubmit: this.touchedAll(),
      onClick: this.activateRequired
    };
    const modal = modalActive
      ? <AriaModal
          titleText="Feedback"
          onExit={this.closeForm}
          initialFocus="#deactivate-feedback"
          getApplicationNode={this.getApplicationNode}
        >
          <form
            className={css.feedbackForm}
            onSubmit={this.handleSubmit}
            key={this.state.timestamp}
            aria-live="assertive"
          >
            <input
              type="checkbox"
              name="i_prefer_usps_mail"
              value="1"
              className={css.miel}
              tabIndex="-1"
              autoComplete="off"
            />
            <input name="frompage" value={url} type="hidden" />
            <h2 className={css.title}>
              {step === 1 && <span>Feedback</span>}
              {step === 2 && <span>Thank you!</span>}
            </h2>
            {step === 1 &&
              <ul>
                <li>
                  <input
                    id="feedback-1"
                    value="comment"
                    name="type"
                    onChange={this.onTypeChange}
                    checked={type === "comment"}
                    type="radio"
                  />
                  <label htmlFor="feedback-1">Comment</label>
                </li>
                <li>
                  <input
                    id="feedback-2"
                    value="correction"
                    name="type"
                    onChange={this.onTypeChange}
                    checked={type === "correction"}
                    type="radio"
                  />
                  <label htmlFor="feedback-2">Correction</label>
                </li>
                <li>
                  <input
                    id="feedback-3"
                    value="bug"
                    name="type"
                    onChange={this.onTypeChange}
                    checked={type === "bug"}
                    type="radio"
                  />
                  <label htmlFor="feedback-3">Bug</label>
                </li>
              </ul>}
            {step === 1 &&
              <textarea
                id="feedback-text"
                name="feedback_text"
                placeholder="Enter your feedback"
                maxLength={charLimit}
                onChange={this.onMessageChange}
                aria-label="Enter your feedback"
                {...messageProps}
              />}
            {step === 1 &&
              <div
                id="feedback-counter"
                aria-live="polite"
                className={css.characterCount}
              >
                {characters} characters remaining
              </div>}
            {step === 1 &&
              <input
                id="feedback-email"
                type="email"
                name="feedback_email"
                placeholder="Email (optional)"
                onChange={this.onEmailChange}
                aria-label="Enter your email (optional)"
                value={email}
              />}

            {step === 2 &&
              <p className={css.thankYou}>
                Thank you for your feedback.
              </p>}

            <div className={css.sendCancelButtons}>
              <Button
                className={css.cancelButton}
                type="ghost"
                id="deactivate-feedback"
                onClick={this.closeForm}
                name="close_button"
              >
                {step === 1 ? "Cancel" : "Close"}
              </Button>
              {!isSending &&
                step === 1 &&
                <Button
                  type="primary"
                  className={css.sendButton}
                  {...buttonProps}
                >
                  Send
                </Button>}
              {isSending &&
                <Button
                  type="secondary"
                  className={`${css.sendButton} ${css.disabledButton}`}
                  live="assertive"
                >
                  Sending…
                </Button>}
            </div>
          </form>
        </AriaModal>
      : false;
    return (
      <div className={css.feedbackComponent}>
        <a href="#" className={css.feedbackButton} onClick={this.openForm}>
          Feedback
        </a>
        <div
          role="dialog"
          className={`${css.feedbackModal} ${modalActive ? css.open : ""}`}
        >
          {modal}
        </div>
      </div>
    );
  }
}

export default FeedbackForm;
