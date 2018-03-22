import React from "react";
import Button from "components/shared/Button";

import { joinIfArray, removeEndPunctuation, formatDate } from "utilFunctions";

import { classNames, stylesheet } from "./CiteButton.css";

class CiteButton extends React.Component {
  state = {
    showCitation: false
  };

  toggleCiteButton = e => {
    this.setState({ showCitation: !this.state.showCitation });
    e.preventDefault();
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
          controls="citation-content"
          expanded={this.state.showCitation}
          type="ghost"
          className={`${classNames.button} ${className} ${this.state
            .showCitation
            ? classNames.activeButton
            : ""}`}
        >
          <h2>Cite this {toCiteText}</h2>
        </Button>

        <div
          id="citation-content"
          aria-hidden={!this.state.showCitation}
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
                  (Accessed {formatDate()}.)
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
