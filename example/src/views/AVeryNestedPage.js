import React from 'react';
import MetaTags from 'react-meta-tags';

export default props => (
  <div>
    <MetaTags>
      <title>A very nested page</title>
      <meta
        name="description"
        content="A very nested page. Yes, you can export even nested pages"
      />
    </MetaTags>
    <h1>A very nested page</h1>
    <p>
      This page path is <code>/a/very/nested/page.html</code>
    </p>
  </div>
);
