
const ITEM_QUERY_ENDPOINT: string = "https://api.dp.la/v1/items";

function toQueryString(request: AggregationRequest): string  {
    let params = [];
    request.op && params.push(`op=${request.op}`);
    request.q && params.push(`q=${encodeURIComponent(request.q)}`);
    request.fields && params.push(`fields=${request.fields.join(",")}`);
    request.filter && request.filter.forEach(filter => {params.push(`filter=${filter}`)})
    request.page && params.push(`page=${request.page}`)
    request.pageSize && params.push(`pageSize=${request.pageSize}`)
    request.sortBy && params.push(`sort_by=${request.sortBy}`)

    return params.join("&");
}

interface AggregationRequest {
    op?: Op;
    q?: string;
    fields?: string[];
    filter?: string[];
    page?: number;
    pageSize?: number;
    sortBy?: SortType;
    sortOrder?: SortOrder;
    sortByPin?: string;
    facets?: string;
    facetSize?: number;
    exactFieldMatch?: ExactFieldMatch;
    callback?: string;
    random?: Random;
    id?: string,
    title?: string;
    description?: string;
    collectionTitle?: string;
    collectionDescription?: string;
    collection?: string;
    collectionId?: string;
    collectionAtId: string;
    contributor?: string;
    creator?: string;
    dateBegin?: string;
    dateEnd?: string;
    dateBefore?: string;
    dateAfter?: string;
    temporalBegin?: string;
    temporalEnd?: string;
    temporalBefore?: string;
    temporalAfter?: string;
    extent?: string;
    format?: string;
    languageName?: string;
    language?: string;
    languageIso639_3?: string;
    publisher?: string;
    relation?: string;
    spatial?: string;
    spatialName?: string;
    spatialCountry?: string;
    spatialState?: string;
    spatialCounty?: string;
    spatialRegion?: string;
    spatialCoordinates?: string;
    specType?: string;
    subject?: string;
    subjectName?: string;
    type?: string;
    dataProvider?: string;
    intermediateProvider?: string;
    providerName?: string;
    hasView?: string;
    hasViewAtId?: string;
    hasViewFormat?: string;
    hasViewRights?: string;
    isShownAt?: string;
    object?: string;
    provider?: string;
    providerAtId?: string;
    identifier?: string;
    rights?: string;
    edmRights?: string;
    rightsCategory?: string;
}

enum Random {
    True = "true"
}

enum ExactFieldMatch {
    True = "true"
}

enum Op {
    And = "AND",
    Or = "OR"
}

enum SortOrder {
    Asc = "asc",
    Desc = "desc"
}

enum SortType {
    DataProvider = "dataProvider",
    Id = "id",
    AtId = "@id",
    Contributor = "contributor",
    DateBegin = "sourceResource.date.begin",
    DateEnd = "sourceResource.date.end",
    Extent = "sourceResource.extent",
    Language = "sourceResource.language.name",
    Iso639_3 = "sourceResource.language.iso639_3",
    Format = "sourceResource.format",
    Publisher = "sourceResource.publisher",
    SpatialName = "sourceResource.spatial.name",
    SpatialCountry = "sourceResource.spatial.country",
    SpacialRegion = "sourceResource.spatial.region",
    SpacialCounty = "sourceResource.spatial.county",
    SpacialState = "sourceResource.spatial.state",
    SpacialCity = "sourceResource.spatial.city",
    SpacialCoordinates = "sourceResource.spatial.coordinates",
    SubjectAtId = "sourceResource.subject.@id",
    SubjectName = "sourceResource.subject.name",
    TemporalBegin = "sourceResource.temporal.begin",
    TemporalEnd = "sourceResource.temporal.end",
    Title = "sourceResource.title",
    Type = "sourceResource.type",
    HasViewAtId = "hasView.@id",
    HasViewFormat = "hasView.format",
    IsPartOfAtId = "isPartOf.@id",
    IsPartOfName = "isPartOf.name",
    IsShownAt = "isShownAt",
    Object = "object",
    ProviderAtId = "provider.@id",
    ProviderName = "provider.name"
}
