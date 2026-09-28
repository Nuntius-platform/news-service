# News Service — Review Context

News Service collects news from RSS sources, converts publications into the internal `Article` model, and stores them in MongoDB.

Main flow:

`source -> fetch RSS -> parse -> normalize -> save`

## Main functions

### `get(url)`

Fetches an RSS feed from the source URL.

Returns the XML string or `undefined` if the source is unavailable.

### `parseRss(xml, sourceId)`

Parses the RSS feed and converts publications into the internal `Article` model.

Extracts the external ID, URL, content, and publication date.

### `save(articles)`

Stores an array of articles in MongoDB.

### `polling()`

Loads the list of sources and sequentially runs the following flow for each one:

`get -> parseRss -> save`

An error in one source should not stop the processing of the others.

### `start()`

Runs the first polling cycle immediately and then repeats it every 30 minutes.

## Current decisions

- each source is processed independently;
- RSS data is converted into a common `Article` model;
- article uniqueness is determined by the `sourceId + externalId` pair;
- HTML content should be converted to plain text before saving;
- polling runs every 30 minutes.

## Known limitations

- RSS structure may differ between sources;
- if a source is temporarily unavailable, it will only be checked again during the next polling cycle;
- the current graceful shutdown does not wait for an already running polling cycle to finish.