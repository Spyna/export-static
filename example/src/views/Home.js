import React from 'react';
import MetaTags from 'react-meta-tags';

export default props => (
  <div>
    <MetaTags>
      <title>Home page</title>
      <meta name="description" content="This is the homepage" />
    </MetaTags>
    <h1>Home page</h1>
    <p>
      This is the home page <code>/</code>
    </p>
  </div>
);
