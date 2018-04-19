import React from "react";
import Button from "components/shared/Button";

import { joinIfArray, removeEndPunctuation, formatDate } from "utilFunctions";

import css from "./CiteButton.scss";

class CiteButton extends React.Component {
  state = {
    showCitation: true // show it if js is disabled
  };

  componentDidMount() {
    // now collapse it
    this.setState({ showCitation: false });
  }

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
      <div className={css.wrapper}>
        <Button
          onClick={this.toggleCiteButton}
          controls="citation-content"
          expanded={this.state.showCitation}
          type="ghost"
          className={`${css.button} ${className} ${this.state.showCitation
            ? css.activeButton
            : ""}`}
        >
          <h2>Cite this {toCiteText}</h2>
        </Button>

        <div
          id="citation-content"
          aria-hidden={!this.state.showCitation}
          className={`${css.citeButton} ${this.state.showCitation
            ? ""
            : css.hidden}`}
        >
          <div className={css.citationsWrapper}>
            {freeText &&
              <dl className={css.citationList}>
                <dt>Citation Information</dt>
                <dd dangerouslySetInnerHTML={{ __html: freeText }} />
              </dl>}
            {!freeText &&
              <dl className={css.citationList}>
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
            <span className={css.disclaimer}>
              <strong>Note:</strong> These citations are programmatically
              generated and may be incomplete.
            </span>
          </div>
        </div>
      </div>
    );
  }
}

export default CiteButton;
