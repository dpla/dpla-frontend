# IDHH Search Tips
Check out the [DPLA’s own search tips](https://dp.la/about/search-tips), which the following documentation builds on.

## Faceting Results
Facets allow users to narrow by media type, subject, location, language, and contributing institution. Select one or more facets on the left of the results page after conducting an initial search.

![Illustration of facets on search results screen](/static/local/illinois/idhh-search.PNG  "IDHH search results screen")

## Narrowing Results
You can also use the `AND` operator in the search URL in your browser. Use a single pipe { `|` }, a plus sign { `+` }, or simply a single space between terms in quotes in order to input multiple values.

![Illustration of search cue URL](/static/local/illinois/search-idhh-url.PNG  "IDHH search cue URL")

For example:

`https://idhh.dp.la/search?subject=Portraits | "Lincoln, Abraham, 1809-1865"`

The above URL will display search results for all records contributed by the IDHH that have both the subject term, "Portraits" and "Lincoln, Abraham, 1809-1865", an official subject term for Abraham Lincoln.

## Expanding Results
While the `AND` operator will narrow results to records that contain all the values listed, the `OR` operator performs a broader search, finding records that contain any one of the values provided. Use two pipes { `||` } or the `OR` keyword for the `OR` operator. For example, the following searches for records that contains either the subject term “Portraits” or the official subject term for Abraham Lincoln:

`https://idhh.dp.la/search?subject=Portraits OR "Lincoln, Abraham, 1809-1865"`

Notice that this returns many more results than a similar search using the `AND` operator instead.

## Excluding Results
Exclude certain terms from search results using the `NOT` operator. The following URL represents a keyword search for “performing arts” narrowed to the records that include the subject term “Singers” but do not include the term “Actors”.

`https://idhh.dp.la/search?q=performing arts&subject="Singers" NOT "Actors"`

## Wild Card Search
The wild card asterisk { `*` } can be used to search for all the records that begin with a certain word. For example, the following represents a search for all records with subject terms that begin with “Politic”, such as “Politics”, “Politicians”, or “Political”.

`https://idhh.dp.la/search?&subject=Politic*`

Enclose a term within asterisks in order to get even more results. The following searches for all location terms that contain “Rockford”, which will include terms like “Illinois--Rockford” along with “Rockford (Ill.)” in the search results.

`https://idhh.dp.la/search?&location=*Rockford*`

## Chaining Search Terms
Chaining search terms can help weed out unwanted results. For example, a search with the location term, `*Springfield*` may include results for Springfield, Missouri along with Springfield, Illinois. To specify the state, include a second location search field:

`https://idhh.dp.la/search?location=*Springfield*&location=*Il*`
