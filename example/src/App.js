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
import BlogPost from './views/blog/BlogPost';

const routes = [
  { path: '/', menuLabel: 'Home', component: Home },
  { path: '/blog/', menuLabel: 'Blog', component: Blog },
  { path: '/about/', menuLabel: 'About', component: About},
  { path: '/contact/', menuLabel: 'Contacts', component: Contacts },
  { path: '/blog-post.html', menuLabel: 'blog-post.html', component: BlogPost },
  {
    path: '/blog/blog-post.html',
    menuLabel: 'Another blog post',
    component: ANestedBlogPost
  },
  {
    path: '/a/very/nested/page.html',
    menuLabel: 'A Very Nested Page',
    component: AVeryNestedPage
  }
];

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <nav>
              <ul>
                {routes.map(route => (
                  <li key={route.path}>
                    <Link to={route.path}>{route.menuLabel}</Link>
                  </li>
                ))}
              </ul>
            </nav>
          </header>
          <div className="container">
          <Switch>
            {routes.map(route => (
              <Route
              key={route.path}
              exact
              path={route.path}
              component={route.component}
              />
              ))}
          </Switch>
              </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
