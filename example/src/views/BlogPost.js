import React from 'react';
import MetaTags from 'react-meta-tags';

export default props => (
  <div>
    <MetaTags>
      <title>Blog Post</title>
      <meta
        name="description"
        content="The benefits of Server Side Rendering"
      />
    </MetaTags>
    <h1>The benefits of Server Side Rendering</h1>
    <p>Do you know de the benefits of Server Side Rendering?</p>
  </div>
);
