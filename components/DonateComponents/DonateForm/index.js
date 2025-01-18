import React from "react";
import Button from "shared/Button";

import { getCurrentFullUrl, endsWith } from "lib";
import { PAYPAL_DONATE_SINGLE, PAYPAL_DONATE_MONTHLY } from "constants/site.js";

import contentCss from "stylesheets/content-pages.module.scss";
import css from "stylesheets/donate.module.scss";
import utils from "stylesheets/utils.module.scss"

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
    returnUrl = endsWith(returnUrl, "/")
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
      <form action="" className={css.donateForm} data-cy="donate-form">
        <h2 id="donation-frequency">Frequency</h2>
        <ul className={`${utils.row} ${utils.startXs}`}>
          {frequencyMap.map((freq, i) =>
            <li key={freq.v} className={`${contentCss.donate} ${utils.colXs12} ${utils.colMd4}`}>
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
        <ul className={utils.row}>
          {amountMap.map((amt, i) =>
            <li key={amt.k} className={`${contentCss.donate} ${utils.colXs6} ${utils.colMd4}`}>
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
            className={`${css.otherAmount} ${contentCss.donate} ${utils.colXs6} ${utils.colMd4}`}
          >
            <div className=""><input
              type="text"
              aria-label="Give other amount"
              placeholder="Other amount"
              value={this.state.amountText}
              onChange={e => this.handleAmountText(e)}
            /></div>
          </li>
        </ul>
        <hr />
        <div className={utils.row}>
          <div className={`${utils.colXs12} ${utils.colMd4}`}>
            <Button
              type="primary"
              className={css.donateButton}
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
