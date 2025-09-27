import React, { useEffect, useState } from "react";

import { MAILCHIMP_LIST_ID, MAILCHIMP_GROUP_IDS } from "constants/site";

import css from "./StayInformed.module.scss";
import utils from "stylesheets/utils.module.scss";
import Alert from "shared/Alert";

function StayInformed() {
  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [email, setEmail] = useState("");
  const [interests, setInterests] = useState({
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
  });
  const [toast, setToast] = useState("");

  const onEmailChange = (e) => setEmail(e.target.value);

  const onCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setInterests((prevInterests) => ({
      ...prevInterests,
      [name]: {
        ...prevInterests[name],
        value: checked,
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formIsValid =
      email &&
      email.length > 3 &&
      interests &&
      [
        interests.news,
        interests.education,
        interests.ebooks,
        interests.genealogy,
      ].some((interests) => interests.value);

    if (!formIsValid) {
      setToast(
        "Please enter a valid email address and select at least one interest.",
      );
      return;
    }

    setIsSending(true);
    setIsSent(false);

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

    setIsSending(false);
    setIsSent(true);
  };

  useEffect(() => {
    if (toast !== "") {
      const timer = setTimeout(
        () => setToast(""),
        5000, // 5 seconds
      );
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const emailProps = { required: email !== undefined && email !== "" };

  let buttonText = "Sign Up";
  if (isSending) {
    buttonText = "Subscribing...";
  } else if (isSent) {
    buttonText = "Subscribed!";
  }

  return (
    <>
      <Alert showMessage={toast} />
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
              <form className={css.form} onSubmit={handleSubmit}>
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
                    onChange={onEmailChange}
                    onBlur={onEmailChange}
                    disabled={isSending || isSent}
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
                      checked={interests.news.value}
                      onChange={onCheckboxChange}
                      disabled={isSending || isSent}
                    />
                    <label htmlFor={"newsCheckbox"}>General News</label>
                  </div>

                  <div>
                    <input
                      type="checkbox"
                      name="ebooks"
                      id={"ebooksCheckbox"}
                      checked={interests.ebooks.value}
                      onChange={onCheckboxChange}
                      disabled={isSending || isSent}
                    />
                    <label htmlFor={"ebooksCheckbox"}>Ebooks</label>
                  </div>

                  <div>
                    <input
                      type="checkbox"
                      name="education"
                      id={"educationCheckbox"}
                      checked={interests.education.value}
                      onChange={onCheckboxChange}
                      disabled={isSending || isSent}
                    />
                    <label htmlFor={"educationCheckbox"}>Education</label>
                  </div>

                  <div>
                    <input
                      type="checkbox"
                      name="genealogy"
                      id="genealogyCheckbox"
                      checked={interests.genealogy.value}
                      onChange={onCheckboxChange}
                      disabled={isSending || isSent}
                    />
                    <label htmlFor={"genealogyCheckbox"}>Genealogy</label>
                  </div>
                </div>

                <input
                  aria-live="assertive"
                  type="submit"
                  value={buttonText}
                  name="signup"
                  className={
                    isSending || isSent
                      ? `${css.button} ${css.disabled}`
                      : css.button
                  }
                  disabled={!!(isSending || isSent)}
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default StayInformed;
