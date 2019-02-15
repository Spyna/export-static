
## export-static

>  Export a single page application as a static website. AKA *Server Side Rendering* without a server

## Install

### using *yarn*

```bash
yarn add -D export-static
```

### using *npm*

```bash
npm install export-static --save-dev
```

## Cli usage

In your `package.json` file add in the `scripts` section this line:

```JSON
"scripts" : {
  "export": "export-static"
 }

```
then run
```bash
yarn export
```
or
```
npm run export
```
  
## Script usage

create a `Js` file and write this into:

```JavaScript
const  exportStatic = require('export-static')
const  customConfig = { exportDir :  'exportDir'}
exportStatic(customConfig)
```
The parameter `customConfig` is optional and can be used to override the default confguration.

## Configuration

You can configure this tool in many ways. Any type of configuration you choose, will be merged with the default config and the other configurations you use.

### `export.static.config.js` file

You can either create the `export.static.config.js` file in the root of your project or configure the path of the configuration file file using the **--config** argument from the command line. 
When using the **--config** the path must be relative to the project root folder.

```bash
export-static --config "./config/custom-export-static.js"
```
```JSON
"scripts" : {
    "export" : "export-static --config './config/custom-export-static.js'"
}
```

### Using command line arguments

```bash
export-static --routes="/ /about/ /contacts/" --port 7890 --exportDir customExportDir --sourceDir customSourceDir
```

When using command line arguments you can configure:

* exportDir : the output folder.
* sourceDir : the input folder (that is the build directory of your project).
* port : this tool tears up a server to render your project, and the server needs a port.
* routes to export: routes must be wrapped with quotes `"` and space ` ` separated.

If a configuration argument is missing, the tool will use the defaults.

### Using a custom config in JavaScript files

```JavaScript
const  exportStatic = require('export-static');
const  customConfig = {
   routes: [
    '/',
    '/about/',
    '/contact/',
    '/blog-post.html',
    '/blog/blog-post.html',
    '/a/very/nested/page.html'
   ]
};
exportStatic(customConfig);
```

When using a custom config in JavaScript the command line arguments and the `export.static.config.js` will be ignored.

### Configuration merging order

Any configuration passed to the program will be merged with the default config.

1. The *default config* (hardcoded in source files) is the first to be read.
2. The *default config* is overridden by the *user config* in `export.static.config.js`.
3. The *user config* is overridden by the command line config

When using this tool programmaticly in JavaScript file, if you pass a *custom config* [Using a custom config in JavaScript files](#using-a-custom-config-in-javascript-files), that one will be the only used.

## Deafult Configuration

[source file](./src/lib/config.js)

```JavaScript
const defaultConfig = {
 routes: ['/'],
 port: 7890,
 exportDir: 'export',
 sourceDir: 'build',
 clean: true,
 browser: {
  headless: true
 }
};

```
|Option|Type|Meaning|Default value|
|--|--|--|--|
|routes|array of string|the routues of your project to be exported| `/`
|port|number|the port used for running the server|`7890`|
|exportDir|string|the output folder|`export`|
|sourceDir|string|the input folder (the build folder of your project|`build`|
|clean| boolean| if `true` the output dir will be erased and re-created each run|`true`|
|browser.headless|boolean|if `false` yoou'll see the browser, otherwise it will be headless|`true`|


##Caveat

### Indexing and SEO 

This tool is able to export `/about`, `/about/`, `/about.html`, `/any/nested/path` and even `/any/nested/path/about.html`. 

Routes that does not serve a `.html` file, such as `/about` or `/any/nested/path`, will be exported to : `/about/index.html` or `/any/nested/path/index.html` 

This means that Google bot, and any other bot, will index the page with the url `/about/` *(with the trailing slash)*. 
This means that when users find the **About** page on Google, they land on `/about/` *(with the trailing slash)*. 
This means that your *(React|Vue|Angular|\*) Router* should math `/about/` *(with the trailing slash)* and not `/about` *(without the trailing slash)*. 
If the *Router* matches `/about` *(without the trailing slash)* the users could get: 

* *Not found* (`404`) if your router does not match the route. 
* *Redirect* (`301` or `302`) if your router is smart enough to understand the situation. Which is better of a `404` but,as far as I know, not really SEO friendly. 


## Developing

### Clone the repo

```bash
git clone https://github.com/Spyna/export-static.git && cd export-static
yarn install 
#npm install
```

To run the project locally you have to

### Build and watch edited files

```bash
yarn build:watch
```

### Run the project on the example

The [example](./example) folder contains a *React* project that can be used to test the project. 

The file `package.json` under *example* contains two *scripts*: 

* `export:cli` : runs the project by the command line
* `export:script` : runs the project by the JavaScript file *"scripts/export.js"*. 

Before running any of these *scripts* be sure to **build** the example project using `yarn build`. This step is needed because the project uses the `build` directory.

When using the script `export:cli` you have to pass the *routes* to export so the command will be: 

```bash
yarn export:cli --routes="/ /about/ /contact/ /blog-post.html /blog/blog-post.html /a/very/nested/page.html"
```

### Testing

```bash
yarn test:watch
```

```bash
yarn test:coverage
```


Happy hacking.