import React from 'react';
import MetaTags from 'react-meta-tags';
import ReactMarkdown from 'react-markdown';

import './Home.css';

export default class Home extends React.Component {
  state = {};

  loadContent = () => {
    fetch(
      'https://raw.githubusercontent.com/Spyna/export-static/master/README.md'
    )
      .then(response => response.text())
      .then(markdown => {
        this.setState({ markdown });
      });
  };

  componentDidMount() {
    this.loadContent();
  }

  render() {
    return (
      <div>
        <MetaTags>
          <title>Home page</title>
          <meta name="description" content="This is the homepage" />
        </MetaTags>
        <h1>Home page</h1>
        <p>
          This is the home page <code>/</code>.
        </p>
        <p>
          The content you see below is taken from{' '}
          <a href="https://github.com/Spyna/export-static/blob/master/README.md">
            https://github.com/Spyna/export-static/blob/master/README.md
          </a>{' '}
          and styled using this CSS{' '}
          <a
            href="https://raw.githubusercontent.com/sindresorhus/github-markdown-css/gh-pages/github-markdown.css"
            target="_blank"
            rel="noopener noreferrer"
          >
            sindresorhus/github-markdown-css/gh-pages/github-markdown.css
          </a>
        </p>
        {!this.state.markdown && <div>Loading content</div>}
        <ReactMarkdown source={this.state.markdown} className="markdown-body" />
      </div>
    );
  }
}
