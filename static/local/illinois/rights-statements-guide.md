# Rights Statements Guide

[![Click to watch a video introducing standardized rights statements on Vimeo](/static/local/illinois/standardized-rights-video.png "Click to watch a video introducing standardized rights statements")](https://vimeo.com/391276209)
_[IDHH Standardized Rights](https://vimeo.com/391276209) from [Illinois Digital Heritage Hub](https://vimeo.com/user64994398) on [Vimeo](https://vimeo.com/)._

Standardized rights statements are highly recommended by the DPLA and are important for the discoverability and usability of your organization’s digital objects. Currently, there are more than 1,000 different rights statements in the IDHH alone and 1,000s in the DPLA’s entire record set. This can be quite overwhelming to users and generate a great deal of uncertainty on if and how digital material can be used.

Fortunately, there is a solution: standardized rights statements. Currently, there are two options that simply describe how items may or may not be reused. One is [rightsstatements.org](https://rightsstatements.org/en/). This resource boils down just about all intellectual property information into one of [twelve short statements](https://rightsstatements.org/page/1.0/). If your materials already have accurate rights statements, you are more than halfway there to deploying standardized rights.

The other option is [Creative Commons (CC)](https://creativecommons.org/). Apply one of the [six CC licenses](https://creativecommons.org/share-your-work/licensing-examples/) if and only if your institution is the copyright holder of the object in question. CC licenses allow for widest usage of your institution’s digital objects and are highly recommended, empowering users to re-use and cite materials with easy and free from worry of copyright violation.

## Why standardized rights?

Standardized rights make digital materials more usable. When standardized rights statements are present, they provide clear, succinct information in a standardized format across record sets that include 100,000s or millions of digital objects from 100s of different institutions around the U.S. and the world. When standardized rights are present, users are more confident on if and how they may re-use a digital object. Re-use may include citation of an object in a research project, usage in a work of art such as a montage or collage, public or private marketing materials, and countless other potential usages.

Re-use is good for digital library users and institutions who contribute to digital libraries. This helps contributors make an impact on the world with their materials which increases the visibility of digital collections and contributes to the prestige of a particular institution or organization. Standardized rights statements can increase the usage of materials and referrals to local digital collections.

Standardized rights are good for users, contributors, and digital library developers. As the number of possible free-text rights statements is nearly infinite, it is not easy to develop applications around them. However, due to the limited number of Creative Commons licenses and rightsstatements.org statements, it is possible to develop widgets that allow users to browse by and facet by particular statements. An example of this is the [Europeana Collections](https://www.europeana.eu/portal/en) digital library, pictured below.

![Rights statements facets in the Europeana Collections catalog](/static/local/illinois/europeana-reuse-facets.png "Rights statements facets in the Europeana Collections catalog")
_Europeana catalog search results provide a facet by rights statements made possible by contributors’ use of standardized rights statements._

## How to implement standardized rights

Standardized rights statements or Creative Commons licenses can be implemented by first mapping your existing rights statements to standardized rights statements or, if your institution owns the copyright, Creative Commons licenses. This can be accomplished first by examining IDHH’s assessments of your collections’ metadata. In each assessment, we provide recommendations of standardized rights statements we believe will work for your collections. If you’re not sure where to start, from finding your metadata assessments to uncertainty on which statement to deploy, fear not! You have some options.

- There are several flowcharts that can help you determine the right standardized rights statement for your collections, created by other DPLA hubs.
    - [PA Digital](http://bit.ly/RightsTool) \[PDF download\]
    - [Minnesota Digital Library](http://hdl.handle.net/11299/210229)
- This [poster](https://scholarlyrepository.miami.edu/cgi/viewcontent.cgi?article=1001&context=librarypapers) \[PDF download\] details the University of Miami’s successful effort of migrating their free text rights statements to standardized rights.
- If you have done your due diligence in trying to determine an item’s copyright status and are still unsure, you may use the _Copyright Undetermined_ option.
- Last but not least, [contact the IDHH Metadata Manager](/about/contact) if you can’t find a solution above.

Once you have mapped your rights statements to appropriate standardized rights values, it’s time to deploy them in your content management system using their respective URIs in a `dc:rights` field in each metadata record. You do not have to replace your original rights statements! As long as they are roughly equivalent and do not contradict each other, feel free to include both standardized and free-text rights statements. Please include the free text statement and the standardized rights URI each in their own separate `dc:rights` fields.
