# Subject Metadata Guide

Subject metadata is a powerful way of linking contributing institutions’ and partners’ records with other records from other providers and partners from around the country. This works best when subject terms:

1. Adhere to a controlled vocabulary
1. Are short and simple: in a word, uncoordinated

For controlled vocabularies, the IDHH recommends OCLC’s [Faceted Application of Subject Terminology (FAST) standard](http://fast.oclc.org/). Coordinated terms are strung together in a series, such as in an example below, `<dc:subject>Utility poles--Illinois—Chicago</dc:subject>`. Due to their specificity, coordinated subject terms often result in the subject metadata siloing or isolating a set of records.

The following is a scenario illustrating the problems related to coordinated subject terms in the IDHH, DPLA, and potentially, local catalogs. Consider a catalog subject search for subject terms equaling ‘Utility poles’. This search returns 2,398 records, including 129 contributed by IDHH institutions. This is good as it links at least a few of the IDHH’s records to 100s of others in the DPLA.

![Subject term search in the DPLA catalog](/static/local/illinois/uncoordinated-subject-term-search.png  "Subject term search in the DPLA catalog")

_Subject term search in the DPLA catalog._

This allows users to more easily find IDHH records when they are searching by subject or when they click certain subject facets, either in the search results, above, or on an item page, below.

![Uncoordinated subject terms on a DPLA item page](/static/local/illinois/uncoordinated-subject-terms-item-page.png  "Uncoordinated subject terms on a DPLA item page")

_Uncoordinated subject terms on a DPLA item page._

The above results are possible by uncoordinated terms. In a DC XML metadata record, the subject metadata would look something like this: `<dc:subject>Utility poles</dc:subject>` or `<dc:subject>Utility poles; Fire hydrants; Etc.</dc:subject>`.

Coordinated terms, on the other hand, result in small, idiosyncratic record sets in the DPLA. A user is unlikely to search by a coordinated subject term, ‘Utility poles--Illinois--Chicago’ but if they did, it would return only 215 results. All these records are contributed by a single institution within the IDHH. As it is very unlikely for a user to search for this specific subject term, it is similarly unlikely that a user would stumble upon any items in this record set from subject term facets either in the search results catalog UI or from the item pages.

![Coordinated subject terms in the DPLA catalog](/static/local/illinois/coordinated-subject-term-search.png  "Coordinated subject terms in the DPLA catalog")

_Example of the limitations of coordinated subject terms in the DPLA catalog._

Furthermore, uncoordinated metadata not only improves the existing features of the IDHH and DPLA catalogs but makes for opportunities to create new features. One such feature that is being considered is a page that links to relevant subject terms. This would work similarly to the ‘[Browse by Partner](/browse-by-partner)’ feature but hinging on the subject field instead of the provider name. Unfortunately, the metadata is not at the quality needed for such a feature but is something to look forward to if extensive work on the subject field were undertaken by multiple institutions as well as the IDHH and were accomplished.

This is why metadata records should be provided with uncoordinated subject metadata: in order to make collections more findable, the DPLA more interactive, and to improve user experience. The uncoordinated version of the above term in a DC XML record would be `<dc:subject>Utility poles; Illinois; Chicago</dc:subject>`. Please consider uncoordinating your subject terms and, at the very least, creating new subject metadata as uncoordinated. Including uncoordinated terms in addition to one or more coordinated terms would also be an improvement: `<dc:subject>Utility poles--Illinois--Chicago; Utility poles; Illinois; Chicago</dc:subject>`. The IDHH is also experimenting with automated ways to uncoordinate subject terms on our harvesting server and provide this to the DPLA if doing this work is not feasible for your institutions or your local environment. For more information on the subject field, see the [IDHH Metadata Best Practices](https://docs.google.com/document/d/1q1AORHoa0ey0fUGOTYMHLvZNCm6Wq1Qe9DDvFZSRPT0/edit#heading=h.z9fcsowpo0x2).
