import React from "react";

import {joinIfArray} from "lib";

function JsonLdMarkup({ item }) {
  /**
    * @param values Array, possibly nested, of defined and undefined values.
    * @return Array, flattened, only containing defined values.
    */
  function definedAndFlattened(values) {
    const defined = values.filter(function(x) {
      return x !== undefined && x !== null;
    });
    return [].concat(...defined);
  }

  /**
    * @param begin String, begin date
    * @param end String, end date
    * @return String, date range in ISO 8601 format
   */
  function dateRange(begin, end) {
    if (begin && end) return `${begin}/${end}`;
    return begin || end || null;
  }

  /**
    * @return String
    */
  const type = () => {
    if (Array.isArray(item.type)) {
      return "CreativeWork";
    } else {
      switch (item.type) {
        case "text":
          return "TextDigitalDocument";
        case "image":
          return "ImageObject";
        case "moving image":
          return "VideoObject";
        case "sound":
          return "AudioObject";
        default:
          return "CreativeWork";
      }
    }
  };

  /**
    * @return Array[Object]
    */
  const provider = () => {
    const all = definedAndFlattened([
      item.partner,
      item.intermediateProvider,
      item.contributor
    ]);

    const dpla = {
      "@type": "Organization",
      name: "Digital Public Library of America",
      url: "https://dp.la/"
    };

    return [...all.map(x => ({ "@type": "Organization", name: x })), dpla];
  };

  /**
   * @return Array[String]
   * TODO: This treats URLs and textual statements the same; ideally, we would
   * handle them differently. What is the best way to determine if a string is
   * a valid URL?
   * @see https://digitalpubliclibraryofamerica.atlassian.net/wiki/spaces/TECH/pages/123830279/schema.org+crosswalks
   */
  const license = () => {
    return definedAndFlattened([item.rights, item.edmRights]);
  };

  /**
    * @return Object
    */
  const potentialAction = () => {
    const action = () => {
      switch (item.type) {
        case "text":
          return "ReadAction";
        case "image":
          return "ViewAction";
        case "moving image":
          return "WatchAction";
        case "sound":
          return "ListenAction";
        default:
          return "ConsumeAction";
      }
    };
    return { "@type": action(), target: item.sourceUrl };
  };

  /**
    * @return Array[Object]
    */
  const collection = () => {
    const all = definedAndFlattened([item.collection]);
    return all.map(x => ({
      "@type": "Collection",
      "@id": x["@id"],
      name: x.title,
      description: x.description
    }));
  };

  /**
    * @return Array[Object]
    */
  const contributor = () => {
    return definedAndFlattened([item.contributor])
        .map(x => ({ "@type": "Thing", name: x }));
  };

  /**
    * @return Array[Object]
    */
  const creator = () => {
    return definedAndFlattened([item.creator])
        .map(x => ({ "@type": "Thing", name: x }));
  };

  /**
    * @return Array[String]
    */
  const description = () => {
    return definedAndFlattened([
      item.description,
      item.format,
      item.type
    ]);
  };
  /**
    * @return Array[String]
    */
  const date = () => {
    const all = definedAndFlattened([item.date]);
    return all.map(x => dateRange(x.begin, x.end)).filter(Boolean);
  };

  /**
    * @return Array[Object]
    * TODO: item.langauge only retruns the langauge name. We could add
    * the ISO label.
    */
  const language = () => {
    return definedAndFlattened([item.language]).map(x => ({
      "@type": "Language",
      name: x
    }));
  };

  /**
    * @return Array[Object]
    */
  const spatial = () => {
    const all = definedAndFlattened([item.spatial]);
    return all.map(x => {
      let lat = null;
      let lon = null;
      const coordinates = joinIfArray(x.coordinates);
      if (typeof coordinates === "string") {
        const [latStr, lonStr, ...rest] = coordinates
          .split(",")
          .map(value => value.trim());
        if (latStr && lonStr && rest.length === 0) {
          const parsedLat = Number(latStr);
          const parsedLon = Number(lonStr);
          if (Number.isFinite(parsedLat) && Number.isFinite(parsedLon)) {
            lat = parsedLat;
            lon = parsedLon;
          }
        }
      }
      return {
        "@type": "Place",
        name: x.name,
        geo: {
          "@type": "GeoCoordinates",
          addressCountry: x.country,
          latitude: lat,
          longitude: lon
        }
      };
    });
  };

  /**
    * @return Array[Object]
    */
  const publisher = () => {
    const all = definedAndFlattened([item.publisher]);
    return all.map(x => ({ "@type": "Organization", name: x }));
  };

  /**
    * @return Array[Object]
    */
  const subject = () => {
    const all = definedAndFlattened([item.subject]);
    return all.map(x => ({ "@type": "Thing", name: x.name }));
  };

  /**
    * @return Array[String] ISO 8601 date range format
    */
  const temporal = () => {
    const all = definedAndFlattened([item.temporal]);
    return all.map(x => dateRange(x.begin, x.end)).filter(Boolean);
  };

  /**
    * @return Object, JSON-LD representation of DPLA Item
    */
  const JsonLd = {
    "@context": "http://schema.org/",
    "@type": type(),
    "@id": "http://api.dp.la/items/" + item.id,
    mainEntityOfPage: "https://dp.la/item/" + item.id,
    isAccessibleForFree: true,
    provider: provider(),
    license: license(),
    potentialAction: potentialAction(),
    thumbnailUrl: item.thumbnailUrl,
    isPartOf: collection(),
    contributor: contributor(),
    creator: creator(),
    dateCreated: date(),
    description: description(),
    identifier: item.identifier,
    inLanguage: language(),
    spatialCoverage: spatial(),
    publisher: publisher(),
    genre: item.specType,
    about: subject(),
    temporalCoverage: temporal(),
    name: definedAndFlattened([item.title])
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(JsonLd) }}
    />
  );
}

export default React.memo(JsonLdMarkup);
