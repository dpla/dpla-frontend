import React from "react";
import Link from "next/link";

import MainLayout from "components/MainLayout";
import DonateForm from "components/DonateComponents/DonateForm";
import Button from "shared/Button";

import { SEO_TITLE } from "constants/donate";

import utils from "stylesheets/utils.scss";
import contentCss from "stylesheets/content-pages.scss";
import css from "stylesheets/donate.scss";

const Donate = ({ url }) =>
  <MainLayout route={url} pageTitle={SEO_TITLE}>
    <div className={css.donateBackground}>
      <div id="main" role="main" className={`${utils.container}`}>
        <div className={`${css.donateContent} row`}>
          <div className={`col-xs-12 col-md-7`}>
            <div className={`${css.byPaypal} ${contentCss.content}`}>
              <h1>
                Thank you for supporting DPLA
              </h1>
              <p>
                Your generous contribution to DPLA will help make it a valuable
                national resource for years to come. DPLA is a 501(c)(3)
                nonprofit
                organization. All donations are tax deductible.
              </p>
              <hr />
              <DonateForm />
            </div>
            <div className={`${css.byMail} ${contentCss.content}`}>
              <h2>Or donate by mail</h2>
              <p>
                Please make your check payable to Digital Public Library of
                America.
              </p>

              <p className={contentCss.address}>
                Digital Public Library of America<br />
                c/o Boston Public Library<br />
                700 Boylston Street<br />
                Boston, MA 02116<br />
              </p>
            </div>
          </div>
          <div className={`${css.testimonial} col-xs-12 col-md-5`}>
            {/* testimonial */}
            <div className={`${contentCss.content} ${css.testimonialImage}`}>
              <img
                srcSet="/static/images/adena_lo.jpg,
                        /static/images/adena_hi.jpg 2x"
                src="/static/images/adena_lo.jpg"
                alt="Adena, a high school school teacher in West Virginia, leads her students in a U.S. History lesson using DPLA Primary Source Sets."
              />
              <span>Adena, a high school school teacher in West Virginia</span>
            </div>
            <div className={contentCss.content}>
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
  </MainLayout>;

export default Donate;
