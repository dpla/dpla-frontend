# Type Metadata Guide

The IDHH works with the DPLA to enhance contributed Type metadata. Type is a [strongly recommended field](https://docs.google.com/document/d/1q1AORHoa0ey0fUGOTYMHLvZNCm6Wq1Qe9DDvFZSRPT0/edit#heading=h.xit522hc5xod) and values are used to create links and facets that greatly enhance the usability and the findability of local items and collections in the DPLA environment.

![Type metadata facets in DPLA catalog](/static/local/illinois/dpla-type-facets.png  "Type metadata facets in DPLA catalog")

_Type metadata improves faceting between sets of items with particular values._

![Type metadata links in DPLA item page](/static/local/illinois/type-in-dpla-record.png  "Type metadata links in DPLA item page")

_Type metadata allows the user to discover other items available in the DPLA portal._

The DPLA currently uses [DCMI Type](https://www.dublincore.org/specifications/dublin-core/dcmi-type-vocabulary/2000-07-11/) values for Type: _Image_, _Moving Image_, _Physical Object_, _Sound_, and _Text_. However, the Type values found in contributing institutions’ metadata are often more granular than DCMI Type vocabularies. To better comply with the DPLA service, IDHH will transform many Type values to corresponding DCMI Type vocabularies. For example, _photograph_, _still image_, and _postcard_ will be transformed into _Image_. [View the complete list of transformations](https://docs.google.com/spreadsheets/d/e/2PACX-1vQ8ISIntMUIcEuiHuG_DKYVVYTYzSrrumETRwJPW6pf6zfcD-X2HVQNsIAzhb4DlmBSIPCvf4MeHNCr/pubhtml).

There are still some values that simply cannot be mapped to appropriate DCMI Type values so we ask providers to examine and, if necessary, take steps to refine contributed Type metadata.

Some suggestions for improving Type metadata follow.

- Use a controlled vocabulary such as DCMI Type or another controlled vocabulary to avoid variant spellings, letter-case combinations, or misspellings of terms.
- Use the Type field only for Type information. Some information can be represented better  in the other fields such as Format, Medium, Description or Subject.
- Type values should not be URLs as IDHH and DPLA transformations rely on strings at this point.
- As opposed to `dc:format` controlled vocabularies such as the Art and Architecture Thesaurus, DCMI Type terms should be singular (for instance, "Image" or _Text_ rather than _Images_ _Texts_).
- Type values should describe an original item’s type, not a digital surrogate or a file format. File formats that appear as Type values, such as _.pdf_, _tiff_, _jpeg_, etc., will be removed.
