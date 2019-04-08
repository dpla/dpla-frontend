import React from "react";
import Router, { withRouter } from "next/router";

import MainMetadata from "./MainMetadata";
import OtherMetadata from "./OtherMetadata";
import JsonLdMarkup from "./JsonLdMarkup";

import { UNTITLED_TEXT } from "constants/site";

import css from "./Content.scss";

class QA extends React.Component {
  render() {
    const { item } = this.props;
    const preStyle = {
      "font-size": "13px",
      "word-break": "break-all",
      "word-wrap": "break-word",
      "white-space": "pre-wrap",
      border: "1px solid rgba(0, 0, 0, 0.15)",
      "background-color": "#f5f5f5",
      "border-radius": "4px",
      padding: "9.5px"
    };
    const divStyle = {
      float: "left",
      width: "48%",
      "padding-left": "20px"
    };
    let originalRecord = "";
    if ("stringValue" in item.originalRecord) {
      originalRecord = item.originalRecord.stringValue;
    } else {
      originalRecord = JSON.stringify(item.originalRecord, null, 2);
    }
    const enrichedRecord = JSON.stringify(item.doc, null, 2);
    return (
      <div style={{ "padding-top": "8px" }}>
        <div style={divStyle}>
          <h3>Enriched Record</h3>
          <pre style={preStyle}>{enrichedRecord}</pre>
        </div>
        <div style={divStyle}>
          <h3>Original Record</h3>
          <pre style={preStyle}>{originalRecord}</pre>
        </div>
        <div style={{ clear: "both" }}> </div>
      </div>
    );
  }
}

export default withRouter(QA);
