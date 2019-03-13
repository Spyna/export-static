import React, { Component } from 'react';
import logo from './logo.png';
import './App.css';
import { Switch, Route, BrowserRouter, Link } from 'react-router-dom';
import Home from './views/Home';
import About from './views/About';
import Contacts from './views/Contacts';
import Blog from './views/blog/Blog';
import ANestedBlogPost from './views/blog/ANestedBlogPost';
import AVeryNestedPage from './views/AVeryNestedPage';
import BlogPost from './views/blog/BlogPost'

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <nav>
              <ul>
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/blog">Blog</Link>
                </li>
                <li>
                  <Link to="/about/">About</Link>
                </li>
                <li>
                  <Link to="/contact/">Contacts</Link>
                </li>
                <li>
                  <Link to="/blog-post.html">blog-post.html</Link>
                </li>
                <li>
                  <Link to="/blog/blog-post.html">Another blog post</Link>
                </li>
                <li>
                  <Link to="/a/very/nested/page.html">A Very Nested Page</Link>
                </li>
              </ul>
            </nav>
          </header>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/Blog" component={Blog} />
            <Route path="/about/" component={About} />
            <Route path="/contact/" component={Contacts} />
            <Route path="/blog-post.html" component={BlogPost} />
            <Route path="/blog/blog-post.html" component={ANestedBlogPost} />
            <Route
              path="/a/very/nested/page.html"
              component={AVeryNestedPage}
            />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
