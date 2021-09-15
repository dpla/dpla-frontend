import React from "react";
import Router, { withRouter } from "next/router";

import MainMetadata from "./MainMetadata";
import OtherMetadata from "./OtherMetadata";
import JsonLdMarkup from "./JsonLdMarkup";
import Link from "next/link";

import { UNTITLED_TEXT } from "constants/site";

import css from "./Content.module.scss";

class QA extends React.Component {
  render() {
    const { item, randomItemId } = this.props;
    const preStyle = {
      fontSize: "13px",
      wordBreak: "break-all",
      wordWrap: "break-word",
      whiteSpace: "pre-wrap",
      border: "1px solid rgba(0, 0, 0, 0.15)",
      backgroundColor: "#f5f5f5",
      borderRadius: "4px",
      padding: "9.5px"
    };
    const divStyle = {
      float: "left",
      width: "48%",
      paddingLeft: "20px"
    };
    let originalRecord = "";
    if ("stringValue" in item.originalRecord) {
      originalRecord = item.originalRecord.stringValue;
    } else {
      originalRecord = JSON.stringify(item.originalRecord, null, 2);
    }
    const enrichedRecord = JSON.stringify(item.doc, null, 2);
    return (
      <div style={{ paddingTop: "8px" }}>

        {randomItemId &&
          <div style={{ padding: "8px 20px 20px" }}>
            <Link href={`/item/${randomItemId}`}>
              <a className={`internalItemLink`}>
                Fetch Random Item
              </a>
            </Link>
          </div>}

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
