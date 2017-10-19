import React from "react";
import Button from "components/shared/Button";

import { stylesheet, classNames } from "css/pages/content-pages-wysiwyg.css";
import {
  stylesheet as contentStyles,
  classNames as contentClasses
} from "css/pages/donate.css";
import { classNames as utilClassNames } from "css/utils.css";

class DualStateButton extends React.Component {
  state = {
    active: this.props.active,
    value: this.props.value
  };

  render() {
    return (
      <Button type="donate" className={this.state.active ? "active" : ""}>
        {this.state.value}
      </Button>
    );
  }
}

class DonateForm extends React.Component {
  state = {
    frequency: "once",
    amount: 10
  };

  render() {
    return (
      <div className={`${contentClasses.byPaypal} ${classNames.content}`}>
        <h1 className={contentClasses.title}>
          Thank you for supporting DPLA
        </h1>
        <p>
          Your generous contribution to DPLA will help make it a valuable
          national resource for years to come. DPLA is a 501(c)(3)
          nonprofit
          organization. All donations are tax deductible.
        </p>
        <hr />
        <h2>Frequency</h2>
        <div className={`row start-xs`}>
          <DualStateButton value="Give Once" />
          <DualStateButton value="Monthly" active={true} />
        </div>
        <h2>Donation amount</h2>
        <div className={`row`}>
          <DualStateButton value="$10" />
          <DualStateButton value="$25" />
          <DualStateButton value="$50" />
          <DualStateButton value="$75" />
          <DualStateButton value="$100" />
          <div className={`${contentClasses.otherAmount} col-xs-6 col-md-4`}>
            <input type="text" placeholder="$ Other amount" />
          </div>
        </div>
        <hr />
        <div className={`row`}>
          <div className={`col-xs-12 col-md-4`}>
            <Button type="primary" className={`${contentClasses.donateButton}`}>
              Donate
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

export default DonateForm;
