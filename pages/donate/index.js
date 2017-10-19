import React from "react";

import Link from "next/link";

import MainLayout from "components/MainLayout";
import Button from "components/shared/Button";

import { stylesheet, classNames } from "css/pages/content-pages-wysiwyg.css";
import {
  stylesheet as contentStyles,
  classNames as contentClasses
} from "css/pages/donate.css";
import { classNames as utilClassNames } from "css/utils.css";

const Donate = ({ url }) =>
  <MainLayout route={url}>
    <div className={classNames.backgroundTint}>
      <div
        className={`${utilClassNames.container}
        ${classNames.sidebarAndContentWrapper}`}
      >
        <div className="row">
          <div className={`col-xs-7`}>
            <div className={contentClasses.byPaypal}>
              {/* donate form */}
              <h1 className={contentClasses.title}>
                Thank you for supporting DPLA
              </h1>
              <p>
                Your generous contribution to DPLA will help make it a valuable
                national resource for years to come. DPLA is a 501(c)(3)
                nonprofit
                organization. All donations are tax deductible.
              </p>
              <p>
                <Link href="">
                  <a className={`${contentClasses.link} hover-underline`}>
                    Donation FAQ's
                  </a>
                </Link>
              </p>
              <hr />
              <div className={contentClasses.buttonGroup}>
                <h2>Frequency</h2>
                <Button type="ghost" size="large">
                  Give Once
                </Button>
                <Button type="ghost" size="large">
                  Give Monthly
                </Button>
              </div>
              <hr />
              <div className={contentClasses.buttonGroup}>
                <h2>Donation amount</h2>
                <Button type="ghost" size="large">
                  $10
                </Button>
                <Button type="ghost" size="large">
                  $25
                </Button>
                <Button type="ghost" size="large">
                  $50
                </Button>
                <Button type="ghost" size="large">
                  $75
                </Button>
                <Button type="ghost" size="large">
                  $100
                </Button>
              </div>
              <Button
                type="primary"
                size="large"
                className={classNames.donateButton}
              >
                Donate
              </Button>
            </div>
            <div className={contentClasses.byMail}>
              <h2>Or donate by mail</h2>
              <p>
                Please make your check payable to Digital Public Library of
                America.
              </p>

              <p>
                Digital Public Library of America
                c/o Boston Public Library
                700 Boylston Street
                Boston, MA 02116
              </p>
            </div>
          </div>
          <div className={`${contentClasses.testimonial} col-xs-5`}>
            {/* testimonial */}
            <div>
              <img
                src="http://fillmurray.com/300/200"
                className={contentClasses.image}
              />
              <span>Travis Olson, a student at Maryland Public Schools</span>
            </div>
            <div>
              <p>
                Your donation will directly support the maintenance and
                expansion of America’s largest digital library for people like
                Travis Olson. Travis is a middle school student in Maryland who
                uses our Primary Source Sets to do reseasrch in his American
                history class.
              </p>
              <p>
                100% of your generous contribution will be used for maintenance,
                curation, and expansion of DPLA. You’ll be helping support our
                programmers and curators as they build improvements and engaging
                curated collections on the website, as well as helping us grow
                our collection of America’s vast historical record.
              </p>
              <p>
                We couldn’t do it without you—so sincerely, thank-you!
              </p>
              <p>
                Michele Kimpton<br />
                Executive Director, DPLA
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
    <style dangerouslySetInnerHTML={{ __html: contentStyles }} />
  </MainLayout>;

Donate.getInitialProps = async () => {
  const content = {
    hello: "world"
  };
  return { content };
};

export default Donate;
