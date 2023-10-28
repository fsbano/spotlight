const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');

fs.readdirSync('./plugins').forEach(file => {
  const pluginPath = path.join(__dirname, './plugins', file);
  const plugin = require(pluginPath);

  if (typeof plugin.execute === 'function') {
    app.get(`/api/v1/${plugin.name.toLowerCase().replace(/\s+/g, '-')}`, (req, res) => {
      res.send(plugin.execute());
    });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log('Spotlight Version 1.0.0');
});