import React, { useState } from "react";

import Link from "next/link";
import css from "stylesheets/qa.module.scss";

function QA({ item, randomItemId }) {
  const [collapsed, setCollapsed] = useState(false);

  const originalRecord =
    "stringValue" in item.originalRecord
      ? item.originalRecord.stringValue
      : JSON.stringify(item.originalRecord, null, 2);

  const toggleCollapse = () => {
    setCollapsed((prev) => !prev);
  };

  const enrichedRecord = JSON.stringify(item.doc, null, 2);

  return (
    <div style={{ paddingTop: "8px" }}>
      <div style={{ padding: "8px 20px 20px" }}>
        <button onClick={() => toggleCollapse()} className={css.btn}>
          {collapsed ? "+ Show Metadata" : "- Collapse Metadata"}
        </button>{" "}
        {randomItemId && (
          <Link href={`/item/${randomItemId}`} className={css.btn}>
            Fetch Random Item &raquo;
          </Link>
        )}
      </div>
      <div id={"qa"} style={{ display: collapsed ? "none" : "block" }}>
        <div className={css.qaDiv}>
          <h3>Mapped and Enriched Record</h3>
          <pre className={css.pre}>{enrichedRecord}</pre>
        </div>
        <div className={css.qaDiv}>
          <h3>Original Record</h3>
          <pre className={css.pre}>{originalRecord}</pre>
        </div>
        <div style={{ clear: "both" }}></div>
      </div>
    </div>
  );
}

export default QA;
