import React from "react";
import Button from "shared/Button";

import { stylesheet, classNames } from "css/pages/content-pages-wysiwyg.css";
import {
  stylesheet as contentStyles,
  classNames as contentClasses
} from "css/pages/donate.css";

import { getCurrentFullUrl } from "utilFunctions";
import { PAYPAL_DONATE_SINGLE, PAYPAL_DONATE_MONTHLY } from "constants/site.js";

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
        role="radio"
        type="donate"
        size={this.props.size}
        onClick={() => this.props.onClick()}
        state={this.props.active ? "active" : ""}
        checked={this.props.active}
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

  buildDonationAndSend() {
    // encode the period
    const amountStr = this.state.amount.toString().replace(".", "%2e");
    let url = this.state.frequency === "monthly"
      ? PAYPAL_DONATE_MONTHLY
      : PAYPAL_DONATE_SINGLE;
    url = url.replace("{amount}", amountStr);
    let returnUrl = getCurrentFullUrl();
    returnUrl = returnUrl.endsWith("/")
      ? returnUrl + "thank-you"
      : returnUrl + "/thank-you";
    url = url.replace("{returnUrl}", encodeURIComponent(returnUrl));
    document.location = url;
  }

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
      <form action="" className={contentClasses.donateForm}>
        <h2 id="donation-frequency">Frequency</h2>
        <ul className={`row start-xs`}>
          {frequencyMap.map((freq, i) =>
            <li key={i} className={`${classNames.donate} col-xs-12 col-md-4`}>
              <DualStateButton
                id={"freq" + i}
                key={"freq" + i}
                text={freq.k}
                value={freq.v}
                size="large"
                onClick={() => this.handleFrequencyClick(freq.v)}
                active={this.state.frequency === freq.v}
              />
            </li>
          )}
        </ul>
        <h2 id="donation-amount">Donation amount</h2>
        <ul className={`row`}>
          {amountMap.map((amt, i) =>
            <li key={i} className={`${classNames.donate} col-xs-6 col-md-4`}>
              <DualStateButton
                id={"amt" + i}
                labelledby={"donation-amount amt" + i}
                key={"amt" + i}
                text={amt.k}
                value={amt.v}
                onClick={() => this.handleAmountClick(amt.v)}
                active={this.state.amount === amt.v}
              />
            </li>
          )}
          <li
            className={`${classNames.donate} ${contentClasses.otherAmount} col-xs-6 col-md-4`}
          >
            <input
              type="text"
              aria-label="Give other amount"
              placeholder="Other amount"
              value={this.state.amountText}
              onChange={e => this.handleAmountText(e)}
            />
          </li>
        </ul>
        <hr />
        <div className={`row`}>
          <div className={`col-xs-12 col-md-4`}>
            <Button
              type="primary"
              className={`${contentClasses.donateButton}`}
              onClick={() => this.buildDonationAndSend()}
            >
              Donate
            </Button>
          </div>
        </div>
      </form>
    );
  }
}

export default DonateForm;
