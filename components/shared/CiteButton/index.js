import React from "react";

import { joinIfArray } from "utilFunctions";

import Button from "components/shared/Button";
import { classNames, stylesheet } from "./CiteButton.css";

class CiteButton extends React.Component {
  state = {
    showCitation: true
  };

  toggleCiteButton = () => {
    this.setState({ showCitation: !this.state.showCitation });
  };

  formatCurrentDate = () => {
    const options = { month: "long", day: "numeric", year: "numeric" };
    return new Intl.DateTimeFormat("en-US", options).format(new Date());
  };

  render() {
    const { item, className, currentFullUrl, toCiteText, title } = this.props;
    const url = currentFullUrl;
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
            <dl className={classNames.citationList}>
              <dt>Chicago citation style</dt>
              <dd>
                {item.creator ? joinIfArray(item.creator, ", ") + ". " : ""}
                {item.title ? item.title + ". " : ""}
                {item.spatial && item.spatial.name
                  ? item.spatial.name + ", "
                  : ""}
                {item.date ? item.date.displayDate + ". " : ""}
                Retrieved from the Digital Public Library of America,{" "}
                {item.sourceUrl}.
                (Accessed {this.formatCurrentDate()}.)
              </dd>
              <dt>APA citation style</dt>
              <dd>
                {item.creator ? joinIfArray(item.creator, ", ") + ", " : ""}
                {item.date ? "(" + item.date.displayDate + ") " : ""}
                {item.title ? item.title + ". " : ""}
                {item.spatial && item.spatial.name
                  ? item.spatial.name + ". "
                  : ""}
                Retrieved from the Digital Public Library of America,{" "}
                {item.sourceUrl}
              </dd>
              <dt>MLA citation style</dt>
              <dd>
                {item.creator ? joinIfArray(item.creator, ", ") + ". " : ""}
                Retrieved from the Digital Public Library of America &lt;{
                  item.sourceUrl
                }&gt;.
              </dd>
            </dl>
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
