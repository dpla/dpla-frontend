import React from "react";

import Button from "components/shared/Button";
import { classNames, stylesheet } from "./ShareButton.css";
import FacebookButton from "./FacebookButton";
import TwitterButton from "./TwitterButton";
import GooglePlusButton from "./GooglePlusButton";
import PinterestButton from "./PinterestButton";

class ShareButton extends React.Component {
  state = {
    showShareButtons: false
  };

  toggleShareButtons = () => {
    this.setState({ showShareButtons: !this.state.showShareButtons });
  };

  render() {
    const { className, currentFullUrl, toShareText } = this.props;
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
          Share this {toShareText}
        </Button>

        <div
          className={`${classNames.shareButtons} ${this.state.showShareButtons
            ? ""
            : classNames.hidden}`}
        >
          <div className={classNames.buttonsWrapper}>
            <FacebookButton currentFullUrl={currentFullUrl} />
            <TwitterButton currentFullUrl={currentFullUrl} />
            <GooglePlusButton currentFullUrl={currentFullUrl} />
            <PinterestButton currentFullUrl={currentFullUrl} />
          </div>
        </div>
        <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
      </div>
    );
  }
}

export default ShareButton;
