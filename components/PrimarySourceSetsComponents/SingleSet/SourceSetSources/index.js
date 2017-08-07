import React from "react";

import Link from "next/link";

import mockSources from "../mockSources";
import { stylesheet, classNames } from "./SourceSetSources.css";
import { classNames as utilClassNames } from "css/utils.css";

const { module } = utilClassNames;

const SourceSetSources = ({ route }) =>
  <div className={classNames.wrapper}>
    <div className={[classNames.sourceSetSources, module].join(" ")}>
      {mockSources.map(({ title, img, id, setSlug }) =>
        <Link
          as={`/primary-source-sets/${setSlug}/sources/${id}`}
          href={{
            pathname: `/primary-source-sets/set/sources`,
            query: Object.assign({}, route.query, { source: id, set: setSlug })
          }}
        >
          <a className={classNames.set}>
            <div className={classNames.imageWrapper}>
              <img alt={title} src={img} className={classNames.image} />
            </div>
            <p className={classNames.title}>
              {title}
            </p>
          </a>
        </Link>
      )}
    </div>
    <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
  </div>;

export default SourceSetSources;
