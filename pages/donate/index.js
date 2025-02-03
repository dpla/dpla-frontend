import React from "react";

import MainLayout from "components/MainLayout";
import DonateForm from "components/DonateComponents/DonateForm";

import { SEO_TITLE } from "constants/donate";

import utils from "stylesheets/utils.module.scss";
import contentCss from "stylesheets/content-pages.module.scss";
import css from "stylesheets/donate.module.scss";

function Donate() {
  return (
    <MainLayout pageTitle={SEO_TITLE}>
      <div className={css.donateBackground}>
        <div id="main" role="main" className={utils.container}>
          <div className={`${css.donateContent} ${utils.row}`}>
            <div className={`${utils.colXs12} ${utils.colMd7}`}>
              <div className={`${css.byPaypal} ${contentCss.content}`}>
                <h1>Thank you for supporting DPLA</h1>
                <p>
                  Your generous contribution to DPLA will help make it a
                  valuable national resource for years to come. DPLA is a
                  501(c)(3) nonprofit organization. All donations are tax
                  deductible.
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
                  Digital Public Library of America
                  <br />
                  (at Government Center)
                  <br />
                  1 Washington Mall #1019
                  <br />
                  Boston, MA 02108
                </p>
              </div>
            </div>
            <div
              className={`${css.testimonial} ${utils.colXs12} ${utils.colMd5}`}
            >
              {/* testimonial */}
              <div className={`${contentCss.content} ${css.testimonialImage}`}>
                <img src="/static/images/read.jpg" alt="An e-reader" />
              </div>
              <div className={contentCss.content}>
                <h2>How will DPLA use your donation?</h2>
                <p>
                  Your donation will help support a thriving national digital
                  library that is free and open to the public. This includes:
                </p>
                <ul>
                  <li>
                    Maintaining{" "}
                    <a className={css.whiteLink} href="https://dp.la">
                      DPLA
                    </a>{" "}
                    as a single access point to search and discover more than 45
                    million cultural heritage artifacts, including images,
                    documents, sounds, and videos, from more than 5,000
                    institutions across the country.
                  </li>
                  <li>
                    Growing the{" "}
                    <a
                      className={css.whiteLink}
                      href="https://palacebookshelf.dp.la/palace_bookshelf"
                    >
                      Palace Bookshelf
                    </a>{" "}
                    collection of more than 15,000 open-access ebooks, which are
                    always free to libraries and readers and are available to
                    download 24 hours a day, 7 days a week.
                  </li>
                  <li>
                    Making possible DPLA&apos;s collaborative work with
                    libraries and archives nationwide to share knowledge and
                    ideas and improve our work, ultimately making it easier to
                    tell the story of our nation through cultural heritage
                    artifacts.
                  </li>
                </ul>
                <p>
                  <a
                    className={css.whiteLink}
                    href="https://pro.dp.la/about-dpla-pro/strategic-plan"
                  >
                    Find out more about our mission here.
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export default Donate;
