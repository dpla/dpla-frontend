import React from "react";

import Button from "shared/Button";

import css from "./ContactForm.module.scss";
import utils from "stylesheets/utils.module.scss";

const selectOptions = [
  { value: "General inquiry", label: "General inquiry" },
  {
    value: "Item usage and rights",
    label: "Item usage and rights",
  },
  {
    value: "Hubs and adding new content to DPLA",
    label: "Hubs and adding new content to DPLA",
  },
  {
    value: "Report a problem with the website",
    label: "Report a problem with the website",
  },
  {
    value: "Report an error with our data",
    label: "Report an error with our data",
  },
  {
    value: "Report an accessibility issue",
    label: "Report an accessibility issue",
  },
  {
    value: "API, bulk data, and developer-related questions",
    label: "API, bulk data, and developer-related questions",
  },
  {
    value: "App Library submission",
    label: "App Library submission",
  },
  {
    value: "Education and Primary Source Sets",
    label: "Education and Primary Source Sets",
  },
  { value: "Community Reps", label: "Community Reps" },
  { value: "Ebooks", label: "Ebooks" },
  { value: "Press inquiry", label: "Press inquiry" },
];

class ContactForm extends React.Component {
  state = {
    isSending: false,
    isSent: false,
    email: undefined,
    name: undefined,
    message: undefined,
    subject: "General inquiry",
  };

  onEmailChange = (e) => {
    this.setState((prevState) => ({
      isSending: prevState.isSending,
      isSent: prevState.isSent,
      email: e.target.value,
      name: prevState.name,
      message: prevState.message,
      subject: prevState.subject,
    }));
  };

  onNameChange = (e) => {
    this.setState((prevState) => ({
      isSending: prevState.isSending,
      isSent: prevState.isSent,
      name: e.target.value,
      email: prevState.email,
      message: prevState.message,
      subject: prevState.subject,
    }));
  };

  onMessageChange = (e) => {
    this.setState((prevState) => ({
      isSending: prevState.isSending,
      isSent: prevState.isSent,
      message: e.target.value,
      name: prevState.name,
      email: prevState.email,
      subject: prevState.subject,
    }));
  };

  onSubjectChange = (selectedOption) => {
    this.setState((prevState) => ({
      isSending: prevState.isSending,
      isSent: prevState.isSent,
      subject: selectedOption.target.value,
      name: prevState.name,
      message: prevState.message,
      email: prevState.email,
    }));
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    if (!this.formIsValid()) return;

    this.setState((prevState) => ({
      isSending: true,
      isSent: false,
      subject: prevState.subject,
      name: prevState.name,
      message: prevState.message,
      email: prevState.email,
    }));

    const email = this.state.email;
    const name = this.state.name;
    const message = this.state.message;
    const subject = this.state.subject;
    const miel = e.target.elements.i_prefer_usps_mail.value;

    const body = JSON.stringify({
      email: email,
      name: name,
      subject: subject,
      message: message,
      miel: miel,
    });
    const res = await fetch("/g/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: body,
    });

    await res.text();

    this.setState((prevState) => ({
      isSending: false,
      isSent: true,
      subject: prevState.subject,
      name: prevState.name,
      message: prevState.message,
      email: prevState.email,
    }));
  };

  formIsValid() {
    return (
      this.state.name &&
      this.state.name.length > 0 &&
      this.state.email &&
      this.state.email.length > 0 &&
      this.state.message &&
      this.state.message.length > 0 &&
      this.state.subject &&
      this.state.subject.length > 0
    );
  }

  activateRequired = () => {
    this.setState((prevState) => ({
      isSending: prevState.isSending,
      isSent: prevState.isSent,
      message: prevState.message || "",
      name: prevState.name || "",
      email: prevState.email || "",
      subject: prevState.subject || "",
    }));
  };

  touchedAll() {
    return (
      this.state.name !== undefined &&
      this.state.email !== undefined &&
      this.state.message !== undefined
    );
  }

  render() {
    const nameProps = {
      required: this.state.name !== undefined,
    };
    const emailProps = {
      required: this.state.email !== undefined,
    };
    const messageProps = {
      required: this.state.message !== undefined,
    };
    const buttonProps = {
      mustSubmit: this.touchedAll(),
      onClick: this.activateRequired,
    };
    return (
      <div className={css.contactForm}>
        {!this.state.isSent && (
          <div>
            <p className={css.instructions}>
              We would love to hear from you! Please fill out this form and we
              will get in touch with you shortly.
            </p>
            <form onSubmit={this.handleSubmit} data-cy="contact-form">
              <label htmlFor="contact-name">
                <span>Your name (required)</span>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  onChange={this.onNameChange}
                  onFocus={this.onNameChange}
                  {...nameProps}
                />
              </label>
              <label htmlFor="contact-email">
                <span>Your email (required)</span>
                <input
                  id="contact-email"
                  type="email"
                  name="email"
                  onChange={this.onEmailChange}
                  onFocus={this.onEmailChange}
                  {...emailProps}
                />
              </label>
              <label htmlFor="contact-message">
                <span>Your message (required)</span>
                <textarea
                  id="contact-message"
                  name="message"
                  onChange={this.onMessageChange}
                  onFocus={this.onMessageChange}
                  {...messageProps}
                />
              </label>
              <label htmlFor="contact-subject">
                <span className={css.notFixed}>Subject (required)</span>
                <select
                  id="contact-subject"
                  value={this.state.subject}
                  required
                  onChange={this.onSubjectChange}
                >
                  {selectOptions.map((option, index) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </label>
              <input
                type="checkbox"
                name="i_prefer_usps_mail"
                value="1"
                className={css.miel}
                tabIndex="-1"
                autoComplete="off"
              />
              <div className={`${utils.colXs12} ${utils.colMd4}`}>
                {!this.state.isSending && (
                  <Button type="primary" {...buttonProps}>
                    Send message
                  </Button>
                )}
                {this.state.isSending && (
                  <Button
                    type="secondary"
                    className={css.disabledButton}
                    live="assertive"
                  >
                    Sending message…
                  </Button>
                )}
              </div>
            </form>
          </div>
        )}
        {this.state.isSent && (
          <div aria-live="assertive">
            <h1 className={css.header}>Thank you!</h1>
            <p className={css.instructions}>
              A DPLA staff member will contact you soon.
            </p>
          </div>
        )}
      </div>
    );
  }
}

export default ContactForm;
