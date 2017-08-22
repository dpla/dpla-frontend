import React from "react";

import MainLayout from "components/MainLayout";
import Sidebar from "components/ContactComponents/Sidebar";
import ContactForm from "components/ContactComponents/ContactForm";
import {
  classNames,
  stylesheet
} from "components/ContactComponents/ContactComponents.css";
import { classNames as utilClassNames } from "css/utils.css";

const Contact = ({ url }) =>
  <MainLayout>
    <div className={classNames.wrapper}>
      <div className={[utilClassNames.module, classNames.content].join(" ")}>
        <Sidebar />
        <ContactForm />
      </div>
    </div>
    <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
  </MainLayout>;

export default Contact;
