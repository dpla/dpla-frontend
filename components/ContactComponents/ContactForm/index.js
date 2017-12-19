import React from "react";
import fetch from "isomorphic-fetch";

import Button from "../../shared/Button";

import { classNames, stylesheet } from "./ContactForm.css";
import { TITLE } from "constants/contact";

class ContactForm extends React.Component {
  state = { isSending: false, isSent: false };

  handleSubmit = async e => {
    this.setState({ isSending: true, isSent: false });

    e.preventDefault();
    // e.target.elements.send.text = "Sending...";
    let email = e.target.elements.email.value;
    let name = e.target.elements.name.value;
    let message = e.target.elements.message.value;
    let fax = e.target.elements.contact_me_by_fax_only.value;
    let body = JSON.stringify({
      email: email,
      name: name,
      message: message,
      fax: fax
    });
    const res = await fetch("/g/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      },
      body: body
    });
    const data = await res.text();
    this.setState({ isSending: false, isSent: true });
  };

  render() {
    return (
      <div className={classNames.contactForm}>
        {!this.state.isSent &&
          <div>
            <h1 className={classNames.header}>{TITLE}</h1>
            <p className={classNames.instructions}>
              We would love to hear from you! Please fill out this form and we
              will
              get in touch with you shortly.
            </p>
            <form onSubmit={this.handleSubmit}>
              <label htmlFor="contact-name">
                <span>
                  Your name
                </span>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  required
                  aria-required="true"
                />
              </label>
              <label htmlFor="contact-email">
                <span>
                  Your email
                </span>
                <input
                  id="contact-email"
                  type="email"
                  name="email"
                  required
                  aria-required="true"
                />
              </label>
              <label htmlFor="contact-message">
                <span>
                  Your message
                </span>
                <textarea
                  id="contact-message"
                  name="message"
                  required
                  aria-required="true"
                />
              </label>
              <input
                type="checkbox"
                name="contact_me_by_fax_only"
                value="1"
                className={classNames.fax}
                tabIndex="-1"
                autoComplete="off"
              />
              {!this.state.isSending &&
                <Button type="primary" mustSubmit={true}>
                  Send message
                </Button>}
              {this.state.isSending &&
                <Button
                  type="secondary"
                  className={classNames.disabledButton}
                  live="assertive"
                >
                  Sending message…
                </Button>}
            </form>
          </div>}
        {this.state.isSent &&
          <div aria-live="assertive">
            <h1 className={classNames.header}>Thank you!</h1>
            <p className={classNames.instructions}>
              A DPLA staff member will contact you soon.
            </p>
          </div>}
        <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
      </div>
    );
  }
}

export default ContactForm;
