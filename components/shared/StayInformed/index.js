import React from "react";

import { MAILCHIMP_LISTS } from "constants/site";

import css from "./StayInformed.scss";

class StayInformed extends React.Component {
  state = {
    isSending: false,
    isSent: false,
    email: undefined
  };

  onEmailChange = e => {
    this.setState({
      isSending: this.state.isSending,
      isSent: this.state.isSent,
      email: e.target.value
    });
  };

  onButtonClick(e) {
    if (!this.state.email) {
      this.setState({
        isSending: this.state.isSending,
        isSent: this.state.isSent,
        email: ""
      });
    }
  }

  handleSubmit = async e => {
    e.preventDefault();
    if (!this.formIsValid()) return;

    this.setState({
      isSending: true,
      isSent: false,
      email: this.state.email
    });

    let email = this.state.email;
    let miel = e.target.elements.i_prefer_usps_mail.value;

    let body = JSON.stringify({
      email: email,
      id: MAILCHIMP_LISTS.NEWS,
      miel: miel
    });
    const res = await fetch(`/m`, {
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
      email: this.state.email
    });
  };

  formIsValid() {
    return this.state.email && this.state.email.length > 3;
  }

  activateRequired = () => {
    this.setState({
      isSending: this.state.isSending,
      isSent: this.state.isSent,
      email: this.state.email || ""
    });
  };

  render() {
    const emailProps = { required: this.state.email !== undefined };
    return (
      <div className={css.wrapper} data-cy="StayInformed">
        <div className={`${css.content} site-max-width`}>
          <div className="row">
            <div className="col-xs-12 col-md-3">
              <div className={css.header}>
                <h2 className={css.headerText}>Stay informed</h2>
              </div>
            </div>
            <div className={`${css.formWrapper} col-xs-12 col-md-9`}>
              {!this.state.isSent &&
                <form className={css.form} onSubmit={this.handleSubmit}>
                  <h3 className={css.formCallToAction}>
                    Get the latest DPLA news in your inbox
                  </h3>
                  <div className={css.formInputs}>
                    <input
                      type="email"
                      name="email"
                      placeholder="Enter your email"
                      aria-label="Enter your email"
                      className={css.email}
                      onChange={this.onEmailChange}
                      onBlur={this.onEmailChange}
                      {...emailProps}
                    />
                    <input
                      aria-live="assertive"
                      type="submit"
                      value={
                        !this.state.isSending ? "Sign Up" : "Subscribing..."
                      }
                      name="signup"
                      className={css.button}
                      onClick={e => this.onButtonClick(e)}
                    />
                    <input
                      type="checkbox"
                      name="i_prefer_usps_mail"
                      value="1"
                      className={css.miel}
                      tabIndex="-1"
                      autoComplete="off"
                    />
                  </div>
                </form>}
              {this.state.isSent &&
                <h3 aria-live="assertive" className={css.formCallToAction} data-cy="subscriptionConfirmation">
                  You have successfully subscribed to DPLA's general email list!
                  We'll send you announcements about our projects and events.
                </h3>}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default StayInformed;
