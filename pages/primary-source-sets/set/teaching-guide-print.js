import React from "react";
import fetch from "isomorphic-fetch";
import ReactMarkdown from "react-markdown";

import MinimalLayout from "components/MainLayout/components/MinimalLayout";
import PSSFooter from "components/PrimarySourceSetsComponents/PSSFooter";
import TeachersGuide from "components/PrimarySourceSetsComponents/SingleSet/TeachersGuide";

import utils from "stylesheets/utils.module.scss"
import {washObject} from "lib/washObject";

class Printable extends React.Component {
    componentDidMount() {
        window.print();
    }

    render() {
        const {
            set,
            teachingGuide
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
                    isPrintable={true}
                    setName={set.name}
                />
                <PSSFooter/>
            </MinimalLayout>
        );
    }
}

export const getServerSideProps = async ({query}) => {
    const url = `${process.env.API_URL}/pss/sets/${encodeURIComponent(query.set)}?api_key=${process.env.API_KEY}`;
    const setRes = await fetch(url);
    const set = await setRes.json();
    const teachingGuide = set.hasPart.find(
        item => item.disambiguatingDescription === "guide"
    );
    const props = washObject({
        set,
        teachingGuide
    });
    return {
        props: props
    };
};

export default Printable;
