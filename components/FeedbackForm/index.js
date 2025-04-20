import React from "react";
import AriaModal from "react-aria-modal";

import { withRouter } from "next/router";

import Button from "components/shared/Button";

import css from "./FeedbackForm.module.scss";

class FeedbackForm extends React.Component {
  state = {
    timestamp: Date.now(),
    isSending: false,
    isSent: false,
    url: JSON.stringify(this.props.router),
    modalActive: false,
    type: "comment",
    step: 1,
    email: "",
    message: undefined,
  };

  closeForm = (e) => {
    this.setState((prevState) => ({
      timestamp: prevState.timestamp,
      isSending: false,
      isSent: false,
      url: prevState.url,
      modalActive: false,
      type: "comment",
      step: 1,
      email: "",
      message: undefined,
    }));
  };

  openForm = (e) => {
    e.preventDefault();
    this.setState((prevState) => ({
      timestamp: Date.now(),
      isSending: false,
      isSent: false,
      url: prevState.url,
      modalActive: true,
      type: "comment",
      step: 1,
      email: "",
      message: undefined,
    }));
  };

  onTypeChange = (e) => {
    this.setState((prevState) => ({
      timestamp: prevState.timestamp,
      isSending: prevState.isSending,
      isSent: prevState.isSent,
      url: prevState.url,
      modalActive: prevState.modalActive,
      type: e.target.value,
      step: prevState.step,
      email: prevState.email,
      message: prevState.message,
    }));
  };

  onMessageChange = (e) => {
    this.setState((prevState) => ({
      timestamp: prevState.timestamp,
      isSending: prevState.isSending,
      isSent: prevState.isSent,
      url: prevState.url,
      modalActive: prevState.modalActive,
      type: prevState.type,
      step: prevState.step,
      email: prevState.email,
      message: e.target.value,
    }));
  };

  onEmailChange = (e) => {
    this.setState((prevState) => ({
      timestamp: prevState.timestamp,
      isSending: prevState.isSending,
      isSent: prevState.isSent,
      url: prevState.url,
      modalActive: prevState.modalActive,
      type: prevState.type,
      step: prevState.step,
      email: e.target.value,
      message: prevState.message,
    }));
  };

  activateRequired = (e) => {
    this.setState((prevState) => ({
      timestamp: prevState.timestamp,
      isSending: prevState.isSending,
      isSent: prevState.isSent,
      url: prevState.url,
      modalActive: prevState.modalActive,
      type: prevState.type,
      step: prevState.step,
      email: prevState.email,
      message: prevState.message || "",
    }));
  };

  formIsValid() {
    return this.state.message && this.state.message.length > 0;
  }

  touchedAll() {
    return this.state.message !== undefined;
  }

  handleSubmit = async (e) => {
    const close_button = e.target.elements.close_button;
    e.preventDefault();
    if (!this.formIsValid()) return;
    this.setState((prevState) => ({
      timestamp: prevState.timestamp,
      isSending: true,
      isSent: false,
      url: prevState.url,
      modalActive: prevState.modalActive,
      type: prevState.type,
      step: 2,
      email: prevState.email,
      message: prevState.message,
    }));

    const url = this.state.url;
    const message = this.state.message;
    const type = this.state.type;
    const email = this.state.email;
    const miel = e.target.elements.i_prefer_usps_mail.value;
    const body = JSON.stringify({
      url: url,
      type: type,
      message: message,
      email: email,
      miel: miel,
    });
    const res = await fetch("/g/feedback", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: body,
    });
    const data = await res.text();
    if (!data.ok) throw new Error("Failed to send feedback");

    this.setState((prevState) => ({
      timestamp: prevState.timestamp,
      isSending: false,
      isSent: true,
      url: prevState.url,
      modalActive: prevState.modalActive,
      type: prevState.type,
      step: prevState.step,
      email: prevState.email,
      message: prevState.message,
    }));

    close_button.focus();
  };

  render() {
    const charLimit = 400;
    const step = this.state.step;
    const url = this.state.url;
    const modalActive = this.state.modalActive;
    const isSending = this.state.isSending;
    const type = this.state.type;
    const message = this.state.message;
    const email = this.state.email;
    const characters = charLimit - (message ? message.length : 0);
    const messageProps = { required: this.state.message !== undefined };
    const buttonProps = {
      mustSubmit: this.touchedAll(),
      onClick: this.activateRequired,
    };
    const modal = !modalActive ?  <></> : (
      <AriaModal
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
          {step === 1 && (
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
            </ul>
          )}
          {step === 1 && (
            <textarea
              id="feedback-text"
              name="feedback_text"
              placeholder="Enter your feedback"
              maxLength={charLimit}
              onChange={this.onMessageChange}
              aria-label="Enter your feedback"
              {...messageProps}
            />
          )}
          {step === 1 && (
            <div
              id="feedback-counter"
              aria-live="polite"
              className={css.characterCount}
            >
              {characters} characters remaining
            </div>
          )}
          {step === 1 && (
            <input
              id="feedback-email"
              type="email"
              name="feedback_email"
              placeholder="Email (optional)"
              onChange={this.onEmailChange}
              aria-label="Enter your email (optional)"
              value={email}
            />
          )}

          {step === 2 && (
            <p className={css.thankYou}>Thank you for your feedback.</p>
          )}

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
            {!isSending && step === 1 && (
              <Button
                type="primary"
                className={css.sendButton}
                {...buttonProps}
              >
                Send
              </Button>
            )}
            {isSending && (
              <Button
                type="secondary"
                className={`${css.sendButton} ${css.disabledButton}`}
                live="assertive"
              >
                Sending…
              </Button>
            )}
          </div>
        </form>
      </AriaModal>
    );
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

export default withRouter(FeedbackForm);
