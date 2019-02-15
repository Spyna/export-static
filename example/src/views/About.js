import React from 'react';
import MetaTags from 'react-meta-tags';

export default props => (
  <div>
    <MetaTags>
      <title>About us</title>
      <meta name="description" content="This is the about page" />
    </MetaTags>
    <h1>About</h1>
    <p>
      This is the about page <code>/about</code>
    </p>
  </div>
);
