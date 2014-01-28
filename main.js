requirejs.config({
  baseUrl: 'libraries',
  paths: {
    modules: '../modules',
    jquery: "http://code.jquery.com/jquery-2.1.0.min",
    "jquery-ui": "http://code.jquery.com/ui/1.10.4/jquery-ui.min"
  },
  shim: {
        "jquery-ui": {
            exports: "$",
            deps: ['jquery']
        }
    }
});

/*
requirejs.config({
    "baseUrl": "libraries",
    "paths": {
      "jquery": "//code.jquery.com/jquery-2.1.0.min",
      "jqueryui": "//code.jquery.com/ui/1.10.4/jquery-ui.min"
    }
});
*/

// Start the main app logic.
requirejs(['modules/map', 'modules/panel', 'jquery-ui'], function (map, panel) {
  map.geocode('1081 Beach Park Blvd., Foster City, CA 94404');  // find geolocation based on address
  map.resize(panel.panelWidth); // make map as wide as possible, leaving room for static panel
  panel.render(); 

  // listener for RESIZE event to scale map and panel
  $(window).resize(function() {
    map.resize(panel.panelWidth);
    panel.resize();
  });
});