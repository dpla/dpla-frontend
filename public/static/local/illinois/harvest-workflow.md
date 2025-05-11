# Harvesting Workflow

![IDHH harvest workflow illustration, described below](/static/local/illinois/idhh-harvest-workflow.PNG "IDHH Harvest Workflow Overview")

**1. On-boarding**

- Institution consents to providing metadata for specific collections, by completing the [contributor agreement form](https://uofi.box.com/s/jbtvvhfs0tdsipjffbayqyq159tcxxjp) and returning it to the [IDHH Coordinator](/about/contact).
- Institution provides technical information on their digital library system necessary for testing, metadata assessment, and harvest by completing the [technical information form](https://uofi.box.com/s/a9m3x5a2hto4z249ti194vxivcihc0em) and providing it to the [IDHH Coordinator](/about/contact).

**2. Test harvesting and metadata assessment**

- IDHH determines if metadata is harvestable with OAI-PMH and determines the metadata schema
- IDHH harvests metadata with Combine test server
- IDHH assesses harvested metadata to check how it conforms with the DPLA’s standards

**3. Metadata Remediation**

- IDHH provides metadata assessment to contributor
- Contributor makes required changes and any recommended changes they care to undertake
- Contributor communicates with IDHH that metadata changes have been made and collections are ready for harvest

**4. Harvesting Metadata into Production**

- IDHH harvests metadata into Combine Production server
- Production server performs some automated transformations on metadata

**5. DPLA Harvest**

- DPLA harvests metadata
- DPLA indexes metadata and provides it in catalog

**6. Future Harvests**

- IDHH will reharvest collections on a quarterly basis, approximately every January, April, July, and October
- Any metadata changes contributors make to collections between harvests will appear in the DPLA catalog after collections are first reharvest by the IDHH and then by the DPLA
