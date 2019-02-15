import React from 'react';
import MetaTags from 'react-meta-tags';

export default props => (
  <div>
    <MetaTags>
      <title>Blog Post</title>
      <meta name="description" content="A nested blog post" />
    </MetaTags>
    <h1>A nested blog post</h1>
    <p>
      This blog post path is <code>/blog/blog-post.html</code>
    </p>
  </div>
);
