import React from "react";
import Markdown from "react-markdown";

import MinimalLayout from "components/MainLayout/components/MinimalLayout";
import PSSFooter from "components/PrimarySourceSetsComponents/PSSFooter";
import TeachersGuide from "components/PrimarySourceSetsComponents/SingleSet/TeachersGuide";

import utils from "stylesheets/utils.module.scss";
import { washObject } from "lib/washObject";
import { safeFetch, checkResponseForSSRSafe, upstreamUnavailable, isUpstreamUnavailable } from "lib/safeFetch";
import isValidPSSSlug from "lib/isValidPSSSlug";
import ServiceUnavailable from "components/shared/ServiceUnavailable";

class Printable extends React.Component {
  componentDidMount() {
    if (!this.props.temporarilyUnavailable) window.print();
  }

  render() {
    const { set, teachingGuide, temporarilyUnavailable } = this.props;
    if (temporarilyUnavailable) return <ServiceUnavailable />;
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

export async function getServerSideProps({ query, res }) {
  if (!isValidPSSSlug(query.set)) return { notFound: true };
  const url = `${process.env.API_URL}/pss/sets/${encodeURIComponent(query.set)}?api_key=${process.env.API_KEY}`;
  const setRes = await safeFetch(url);
  if (isUpstreamUnavailable(setRes)) {
    await setRes?.body?.cancel();
    return upstreamUnavailable(res);
  }
  const setError = checkResponseForSSRSafe(setRes, `set "${query.set}"`);
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
