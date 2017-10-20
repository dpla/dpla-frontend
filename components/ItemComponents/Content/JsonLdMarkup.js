import React from "react";

/**
  * @param item, DPLA Item
  * @param url, URL of the current web page
  * @return HTML <script>
  */
const JsonLdMarkup = ({ item, url }) => {

  /**
    * @param array: Array, possibly nested, of defined and undefined values.
    * @return Array, flattened, only containing defined values.
    */
  function definedAndFlattened(array) { 
    const defined = array.filter(function(x){ return x != undefined });
    return [].concat.apply([], defined) }

  /**
    * @param begin String, begin date
    * @param end String, end date
    * @return String, date range in ISO 8601 format
   */
  function dateRange(begin, end) { return `${begin}/${end}` }

  /**
    * @return String
    */
  const type = () => {
    if (Array.isArray(item.type)) {
      return "CreativeWork"
    } else {
      switch (item.type.toLowerCase()) {
        case "text" : return "TextDigitalDocument"
        case "image" : return "ImageObject"
        case "moving image" : return "VideoObject"
        case "sound" : return "AudioObject"
        default : return "CreativeWork" } } }

  /**
    * @return Array[Object]
    */
  const provider = () => {
    const all = definedAndFlattened([item.partner,
                                     item.intermediateProvider, 
                                     item.contributor]);

    var mapped = all.map(x => { 
      return { "@type": "Organization", "name": x } });

    const dpla = { "@type": "Organization", 
                   "name": "Digital Public Library of America",
                    // TODO Is there a better way to generate homepage URL?
                    "url": "https://dp.la/" }

    mapped.push(dpla);
    return mapped; }

  /**
   * @return Array[String]
   * TODO: This treats URLs and textual statements the same; ideally, we would
   * handle them differently. What is the best way to determine if a string is
   * a valid URL?
   * @see https://digitalpubliclibraryofamerica.atlassian.net/wiki/spaces/TECH/pages/123830279/schema.org+crosswalks
   */
  const license = () => {
    const all = definedAndFlattened([item.rights, item.edmRights]);
    return all; }

  /**
    * @return Object
    */
  const potentialAction = () => {
    const action = () => {
      switch (item.type.toLowerCase()) {
        case "text" : return "ReadAction";
        case "image" : return "ViewAction";
        case "moving image" : return "WatchAction";
        case "sound" : return "ListenAction";
        default : return "CosumeAction"; }}
    return { "@type": action(), "target": item.sourceUrl } }

  /**
    * @return Array[Object]
    */
  const collection = () => {
    const all = definedAndFlattened([item.collection])
    return all.map(x => {
       return { "@type": "Collection", 
                "@id": x["@id"],
                "name": x.title,
                "description": x.description } }) }

  /**
    * @return Array[Object]
    */
  const contributor = () => {
    const all = definedAndFlattened([item.contributor])
    return all.map(x => { return { "@type": "Thing", "name": x } }) }

  /**
    * @return Array[Object]
    */
  const creator = () => {
    const all = definedAndFlattened([item.creator])
    return all.map(x => { return { "@type": "Thing", "name": x } }) }

  /**
    * @return Array[String]
    */
  const description = () => {
    return definedAndFlattened([item.description, item.format, item.extent,
                                item.type]) }
  /**
    * @return Array[String]
    */
  const date = () => {
    const all = definedAndFlattened([item.date]);
    return all.map(x => { return dateRange(x.begin, x.end) }) }

  /**
    * @return Array[Object]
    * TODO: item.langauge only retruns the langauge name. We could add
    * the ISO label.
    */
  const language = () => {
    const all = definedAndFlattened([item.language]);
    return all.map(x => {
      return { "@type": "Language", 
               "name": x } }) }

  /**
    * @return Array[Object]
    */
  const spatial = () => {
    const all = definedAndFlattened([item.spatial])
    return all.map(x => {
      return { "@type": "Place",
               "name": x.name,
               "geo": { "@type": "GeoCoordinates",
                        "addressCountry": x.country,
                        "latitude": x.coordinates.split(",")[0],
                        "longitude": x.coordinates.split(",")[1].trim() } } }) }

  /**
    * @return Array[Object]
    */
  const publisher = () => {
    const all = definedAndFlattened([item.publisher])
    return all.map(x => { return { "@type": "Organization", "name": x } }) }

  /**
    * @retrun Array[Object]
    */
  const subject = () => {
    const all = definedAndFlattened([item.subject])
    return all.map(x => { return { "@type": "Thing", "name": x.name } }) }

  /**
    * @return Array[String] ISO 8601 date range format
    */
  const temporal = () => {
    const all = definedAndFlattened([item.temporal])
    return all.map(x => { return dateRange(x.begin, x.end) }) }

  /**
    * @return Object, JSON-LD representation of DPLA Item
    */
  const JsonLd = {
    "@context": "http://schema.org/",
    "@type": type(),
    // TODO: Is there a better way to generate the api URI?
    "@id": "http://api.dp.la/items/" + url.query.itemId,
    // TODO: Is there a better way to generate the URL of this page?
    "mainEntityOfPage": "https://dp.la/item/" + url.query.itemId,
    "isAccessibleForFree": true,
    "provider": provider(),
    "license": license(),
    "potentialAction": potentialAction(),
    "thumbnailUrl": item.thumbnailUrl,
    "isPartOf": collection(),
    "contributor": contributor(),
    "creator": creator(),
    "dateCreated": date(),
    "description": description(),
    "identifier": item.identifier,
    "inLanguage": language(),
    "spatialCoverage": spatial(),
    "publisher": publisher(),
    "genre": item.specType,
    "about": subject(),
    "temporalCoverage": temporal(),
    "name": definedAndFlattened([item.title]) }

  return <script type="application/ld+json" 
          dangerouslySetInnerHTML={ { __html: JSON.stringify(JsonLd) } } /> }

export default JsonLdMarkup;
