import React from "react";

import Link from "next/link";

import MainLayout from "components/MainLayout";

import { stylesheet, classNames } from "css/pages/content-pages-wysiwyg.css";
import {
  stylesheet as contentStyles,
  classNames as contentClasses
} from "css/pages/donate.css";
import { classNames as utilClassNames } from "css/utils.css";

const DonateThankYou = ({ url }) =>
  <MainLayout route={url}>
    <div className={contentClasses.donateBackground}>
      <div className={`${utilClassNames.container}`}>
        <div className={`${contentClasses.donateContent} row`}>
          <div className={`col-xs-12 col-md-7`}>
            <div className={`${contentClasses.byPaypal} ${classNames.content}`}>
              <h1 className={contentClasses.title}>
                Thank you for your donation
              </h1>
              <p>
                From all of us at the DPLA, thank you! Your support makes our
                work possible. Your transaction has been completed, and a
                receipt for your purchase has been emailed to you. You may log
                into your account at{" "}
                <a href="//www.paypal.com/us">www.paypal.com/us</a> to view
                details of this transaction. For those receiving a donation
                gift, please note that it may take 1-2 weeks to reach your
                designated shipping address. If you encounter any issues along
                the way, please don’t hesitate to{" "}
                <a href="/contact-us">contact us</a>.
              </p>
            </div>
          </div>
          <div className={`${contentClasses.testimonial} col-xs-12 col-md-5`}>
            {/* testimonial */}
            <div
              className={`${classNames.content} ${contentClasses.testimonialImage}`}
            >
              <img
                srcset="/static/images/adena_lo.jpg,
                        /static/images/adena_hi.jpg 2x"
                src="/static/images/adena_lo.jpg"
                alt="Adena, a high school school teacher in West Virginia"
              />
              <span>Adena, a high school school teacher in West Virginia</span>
            </div>
            <div className={classNames.content}>
              <h2>How will DPLA use your donation?</h2>
              <p>
                Your donation will directly support the development and
                expansion of America's largest digital library for people like
                Adena, a high school school teacher in West Virginia. Adena uses
                Primary Source Sets in her teaching, and here's a few of her own
                words on how important they are to her:
              </p>
              <blockquote>
                “I teach in a rural West Virginia high school. Many of my
                students have never left the state of West Virginia, but the
                Digital Public Library of America's Primary Source Sets deliver
                context and new landscapes while allowing my students to
                experience the highs and lows of American History, and to view
                history through a variety of viewpoints, collected from the
                nation's cultural heritage institutions.”
              </blockquote>
              <p>
                Please consider making a donation to the Digital Public Library
                of America so we can continue to build these important
                educational materials.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
    <style dangerouslySetInnerHTML={{ __html: contentStyles }} />
  </MainLayout>;

export default DonateThankYou;
