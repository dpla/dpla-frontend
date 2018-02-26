import React from "react";

import { stylesheet, classNames } from "./StayInformed.css";

const StayInformed = ({ title, items }) =>
  <div className={classNames.wrapper}>
    <div className={`${classNames.content} site-max-width`}>
      <div className="row">
        <div className="col-xs-12 col-md-3">
          <div className={classNames.header}>
            <h2 className={classNames.headerText}>Stay informed</h2>
          </div>
        </div>
        <div className="col-xs-12 col-md-9">
          <form action="">
            <input type="email" name="email" />
            <input type="submit" value="Sign Up" name="signup" />
          </form>
        </div>
      </div>
    </div>
    <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
  </div>;

export default StayInformed;
