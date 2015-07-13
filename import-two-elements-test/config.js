System.config({
  "baseURL": "/import-two-elements-test/",
  "transpiler": "traceur",
  "paths": {
    "*": "*.js",
    "github:*": "jspm_packages/github/*.js"
  }
});

System.config({
  "map": {
    "html": "../html",
    "traceur": "github:jmcriffey/bower-traceur@0.0.88",
    "traceur-runtime": "github:jmcriffey/bower-traceur-runtime@0.0.88",
    "webcomponents": "github:webcomponents/webcomponentsjs@0.7.6"
  }
});

