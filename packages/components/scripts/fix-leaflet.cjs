const fs = require('fs');
const path = require('path');

const leafletPath = path.join(require.resolve('leaflet'), '../')

fs.cpSync(`${leafletPath}images`,'./dist/images', { recursive: true });
