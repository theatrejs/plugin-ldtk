[![Copyright](https://img.shields.io/badge/©-deformhead-white.svg)](https://github.com/deformhead) [![License](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/theatrejs/plugin-ldtk/blob/master/LICENSE) [![Bundle Size (Gzipped)](https://img.shields.io/bundlejs/size/@theatrejs/plugin-ldtk@latest)](https://www.npmjs.com/package/@theatrejs/plugin-ldtk/v/latest) [![NPM Version](https://img.shields.io/npm/v/@theatrejs/plugin-ldtk/latest)](https://www.npmjs.com/package/@theatrejs/plugin-ldtk/v/latest)

# LDTK Plugin

> *🛠️ A Plugin for LDTK JSON data.*

## Installation

```shell
npm install @theatrejs/plugin-ldtk --save
```

## Quick Start

```javascript
import * as PLUGIN_LDTK from '@theatrejs/plugin-ldtk';

import ldtk from './ldtk.json';

const grid = ldtk.createGrid({
    $level: 'Prototype',
    $layer: 'actors'
});
```
