import React from "react";

import Button from "components/shared/Button";
import { classNames, stylesheet } from "./ShareButton.css";
import FacebookButton from "./FacebookButton";
import TwitterButton from "./TwitterButton";
import GooglePlusButton from "./GooglePlusButton";

class ShareButton extends React.Component {
  state = {
    showShareButtons: false
  };

  toggleShareButtons = () => {
    this.setState({ showShareButtons: !this.state.showShareButtons });
  };

  render() {
    const { className } = this.props;
    return (
      <div className={classNames.wrapper}>
        <Button
          onClick={this.toggleShareButtons}
          type="ghost"
          className={`${classNames.button} ${className} ${this.state
            .showShareButtons
            ? classNames.activeButton
            : ""}`}
        >
          Share this item
        </Button>

        <div
          className={`${className.shareButtons} ${this.state.showShareButtons
            ? ""
            : classNames.hidden}`}
        >
          <div className={classNames.buttonsWrapper}>
            <FacebookButton />
            <TwitterButton />
            <GooglePlusButton />
          </div>
        </div>
        <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
      </div>
    );
  }
}

export default ShareButton;
