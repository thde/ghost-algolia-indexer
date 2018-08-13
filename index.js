const { URL } = require('url');
const algoliasearch = require('algoliasearch');
const fetch = require('node-fetch');

const ghostAdminUrl = process.env.GHOST_ADMIN_URL
const ghostClientId = process.env.GHOST_CLIENT_ID
const ghostClientSecret = process.env.GHOST_CLIENT_SECRET
const algoliaAppId = process.env.ALGOLIA_APP_ID
const algoliaApiKey = process.env.ALGOLIA_API_KEY
const algoliaIndexName = process.env.ALGOLIA_INDEX_NAME

const ghostUrl = new URL(`${ghostAdminUrl}/api/v0.1/posts`)
ghostUrl.searchParams.set('client_id', ghostClientId);
ghostUrl.searchParams.set('client_secret', ghostClientSecret);
ghostUrl.searchParams.set('include', 'authors,tags');

const algoliaClient = algoliasearch(algoliaAppId, algoliaApiKey);
const algoliaIndex = algoliaClient.initIndex(algoliaIndexName);

const indexSite = async (page, url) => {
    url.searchParams.set('page', page);

    fetch(url.toString())
	.then(res => res.json())
    .then(json => {
        index(json.posts, url)
        if (json.meta.pagination.pages > page) indexSite(page + 1, url)
    });
}

const index = async (posts, url) => {
    objects = posts.map(post => {
        return {
            objectID: post.id,
            title: post.title,
            excerpt: post.meta_description,
            url: url.origin + post.url,
            featured_image: url.origin + post.feature_image,
            tags: post.tags.map(tag => tag.name),
            authors: post.authors.map(author => author.name),
            content: post.html
        }
    })
    algoliaIndex.saveObjects(objects, (err, content) => {
        if (err) console.log(`error: ${err}`)
        console.log(content.objectIDs.join("\r\n"));
      });
}

indexSite(1, ghostUrl)

