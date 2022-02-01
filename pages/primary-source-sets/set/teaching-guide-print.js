import React from "react";
import fetch from "isomorphic-fetch";
import ReactMarkdown from "react-markdown";

import MinimalLayout from "components/MainLayout/components/MinimalLayout";
import PSSFooter from "components/PrimarySourceSetsComponents/PSSFooter";
import TeachersGuide from "components/PrimarySourceSetsComponents/SingleSet/TeachersGuide";

import {PSS_BASE_URL} from "constants/env";

import {getCurrentFullUrl} from "lib";

import utils from "stylesheets/utils.module.scss"
import {washObject} from "lib/washObject";

class Printable extends React.Component {
    componentDidMount() {
        // make it print!
        window.print();
    }

    render() {
        const {
            set,
            teachingGuide,
            currentPath
        } = this.props;
        return (
            <MinimalLayout route={this.props.router} isPrintable={true}>
                <div className={utils.container}>
                    <h1 className={utils.printableH1}>
                        <ReactMarkdown
                            source={set.name}
                            allowedTypes={["emphasis", "text"]}
                            unwrapDisallowed
                        />
                    </h1>
                </div>
                <TeachersGuide
                    teachingGuide={teachingGuide}
                    setName={set.name}
                    currentPath={currentPath}
                    isPrintable={true}
                />
                <PSSFooter/>
            </MinimalLayout>
        );
    }
}

export const getServerSideProps = async ({query, req}) => {
    const currentFullUrl = getCurrentFullUrl(req);
    const setRes = await fetch(`${PSS_BASE_URL}/sets/${query.set}.json`);

    const currentPath = req
        ? `${req.get("Host")}/primary-source-sets/${query.set}`
        : "";

    const set = await setRes.json();
    const guidePage = set.hasPart.find(
        item => item.disambiguatingDescription === "guide"
    )["@id"];
    const guideEndpoint =
        guidePage.replace(/^.*primary-source-sets(.*)/, `${PSS_BASE_URL}$1`) +
        ".json";
    const teachingGuideRes = await fetch(guideEndpoint);
    const teachingGuide = await teachingGuideRes.json();

    const props = washObject({
        set,
        teachingGuide,
        currentPath,
        currentFullUrl
    });

    return {
        props: props
    };
};

export default Printable;
