'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');
const Funnel = require('broccoli-funnel');
const MergeTrees = require('broccoli-merge-trees');

module.exports = function(defaults) {
  const assets = [];
  const vendor = new MergeTrees([
    new Funnel('vendor'),
    new Funnel('node_modules/@typopro/web-source-sans-pro/', {destDir: 'source-sans-pro' }),
  ]);

  var app = new EmberApp(defaults, {
    // Add options here
    trees: {
      vendor
    }
  });

  app.import('vendor/source-sans-pro/TypoPRO-SourceSansPro.css');
  assets.push(new Funnel(vendor, { srcDir: 'source-sans-pro', include: ['*.eot','*.ttf','*.woff'] }));

  return new MergeTrees([
    new Funnel(new MergeTrees(assets), { destDir: 'assets' }),
    app.toTree(),
  ]);
};
