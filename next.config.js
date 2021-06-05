// Rewrites allow you to map an incoming request path to a different destination path.
// Rewrites act as a URL proxy and mask the destination path,
// making it appear the user hasn't changed their location on the site.
// In contrast, redirects will reroute to a new page and show the URL changes.
module.exports = {
    async rewrites() {
        return [
            {
                source: '/:any*',
                destination: '/',
            },
        ];
    },
};