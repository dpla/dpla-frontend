import React from "react";
import fetch from "isomorphic-fetch";

import Button from "shared/Button";

import css from "./ContactForm.scss";

const selectOptions = [
  { value: "General inquiry", label: "General inquiry" },
  {
    value: "Item usage and rights",
    label: "Item usage and rights"
  },
  {
    value: "Hubs and adding new content to DPLA",
    label: "Hubs and adding new content to DPLA"
  },
  {
    value: "Report a problem with the website",
    label: "Report a problem with the website"
  },
  {
    value: "Report an error with our data",
    label: "Report an error with our data"
  },
  {
    value: "Report an accessibility issue",
    label: "Report an accessibility issue"
  },
  {
    value: "API, bulk data, and developer-related questions",
    label: "API, bulk data, and developer-related questions"
  },
  {
    value: "App Library subsmission",
    label: "App Library subsmission"
  },
  {
    value: "Education and Primary Source Sets",
    label: "Education and Primary Source Sets"
  },
  { value: "Community Reps", label: "Community Reps" },
  { value: "Ebooks", label: "Ebooks" },
  { value: "Press inquiry", label: "Press inquiry" }
];

class ContactForm extends React.Component {
  state = {
    isSending: false,
    isSent: false,
    email: undefined,
    name: undefined,
    message: undefined,
    subject: "General inquiry"
  };

  onEmailChange = e => {
    this.setState({
      isSending: this.state.isSending,
      isSent: this.state.isSent,
      email: e.target.value,
      name: this.state.name,
      message: this.state.message,
      subject: this.state.subject
    });
  };

  onNameChange = e => {
    this.setState({
      isSending: this.state.isSending,
      isSent: this.state.isSent,
      name: e.target.value,
      email: this.state.email,
      message: this.state.message,
      subject: this.state.subject
    });
  };

  onMessageChange = e => {
    this.setState({
      isSending: this.state.isSending,
      isSent: this.state.isSent,
      message: e.target.value,
      name: this.state.name,
      email: this.state.email,
      subject: this.state.subject
    });
  };

  onSubjectChange = selectedOption => {
    this.setState({
      isSending: this.state.isSending,
      isSent: this.state.isSent,
      subject: selectedOption.value,
      name: this.state.name,
      message: this.state.message,
      email: this.state.email
    });
  };

  handleSubmit = async e => {
    e.preventDefault();
    if (!this.formIsValid()) return;

    this.setState({
      isSending: true,
      isSent: false,
      subject: this.state.subject,
      name: this.state.name,
      message: this.state.message,
      email: this.state.email
    });

    let email = this.state.email;
    let name = this.state.name;
    let message = this.state.message;
    let subject = this.state.subject;
    let miel = e.target.elements.i_prefer_usps_mail.value;

    let body = JSON.stringify({
      email: email,
      name: name,
      subject: subject,
      message: message,
      miel: miel
    });
    const res = await fetch("/g/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      },
      body: body
    });
    const data = await res.text();

    this.setState({
      isSending: false,
      isSent: true,
      subject: this.state.subject,
      name: this.state.name,
      message: this.state.message,
      email: this.state.email
    });
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
    this.setState({
      isSending: this.state.isSending,
      isSent: this.state.isSent,
      message: this.state.message || "",
      name: this.state.name || "",
      email: this.state.email || "",
      subject: this.state.subject || ""
    });
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
      required: this.state.name !== undefined
    };
    const emailProps = {
      required: this.state.email !== undefined
    };
    const messageProps = {
      required: this.state.message !== undefined
    };
    const subjectProps = {
      required: this.state.subject !== undefined
    };
    const buttonProps = {
      mustSubmit: this.touchedAll(),
      onClick: this.activateRequired
    };
    return (
      <div className={css.contactForm}>
        {!this.state.isSent &&
          <div>
            <p className={css.instructions}>
              We would love to hear from you! Please fill out this form and we
              will
              get in touch with you shortly.
            </p>
            <form onSubmit={this.handleSubmit}>
              <label htmlFor="contact-name">
                <span>
                  Your name (required)
                </span>
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
                <span>
                  Your email (required)
                </span>
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
                <span>
                  Your message (required)
                </span>
                <textarea
                  id="contact-message"
                  name="message"
                  onChange={this.onMessageChange}
                  onFocus={this.onMessageChange}
                  {...messageProps}
                />
              </label>
              <label htmlFor="contact-subject">
                <span className={css.notFixed}>
                  Subject (required)
                </span>
                <select
                  id="contact-subject"
                  value={this.state.subject}
                  required
                  onChange={this.onSubjectChange}
                >
                  {selectOptions.map((option, index) =>
                    <option key={index} value={option.value}>
                      {option.label}
                    </option>
                  )}
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
              <div className={`col-xs-12 col-md-4`}>
                {!this.state.isSending &&
                  <Button type="primary" {...buttonProps}>
                    Send message
                  </Button>}
                {this.state.isSending &&
                  <Button
                    type="secondary"
                    className={css.disabledButton}
                    live="assertive"
                  >
                    Sending message…
                  </Button>}
              </div>
            </form>
          </div>}
        {this.state.isSent &&
          <div aria-live="assertive">
            <h1 className={css.header}>Thank you!</h1>
            <p className={css.instructions}>
              A DPLA staff member will contact you soon.
            </p>
          </div>}
      </div>
    );
  }
}

export default ContactForm;
