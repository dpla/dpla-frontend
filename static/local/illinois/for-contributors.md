# Getting Started

## Who can participate

Libraries, archives, museums, and other cultural heritage institutions from anywhere in Illinois that would like to contribute to the IDHH may share access to their digital collections’ metadata.

## How to get started

If your digital collections are already part of [CARLI Digital Collections](https://collections.carli.illinois.edu/) or the [Illinois Digital Archive](http://www.idaillinois.org/), please speak with your contact at [CARLI](https://www.carli.illinois.edu/) or the [Illinois State Library](https://www.cyberdriveillinois.com/departments/library/) to find out how to participate in the IDHH.

All other institutions who wish to contribute new items, including those who have already provided collections to the IDHH, should begin by completing the [Contributor Agreement form](https://drive.google.com/open?id=0By5ezltuoaTHM016a215dXJHbk0) and returning it to the [IDHH Coordinator](/contact). Once the form has been completed, IDHH staff will work with your institution to gather technical information about your collections and metadata and begin testing. Once again, institutions that have already completed contributor agreement forms for collections already provided will need to complete new agreement forms for any and all new collections they wish to contribute.

New providers or current contributors whose OAI endpoints have changed should complete a technical information form and return it to the [harvesting manager](/contact) and [metadata manager](/contact). This form provides IDHH staff with information they need to begin gathering and assessing your collections’ metadata.

## How it works

Institutions provide their metadata to the IDHH, usually via [OAI-PMH 2.0](http://www.openarchives.org/pmh/). If your institution’s system is unable to provide an OAI feed, the IDHH can help investigate alternative methods for harvesting records. All metadata should be mapped to [Qualified Dublin Core](http://www.dublincore.org/specifications/dublin-core/dcmi-terms/) whenever possible; otherwise, the IDHH can work with you to begin the mapping process.

The IDHH uses the open-source application [REPOX](http://repox.sysresearch.org) to harvest and aggregate collection metadata from all contributing institutions. DPLA then harvests a single stream of all aggregated metadata from the IDHH REPOX server for inclusion in the DPLA catalog.

# Harvesting Workflow

![IDHH harvest workflow illustration, described below](/static/local/illinois/idhh-harvest-workflow.PNG  "IDHH Harvest Workflow Overview")

1. **On-boarding**
   - Institution consents to providing metadata for specific collections, by completing the [contributor agreement form](https://drive.google.com/file/d/0By5ezltuoaTHM016a215dXJHbk0/view) and returning it to the [IDHH Coordinator](/contact).
   - Institution provides technical information on their digital library system necessary for testing, metadata assessment, and harvest by completing the [technical information form](https://docs.google.com/document/d/1moX_IVbjwd0twLPUD7Pan5SMlW3f695K-r4udlgNd1c/edit?usp=sharing) and providing it to the [harvesting manager](/contact) and [metadata manager](/contact).

2. **Test harvesting and metadata assessment**
   - IDHH determines if metadata is harvestable with OAI-PMH and determines the metadata schema
   - IDHH harvests metadata with REPOX test server
   - IDHH assesses harvested metadata to check how it conforms with the DPLA’s standards

3. **Metadata Remediation**
   - IDHH provides metadata assessment to contributor
   - Contributor makes required changes and any recommended changes they care to undertake
   - Contributor communicates with IDHH that metadata changes have been made and collections are ready for harvest

4. **Harvesting Metadata into Production**
   - IDHH harvests metadata into REPOX Production server
   - Production server performs some automated transformations on metadata

5. **DPLA Harvest**
   - DPLA harvests metadata
   - DPLA Indexes metadata and provides it in catalog

6. **Future Harvests**
   - IDHH will re-harvest collections on a quarterly basis, approximately every January, April, July, and October
   - Any metadata changes contributors make to collections between harvests will appear in the DPLA catalog after collections are first re-harvest by the IDHH and then by the DPLA

# New Provider Readiness

1. Do you have digital collections publicly available on the web? If your institution holds physical collections that it would like to digitize, you may contact the [Illinois State Library](https://www.cyberdriveillinois.com/departments/library/) for information on Digitization Initiative Grants.

2. Is your institution able and willing to provide permission for the IDHH and DPLA to harvest and publish your collections’ metadata?

3. Do the collections you wish to contribute meet with the [DPLA’s Collections Development Policy](https://pro.dp.la/hubs/collection-development-guidelines)?
   - Scholarly materials, such as electronic theses and dissertations, academic journals, and/ or articles
   - Finding aids or archival collection guides
   - Embargoed, hidden, or restricted items. (Note that the IDHH can omit any restricted items within a collection if they are flagged in the metadata. Work with us to find out how.)

4. Are your collections a part of the Illinois Digital Archives or CARLI Digital Collections? Otherwise, can your online digital collections be shared through an OAI-PMH feed? If not, we can work with you to find an alternative solution.

5. Do each record in the collections you wish to contribute include the following metadata?
   - a unique web-accessible URI (a link to the item in the Illinois Digital Archives, CARLI Digital Collections, or your institution’s own digital collections system)
   - title field
   - a valid rights statement
   - name of your institution

6. Does your digital collections system provide thumbnails for each item?

7. Does your institution have a specific staff member who can work with the IDHH on any issues related to contributing your collections’ metadata? This is not a requirement but please let us know if the contact person for metadata and harvest issues is different from your institution’s main contact.

This document was adapted from PA Digital’s [Readiness Checklist](https://padigital.org/pa-digital-readiness/). Thanks to PA Digital for developing this document and fostering re-use.

# Metadata Resources

## Metadata Assessment and Remediation

On their way to the DPLA catalog, your institution’s collections will first be assessed by the IDHH. We will work with you to make any changes required or recommended by the DPLA.

If you have already contributed collections and want to improve your metadata, you might start by checking with any collection assessments provided by the [metadata manager](/contact) or contacting them directly.

The documentation below will help guide new contributors through the process of preparing collections’ metadata for harvest and can refresh current contributors who want to further improve their metadata.

## IDHH Metadata Documentation & Links

- [IDHH Metadata Best Practices](https://docs.google.com/document/d/1q1AORHoa0ey0fUGOTYMHLvZNCm6Wq1Qe9DDvFZSRPT0/edit#heading=h.8f1xq25lpxkh)
- [IDHH Introduction to Metadata in the DPLA (Slides and Recording)](https://drive.google.com/file/d/191MsR44Rp2URMXPS9fKM-S0H2yY392ZS/view)
- [IDHH Best Practices (Slides and Recording)](https://drive.google.com/file/d/1RHQYfeUERBDo0EYNjyv6M3DQs35KjPKf/view)
- [Type Metadata Guide](https://ildplametadatawrkgrp.wordpress.com/documentation/type/)
- [IDHH Metadata Assessment Rubric](https://docs.google.com/document/d/1I46jjoehq5KI78VNWRBjR6a6DpLZIN_Xv7IaCD6lB3w/edit)
- [IDHH Metadata Updates](https://ildplametadatawrkgrp.wordpress.com/)

## DPLA Metadata Resources

All of the IDHH’s protocols are in keeping with the DPLA’s requirements and recommendations for their metadata standards, currently the DPLA Metadata Application Profile (DPLA MAP) version 4.0. Here are some key documents outlining the DPLA’s requirements and recommendations.

- [DPLA MAP 4.0 Introduction and Description](https://drive.google.com/file/d/1743zMwrrZQFleAZiMZNe_f5H3TXv6Iyg/view)
- [DPLA Metadata Quality Guidelines](https://docs.google.com/document/d/1dITqEYEWsMX1a2pLPmkL78k1LN2b4im03spn8_QFscY/edit)
- [DPLA Rights Guidelines](https://docs.google.com/document/d/1dITqEYEWsMX1a2pLPmkL78k1LN2b4im03spn8_QFscY/edit)
- [DPLA Geographic and Temporal Guidelines](https://docs.google.com/document/d/1lfiJ8yoZf1fAoR5vmJoHpWQO63eKeL8HDGVupCocfoM/edit)

# Rights Statement Resources

Every item in the IDHH must include a rights statement in its metadata record. To make statements as clear as possible concerning use, permissions, and reproductions, the DPLA recommends using a standardized rights statement from either [RightsStatements.org](https://rightsstatements.org/en/) or the [Creative Commons](https://creativecommons.org/).

For most items in a digital collection, the standardized statements from RightsStatements.org will be most appropriate. Creative Commons licenses can be applied only by the rights holder while Rights Statements are designed for items in libraries, archives, and museums where the institution rarely holds the copyright.

[PA Digital](https://padigital.org/)’s interactive Rights Statement Selection Tool provides step-by-step instructions for determining the rights status of an item \[[Interactive PDF](https://padigital.org/wp-content/uploads/2018/10/Rights-Statement-Selection-Tool_Galson.pdf)\].

![Rights Statement Selection Tool](/static/local/illinois/rights-statement-selection-tool.jpg  "Rights Statement Selection Tool")

[CC-BY-2.0](https://creativecommons.org/licenses/by/2.0/). Gabriel Galson, “Rights Statement Selection Tool,” 2018. [http://bit.ly/RightsTool](http://bit.ly/RightsTool)

URIs to Rights Statements or CC Licenses will allow the DPLA to easily populate the catalog display with data from the linked data endpoint. For detailed instructions about implementing rights statements for your contribution to the IDHH, see the [DPLA Standardized Rights Statements Implementation Guidelines](https://docs.google.com/document/d/1aInokOIIsgf-B4iMTXU33qYN5B2jA3s91KgWoh7DZ7Q/edit).

When assessing collections, the IDHH metadata manager will recommend one or more standardized rights statements that may be used instead or in addition to local rights statement(s). If you are a contributing new collections, we encourage you to follow this recommendation. If you have already contributed collections and want to remediate your metadata, implementing standardized rights statements is an excellent place to start. Please check out the resources here and contact the [metadata manager](/contact) for more information.

Please note that the IDHH can neither provide legal advice nor can we assist in creating original rights statements.

## Additional Copyright Resources

- [Copyright Term and the Public Domain in the United States](http://copyright.cornell.edu/resources/publicdomain.cfm)
- [IDHH Copyright and Standardized Rights Statements for Digital Collections (Video)](https://www.railslibraries.info/events/151660)
- [Rights Statements Webinar (DPLA)](https://pro.dp.la/events/workshops#rights)

The Rights Statement guide was created by Kaylen Dwyer, graduate assistant at Scholarly Communications and Publishing of the University of Illinois, Urbana-Champaign Library on June 13, 2019.

# Collection Analytics

The DPLA collects usage stats on each IDHH provider, including item views, referrals from the DPLA catalog to its local system, and much more. To view this data, request an account for your institution from the [IDHH Coordinator](/contact). To login, visit the [DPLA Analytics Dashboard](https://analytics-dashboard.dp.la/users/sign_in).
