import React from "react";
import Markdown from "react-markdown";

import MinimalLayout from "components/MainLayout/components/MinimalLayout";
import PSSFooter from "components/PrimarySourceSetsComponents/PSSFooter";
import TeachersGuide from "components/PrimarySourceSetsComponents/SingleSet/TeachersGuide";

import utils from "stylesheets/utils.module.scss";
import { washObject } from "lib/washObject";
import { safeFetch, checkResponseForSSR } from "lib/safeFetch";
import isValidPSSSlug from "lib/isValidPSSSlug";

class Printable extends React.Component {
  componentDidMount() {
    window.print();
  }

  render() {
    const { set, teachingGuide } = this.props;
    if (!set) return null;
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
  if (!isValidPSSSlug(query.set)) return { notFound: true };
  const url = `${process.env.API_URL}/pss/sets/${encodeURIComponent(query.set)}?api_key=${process.env.API_KEY}`;
  const setRes = await safeFetch(url);
  const setError = checkResponseForSSR(setRes);
  if (setError) return setError;
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
