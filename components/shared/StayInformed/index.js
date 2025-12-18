import React, { useEffect, useState } from "react";

import css from "./StayInformed.module.scss";
import utils from "stylesheets/utils.module.scss";
import Alert from "shared/Alert";

function StayInformed() {
  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [isFailure, setIsFailure] = useState(false);
  const [email, setEmail] = useState("");
  const [toast, setToast] = useState("");

  const onEmailChange = (e) => setEmail(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formIsValid = email && email.length > 3;

    if (!formIsValid) {
      setToast("Please enter a valid email address.");
      return;
    }

    setIsSending(true);
    setIsSent(false);

    const miel = e.target.elements.i_prefer_usps_mail.value;

    const body = JSON.stringify({
      email,
      miel,
    });

    const res = await fetch("/mailchimp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: body,
    });

    if (!res.ok) {
      setToast("Unable to subscribe. Please contact info@dp.la for help.");
      setIsFailure(true);
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
  } else if (isFailure) {
    buttonText = "Failed!";
  } else if (isSent) {
    buttonText = "Subscribed!";
  }

  const disabled = isSending || isSent;

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
                    disabled={disabled}
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

                <input
                  aria-live="assertive"
                  type="submit"
                  value={buttonText}
                  name="signup"
                  className={
                    disabled ? `${css.button} ${css.disabled}` : css.button
                  }
                  disabled={disabled}
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
