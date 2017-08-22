import React from "react";

import { classNames, stylesheet } from "./ContactForm.css";

const ContactForm = () =>
  <div className={classNames.contactForm}>
    <h1 className={classNames.header}>Contact Us</h1>
    <p className={classNames.instructions}>
      We would love to hear from you! Please fill out this form and we will
      get in touch with you shortly.
    </p>
    <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
  </div>;

export default ContactForm;
