import React from 'react';
import MetaTags from 'react-meta-tags';

export default props => (
  <div>
    <MetaTags>
      <title>Contact us</title>
      <meta name="description" content="This is the contact page" />
    </MetaTags>
    <h1>Contact us</h1>
    <p>
      This is the contact page <code>/contact</code>
    </p>
  </div>
);
