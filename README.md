# grunt-assetor
Grunt config asset helper

## Example
### app.yaml
```yaml
var:
  app: app

  dir:
    vendor: assets/vendor
    public: assets
    public_vendor: assets/vendor
    views: views

    src:
      root: src
      stylesheets: src/stylesheets
      javascript: src/javascript
      images: src/images
      fonts: src/fonts
      partials: partials
      json: src/json

    dest:
      root: assets/
      stylesheets: assets/stylesheets
      javascript: assets/javascript
      images: assets/images
      fonts: assets/fonts
      partials: assets/partials
      json: assets/json
      sprites: assets/@/images
      sprites_http: assets/@/images

assets:
  - js

js:
  %dir.dest.javascript%/app.vendor.js:
    # jQuery
    - %dir.vendor%/jquery/dist/jquery.js

    # Bootstrap
    - %dir.vendor%/bootstrap-sass/assets/javascripts/bootstrap/tab.js
    - %dir.vendor%/bootstrap-sass/assets/javascripts/bootstrap/modal.js
    - %dir.vendor%/bootstrap-sass/assets/javascripts/bootstrap/tooltip.js
```

### Gruntfile.js
```js
var assetor = require('grunt-assetor');
var app = assetor.readAssets('app.yaml');

module.exports = function (grunt) {
  var config = {
    uglify: {
      dist: {
          options: {
              sourceMap: false,
              mangle: true,
              beautify: false
          },
          files: app.assets.js
      }
    }
  };
};
```
