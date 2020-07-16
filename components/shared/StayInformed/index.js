import React from "react";

import { MAILCHIMP_LISTS } from "constants/site";

import css from "./StayInformed.scss";

class StayInformed extends React.Component {
  state = {
    isSending: false,
    isSent: false,
    email: undefined,
    generalNews: true,
    ebooks: false,
    education: false,
    genealogy: false,
  };

  onEmailChange = e => {
    this.setState({
      isSending: this.state.isSending,
      isSent: this.state.isSent,
      email: e.target.value
    });
  };

  onCheckboxChange = e => {
    const { name, checked } = event.target
    this.setState({ [name]: checked });
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
      <div className={css.wrapper}>
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
                      type="checkbox"
                      name="i_prefer_usps_mail"
                      value="1"
                      className={css.miel}
                      tabIndex="-1"
                      autoComplete="off"
                    />
                  </div>

                  <div className={`${css.interestsContainer} ${css.email}`}>
                    <div>
                      <input
                          type="checkbox"
                          name="generalNews"
                          checked={this.state.generalNews}
                          tabIndex="-1"
                          onChange={this.onCheckboxChange}
                        />
                      <label>
                        General News
                      </label>
                    </div>
                      
                    <div>
                      <input
                          type="checkbox"
                          name="ebooks"
                          checked={this.state.ebooks}
                          tabIndex="-1"
                          onChange={this.onCheckboxChange}
                        />
                      <label> 
                        Ebooks
                      </label>
                    </div>
                    
                    <div>
                      <input
                          type="checkbox"
                          name="education"
                          checked={this.state.education}
                          tabIndex="-1"
                          onChange={this.onCheckboxChange}
                        />
                      <label>
                          Education
                      </label>
                    </div>   

                    <div>
                      <input
                          type="checkbox"
                          name="genealogy"
                          checked={this.state.genealogy}
                          tabIndex="-1"
                          onChange={this.onCheckboxChange}
                        />
                      <label>
                          Genealogy
                      </label>
                    </div>
                  </div>
                  
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

                </form>}
              {this.state.isSent &&
                <h3 aria-live="assertive" className={css.formCallToAction}>
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
