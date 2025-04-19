import React from "react";
import Markdown from "react-markdown";

import MinimalLayout from "components/MainLayout/components/MinimalLayout";
import PSSFooter from "components/PrimarySourceSetsComponents/PSSFooter";
import TeachersGuide from "components/PrimarySourceSetsComponents/SingleSet/TeachersGuide";

import utils from "stylesheets/utils.module.scss";
import { washObject } from "lib/washObject";

class Printable extends React.Component {
  componentDidMount() {
    window.print();
  }

  render() {
    const { set, teachingGuide } = this.props;
    return (
      <MinimalLayout route={this.props.router} isPrintable={true}>
        <div className={utils.container}>
          <h1 className={utils.printableH1}>
            <Markdown allowedElements={["emphasis", "text"]} unwrapDisallowed>
              {set.name}
            </Markdown>
          </h1>
        </div>
        <TeachersGuide
          teachingGuide={teachingGuide}
          isPrintable={true}
          setName={set.name}
        />
        <PSSFooter />
      </MinimalLayout>
    );
  }
}

export async function getServerSideProps({ query }) {
  const url = `${process.env.API_URL}/pss/sets/${encodeURIComponent(query.set)}?api_key=${process.env.API_KEY}`;
  const setRes = await fetch(url);
  if (!setRes.ok) {
    // treating all non-200 responses as 404 due to API bug
    return {
      notFound: true,
    };
  }
  const set = await setRes.json();
  const teachingGuide = set.hasPart.find(
    (item) => item.disambiguatingDescription === "guide",
  );
  const props = washObject({
    set,
    teachingGuide,
  });

  return {
    props: props,
  };
}

export default Printable;
