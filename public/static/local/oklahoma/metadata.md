<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 9980478 (wip)
# Metadata

### OKHUB Metadata Guidelines and Best Practices

<<<<<<< HEAD
=======
>>>>>>> 149098c (wip)
=======
>>>>>>> 9980478 (wip)
The OKHUB Metadata Guidelines and Best Practices serves as a resource for OKHUB partners in creating and remediating digital collections for aggregation into Digital Public Library of America (DPLA) with the benefit of increased accessibility and discoverability.

The guidelines are intended to support partners for developing and evaluating the metadata for their collections to:

<<<<<<< HEAD
<<<<<<< HEAD
- Meet [DPLA’s required fields](#requirements) as a participant
- Provide quality metadata that follows known standards
- Promote consistent mapping across collections for a successful DPLA aggregation
- Provide information on [controlled vocabulary](#controlled) and other [Resources](#resources)
- Provide an easy way to [contact us](#contact)
=======
- Meet DPLA’s required fields as a participant
- Provide quality metadata that follows known standards
- Promote consistent mapping across collections for a successful DPLA aggregation
- Provide information on controlled vocabulary and other Resources
- Provide an easy way to contact us
>>>>>>> 149098c (wip)
=======
- Meet [DPLA’s required fields](#requirements) as a participant
- Provide quality metadata that follows known standards
- Promote consistent mapping across collections for a successful DPLA aggregation
- Provide information on [controlled vocabulary](#controlled) and other [Resources](#resources)
- Provide an easy way to [contact us](#contact)
>>>>>>> 9980478 (wip)

## OKHUB Metadata

Simple and qualified Dublin Core schemas are utilized in the following guidelines along with the mapping of the DC elements to those fields in (in this example) a CONTENTdm repository. Each field is formatted as shown in the table:

<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 9980478 (wip)
| Field | 
| --- |
| DPLA Requirement | 
| OKHUB Requirement | 
| Definition | 
| Simple DC Element |
| Qualified DC Element | 
| CONTENTdm Mapping | 
| Repeatable | 
| Displayed in DPLA Portal | 
| Notes and Best Practices | 
| Controlled Vocabulary/Syntax |
| Example | 
 
<<<<<<< HEAD
=======
![Metadata Elements Chart](/static/local/oklahoma/metadata-elements-chart.jpg)
>>>>>>> 149098c (wip)
=======
>>>>>>> 9980478 (wip)

Noted is the obligation of that field: Optional, Recommended, Strongly Recommended, Required, and Required (DPLA Derived). The guidelines, like DPLA, encourages the use of controlled vocabulary along with standards from listed resources for improved metadata quality. Additionally, partners are strongly encouraged to familiarize themselves with other DPLA resources noted in the guidelines for additional details and explanations regarding metadata.

Metadata from different schemas other than Dublin Core and other repositories (e.g., DSpace) may also be aggregated. Those partners should contact a lead OKHUB member from Oklahoma State University or University of Oklahoma for further information.

**Note:** Metadata description is meant to describe in DPLA the **original source**, and not the digital representation, unless the item is born digital.

<<<<<<< HEAD
<a name="requirements"></a>
=======
>>>>>>> 149098c (wip)
## DPLA Requirements

DPLA has basic metadata fields that are required and recommended:

| Value | Obligation |
| ---- | ---- | 
<<<<<<< HEAD
<<<<<<< HEAD
| [Contributing Institution’s name](#contributing) | Required when available |
| [Collection title](#collection) | Required when available |
| [Date of creation](#date) | Strongly recommended |
| Hub’s name (OKHub) | Required |
| Link to original record (URL) | Required |
| Link to thumbnail | Required when available |
| [“Place” of resource](#place) | Strongly recommended |
| [Rights of resource](#rights) | Required |
| [Subject of resource](#subject) | Strongly recommended |
| [Title of resource](#title) | Required |
| Type of resource (from Dublin Core Type Vocabulary) | Required when available |


<a name="resources"></a>

=======
| Contributing Institution’s name | Required when available |
| Collection title | Required when available |
| Date of creation | Strongly recommended |
=======
| [Contributing Institution’s name](#contributing) | Required when available |
| [Collection title](#collection) | Required when available |
| [Date of creation](#date) | Strongly recommended |
>>>>>>> 9980478 (wip)
| Hub’s name (OKHub) | Required |
| Link to original record (URL) | Required |
| Link to thumbnail | Required when available |
| [“Place” of resource](#place) | Strongly recommended |
| [Rights of resource](#rights) | Required |
| [Subject of resource](#subject) | Strongly recommended |
| [Title of resource](#title) | Required |
| Type of resource (from Dublin Core Type Vocabulary) | Required when available |

>>>>>>> 149098c (wip)
## DPLA Resources

[An Introduction to the DPLA Metadata Application Profile](https://pro.dp.la/hubs/metadata-application-profile)

A general introduction to DPLA’s metadata standards, workflows, and processes and introduces the model for how data is stored in DPLA.

[DPLA Geographic and Temporal Guidelines for MAP 3.1](http://bit.ly/dpla-geo-styleguide-3_1)

Recommendations for the formatting of the geographic and temporal data in records that will be shared with DPLA.

[DPLA Metadata Application Profile](https://pro.dp.la/hubs/metadata-application-profile)

A definition of the metadata properties and classes used in DPLA.

[DPLA Metadata Quality Guidelines](http://bit.ly/dpla-metadata-qual)

The document includes best practices for creating shareable metadata for the DPLA aggregation.

[DPLA Standardized Rights Statements Implementation Guidelines](http://bit.ly/dpla-rights-guidelines)

<<<<<<< HEAD
A description of DPLA’s implementation of standardized rights statements and recommendations for the use of statements in records that will be shared with DPLA.<br><br><br>

**ALTERNATIVE TITLE**
=======
A description of DPLA’s implementation of standardized rights statements and recommendations for the use of statements in records that will be shared with DPLA.

<<<<<<< HEAD
## Field Definitions

### Alternative Title
>>>>>>> 149098c (wip)
=======
## Alternative Title
>>>>>>> 9980478 (wip)

| Field | Alternative Title |
| --- | --- |
| DPLA Requirement | Optional |
| OKHUB Requirement | Optional |
| Definition | Alternative title for the resource including varying form of the title, translations and abbreviations |
| Simple DC Element || 	
| Qualified DC Element | dcterms:alternative |
| CONTENTdm Mapping | Title-Alternative |
| Repeatable | Yes |
| Displayed in DPLA Portal | No |
| Notes and Best Practices | DPLA notes that the alternative title is for the resource, not the title of the series or the collection name. |
| Controlled Vocabulary/Syntax | Natural Language (Free Text) |
<<<<<<< HEAD
<<<<<<< HEAD
| Examples | Title begins with a number:<br><br>1st United Methodist Church Council minutes<br><br>**Alternative Title**: First United Methodist Church Council minutes |

<a name="collection"></a>
**COLLECTION NAME**
=======
| Examples | Title begins with a number:<br>1st United Methodist Church Council minutes<br>**Alternative Title**: First United Methodist Church Council minutes |
=======
| Examples | Title begins with a number:<br><br>1st United Methodist Church Council minutes<br><br>**Alternative Title**: First United Methodist Church Council minutes |
>>>>>>> 9980478 (wip)

### COLLECTION NAME
>>>>>>> 149098c (wip)

| Field | Collection |
| --- | --- |
| DPLA Requirement | Recommended |
| OKHUB Requirement | Recommended |
| Definition | The name of the collection or aggregation that the described resource is physically or logically a part of |
| Simple DC Element | dc:relation |
| Qualified DC Element | dcterms:isPartOf |
| CONTENTdm Mapping | Relation-Is Part Of |
| Repeatable | Yes |
| Displayed in DPLA Portal | No |
| Notes and Best Practices | DPLA recommends using collection names that are understandable outside of the institutional context. Avoid using acronyms, broad topics, and the use of institutional names, only if necessary.  Collection names must be consistent across all the records. |
Controlled Vocabulary/Syntax ||	
<<<<<<< HEAD
<<<<<<< HEAD
| Examples | **Collection Name:** Nichols Collection<br><br>**Collection Name:** Confederate Pensions Records Collection<br><br>**Collection Name:** From Warrior to Saint: David Pendleton Oakerhater |

**CONTRIBUTOR**
=======
| Examples | **Collection Name:** Nichols Collection<br>**Collection Name:** Confederate Pensions Records Collection<br>**Collection Name:** From Warrior to Saint: David Pendleton Oakerhater |

### CONTRIBUTOR
>>>>>>> 149098c (wip)
=======
| Examples | **Collection Name:** Nichols Collection<br><br>**Collection Name:** Confederate Pensions Records Collection<br><br>**Collection Name:** From Warrior to Saint: David Pendleton Oakerhater |

## CONTRIBUTOR
>>>>>>> 9980478 (wip)

| Field | Contributor |
|---|---|
| DPLA Requirement | Optional |
| OKHUB Requirement | Optional |
| Definition | The entity responsible for making secondary contributions to the resource. Editors, sponsors, interviewer are examples of contributors |
| Simple DC Element | dc:contributor |
| Qualified DC Element | dcterms:contributor |
| CONTENTdm Mapping | Contributor |
| Repeatable | Yes |
| Displayed in DPLA Portal | No |
| Notes and Best Practices | DPLA recommends using controlled terms from a national authority list for personal and corporate names. A locally controlled list may also be utilized.  If the authorized form is not used, personal names should follow the format: Last Name, First Name, Initial, (birth year-death year). Corporate names are entered directly or indirectly depending on the type of corporate name per RDA guidelines. Do not use “unknown” as a placeholder value. |
| Controlled Vocabulary/Syntax | Recommend Controlled Vocabulary, e.g., LCNAF, VIAF, ULAN, Local list |
<<<<<<< HEAD
<<<<<<< HEAD
|Examples | **Personal:** James, Henry, 1843-1916<br><br>**Corporate (Direct entry):** Oklahoma Cattlemen’s Association<br><br>**Corporate (Indirect entry):** Oklahoma. Department of Libraries |

**CREATOR**

=======
|Examples | Personal: James, Henry, 1843-1916<br>Corporate (Direct entry): Oklahoma Cattlemen’s Association Corporate (Indirect entry): Oklahoma. Department of Libraries |

### CREATOR
>>>>>>> 149098c (wip)
=======
|Examples | **Personal:** James, Henry, 1843-1916<br><br>**Corporate (Direct entry):** Oklahoma Cattlemen’s Association<br><br>**Corporate (Indirect entry):** Oklahoma. Department of Libraries |

## CREATOR
>>>>>>> 9980478 (wip)
| Field | Creator |
|---|---|
| DPLA Requirement | Recommended |
| OKHUB Requirement | Recommended |
| Definition | Entity responsible primarily for making the resource. Authors, photographers, interviewee, artists are examples of creators |
| Simple DC Element | dc:creator |
| Qualified DC Element | dcterms:creator |
| CONTENTdm Mapping | Creator |
| Repeatable | Yes |
| Displayed in DPLA Portal | Yes |
| Notes and Best Practices | DPLA recommends using controlled terms from a national authority list for personal and corporate names. A locally controlled list may also be utilized.  If the authorized form is not used, personal names should follow the format: Last Name, First Name, Initial (birth year-death year). Corporate names are entered directly or indirectly depending on the type of corporate name per RDA guidelines. Do not use “unknown” as a placeholder value. |
| Controlled Vocabulary/Syntax | Recommend Controlled Vocabulary, e.g., LCNAF, VIAF, ULAN, Local list |
<<<<<<< HEAD
<<<<<<< HEAD
| Examples | **Personal:**  Lange, Dorothea |


<a name="contributing"></a>

**DATA PROVIDER**

| Field | Data Provider |
|---|---|
| DPLA Requirement | **Required (Derived)** |
| OKHUB Requirement | **Required (Derived)**|
=======
| Examples | Personal:  Lange, Dorothea |
=======
| Examples | **Personal:**  Lange, Dorothea |
>>>>>>> 9980478 (wip)

## DATA PROVIDER
| Field | Data Provider |
|---|---|
<<<<<<< HEAD
| DPLA Requirement | Required (Derived) |
| OKHUB Requirement | Required (Derived) |
>>>>>>> 149098c (wip)
=======
| DPLA Requirement | **Required (Derived)** |
| OKHUB Requirement | **Required (Derived)**|
>>>>>>> 9980478 (wip)
| Definition | Contributing Institution’s name |
| Simple DC Element || 	
| Qualified DC Element | dcterms:provenance  |
| CONTENTdm Mapping || 	
| Repeatable || 	
| Displayed in DPLA Portal | Yes  |
| Notes and Best Practices | Derived from partner’s supplied data |
| Controlled Vocabulary/Syntax || 	
| Examples | Oklahoma State University Library |

<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<a name="date"></a>

**DATE**

=======


=======
>>>>>>> 55a2e08 (wip)
### DATE
>>>>>>> 149098c (wip)
=======
## DATE
>>>>>>> 9980478 (wip)
| Field | Date |
|---|---|
| DPLA Requirement | Recommended |
| OKHUB Requirement | Recommended |
| Definition | The date of creation of the  original resource |
| Simple DC Element | dc:date |
| Qualified DC Element | dcterms:created |
| CONTENTdm Mapping | Date-Created |
| Repeatable  | No |
| Displayed in DPLA Portal | Yes |
<<<<<<< HEAD
<<<<<<< HEAD
| Notes and Best Practices | DPLA can parse many types and formats of dates as noted in their *DPLA Geographic and Temporal Guidelines*. Do not use the place holder value of “Unknown” or “n.d.” DPLA utilizes the date in search results, a faceted date search, and in their website Timeline view. When more than one date field is used (e.g., original date and date of digitization), the two dates must be made distinguishable from one another.  |
| Controlled Vocabulary/Syntax | Recommend a Standardize Format, e.g., Extended Date Time Format (EDTF); YYYY-MM-DD  |
| Examples | **Year Month Date:** 1918-05-03<br><br>**Year Month:** 1918-05 |



**DESCRIPTION**

=======
| Notes and Best Practices | DPLA can parse many types and formats of dates as noted in their DPLA Geographic and Temporal Guidelines. Do not use the place holder value of “Unknown” or “n.d.” DPLA utilizes the date in search results, a faceted date search, and in their website Timeline view. When more than one date field is used (e.g., original date and date of digitization), the two dates must be made distinguishable from one another.  |
=======
| Notes and Best Practices | DPLA can parse many types and formats of dates as noted in their *DPLA Geographic and Temporal Guidelines*. Do not use the place holder value of “Unknown” or “n.d.” DPLA utilizes the date in search results, a faceted date search, and in their website Timeline view. When more than one date field is used (e.g., original date and date of digitization), the two dates must be made distinguishable from one another.  |
>>>>>>> 9980478 (wip)
| Controlled Vocabulary/Syntax | Recommend a Standardize Format, e.g., Extended Date Time Format (EDTF); YYYY-MM-DD  |
| Examples | **Year Month Date:** 1918-05-03<br><br>**Year Month:** 1918-05 |



<<<<<<< HEAD
### DESCRIPTION
>>>>>>> 149098c (wip)
=======
## DESCRIPTION
>>>>>>> 9980478 (wip)
| Field | Description |
|---|---|
| DPLA Requirement | Recommended |
| OKHUB Requirement | Recommended |
| Definition | A free-text account of the resource. The description includes, but is not limited to: an abstract, summary, graphical description, and table of contents. |
| Simple DC Element | dc:description |
| Qualified DC Element | dcterms:description |
| CONTENTdm Mapping | Description
| Repeatable  | Yes
| Displayed in DPLA Portal | Yes
| Notes and Best Practices | Description should provide adequate contextual information to help identify and explain the resource. DPLA notes that the description is of the resource being described and not a collection to which it belongs or any other parent or child entity. The Collection class within the DPLA MAP exists to record collection descriptions. The use of this field is not for raw OCR output and transcriptions. |
| Controlled Vocabulary/Syntax | Natural Language (Free Text) |
<<<<<<< HEAD
<<<<<<< HEAD
| Examples | **Description:** Studio portrait of Paul Turner Miller as an infant with his mother, Clara Ranne Miller, in Joplin, Missouri.<br><br>**Description:** Front view of the Fire Service Training Station and tower with four fire trucks. The station is located on the southeast corner of the Oklahoma A & M College campus. Dedicated November 4, 1938, the station housed the nation’s first collegiate fire training school.<br><br>**Description:** Cultivated fields showing early signs of water erosion.<br><br>**Description:** Popcorn the Circus Comic was born somewhere in the east and he talked about his early interest in magic and how that led to his career as a circus clown. Popcorn described the life of a circus clown, how he developed a few of his routines, and why he decided it was time to retire from the road after thirty-some years in the business. |

**EXTENT**

| Field | Extent |
|---|---|
=======
| Examples | Description: Studio portrait of Paul Turner Miller as an infant with his mother, Clara Ranne Miller, in Joplin, Missouri.<br>Description: Front view of the Fire Service Training Station and tower with four fire trucks. The station is located on the southeast corner of the Oklahoma A & M College campus. Dedicated November 4, 1938, the station housed the nation’s first collegiate fire training school.<br>Description: Cultivated fields showing early signs of water erosion.<br>Description: Popcorn the Circus Comic was born somewhere in the east and he talked about his early interest in magic and how that led to his career as a circus clown. Popcorn described the life of a circus clown, how he developed a few of his routines, and why he decided it was time to retire from the road after thirty-some years in the business. |
=======
| Examples | **Description:** Studio portrait of Paul Turner Miller as an infant with his mother, Clara Ranne Miller, in Joplin, Missouri.<br><br>**Description:** Front view of the Fire Service Training Station and tower with four fire trucks. The station is located on the southeast corner of the Oklahoma A & M College campus. Dedicated November 4, 1938, the station housed the nation’s first collegiate fire training school.<br><br>**Description:** Cultivated fields showing early signs of water erosion.<br><br>**Description:** Popcorn the Circus Comic was born somewhere in the east and he talked about his early interest in magic and how that led to his career as a circus clown. Popcorn described the life of a circus clown, how he developed a few of his routines, and why he decided it was time to retire from the road after thirty-some years in the business. |
>>>>>>> 9980478 (wip)

## EXTENT

| Field | Extent |
<<<<<<< HEAD
>>>>>>> 149098c (wip)
=======
|---|---|
>>>>>>> 9980478 (wip)
| DPLA Requirement | Optional |
| OKHUB Requirement | Optional |
| Definition | The size or duration of the original resource |
| Simple DC Element | dc:format |
| Qualified DC Element | dcterms:extent |
| CONTENTdm Mapping | Format-Extent |
| Repeatable | Yes |
| Displayed in DPLA Portal | No |
| Notes and Best Practices | Extent provides the physical characteristics of the resource such as the number of pages, dimensions (e.g., height x width x depth), period of time in hours, minutes, seconds (HH:MM:SS format) for recordings. Recommend following a content standard such as RDA to ensure consistency and terminology. |
| Controlled Vocabulary/Syntax | Natural Language (Free Text) |
<<<<<<< HEAD
<<<<<<< HEAD
| Examples | **Book:** 73 pages<br><br>**Map:** 1 map on 4 sheets<br><br>**Size** (two dimensional object described in inches): 3 x 5 inches<br><br>**Sound recording:** 01:26:35 |

**FORMAT**

=======
| Examples | Book: 73 pages<br>Map: 1 map on 4 sheets<br>Size (two dimensional object described in inches): 3 x 5 inches<br>Sound recording: 01:26:35 |

### FORMAT
>>>>>>> 149098c (wip)
=======
| Examples | **Book:** 73 pages<br><br>**Map:** 1 map on 4 sheets<br><br>**Size** (two dimensional object described in inches): 3 x 5 inches<br><br>**Sound recording:** 01:26:35 |

## FORMAT

>>>>>>> 9980478 (wip)
| Field | Format |
|---|---|
| DPLA Requirement | Recommended |
| OKHUB Requirement | Recommended |
| Definition | The file format, physical medium or dimensions of the resource |
| Simple DC Element | dc:format |
| Qualified DC Element ||
| CONTENTdm Mapping | Format |
| Repeatable | Yes |
| Displayed in DPLA Portal | Yes |
| Notes and Best Practices | Format provides the digital characteristics of the resource such as file format, physical medium or dimensions. Use controlled vocabulary from the list of IANA Media Types. The format is media type and subtype, separated with a slash. |
| Controlled Vocabulary/Syntax | IANA Media Types |
<<<<<<< HEAD
<<<<<<< HEAD
| Examples | application/pdf<br><br>audio/mpeg<br><br>image/jp2<br><br>image/tiff<br><br>video/mp4 |

**IDENTIFIER**

| Field | Identifier |
|---|---|
| DPLA Requirement | Optional |
| OKHUB Requirement | **Required** |
=======
| Examples | application/pdf<br>audio/mpeg<br>image/jp2<br>image/tiff<br>video/mp4 |
=======
| Examples | application/pdf<br><br>audio/mpeg<br><br>image/jp2<br><br>image/tiff<br><br>video/mp4 |
>>>>>>> 9980478 (wip)

## IDENTIFIER
| Field | Identifier |
|---|---|
| DPLA Requirement | Optional |
<<<<<<< HEAD
| OKHUB Requirement | Required |
>>>>>>> 149098c (wip)
=======
| OKHUB Requirement | **Required** |
>>>>>>> 9980478 (wip)
| Definition | An unambiguous reference to the digital resource within a given context |
| Simple DC Element | dc:identifier |
| Qualified DC Element | dcterms:identifier |
| CONTENTdm Mapping | Identifier |
| Repeatable | Yes |
| Displayed in DPLA Portal | Yes |
| Notes and Best Practices | A unique URI that identifies the resource. Automatically generated by the content management system. Other uses for the field, for example, is an accession number. |
| Controlled Vocabulary/Syntax | Prefer Alphanumeric string only |
<<<<<<< HEAD
<<<<<<< HEAD
| Examples | String: http://digitalprairie.ok.gov/cdm/ref/collection/pensions/id/170  <br>Number: 03-03-0005 |



**IS SHOWN AT**

| Field | Is Shown At (URL) |
|---|---|
| DPLA Requirement | **Required (Derived)** |
| OKHUB Requirement | **Required (Derived)** |
=======
| Examples | String: http://digitalprairie.ok.gov/cdm/ref/collection/pensions/id/170;<br>Number: 03-03-0005 |
=======
| Examples | String: http://digitalprairie.ok.gov/cdm/ref/collection/pensions/id/170  <br>Number: 03-03-0005 |
>>>>>>> 9980478 (wip)



## IS SHOWN AT
| Field | Is Shown At (URL) |
|---|---|
<<<<<<< HEAD
| DPLA Requirement | Required (Derived) |
| OKHUB Requirement | Required (Derived) |
>>>>>>> 149098c (wip)
=======
| DPLA Requirement | **Required (Derived)** |
| OKHUB Requirement | **Required (Derived)** |
>>>>>>> 9980478 (wip)
| Definition || 	
| Simple DC Element || 	
| Qualified DC Element  ||	
| CONTENTdm Mapping  || 	
| Repeatable ||	
| Displayed in DPLA Portal | Yes |
| Notes and Best Practices | Unambiguous URL reference to the digital objects in its full information context. Derived from partner’s supplied data |
| Controlled Vocabulary/Syntax || 	
| Examples ||

<<<<<<< HEAD
<<<<<<< HEAD
**LANGUAGE**

=======


### LANGUAGE
>>>>>>> 149098c (wip)
=======
## LANGUAGE
>>>>>>> 9980478 (wip)
| Field | Language |
|---|---|
| DPLA Requirement | Recommended |
| OKHUB Requirement | Recommended |
| Definition | A language of the resource |
| Simple DC Element | dc:language |
| Qualified DC Element | dcterms:language |
| CONTENTdm Mapping | Language |
| Repeatable | Yes |
| Displayed in DPLA Portal | Yes |
| Notes and Best Practices | DPLA notes to use for resources that contain text or speech only. The use of the field supports a language faceted search in DPLA. Strongly recommended by DPLA for text materials. | 
| Controlled Vocabulary/Syntax | Recommend Controlled Vocabulary ISO 639-2 (three letter code). In DPLA these codes are displayed in the full language name (e.g., “eng” becomes “English” |
<<<<<<< HEAD
<<<<<<< HEAD
| Examples | eng<br><br>fre<br><br>spa<br><br>ger |

**MEDIUM**

=======
| Examples | eng<br>fre<br>spa<br>ger |

### MEDIUM
>>>>>>> 149098c (wip)
=======
| Examples | eng<br><br>fre<br><br>spa<br><br>ger |

## MEDIUM
>>>>>>> 9980478 (wip)
| Field | Medium |
|---|---|
| DPLA Requirement | Optional |
| OKHUB Requirement | Optional |
| Definition | The material or physical medium of the described resource |
| Simple DC Element | dc:format |
| Qualified DC Element | dcterms:medium |
| CONTENTdm Mapping | Format-Medium |
| Repeatable | Yes |
| Displayed in DPLA Portal | No |
| Notes and Best Practices | Medium apply to the physical characteristics of the resource and not the digital file characteristics |
| Controlled Vocabulary/Syntax | Recommend Controlled Vocabulary, e.g.,  RDA, Art and Architecture Thesaurus (ATT), Thesaurus of Graphic Materials (TGM) |
<<<<<<< HEAD
<<<<<<< HEAD
| Examples | **RDA:** Postcard<br><br>**ATT:* Color photographs<br><br>**TGM:** Lantern slides |

<a name="place"></a>

**PLACE**

=======
| Examples | RDA: Postcard<br>ATT: Color photographs<br>TGM: Lantern slides |

### PLACE
>>>>>>> 149098c (wip)
=======
| Examples | **RDA:** Postcard<br><br>**ATT:* Color photographs<br><br>**TGM:** Lantern slides |

## PLACE
>>>>>>> 9980478 (wip)
| Field | Place |
|---|---|
| DPLA Requirement | Strongly Recommended |
| OKHUB Requirement | Strongly Recommended |
| Definition | Spatial characteristics of the resource such as country, city, region, address or other geographical term |
| Simple DC Element | dc:coverage |
| Qualified DC Element | dcterms:spatial |
| CONTENTdm Mapping | Coverage-Spatial |
| Repeatable | Yes |
| Displayed in DPLA Portal || 	
<<<<<<< HEAD
<<<<<<< HEAD
| Notes and Best Practices | DPLA recommends arranging geographical locations hierarchically in a single instance of the term (e.g., Erie, Pennsylvania). DPLA enriches geographic data by matching values with known geographic vocabularies, i.e., Geonames. See *DPLA Geographic and Temporal Guidelines* for further information and examples. |
| Controlled Vocabulary/Syntax | Recommend Controlled Vocabulary, e.g., FAST Terms, GeoNames, Library of Congress Subject Headings; Getty Thesaurus of Geographic Names |
| Examples | **FAST (Indirect order):** Oklahoma—Tulsa County<br><br>**LCSH (Direct order):** Tulsa County (Okla.)<br><br>**DPLA’s preferred hierarchical order in a single string:** Tulsa, Tulsa County, Oklahoma |

**PUBLISHER**

=======
| Notes and Best Practices | DPLA recommends arranging geographical locations hierarchically in a single instance of the term (e.g., Erie, Pennsylvania). DPLA enriches geographic data by matching values with known geographic vocabularies, i.e., Geonames. See DPLA Geographic and Temporal Guidelines for further information and examples. |
=======
| Notes and Best Practices | DPLA recommends arranging geographical locations hierarchically in a single instance of the term (e.g., Erie, Pennsylvania). DPLA enriches geographic data by matching values with known geographic vocabularies, i.e., Geonames. See *DPLA Geographic and Temporal Guidelines* for further information and examples. |
>>>>>>> 9980478 (wip)
| Controlled Vocabulary/Syntax | Recommend Controlled Vocabulary, e.g., FAST Terms, GeoNames, Library of Congress Subject Headings; Getty Thesaurus of Geographic Names |
| Examples | **FAST (Indirect order):** Oklahoma—Tulsa County<br><br>**LCSH (Direct order):** Tulsa County (Okla.)<br><br>**DPLA’s preferred hierarchical order in a single string:** Tulsa, Tulsa County, Oklahoma | 

<<<<<<< HEAD
### PUBLISHER
>>>>>>> 149098c (wip)
=======
## PUBLISHER
>>>>>>> 9980478 (wip)
| Field | Publisher |
|---|---|
| DPLA Requirement | Optional |
| OKHUB Requirement | Optional |
<<<<<<< HEAD
<<<<<<< HEAD
| Definition | Entity responsible for making the **original** resource available |
=======
| Definition | Entity responsible for making the original resource available |
>>>>>>> 149098c (wip)
=======
| Definition | Entity responsible for making the **original** resource available |
>>>>>>> 9980478 (wip)
| Simple DC Element | dc:publisher |
| Qualified DC Element | dcterms:publisher |
| CONTENTdm Mapping | Publisher |
| Repeatable | Yes |
| Displayed in DPLA Portal | Yes |
| Notes and Best Practices | DPLA notes the field is intended to contain the publisher of the original item, not the institution involved in its digitization or sharing.  Most likely used for materials such as books and journals. Do not use place holder values such as “unknown” or “s.n.” |
| Controlled Vocabulary/Syntax | Natural Language (Free Text) |
| Examples ||

<<<<<<< HEAD
<<<<<<< HEAD
**RELATION**
=======
### RELATION
>>>>>>> 149098c (wip)

| Field | Relation |
|---|---|
| DPLA Requirement | Optional |
<<<<<<< HEAD
=======
## RELATION
| Field | Relation |
|---|---|
| DPLA Requirement | Optional |
>>>>>>> 9980478 (wip)
| OKHUB Requirement | Optional |
| Definition | A related resource |
| Simple DC Element | dc:relation |
| Qualified DC Element | dcterms:relation |
| CONTENTdm Mapping | Relation |
| Repeatable | Yes |
| Displayed in DPLA Portal | No |
| Notes and Best Practices | Relation is intended for use with other items that have some relationship with the content. Can be used to indicate item belongs to a series, collection, or theme. DPLA notes if the relationship is specifically that of collection membership or replacing another item, those more specific fields (i.e., Dublin Core Qualified) should be used. A resource may relate to another resource in a variety of ways that can be described by using more than one Relation element. For example, an item in one named collection is also part of a larger/smaller named collection (physical or digital), to which the Relation field can be repeated to show a relationship between both named collections.
| Controlled Vocabulary/Syntax | Recommend Controlled Vocabulary<br><br>URL |
| Examples | When the item is part of a series:<br><br>**Relation:** OHS popular culture series |

<<<<<<< HEAD
**RELATION.ISPARTOF**

=======
| OKHUB Requirement 	Optional
| Definition 	A related resource
| Simple DC Element 	dc:relation
| Qualified DC Element 	dcterms:relation
| CONTENTdm Mapping 	Relation
| Repeatable 	Yes
| Displayed in DPLA Portal 	No
| Notes and Best Practices 	Relation is intended for use with other items that have some relationship with the content. Can be used to indicate item belongs to a series, collection, or theme. DPLA notes if the relationship is specifically that of collection membership or replacing another item, those more specific fields (i.e., Dublin Core Qualified) should be used. A resource may relate to another resource in a variety of ways that can be described by using more than one Relation element. For example, an item in one named collection is also part of a larger/smaller named collection (physical or digital), to which the Relation field can be repeated to show a relationship between both named collections.
| Controlled Vocabulary/Syntax | Recommend Controlled Vocabulary<br>URL |
| Examples | When the item is part of a series:<br>**Relation:** OHS popular culture series |

### RELATION.ISPARTOF
>>>>>>> 149098c (wip)
=======
## RELATION.ISPARTOF
>>>>>>> 9980478 (wip)
| Field | Relation.IsPartOf |
| --- | --- |
| DPLA Requirement | Recommended |
| OKHUB Requirement | Recommended |
| Definition ||
| Simple DC Element ||
| Qualified DC Element || 	
| CONTENTdm Mapping || 	
| Repeatable || 
| Displayed in DPLA Portal || 	
<<<<<<< HEAD
<<<<<<< HEAD
| Notes and Best Practices | **See Collection Field** |
| Controlled Vocabulary/Syntax || 	
| Examples ||

**RELATION.ISREPLACEDBY**

=======
| Notes and Best Practices | See Collection Field |
| Controlled Vocabulary/Syntax || 	
| Examples ||

### RELATION.ISREPLACEDBY
>>>>>>> 149098c (wip)
=======
| Notes and Best Practices | **See Collection Field** |
| Controlled Vocabulary/Syntax || 	
| Examples ||

## RELATION.ISREPLACEDBY
>>>>>>> 9980478 (wip)
| Field | Relation.IsReplacedBy |
| --- | --- |
| DPLA Requirement | Optional |
| OKHUB Requirement | Optional |
| Definition | Another resource that references, cites or otherwise points to the described resource |
| Simple DC Element | dc:relation |
| Qualified DC Element | dcterms:isReplacedBy |
| CONTENTdm Mapping | Relation-Is Replaced By | 
| Repeatable | Yes |
| Displayed in DPLA Portal | No |
| Notes and Best Practices | References the succeeding item. DPLA notes this field is intended for series and title changes, for example government documents, serial publications and periodicals. |
| Controlled Vocabulary/Syntax | Recommend Controlled Vocabulary
<<<<<<< HEAD
<<<<<<< HEAD
| Examples | **Succeeding periodical title:** Oklahoma today |

**RELATION.REPLACES**

=======
| Examples | Succeeding periodical title: Oklahoma today |

### RELATION.REPLACES
>>>>>>> 149098c (wip)
=======
| Examples | **Succeeding periodical title:** Oklahoma today |

## RELATION.REPLACES
>>>>>>> 9980478 (wip)
| Field | Relation.Replaces |
| --- | --- |
| DPLA Requirement | Optional |
| OKHUB Requirement | Optional |
| Definition | A related resource that is supplanted, displaced, or superseded by the described resource |
| Simple DC Element | dc:relation |
| Qualified DC Element | dcterms:replaces |
| CONTENTdm Mapping | Relation-Replaces |
| Repeatable | Yes |
| Displayed in DPLA Portal | No |
| Notes and Best Practices | References the preceding item. DPLA notes this field is intended for series and title changes, for example government documents, serial publications and periodicals. |
| Controlled Vocabulary/Syntax | Recommend Controlled Vocabulary |
<<<<<<< HEAD
<<<<<<< HEAD
| Examples | **Previous periodical title:** Resourceful Oklahoma |

<a name="rights"></a>

**RIGHTS**

| Field | Rights | 
| --- | --- |
| DPLA Requirement | **Required** | 
| OKHUB Requirement | **Required** | 
=======
| Examples | Previous periodical title: Resourceful Oklahoma |
=======
| Examples | **Previous periodical title:** Resourceful Oklahoma |
>>>>>>> 9980478 (wip)

## RIGHTS
| Field | Rights | 
| --- | --- |
<<<<<<< HEAD
| DPLA Requirement | Required | 
| OKHUB Requirement | Required | 
>>>>>>> 149098c (wip)
=======
| DPLA Requirement | **Required** | 
| OKHUB Requirement | **Required** | 
>>>>>>> 9980478 (wip)
| Definition | Information about rights held in and over the described resource | 
| Simple DC Element | dc:rights | 
| Qualified DC Element | dcterms:rights | 
| CONTENTdm Mapping | Rights |
| Repeatable | Yes |
| Displayed in DPLA Portal | Yes |
<<<<<<< HEAD
<<<<<<< HEAD
| Notes and Best Practices | See [*DPLA Standardized Rights Statement Implementation Guidelines*](http://bit.ly/dpla-rights-guidelines). The document contains a description of DPLA’s implementation of standardized rights statements and recommendations for the use of statements in records that will be shared with DPLA.  In the future, DPLA will require standardized rights statement for all records. May have a separate standardized statement and a local rights statement. The two statements must not contradict each other. | 
| Controlled Vocabulary/Syntax | Recommend Controlled Vocabulary, e.g., Rightsstatements.org; Creative Commons Licenses; URI |
| Examples | *URI from RightsStatements.org for "No copyright – United States"*<br>http://rightsstatements.org/vocab/NoC-US/1.0/ |

**RIGHTS HOLDER**

| Field | Rights Holder |
| --- | --- |
| DPLA Requirement | Optional<br>Not currently output to DPLA |
=======
| Notes and Best Practices | See DPLA Standardized Rights Statement Implementation Guidelines, http://bit.ly/dpla-rights-guidelines. The document contains a description of DPLA’s implementation of standardized rights statements and recommendations for the use of statements in records that will be shared with DPLA.  In the future, DPLA will require standardized rights statement for all records. May have a separate standardized statement and a local rights statement. The two statements must not contradict each other. | 
=======
| Notes and Best Practices | See [*DPLA Standardized Rights Statement Implementation Guidelines*](http://bit.ly/dpla-rights-guidelines). The document contains a description of DPLA’s implementation of standardized rights statements and recommendations for the use of statements in records that will be shared with DPLA.  In the future, DPLA will require standardized rights statement for all records. May have a separate standardized statement and a local rights statement. The two statements must not contradict each other. | 
>>>>>>> 9980478 (wip)
| Controlled Vocabulary/Syntax | Recommend Controlled Vocabulary, e.g., Rightsstatements.org; Creative Commons Licenses; URI |
| Examples | *URI from RightsStatements.org for "No copyright – United States"*<br>http://rightsstatements.org/vocab/NoC-US/1.0/ |

## RIGHTS HOLDER
| Field | Rights Holder |
| --- | --- |
<<<<<<< HEAD
| DPLA Requirement | Optional 
Not currently output to DPLA |
>>>>>>> 149098c (wip)
=======
| DPLA Requirement | Optional<br>Not currently output to DPLA |
>>>>>>> 9980478 (wip)
| OKHUB Requirement | Optional |
| Definition | A person or organization owning or managing rights over the resource
| Simple DC Element | dc:rights
| Qualified DC Element | dcterms:rightsholder
| CONTENTdm Mapping | Rights-Rights-Holder
| Repeatable | No
| Displayed in DPLA Portal | No
| Notes and Best Practices | DPLA notes make sure this is not an institution contact, but the actual rights holder. Currently this element is not a DPLA output.
| Controlled Vocabulary/Syntax || 	
<<<<<<< HEAD
<<<<<<< HEAD
| Examples | Paul Miller Family<br><br>Adair County Historical Society | 

**SOURCE**

| Field | Source |
| --- | --- |
| DPLA Requirement | Optional<br>Not currently output to DPLA |
=======
| Examples | Paul Miller Family<br>Adair County Historical Society | 
=======
| Examples | Paul Miller Family<br><br>Adair County Historical Society | 
>>>>>>> 9980478 (wip)

## SOURCE
| Field | Source |
| --- | --- |
| DPLA Requirement | Optional
Not currently output to DPLA |
>>>>>>> 149098c (wip)
| OKHUB Requirement | Optional |
| Definition | A related resource from which the described resource is derived |
| Simple DC Element | dc:source |
| Qualified DC Element | dcterms:source |
| CONTENTdm Mapping | Source |
| Repeatable | No |
| Displayed in DPLA Portal | No |
| Notes and Best Practices | The described resource may be derived from the related resource in whole or in part. May include information the user would need to locate the original item in a physical archives. |
<<<<<<< HEAD
| Controlled Vocabulary/Syntax | Natural Language (Free Text)<br>Formal identification system (e.g., ISBN for a book) |
| Examples ||

<a name="subject"></a>

**SUBJECT**

=======
| Controlled Vocabulary/Syntax | Natural Language (Free Text) 
Formal identification system (e.g., ISBN for a book) |
| Examples ||

<<<<<<< HEAD
### SUBJECT
>>>>>>> 149098c (wip)
=======
## SUBJECT
>>>>>>> 9980478 (wip)
| Field | Subject |
| --- | --- |
| DPLA Requirement | Strongly Recommended |
| OKHUB Requirement | Strongly Recommended |
| Definition | What the content of resource is about |
| Simple DC Element | dc:subject |
| Qualified DC Element | dcterms:subject |
| CONTENTdm Mapping | Subject |
| Repeatable | Yes |
| Displayed in DPLA Portal | No |
| Notes and Best Practices | | 	
| Controlled Vocabulary/Syntax | Recommend Controlled Vocabulary, e.g., FAST Terms, Library of Congress Subject Headings, ATT, TGM, LCNAF, VIAF, Locally Controlled List |
| Examples ||

<<<<<<< HEAD
<<<<<<< HEAD
**TEMPORAL COVERAGE**

=======
### TEMPORAL COVERAGE
>>>>>>> 149098c (wip)
=======
## TEMPORAL COVERAGE
>>>>>>> 9980478 (wip)
| Field | Temporal Coverage |
| --- | --- |
| DPLA Requirement | Optional | 
| OKHUB Requirement | Optional | 
| Definition | Temporal characteristics of the resource | 
| Simple DC Element | dc:coverage | 
| Qualified DC Element | dcterms:temporal | 
| CONTENTdm Mapping | Coverage-Temporal | 
| Repeatable | Yes | 
| Displayed in DPLA Portal | No | 
| Notes and Best Practices | Temporal is intended to capture the aboutness of a resource, not the specific date of creation. Temporal coverage can include a specific date range of the resource, a name period, a date range (e.g., a decade) that relates to the resource. DPLA notes Temporal values are best captured when they are separated (i.e., not combined with spatial information in a generic “coverage” element. | 
| Controlled Vocabulary/Syntax | Natural language  or Controlled Vocabulary | 
<<<<<<< HEAD
<<<<<<< HEAD
| Examples | **Decade that relates to the resource:** 1910-1920<br><br>**FAST for general 20th century:** 1900-1999<br><br>**Specific date range:** 1961-1963<br><br>**LCSH named time period:** World War, 1914-1918 |

<a name="title"></a>


**TITLE**

| Field | Title |
| --- | --- |
| DPLA Requirement | **Required** |
| OKHUB Requirement | **Required** |
=======
| Examples | Decade that relates to the resource: 1910-1920<br>FAST for general 20th century: 1900-1999<br>Specific date range: 1961-1963<br>LCSH named time period: World War, 1914-1918 |
=======
| Examples | **Decade that relates to the resource:** 1910-1920<br><br>**FAST for general 20th century:** 1900-1999<br><br>**Specific date range:** 1961-1963<br><br>**LCSH named time period:* World War, 1914-1918 |
>>>>>>> 9980478 (wip)

## TITLE
| Field | Title |
| --- | --- |
| DPLA Requirement | Required |
| OKHUB Requirement | Required |
>>>>>>> 149098c (wip)
| Definition | Primary name given to the described resource. Typically, a Title will be a name by which the resource is formally known. |
| Simple DC Element | dc:title |
| Qualified DC Element | dcterms:title |
| CONTENTdm Mapping | Title |
| Repeatable | No |
| Displayed in DPLA Portal | Yes |
| Notes and Best Practices | Titles that are assigned should be descriptive, informative and brief. Avoid using “unknown” or an id number. DPLA notes minimal punctuation, but appropriate use of punctuation (i.e., not unnecessary quotation marks, brackets or periods). Avoid using explanatory or qualifying symbols (e.g., brackets). Not all materials can or should be titled uniquely. Avoid generic titles such as “Papers” or Annual report.”  Consult content standards, e.g., RDA, DACS, and CCO for further guidance. |
| Controlled Vocabulary/Syntax | Natural Language (Free Text) |
<<<<<<< HEAD
| Examples | **For consistency construct titles for resources without titles with an order such as Who, What, Where, When:**<br>Indian prisoners at Fort Marion in St. Augustine, Florida, 1877<br><br>**Title indicating the nature of the resource:**<br>Letter from W.C. Markham to Cyrus S. Avery, dated July 31, 1925<br>Oral history interview with Carolina Hall<br><br>**Actual title as found on the document:**  Joint Board for Designating Interstate Highways : proposed agenda for first full meeting, dated April 20, 1925 |

**TYPE**

=======
| Examples | For consistency construct titles for resources without titles with an order such as Who, What, Where, When:<br>Indian prisoners at Fort Marion in St. Augustine, Florida, 1877<br>Title indicating the nature of the resource:<br>Letter from W.C. Markham to Cyrus S. Avery, dated July 31, 1925<br>Oral history interview with Carolina Hall<br>Actual title as found on the document:  Joint Board for Designating Interstate Highways : proposed agenda for first full meeting, dated April 20, 1925 |

### TYPE
>>>>>>> 149098c (wip)
| Field | Type |
| --- | --- |
| DPLA Requirement | Required when available |
| OKHUB Requirement | Required when available |
| Definition | Nature or genre of described resource |
| Simple DC Element | dc:type |
| Qualified DC Element | dcterms:type |
| CONTENTdm Mapping | Type |
| Repeatable | Yes |
| Displayed in DPLA Portal | Yes |
| Notes and Best Practices | Type is a broad categorization describing the resource. The use of the field supports a language faceted search in DPLA. |
| Controlled Vocabulary/Syntax | Prefer Controlled Vocabulary from DCMI Type Vocabulary |
<<<<<<< HEAD
| Examples | Image<br><br>Text<br><br>Sound<br><br>Moving Image |


<a name="controlled"></a>
=======
| Examples | Image<br>Text<br>Sound<br>Moving Image |



>>>>>>> 149098c (wip)
## Resources for Controlled Vocabulary and Standards
| Abbreviation | Name | Application | Registry URL |
| --- | --- | --- | --- |
| AAT | Getty Art & Architecture Thesaurus | Subject | [http://www.getty.edu/research/tools/vocabularies/aat]() |
| CCO | Cataloging Cultural Objects | Content Standard | [http://cco.vrafoundation.org/]() |
| DACS | Describing Archives: a content standard | Content Standard | [http://www.icacds.org.uk/eng/ISAD(G).pdf]() |
| DC | Dublin Core element set | Schema | [http://www.dublincore.org/documents/dces/]() |
| DCMI | DCMI Type Vocabulary | Type | [http://dublincore.org/documents/dcmi-type-vocabulary/#H7]() |
| EDTF | Extended Date/Time Format | Date | [https://www.loc.gov/standards/datetime/]() |
| FAST | Faceted Application of Subject Terminology | Subject<br>Spatial Coverage<br>Temporal Coverage | [http://fast.oclc.org/searchfast/]() |
| GeoNames | GeoNames | Spatial Coverage | [http://www.geonames.org/]() |
| IANA | IANA Media Types (IMT) | Format || 	
| ISO 639-2 | International Organization for Standardization | Language | [http://id.loc.gov/vocabulary/iso639-2.html]() |
| LCNAF | Library of Congress Name Authority File | Creator<br>Contributor<br>Subject | [http://id.loc.gov/authorities/names]() |
| LCSH | Library of Congress Subject Headings | Subject<br>Spatial Coverage<br>Temporal Coverage | [http://id.loc.gov/authorities/subjects.html]() |
| RDA | Resource, Description, and Access | Content Standard | [https://access.rdatoolkit.org/]() |
| Rightsstatements | RightsStatements.org | Rights | [http://rightsstatements.org/]() |
| TGM | Library of Congress Thesaurus for Graphic Materials | Subject | [http://id.loc.gov/vocabulary/graphicMaterials]() |
| TGN | Getty Thesaurus of Geographic Names | Spatial Coverage | [http://www.getty.edu/vow/TGNSearchPage.jsp]() |
| ULAN | Getty Union List of Artists Names | Creator<br>Contributor<br>Subject | [http://www.getty.edu/research/tools/vocabularies/ulan/]()
| VIAF | Virtual International Authority File | Creator<br>Contributor<br>Subject | [https://viaf.org/]() | 

<<<<<<< HEAD
<a name="contacts"></a>

=======
>>>>>>> 149098c (wip)
## Contacts

For additional help or further information contact the OKHUB coordinators for assistance.

<<<<<<< HEAD
**OKHUB Lead Coordinators:**<br>
[Tara Carlise](https://libraries.ou.edu/users/tara-carlisle), University of Oklahoma<br>
[Mary Larson](https://library.okstate.edu/library-directory/larson-mary), Oklahoma State University<br>
[Sarah Milligan](https://library.okstate.edu/library-directory/milligan-sarah), Oklahoma State University


**OKHUB Metadata Coordinator:**<br>
[Juliana Nykolaiszyn](https://library.okstate.edu/library-directory/nykolaiszyn-juliana), Oklahoma State University


**OKHUB Repox and DPLA Ingest Coordinator:**<br>
[Fred Reiss](https://libraries.ou.edu/legacy/employees/empDetail.aspx?ID=6769), University of Oklahoma

<br><br>
=======
OKHUB Lead Coordinators:

[Tara Carlise](https://libraries.ou.edu/users/tara-carlisle), University of Oklahoma

[Mary Larson](https://library.okstate.edu/library-directory/larson-mary), Oklahoma State University

[Sarah Milligan](https://library.okstate.edu/library-directory/milligan-sarah), Oklahoma State University


OKHUB Metadata Coordinator:

[Juliana Nykolaiszyn](https://library.okstate.edu/library-directory/nykolaiszyn-juliana), Oklahoma State University


OKHUB Repox and DPLA Ingest Coordinator:

[Fred Reiss](https://libraries.ou.edu/legacy/employees/empDetail.aspx?ID=6769), University of Oklahoma


<<<<<<< HEAD
>>>>>>> 149098c (wip)

=======
>>>>>>> 55a2e08 (wip)
The OKHUB Metadata Guidelines and Best Practices were referred to and developed from the following resources:

[DPLA Geographic and Temporal Guidelines for MAP 3.1](http://bit.ly/dpla-geo-styleguide-3_1)

[DPLA Metadata Application Profile, version 4.0](https://drive.google.com/file/d/1743zMwrrZQFleAZiMZNe_f5H3TXv6Iyg/view)

[DPLA Metadata Quality Guidelines](http://bit.ly/dpla-metadata-qual)

[Dublin Core Metadata Element Set, Version 1.1: Reference Description](http://dublincore.org/documents/dces)

[OSU Library Metadata Guide: Best Practices for Digital Collections (August 2015)](https://info.library.okstate.edu/metadata)

[Metadata Best Practices for the Illinois Digital Heritage Hub (January 2017)](https://docs.google.com/document/d/12NYtWUO9WNzewoXcFuKgpLsCvFA4fj2VCx9fAiiP1PE/edit)

[PA Digital PA-DPLA Metadata Guidelines (May 2016)](http://lycofs01.lycoming.edu/~gregory/PaLA_West_Branch_Workshop_5.12.16/PADigitalMetadataGuidelines-May2016.pdf)

[Plains to Peak Collective Metadata Guidelines for DPLA Participation (Draft 9/2017)](http://ppc.cvlsites.org/wp-content/uploads/PPC-Metadata-Fields-Working-Draft.pdf)