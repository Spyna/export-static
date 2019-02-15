const copydir = require('copy-dir');
const chmod = require('chmod');

copydir.sync('src', 'dist');

chmod('dist/cli.js', 755);