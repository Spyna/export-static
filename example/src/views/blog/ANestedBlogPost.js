import React from 'react';
import MetaTags from 'react-meta-tags';

export default props => (
    <div className="container">
      <MetaTags>
        <title>Blog Post</title>
        <meta name="description" content="A nested blog post" />
      </MetaTags>
      <h1>A nested blog post</h1>
    <p>Do you know de the benefits of Server Side Rendering?</p>
    </div>
);
