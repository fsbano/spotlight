const fs = require('fs');
const path = require('path');
const express = require('express');
const yaml = require('js-yaml');
const app = express();

try { 
  const config = yaml.load(fs.readFileSync('./spotlight.yaml'))
  Object.keys(config.integrations).map(function(name) {
    const extensions = require('./plugins/' + name );
    if (typeof extensions.execute === 'function') {
      app.get(`/api/v1/${extensions.name.toLowerCase().replace(/\s+/g, '-')}`, (req, res) => {
        res.send(extensions.execute());
      });
    }  
  });
  const PORT = 3000;
  app.listen(PORT, () => {
    console.log('Spotlight Version 1.0.0');
  });
} catch (e) {
  console.log(e);
}
