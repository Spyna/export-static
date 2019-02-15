const exportStatic = require('export-static');

const customConfig = {
  routes: [
    '/',
    '/about/',
    '/contact/',
    '/blog-post.html',
    '/blog/blog-post.html',
    '/a/very/nested/page.html'
  ]
};
exportStatic(customConfig);
