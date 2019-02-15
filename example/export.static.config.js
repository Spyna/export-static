module.exports = {
  routes: [
    '/',
    '/about/',
    '/contact/',
    '/blog-post.html',
    '/blog/blog-post.html',
    '/a/very/nested/page.html'
  ],
  port: 9888,
  exportDir: 'export',
  sourceDir: 'build',
  browser: {
    headless: false
  }
};
