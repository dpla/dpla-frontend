import React from "react";

import { MAILCHIMP_LISTS } from "constants/site";

import { stylesheet, classNames } from "./StayInformed.css";

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
    console.log(data);

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
      <div className={classNames.wrapper}>
        <div className={`${classNames.content} site-max-width`}>
          <div className="row">
            <div className="col-xs-12 col-md-3">
              <div className={classNames.header}>
                <h2 className={classNames.headerText}>Stay informed</h2>
              </div>
            </div>
            <div className={`${classNames.formWrapper} col-xs-12 col-md-9`}>
              {!this.state.isSent &&
                <form onSubmit={this.handleSubmit}>
                  <h3 className={classNames.formCallToAction}>
                    Get the latest DPLA news in your inbox
                  </h3>
                  <div className={classNames.formInputs}>
                    <input
                      type="email"
                      name="email"
                      placeholder="Enter your email"
                      aria-label="Enter your email"
                      className={classNames.email}
                      onChange={this.onEmailChange}
                      onBlur={this.onEmailChange}
                      {...emailProps}
                    />
                    <input
                      type="submit"
                      value={
                        !this.state.isSending ? "Sign Up" : "Subscribing..."
                      }
                      name="signup"
                      className={classNames.button}
                      onClick={e => this.onButtonClick(e)}
                    />
                    <input
                      type="checkbox"
                      name="i_prefer_usps_mail"
                      value="1"
                      className={classNames.miel}
                      tabIndex="-1"
                      autoComplete="off"
                    />
                  </div>
                </form>}
              {this.state.isSent &&
                <h3 className={classNames.formCallToAction}>
                  You have been subscribed to the general mailing list!
                </h3>}
            </div>
          </div>
        </div>
        <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
      </div>
    );
  }
}

export default StayInformed;
