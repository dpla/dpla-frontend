import React from "react";

import { MAILCHIMP_LIST_ID, MAILCHIMP_GROUP_IDS } from "constants/site";

import css from "./StayInformed.module.scss";
import utils from "stylesheets/utils.module.scss";

class StayInformed extends React.Component {
  state = {
    isSending: false,
    isSent: false,
    email: undefined,
    interests: {
      news: {
        group_id: MAILCHIMP_GROUP_IDS.NEWS,
        value: true,
      },
      ebooks: {
        group_id: MAILCHIMP_GROUP_IDS.EBOOKS,
        value: false,
      },
      education: {
        group_id: MAILCHIMP_GROUP_IDS.EDUCATION,
        value: false,
      },
      genealogy: {
        group_id: MAILCHIMP_GROUP_IDS.GENEALOGY,
        value: false,
      },
    },
  };

  onEmailChange = (e) => {
    this.setState((prevState) => ({
      isSending: prevState.isSending,
      isSent: prevState.isSent,
      email: e.target.value,
    }));
  };

  onCheckboxChange = (e) => {
    const { name, checked } = e.target;

    this.setState((prevState) => ({
      interests: {
        ...prevState.interests,
        [name]: {
          ...prevState.interests[name],
          value: checked,
        },
      },
    }));
  };

  onButtonClick() {
    if (!this.state.email) {
      this.setState((prevState) => ({
        isSending: prevState.isSending,
        isSent: prevState.isSent,
        email: "",
      }));
    }
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    if (!this.formIsValid()) return;

    this.setState((prevState) => ({
      isSending: true,
      isSent: false,
      email: prevState,
    }));

    const email = this.state.email;
    const miel = e.target.elements.i_prefer_usps_mail.value;

    const body = JSON.stringify({
      email,
      id: MAILCHIMP_LIST_ID,
      miel,
      interests,
    });

    const res = await fetch("/mailchimp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: body,
    });

    if (!res.ok) {
      console.error("Form not recorded: " + res.status);
    }

    this.setState((prevState) => ({
      isSending: false,
      isSent: true,
      email: prevState.email,
    }));
  };

  formIsValid() {
    return this.state.email &&
      this.state.email.length > 3 &&
      this.state.interests &&
      this.state.interests.length > 0;
  }

  render() {
    const emailProps = { required: this.state.email !== undefined };
    return (
      <div className={css.wrapper} data-cy="stay-informed">
        <div className={`${css.content} ${utils.siteMaxWidth}`}>
          <div className={utils.row}>
            <div className={`${utils.colXs12} ${utils.colMd3}`}>
              <div className={css.header}>
                <h2 className={css.headerText}>Stay informed</h2>
              </div>
            </div>
            <div
              className={`${css.formWrapper} ${utils.colXs12} ${utils.colMd9}`}
            >
              {!this.state.isSent && (
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
                        id={"newsCheckbox"}
                        name="news"
                        checked={this.state.interests.news.value}
                        tabIndex="-1"
                        onChange={this.onCheckboxChange}
                      />
                      <label htmlFor={"newsCheckbox"}>General News</label>
                    </div>

                    <div>
                      <input
                        type="checkbox"
                        name="ebooks"
                        id={"ebooksCheckbox"}
                        checked={this.state.interests.ebooks.value}
                        tabIndex="-1"
                        onChange={this.onCheckboxChange}
                      />
                      <label htmlFor={"ebooksCheckbox"}>Ebooks</label>
                    </div>

                    <div>
                      <input
                        type="checkbox"
                        name="education"
                        id={"educationCheckbox"}
                        checked={this.state.interests.education.value}
                        tabIndex="-1"
                        onChange={this.onCheckboxChange}
                      />
                      <label htmlFor={"educationCheckbox"}>Education</label>
                    </div>

                    <div>
                      <input
                        type="checkbox"
                        name="genealogy"
                        id="genealogyCheckbox"
                        checked={this.state.interests.genealogy.value}
                        tabIndex="-1"
                        onChange={this.onCheckboxChange}
                      />
                      <label htmlFor={"genealogyCheckbox"}>Genealogy</label>
                    </div>
                  </div>

                  <input
                    aria-live="assertive"
                    type="submit"
                    value={!this.state.isSending ? "Sign Up" : "Subscribing..."}
                    name="signup"
                    className={css.button}
                    onClick={(e) => this.onButtonClick(e)}
                  />
                </form>
              )}

              {this.state.isSent && (
                <h3 aria-live="assertive" className={css.formCallToAction}>
                  You have successfully subscribed to DPLA&apos;s general email
                  list! We&apos;ll send you announcements about our projects and
                  events.
                </h3>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default StayInformed;
