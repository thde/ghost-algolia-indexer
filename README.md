# Ghost Algolia Indexer

This script uses the [Ghost API](https://api.ghost.org/) to  index your posts in Algolia.

Set the following variables to use the script:
GHOST_ADMIN_URL,
GHOST_CLIENT_ID,
GHOST_CLIENT_SECRET,
ALGOLIA_APP_ID,
ALGOLIA_API_KEY,
ALGOLIA_INDEX_NAME

You could then run it like this:

```shell
GHOST_ADMIN_URL='https://demo.ghost.io/ghost' \
GHOST_CLIENT_ID='ghost-frontend' \
GHOST_CLIENT_SECRET='f84a07a72b17' \
ALGOLIA_APP_ID='ABC' \
ALGOLIA_API_KEY='123' \
ALGOLIA_INDEX_NAME='prod_search' \
node index.js
```
