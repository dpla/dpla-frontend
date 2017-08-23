import React from "react";
import { Textfield } from "react-mdc-web";
import { classNames, stylesheet } from "./ContactForm.css";

const ContactForm = () =>
  <div className={classNames.contactForm}>
    <h1 className={classNames.header}>Contact Us</h1>
    <p className={classNames.instructions}>
      We would love to hear from you! Please fill out this form and we will
      get in touch with you shortly.
    </p>
    <form className={classNames.form}>
      <Textfield floatingLabel="Your name" value="" />
      <Textfield floatingLabel="Your email" value="" />
      <Textfield multiline floatingLabel="Your message" value="" />
      <input className={classNames.submit} type="submit" value="Submit" />
    </form>
    <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
    <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
  </div>;

export default ContactForm;
