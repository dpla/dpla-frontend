import React from "react";
import Button from "components/shared/Button";

import { stylesheet, classNames } from "css/pages/content-pages-wysiwyg.css";
import {
  stylesheet as contentStyles,
  classNames as contentClasses
} from "css/pages/donate.css";
import { classNames as utilClassNames } from "css/utils.css";

const frequencyMap = [
  { v: "once", k: "Give Once" },
  { v: "monthly", k: "Monthly" }
];

const amountMap = [
  { v: 10, k: "$10" },
  { v: 25, k: "$25" },
  { v: 50, k: "$50" },
  { v: 75, k: "$75" },
  { v: 100, k: "$100" }
];

class DualStateButton extends React.Component {
  render() {
    return (
      <Button
        type="donate"
        onClick={() => this.props.onClick()}
        state={this.props.active ? "active" : ""}
      >
        {this.props.text}
      </Button>
    );
  }
}

class DonateForm extends React.Component {
  state = {
    frequency: frequencyMap[0].v,
    amount: amountMap[0].v,
    amountText: ""
  };

  handleFrequencyClick(freq) {
    this.setState({
      frequency: freq,
      amount: this.state.amount,
      amountText: this.state.amountText
    });
  }

  handleAmountClick(amount) {
    this.setState({
      frequency: this.state.frequency,
      amount: amount,
      amountText: ""
    });
  }

  handleAmountText(event) {
    console.log(event.key);
    let amount = event.target.value;
    if (isNaN(event.target.value)) {
      amount = this.state.amount;
      event.target.value = amount;
    }
    this.setState({
      frequency: this.state.frequency,
      amount: amount,
      amountText: amount
    });
  }

  render() {
    return (
      <form action="">
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
            {frequencyMap.map((freq, i) =>
              <DualStateButton
                key={"freq" + i}
                text={freq.k}
                value={freq.v}
                onClick={() => this.handleFrequencyClick(freq.v)}
                active={this.state.frequency === freq.v}
              />
            )}
          </div>
          <h2>Donation amount</h2>
          <div className={`row`}>
            {amountMap.map((amt, i) =>
              <DualStateButton
                key={"amt" + i}
                text={amt.k}
                value={amt.v}
                onClick={() => this.handleAmountClick(amt.v)}
                active={this.state.amount === amt.v}
              />
            )}
            <div className={`${contentClasses.otherAmount} col-xs-6 col-md-4`}>
              <input
                type="text"
                placeholder="$ Other amount"
                value={this.state.amountText}
                onChange={e => this.handleAmountText(e)}
              />
            </div>
          </div>
          <hr />
          <div className={`row`}>
            <div className={`col-xs-12 col-md-4`}>
              <Button
                type="primary"
                className={`${contentClasses.donateButton}`}
              >
                Donate
              </Button>
            </div>
          </div>
        </div>
      </form>
    );
  }
}

export default DonateForm;
