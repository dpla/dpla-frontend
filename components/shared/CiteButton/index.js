import React from "react";

import { joinIfArray, removeEndPunctuation } from "utilFunctions";

import Button from "components/shared/Button";
import { classNames, stylesheet } from "./CiteButton.css";

class CiteButton extends React.Component {
  state = {
    showCitation: false
  };

  toggleCiteButton = () => {
    this.setState({ showCitation: !this.state.showCitation });
  };

  formatCurrentDate = () => {
    const options = { month: "long", day: "numeric", year: "numeric" };
    return new Intl.DateTimeFormat("en-US", options).format(new Date());
  };

  render() {
    const {
      creator,
      displayDate,
      spatialName,
      sourceUrl,
      className,
      toCiteText,
      freeText,
      title
    } = this.props;
    return (
      <div className={classNames.wrapper}>
        <Button
          onClick={this.toggleCiteButton}
          type="ghost"
          className={`${classNames.button} ${className} ${this.state
            .showCitation
            ? classNames.activeButton
            : ""}`}
        >
          Cite this {toCiteText}
        </Button>

        <div
          className={`${classNames.citeButton} ${this.state.showCitation
            ? ""
            : classNames.hidden}`}
        >
          <div className={classNames.citationsWrapper}>
            {freeText &&
              <dl className={classNames.citationList}>
                <dt>Citation Information</dt>
                <dd dangerouslySetInnerHTML={{ __html: freeText }} />
              </dl>}
            {!freeText &&
              <dl className={classNames.citationList}>
                <dt>Chicago citation style</dt>
                <dd>
                  {creator ? joinIfArray(creator, ", ") + ". " : ""}
                  {title ? removeEndPunctuation(title) + ". " : ""}
                  {spatialName ? removeEndPunctuation(spatialName) + ", " : ""}
                  {displayDate ? removeEndPunctuation(displayDate) + ". " : ""}
                  Retrieved from the Digital Public Library of America
                  {sourceUrl ? ", " + sourceUrl + ". " : " "}
                  (Accessed {this.formatCurrentDate()}.)
                </dd>
                <dt>APA citation style</dt>
                <dd>
                  {creator ? joinIfArray(creator, ", ") + ", " : ""}
                  {displayDate
                    ? "(" + removeEndPunctuation(displayDate) + ") "
                    : ""}
                  {title ? removeEndPunctuation(title) + ". " : ""}
                  {spatialName ? removeEndPunctuation(spatialName) + ". " : ""}
                  Retrieved from the Digital Public Library of America
                  {sourceUrl ? ", " + sourceUrl : ""}
                </dd>
                <dt>MLA citation style</dt>
                <dd>
                  {creator ? joinIfArray(creator, ", ") + ". " : ""}
                  Retrieved from the Digital Public Library of America
                  {sourceUrl ? " <" + sourceUrl + ">. " : ""}
                </dd>
              </dl>}
            <span className={classNames.disclaimer}>
              <strong>Note:</strong> These citations are programmatically
              generated and may be incomplete.
            </span>
          </div>
        </div>
        <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
      </div>
    );
  }
}

export default CiteButton;
