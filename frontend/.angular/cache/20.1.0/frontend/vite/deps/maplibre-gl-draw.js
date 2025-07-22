import "./chunk-3OV72XIM.js";

// node_modules/maplibre-gl-draw/dist/mapbox-gl-draw-unminified.js
var ModeHandler = function(mode, DrawContext) {
  var handlers = {
    drag: [],
    click: [],
    mousemove: [],
    mousedown: [],
    mouseup: [],
    mouseout: [],
    keydown: [],
    keyup: [],
    touchstart: [],
    touchmove: [],
    touchend: [],
    tap: []
  };
  var ctx = {
    on: function on(event, selector, fn) {
      if (handlers[event] === void 0) {
        throw new Error("Invalid event type: " + event);
      }
      handlers[event].push({
        selector,
        fn
      });
    },
    render: function render2(id) {
      DrawContext.store.featureChanged(id);
    }
  };
  var delegate = function(eventName, event) {
    var handles = handlers[eventName];
    var iHandle = handles.length;
    while (iHandle--) {
      var handle = handles[iHandle];
      if (handle.selector(event)) {
        var skipRender = handle.fn.call(ctx, event);
        if (!skipRender) {
          DrawContext.store.render();
        }
        DrawContext.ui.updateMapClasses();
        break;
      }
    }
  };
  mode.start.call(ctx);
  return {
    render: mode.render,
    stop: function stop() {
      if (mode.stop) {
        mode.stop();
      }
    },
    trash: function trash() {
      if (mode.trash) {
        mode.trash();
        DrawContext.store.render();
      }
    },
    combineFeatures: function combineFeatures() {
      if (mode.combineFeatures) {
        mode.combineFeatures();
      }
    },
    uncombineFeatures: function uncombineFeatures() {
      if (mode.uncombineFeatures) {
        mode.uncombineFeatures();
      }
    },
    drag: function drag(event) {
      delegate("drag", event);
    },
    click: function click(event) {
      delegate("click", event);
    },
    mousemove: function mousemove(event) {
      delegate("mousemove", event);
    },
    mousedown: function mousedown(event) {
      delegate("mousedown", event);
    },
    mouseup: function mouseup(event) {
      delegate("mouseup", event);
    },
    mouseout: function mouseout(event) {
      delegate("mouseout", event);
    },
    keydown: function keydown(event) {
      delegate("keydown", event);
    },
    keyup: function keyup(event) {
      delegate("keyup", event);
    },
    touchstart: function touchstart(event) {
      delegate("touchstart", event);
    },
    touchmove: function touchmove(event) {
      delegate("touchmove", event);
    },
    touchend: function touchend(event) {
      delegate("touchend", event);
    },
    tap: function tap(event) {
      delegate("tap", event);
    }
  };
};
function getDefaultExportFromCjs(x) {
  return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, "default") ? x["default"] : x;
}
function getAugmentedNamespace(n) {
  if (n.__esModule) return n;
  var f = n.default;
  if (typeof f == "function") {
    var a = function a2() {
      if (this instanceof a2) {
        var args = [null];
        args.push.apply(args, arguments);
        var Ctor = Function.bind.apply(f, args);
        return new Ctor();
      }
      return f.apply(this, arguments);
    };
    a.prototype = f.prototype;
  } else a = {};
  Object.defineProperty(a, "__esModule", { value: true });
  Object.keys(n).forEach(function(k) {
    var d = Object.getOwnPropertyDescriptor(n, k);
    Object.defineProperty(a, k, d.get ? d : {
      enumerable: true,
      get: function() {
        return n[k];
      }
    });
  });
  return a;
}
var geojsonArea = {};
var wgs84$1 = {};
wgs84$1.RADIUS = 6378137;
wgs84$1.FLATTENING = 1 / 298.257223563;
wgs84$1.POLAR_RADIUS = 63567523142e-4;
var wgs84 = wgs84$1;
geojsonArea.geometry = geometry;
geojsonArea.ring = ringArea;
function geometry(_) {
  var area = 0, i;
  switch (_.type) {
    case "Polygon":
      return polygonArea(_.coordinates);
    case "MultiPolygon":
      for (i = 0; i < _.coordinates.length; i++) {
        area += polygonArea(_.coordinates[i]);
      }
      return area;
    case "Point":
    case "MultiPoint":
    case "LineString":
    case "MultiLineString":
      return 0;
    case "GeometryCollection":
      for (i = 0; i < _.geometries.length; i++) {
        area += geometry(_.geometries[i]);
      }
      return area;
  }
}
function polygonArea(coords) {
  var area = 0;
  if (coords && coords.length > 0) {
    area += Math.abs(ringArea(coords[0]));
    for (var i = 1; i < coords.length; i++) {
      area -= Math.abs(ringArea(coords[i]));
    }
  }
  return area;
}
function ringArea(coords) {
  var p1, p2, p3, lowerIndex, middleIndex, upperIndex, i, area = 0, coordsLength = coords.length;
  if (coordsLength > 2) {
    for (i = 0; i < coordsLength; i++) {
      if (i === coordsLength - 2) {
        lowerIndex = coordsLength - 2;
        middleIndex = coordsLength - 1;
        upperIndex = 0;
      } else if (i === coordsLength - 1) {
        lowerIndex = coordsLength - 1;
        middleIndex = 0;
        upperIndex = 1;
      } else {
        lowerIndex = i;
        middleIndex = i + 1;
        upperIndex = i + 2;
      }
      p1 = coords[lowerIndex];
      p2 = coords[middleIndex];
      p3 = coords[upperIndex];
      area += (rad(p3[0]) - rad(p1[0])) * Math.sin(rad(p2[1]));
    }
    area = area * wgs84.RADIUS * wgs84.RADIUS / 2;
  }
  return area;
}
function rad(_) {
  return _ * Math.PI / 180;
}
var classes = {
  CONTROL_BASE: "maplibregl-ctrl",
  CONTROL_PREFIX: "maplibregl-ctrl-",
  CONTROL_BUTTON: "mapbox-gl-draw_ctrl-draw-btn",
  CONTROL_BUTTON_LINE: "mapbox-gl-draw_line",
  CONTROL_BUTTON_POLYGON: "mapbox-gl-draw_polygon",
  CONTROL_BUTTON_POINT: "mapbox-gl-draw_point",
  CONTROL_BUTTON_TRASH: "mapbox-gl-draw_trash",
  CONTROL_BUTTON_COMBINE_FEATURES: "mapbox-gl-draw_combine",
  CONTROL_BUTTON_UNCOMBINE_FEATURES: "mapbox-gl-draw_uncombine",
  CONTROL_BUTTON_SRMODE: "mapbox-gl-draw_srmode",
  CONTROL_GROUP: "maplibregl-ctrl-group",
  ATTRIBUTION: "maplibregl-ctrl-attrib",
  ACTIVE_BUTTON: "active",
  BOX_SELECT: "mapbox-gl-draw_boxselect"
};
var sources = {
  HOT: "mapbox-gl-draw-hot",
  COLD: "mapbox-gl-draw-cold"
};
var cursors = {
  ADD: "add",
  MOVE: "move",
  DRAG: "drag",
  POINTER: "pointer",
  NONE: "none"
};
var types$1 = {
  POLYGON: "polygon",
  LINE: "line_string",
  POINT: "point"
};
var geojsonTypes = {
  FEATURE: "Feature",
  POLYGON: "Polygon",
  LINE_STRING: "LineString",
  POINT: "Point",
  FEATURE_COLLECTION: "FeatureCollection",
  MULTI_PREFIX: "Multi",
  MULTI_POINT: "MultiPoint",
  MULTI_LINE_STRING: "MultiLineString",
  MULTI_POLYGON: "MultiPolygon"
};
var modes$1 = {
  DRAW_LINE_STRING: "draw_line_string",
  DRAW_POLYGON: "draw_polygon",
  DRAW_POINT: "draw_point",
  SIMPLE_SELECT: "simple_select",
  DIRECT_SELECT: "direct_select",
  SCALE_ROTATE: "srmode",
  STATIC: "static"
};
var events$1 = {
  CREATE: "draw.create",
  DELETE: "draw.delete",
  UPDATE: "draw.update",
  SELECTION_CHANGE: "draw.selectionchange",
  MODE_CHANGE: "draw.modechange",
  ACTIONABLE: "draw.actionable",
  RENDER: "draw.render",
  COMBINE_FEATURES: "draw.combine",
  UNCOMBINE_FEATURES: "draw.uncombine"
};
var updateActions = {
  MOVE: "move",
  CHANGE_COORDINATES: "change_coordinates"
};
var meta = {
  FEATURE: "feature",
  MIDPOINT: "midpoint",
  VERTEX: "vertex"
};
var activeStates = {
  ACTIVE: "true",
  INACTIVE: "false"
};
var interactions = [
  "scrollZoom",
  "boxZoom",
  "dragRotate",
  "dragPan",
  "keyboard",
  "doubleClickZoom",
  "touchZoomRotate"
];
var LAT_MIN$1 = -90;
var LAT_RENDERED_MIN$1 = -85;
var LAT_MAX$1 = 90;
var LAT_RENDERED_MAX$1 = 85;
var LNG_MIN$1 = -270;
var LNG_MAX$1 = 270;
var Constants = Object.freeze({
  __proto__: null,
  classes,
  sources,
  cursors,
  types: types$1,
  geojsonTypes,
  modes: modes$1,
  events: events$1,
  updateActions,
  meta,
  activeStates,
  interactions,
  LAT_MIN: LAT_MIN$1,
  LAT_RENDERED_MIN: LAT_RENDERED_MIN$1,
  LAT_MAX: LAT_MAX$1,
  LAT_RENDERED_MAX: LAT_RENDERED_MAX$1,
  LNG_MIN: LNG_MIN$1,
  LNG_MAX: LNG_MAX$1
});
var FEATURE_SORT_RANKS = {
  Point: 0,
  LineString: 1,
  MultiLineString: 1,
  Polygon: 2
};
function comparator(a, b) {
  var score = FEATURE_SORT_RANKS[a.geometry.type] - FEATURE_SORT_RANKS[b.geometry.type];
  if (score === 0 && a.geometry.type === geojsonTypes.POLYGON) {
    return a.area - b.area;
  }
  return score;
}
function sortFeatures(features) {
  return features.map(function(feature2) {
    if (feature2.geometry.type === geojsonTypes.POLYGON) {
      feature2.area = geojsonArea.geometry({
        type: geojsonTypes.FEATURE,
        property: {},
        geometry: feature2.geometry
      });
    }
    return feature2;
  }).sort(comparator).map(function(feature2) {
    delete feature2.area;
    return feature2;
  });
}
function mapEventToBoundingBox(mapEvent, buffer) {
  if (buffer === void 0) buffer = 0;
  return [
    [mapEvent.point.x - buffer, mapEvent.point.y - buffer],
    [mapEvent.point.x + buffer, mapEvent.point.y + buffer]
  ];
}
function StringSet(items) {
  this._items = {};
  this._nums = {};
  this._length = items ? items.length : 0;
  if (!items) {
    return;
  }
  for (var i = 0, l = items.length; i < l; i++) {
    this.add(items[i]);
    if (items[i] === void 0) {
      continue;
    }
    if (typeof items[i] === "string") {
      this._items[items[i]] = i;
    } else {
      this._nums[items[i]] = i;
    }
  }
}
StringSet.prototype.add = function(x) {
  if (this.has(x)) {
    return this;
  }
  this._length++;
  if (typeof x === "string") {
    this._items[x] = this._length;
  } else {
    this._nums[x] = this._length;
  }
  return this;
};
StringSet.prototype.delete = function(x) {
  if (this.has(x) === false) {
    return this;
  }
  this._length--;
  delete this._items[x];
  delete this._nums[x];
  return this;
};
StringSet.prototype.has = function(x) {
  if (typeof x !== "string" && typeof x !== "number") {
    return false;
  }
  return this._items[x] !== void 0 || this._nums[x] !== void 0;
};
StringSet.prototype.values = function() {
  var this$1$1 = this;
  var values = [];
  Object.keys(this._items).forEach(function(k) {
    values.push({ k, v: this$1$1._items[k] });
  });
  Object.keys(this._nums).forEach(function(k) {
    values.push({ k: JSON.parse(k), v: this$1$1._nums[k] });
  });
  return values.sort(function(a, b) {
    return a.v - b.v;
  }).map(function(a) {
    return a.k;
  });
};
StringSet.prototype.clear = function() {
  this._length = 0;
  this._items = {};
  this._nums = {};
  return this;
};
var META_TYPES = [
  meta.FEATURE,
  meta.MIDPOINT,
  meta.VERTEX
];
var featuresAt = {
  click: featuresAtClick,
  touch: featuresAtTouch
};
function featuresAtClick(event, bbox2, ctx) {
  return featuresAt$1(event, bbox2, ctx, ctx.options.clickBuffer);
}
function featuresAtTouch(event, bbox2, ctx) {
  return featuresAt$1(event, bbox2, ctx, ctx.options.touchBuffer);
}
function featuresAt$1(event, bbox2, ctx, buffer) {
  if (ctx.map === null) {
    return [];
  }
  var box = event ? mapEventToBoundingBox(event, buffer) : bbox2;
  var queryParams = {};
  if (ctx.options.styles) {
    queryParams.layers = ctx.options.styles.map(function(s) {
      return s.id;
    });
  }
  var features = ctx.map.queryRenderedFeatures(box, queryParams).filter(function(feature2) {
    return META_TYPES.indexOf(feature2.properties.meta) !== -1;
  });
  var featureIds = new StringSet();
  var uniqueFeatures = [];
  features.forEach(function(feature2) {
    var featureId = feature2.properties.id;
    if (featureIds.has(featureId)) {
      return;
    }
    featureIds.add(featureId);
    uniqueFeatures.push(feature2);
  });
  return sortFeatures(uniqueFeatures);
}
function getFeatureAtAndSetCursors(event, ctx) {
  var features = featuresAt.click(event, null, ctx);
  var classes2 = { mouse: cursors.NONE };
  if (features[0]) {
    classes2.mouse = features[0].properties.active === activeStates.ACTIVE ? cursors.MOVE : cursors.POINTER;
    classes2.feature = features[0].properties.meta;
  }
  if (ctx.events.currentModeName().indexOf("draw") !== -1) {
    classes2.mouse = cursors.ADD;
  }
  ctx.ui.queueMapClasses(classes2);
  ctx.ui.updateMapClasses();
  return features[0];
}
function euclideanDistance(a, b) {
  var x = a.x - b.x;
  var y = a.y - b.y;
  return Math.sqrt(x * x + y * y);
}
var FINE_TOLERANCE = 4;
var GROSS_TOLERANCE = 12;
var INTERVAL = 500;
function isClick(start, end, options) {
  if (options === void 0) options = {};
  var fineTolerance = options.fineTolerance != null ? options.fineTolerance : FINE_TOLERANCE;
  var grossTolerance = options.grossTolerance != null ? options.grossTolerance : GROSS_TOLERANCE;
  var interval = options.interval != null ? options.interval : INTERVAL;
  start.point = start.point || end.point;
  start.time = start.time || end.time;
  var moveDistance = euclideanDistance(start.point, end.point);
  return moveDistance < fineTolerance || moveDistance < grossTolerance && end.time - start.time < interval;
}
var TAP_TOLERANCE = 25;
var TAP_INTERVAL = 250;
function isTap(start, end, options) {
  if (options === void 0) options = {};
  var tolerance = options.tolerance != null ? options.tolerance : TAP_TOLERANCE;
  var interval = options.interval != null ? options.interval : TAP_INTERVAL;
  start.point = start.point || end.point;
  start.time = start.time || end.time;
  var moveDistance = euclideanDistance(start.point, end.point);
  return moveDistance < tolerance && end.time - start.time < interval;
}
var hat$2 = { exports: {} };
var hat = hat$2.exports = function(bits, base) {
  if (!base) {
    base = 16;
  }
  if (bits === void 0) {
    bits = 128;
  }
  if (bits <= 0) {
    return "0";
  }
  var digits = Math.log(Math.pow(2, bits)) / Math.log(base);
  for (var i = 2; digits === Infinity; i *= 2) {
    digits = Math.log(Math.pow(2, bits / i)) / Math.log(base) * i;
  }
  var rem = digits - Math.floor(digits);
  var res = "";
  for (var i = 0; i < Math.floor(digits); i++) {
    var x = Math.floor(Math.random() * base).toString(base);
    res = x + res;
  }
  if (rem) {
    var b = Math.pow(base, rem);
    var x = Math.floor(Math.random() * b).toString(base);
    res = x + res;
  }
  var parsed = parseInt(res, base);
  if (parsed !== Infinity && parsed >= Math.pow(2, bits)) {
    return hat(bits, base);
  } else {
    return res;
  }
};
hat.rack = function(bits, base, expandBy) {
  var fn = function(data) {
    var iters = 0;
    do {
      if (iters++ > 10) {
        if (expandBy) {
          bits += expandBy;
        } else {
          throw new Error("too many ID collisions, use more bits");
        }
      }
      var id = hat(bits, base);
    } while (Object.hasOwnProperty.call(hats, id));
    hats[id] = data;
    return id;
  };
  var hats = fn.hats = {};
  fn.get = function(id) {
    return fn.hats[id];
  };
  fn.set = function(id, value) {
    fn.hats[id] = value;
    return fn;
  };
  fn.bits = bits || 128;
  fn.base = base || 16;
  return fn;
};
var hatExports = hat$2.exports;
var hat$1 = getDefaultExportFromCjs(hatExports);
var Feature = function(ctx, geojson) {
  this.ctx = ctx;
  this.properties = geojson.properties || {};
  this.coordinates = geojson.geometry.coordinates;
  this.id = geojson.id || hat$1();
  this.type = geojson.geometry.type;
};
Feature.prototype.changed = function() {
  this.ctx.store.featureChanged(this.id);
};
Feature.prototype.incomingCoords = function(coords) {
  this.setCoordinates(coords);
};
Feature.prototype.setCoordinates = function(coords) {
  this.coordinates = coords;
  this.changed();
};
Feature.prototype.getCoordinates = function() {
  return JSON.parse(JSON.stringify(this.coordinates));
};
Feature.prototype.setProperty = function(property, value) {
  this.properties[property] = value;
};
Feature.prototype.toGeoJSON = function() {
  return JSON.parse(JSON.stringify({
    id: this.id,
    type: geojsonTypes.FEATURE,
    properties: this.properties,
    geometry: {
      coordinates: this.getCoordinates(),
      type: this.type
    }
  }));
};
Feature.prototype.internal = function(mode) {
  var properties = {
    id: this.id,
    meta: meta.FEATURE,
    "meta:type": this.type,
    active: activeStates.INACTIVE,
    mode
  };
  if (this.ctx.options.userProperties) {
    for (var name in this.properties) {
      properties["user_" + name] = this.properties[name];
    }
  }
  return {
    type: geojsonTypes.FEATURE,
    properties,
    geometry: {
      coordinates: this.getCoordinates(),
      type: this.type
    }
  };
};
var Point$2 = function(ctx, geojson) {
  Feature.call(this, ctx, geojson);
};
Point$2.prototype = Object.create(Feature.prototype);
Point$2.prototype.isValid = function() {
  return typeof this.coordinates[0] === "number" && typeof this.coordinates[1] === "number";
};
Point$2.prototype.updateCoordinate = function(pathOrLng, lngOrLat, lat) {
  if (arguments.length === 3) {
    this.coordinates = [lngOrLat, lat];
  } else {
    this.coordinates = [pathOrLng, lngOrLat];
  }
  this.changed();
};
Point$2.prototype.getCoordinate = function() {
  return this.getCoordinates();
};
var LineString = function(ctx, geojson) {
  Feature.call(this, ctx, geojson);
};
LineString.prototype = Object.create(Feature.prototype);
LineString.prototype.isValid = function() {
  return this.coordinates.length > 1;
};
LineString.prototype.addCoordinate = function(path, lng, lat) {
  this.changed();
  var id = parseInt(path, 10);
  this.coordinates.splice(id, 0, [lng, lat]);
};
LineString.prototype.getCoordinate = function(path) {
  var id = parseInt(path, 10);
  return JSON.parse(JSON.stringify(this.coordinates[id]));
};
LineString.prototype.removeCoordinate = function(path) {
  this.changed();
  this.coordinates.splice(parseInt(path, 10), 1);
};
LineString.prototype.updateCoordinate = function(path, lng, lat) {
  var id = parseInt(path, 10);
  this.coordinates[id] = [lng, lat];
  this.changed();
};
var Polygon = function(ctx, geojson) {
  Feature.call(this, ctx, geojson);
  this.coordinates = this.coordinates.map(function(ring) {
    return ring.slice(0, -1);
  });
};
Polygon.prototype = Object.create(Feature.prototype);
Polygon.prototype.isValid = function() {
  if (this.coordinates.length === 0) {
    return false;
  }
  return this.coordinates.every(function(ring) {
    return ring.length > 2;
  });
};
Polygon.prototype.incomingCoords = function(coords) {
  this.coordinates = coords.map(function(ring) {
    return ring.slice(0, -1);
  });
  this.changed();
};
Polygon.prototype.setCoordinates = function(coords) {
  this.coordinates = coords;
  this.changed();
};
Polygon.prototype.addCoordinate = function(path, lng, lat) {
  this.changed();
  var ids = path.split(".").map(function(x) {
    return parseInt(x, 10);
  });
  var ring = this.coordinates[ids[0]];
  ring.splice(ids[1], 0, [lng, lat]);
};
Polygon.prototype.removeCoordinate = function(path) {
  this.changed();
  var ids = path.split(".").map(function(x) {
    return parseInt(x, 10);
  });
  var ring = this.coordinates[ids[0]];
  if (ring) {
    ring.splice(ids[1], 1);
    if (ring.length < 3) {
      this.coordinates.splice(ids[0], 1);
    }
  }
};
Polygon.prototype.getCoordinate = function(path) {
  var ids = path.split(".").map(function(x) {
    return parseInt(x, 10);
  });
  var ring = this.coordinates[ids[0]];
  return JSON.parse(JSON.stringify(ring[ids[1]]));
};
Polygon.prototype.getCoordinates = function() {
  return this.coordinates.map(function(coords) {
    return coords.concat([coords[0]]);
  });
};
Polygon.prototype.updateCoordinate = function(path, lng, lat) {
  this.changed();
  var parts = path.split(".");
  var ringId = parseInt(parts[0], 10);
  var coordId = parseInt(parts[1], 10);
  if (this.coordinates[ringId] === void 0) {
    this.coordinates[ringId] = [];
  }
  this.coordinates[ringId][coordId] = [lng, lat];
};
var models = {
  MultiPoint: Point$2,
  MultiLineString: LineString,
  MultiPolygon: Polygon
};
var takeAction = function(features, action, path, lng, lat) {
  var parts = path.split(".");
  var idx = parseInt(parts[0], 10);
  var tail = !parts[1] ? null : parts.slice(1).join(".");
  return features[idx][action](tail, lng, lat);
};
var MultiFeature = function(ctx, geojson) {
  Feature.call(this, ctx, geojson);
  delete this.coordinates;
  this.model = models[geojson.geometry.type];
  if (this.model === void 0) {
    throw new TypeError(geojson.geometry.type + " is not a valid type");
  }
  this.features = this._coordinatesToFeatures(geojson.geometry.coordinates);
};
MultiFeature.prototype = Object.create(Feature.prototype);
MultiFeature.prototype._coordinatesToFeatures = function(coordinates) {
  var this$1$1 = this;
  var Model = this.model.bind(this);
  return coordinates.map(function(coords) {
    return new Model(this$1$1.ctx, {
      id: hat$1(),
      type: geojsonTypes.FEATURE,
      properties: {},
      geometry: {
        coordinates: coords,
        type: this$1$1.type.replace("Multi", "")
      }
    });
  });
};
MultiFeature.prototype.isValid = function() {
  return this.features.every(function(f) {
    return f.isValid();
  });
};
MultiFeature.prototype.setCoordinates = function(coords) {
  this.features = this._coordinatesToFeatures(coords);
  this.changed();
};
MultiFeature.prototype.getCoordinate = function(path) {
  return takeAction(this.features, "getCoordinate", path);
};
MultiFeature.prototype.getCoordinates = function() {
  return JSON.parse(JSON.stringify(this.features.map(function(f) {
    if (f.type === geojsonTypes.POLYGON) {
      return f.getCoordinates();
    }
    return f.coordinates;
  })));
};
MultiFeature.prototype.updateCoordinate = function(path, lng, lat) {
  takeAction(this.features, "updateCoordinate", path, lng, lat);
  this.changed();
};
MultiFeature.prototype.addCoordinate = function(path, lng, lat) {
  takeAction(this.features, "addCoordinate", path, lng, lat);
  this.changed();
};
MultiFeature.prototype.removeCoordinate = function(path) {
  takeAction(this.features, "removeCoordinate", path);
  this.changed();
};
MultiFeature.prototype.getFeatures = function() {
  return this.features;
};
function ModeInterface(ctx) {
  this.map = ctx.map;
  this.drawConfig = JSON.parse(JSON.stringify(ctx.options || {}));
  this._ctx = ctx;
}
ModeInterface.prototype.setSelected = function(features) {
  return this._ctx.store.setSelected(features);
};
ModeInterface.prototype.setSelectedCoordinates = function(coords) {
  var this$1$1 = this;
  this._ctx.store.setSelectedCoordinates(coords);
  coords.reduce(function(m, c) {
    if (m[c.feature_id] === void 0) {
      m[c.feature_id] = true;
      this$1$1._ctx.store.get(c.feature_id).changed();
    }
    return m;
  }, {});
};
ModeInterface.prototype.getSelected = function() {
  return this._ctx.store.getSelected();
};
ModeInterface.prototype.getSelectedIds = function() {
  return this._ctx.store.getSelectedIds();
};
ModeInterface.prototype.isSelected = function(id) {
  return this._ctx.store.isSelected(id);
};
ModeInterface.prototype.getFeature = function(id) {
  return this._ctx.store.get(id);
};
ModeInterface.prototype.select = function(id) {
  return this._ctx.store.select(id);
};
ModeInterface.prototype.deselect = function(id) {
  return this._ctx.store.deselect(id);
};
ModeInterface.prototype.deleteFeature = function(id, opts) {
  if (opts === void 0) opts = {};
  return this._ctx.store.delete(id, opts);
};
ModeInterface.prototype.addFeature = function(feature2) {
  return this._ctx.store.add(feature2);
};
ModeInterface.prototype.clearSelectedFeatures = function() {
  return this._ctx.store.clearSelected();
};
ModeInterface.prototype.clearSelectedCoordinates = function() {
  return this._ctx.store.clearSelectedCoordinates();
};
ModeInterface.prototype.setActionableState = function(actions) {
  if (actions === void 0) actions = {};
  var newSet = {
    trash: actions.trash || false,
    combineFeatures: actions.combineFeatures || false,
    uncombineFeatures: actions.uncombineFeatures || false
  };
  return this._ctx.events.actionable(newSet);
};
ModeInterface.prototype.changeMode = function(mode, opts, eventOpts) {
  if (opts === void 0) opts = {};
  if (eventOpts === void 0) eventOpts = {};
  return this._ctx.events.changeMode(mode, opts, eventOpts);
};
ModeInterface.prototype.updateUIClasses = function(opts) {
  return this._ctx.ui.queueMapClasses(opts);
};
ModeInterface.prototype.activateUIButton = function(name) {
  return this._ctx.ui.setActiveButton(name);
};
ModeInterface.prototype.featuresAt = function(event, bbox2, bufferType) {
  if (bufferType === void 0) bufferType = "click";
  if (bufferType !== "click" && bufferType !== "touch") {
    throw new Error("invalid buffer type");
  }
  return featuresAt[bufferType](event, bbox2, this._ctx);
};
ModeInterface.prototype.newFeature = function(geojson) {
  var type = geojson.geometry.type;
  if (type === geojsonTypes.POINT) {
    return new Point$2(this._ctx, geojson);
  }
  if (type === geojsonTypes.LINE_STRING) {
    return new LineString(this._ctx, geojson);
  }
  if (type === geojsonTypes.POLYGON) {
    return new Polygon(this._ctx, geojson);
  }
  return new MultiFeature(this._ctx, geojson);
};
ModeInterface.prototype.isInstanceOf = function(type, feature2) {
  if (type === geojsonTypes.POINT) {
    return feature2 instanceof Point$2;
  }
  if (type === geojsonTypes.LINE_STRING) {
    return feature2 instanceof LineString;
  }
  if (type === geojsonTypes.POLYGON) {
    return feature2 instanceof Polygon;
  }
  if (type === "MultiFeature") {
    return feature2 instanceof MultiFeature;
  }
  throw new Error("Unknown feature class: " + type);
};
ModeInterface.prototype.doRender = function(id) {
  return this._ctx.store.featureChanged(id);
};
ModeInterface.prototype.onSetup = function() {
};
ModeInterface.prototype.onDrag = function() {
};
ModeInterface.prototype.onClick = function() {
};
ModeInterface.prototype.onMouseMove = function() {
};
ModeInterface.prototype.onMouseDown = function() {
};
ModeInterface.prototype.onMouseUp = function() {
};
ModeInterface.prototype.onMouseOut = function() {
};
ModeInterface.prototype.onKeyUp = function() {
};
ModeInterface.prototype.onKeyDown = function() {
};
ModeInterface.prototype.onTouchStart = function() {
};
ModeInterface.prototype.onTouchMove = function() {
};
ModeInterface.prototype.onTouchEnd = function() {
};
ModeInterface.prototype.onTap = function() {
};
ModeInterface.prototype.onStop = function() {
};
ModeInterface.prototype.onTrash = function() {
};
ModeInterface.prototype.onCombineFeature = function() {
};
ModeInterface.prototype.onUncombineFeature = function() {
};
ModeInterface.prototype.toDisplayFeatures = function() {
  throw new Error("You must overwrite toDisplayFeatures");
};
var eventMapper = {
  drag: "onDrag",
  click: "onClick",
  mousemove: "onMouseMove",
  mousedown: "onMouseDown",
  mouseup: "onMouseUp",
  mouseout: "onMouseOut",
  keyup: "onKeyUp",
  keydown: "onKeyDown",
  touchstart: "onTouchStart",
  touchmove: "onTouchMove",
  touchend: "onTouchEnd",
  tap: "onTap"
};
var eventKeys = Object.keys(eventMapper);
function objectToMode(modeObject) {
  var modeObjectKeys = Object.keys(modeObject);
  return function(ctx, startOpts) {
    if (startOpts === void 0) startOpts = {};
    var state = {};
    var mode = modeObjectKeys.reduce(function(m, k) {
      m[k] = modeObject[k];
      return m;
    }, new ModeInterface(ctx));
    function wrapper(eh) {
      return function(e2) {
        return mode[eh](state, e2);
      };
    }
    return {
      start: function start() {
        var this$1$1 = this;
        state = mode.onSetup(startOpts);
        eventKeys.forEach(function(key) {
          var modeHandler = eventMapper[key];
          var selector = function() {
            return false;
          };
          if (modeObject[modeHandler]) {
            selector = function() {
              return true;
            };
          }
          this$1$1.on(key, selector, wrapper(modeHandler));
        });
      },
      stop: function stop() {
        mode.onStop(state);
      },
      trash: function trash() {
        mode.onTrash(state);
      },
      combineFeatures: function combineFeatures() {
        mode.onCombineFeatures(state);
      },
      uncombineFeatures: function uncombineFeatures() {
        mode.onUncombineFeatures(state);
      },
      render: function render2(geojson, push) {
        mode.toDisplayFeatures(state, geojson, push);
      }
    };
  };
}
var SRCenter = {
  Center: 0,
  // rotate or scale around center of polygon
  Opposite: 1
  // rotate or scale around opposite side of polygon
};
function events(ctx) {
  var modes2 = Object.keys(ctx.options.modes).reduce(function(m, k) {
    m[k] = objectToMode(ctx.options.modes[k]);
    return m;
  }, {});
  var mouseDownInfo = {};
  var touchStartInfo = {};
  var events2 = {};
  var currentModeName = null;
  var currentMode = null;
  events2.drag = function(event, isDrag) {
    if (isDrag({
      point: event.point,
      time: (/* @__PURE__ */ new Date()).getTime()
    })) {
      ctx.ui.queueMapClasses({ mouse: cursors.DRAG });
      currentMode.drag(event);
    } else {
      event.originalEvent.stopPropagation();
    }
  };
  events2.mousedrag = function(event) {
    events2.drag(event, function(endInfo) {
      return !isClick(mouseDownInfo, endInfo);
    });
  };
  events2.touchdrag = function(event) {
    events2.drag(event, function(endInfo) {
      return !isTap(touchStartInfo, endInfo);
    });
  };
  events2.mousemove = function(event) {
    var button = event.originalEvent.buttons !== void 0 ? event.originalEvent.buttons : event.originalEvent.which;
    if (button === 1) {
      return events2.mousedrag(event);
    }
    var target = getFeatureAtAndSetCursors(event, ctx);
    event.featureTarget = target;
    currentMode.mousemove(event);
  };
  events2.mousedown = function(event) {
    mouseDownInfo = {
      time: (/* @__PURE__ */ new Date()).getTime(),
      point: event.point
    };
    var target = getFeatureAtAndSetCursors(event, ctx);
    event.featureTarget = target;
    currentMode.mousedown(event);
  };
  events2.mouseup = function(event) {
    var target = getFeatureAtAndSetCursors(event, ctx);
    event.featureTarget = target;
    if (isClick(mouseDownInfo, {
      point: event.point,
      time: (/* @__PURE__ */ new Date()).getTime()
    })) {
      currentMode.click(event);
    } else {
      currentMode.mouseup(event);
    }
  };
  events2.mouseout = function(event) {
    currentMode.mouseout(event);
  };
  events2.touchstart = function(event) {
    event.originalEvent.preventDefault();
    if (!ctx.options.touchEnabled) {
      return;
    }
    touchStartInfo = {
      time: (/* @__PURE__ */ new Date()).getTime(),
      point: event.point
    };
    var target = featuresAt.touch(event, null, ctx)[0];
    event.featureTarget = target;
    currentMode.touchstart(event);
  };
  events2.touchmove = function(event) {
    event.originalEvent.preventDefault();
    if (!ctx.options.touchEnabled) {
      return;
    }
    currentMode.touchmove(event);
    return events2.touchdrag(event);
  };
  events2.touchend = function(event) {
    event.originalEvent.preventDefault();
    if (!ctx.options.touchEnabled) {
      return;
    }
    var target = featuresAt.touch(event, null, ctx)[0];
    event.featureTarget = target;
    if (isTap(touchStartInfo, {
      time: (/* @__PURE__ */ new Date()).getTime(),
      point: event.point
    })) {
      currentMode.tap(event);
    } else {
      currentMode.touchend(event);
    }
  };
  var isKeyModeValid = function(code) {
    return !(code === 8 || code === 46 || code >= 48 && code <= 57);
  };
  events2.keydown = function(event) {
    var isMapElement = (event.srcElement || event.target).classList.contains("maplibregl-canvas");
    if (!isMapElement) {
      return;
    }
    if ((event.keyCode === 8 || event.keyCode === 46) && ctx.options.controls.trash) {
      event.preventDefault();
      currentMode.trash();
    } else if (isKeyModeValid(event.keyCode)) {
      currentMode.keydown(event);
    } else if (event.keyCode === 49 && ctx.options.controls.point) {
      changeMode(modes$1.DRAW_POINT);
    } else if (event.keyCode === 50 && ctx.options.controls.line_string) {
      changeMode(modes$1.DRAW_LINE_STRING);
    } else if (event.keyCode === 51 && ctx.options.controls.polygon) {
      changeMode(modes$1.DRAW_POLYGON);
    }
  };
  events2.keyup = function(event) {
    if (isKeyModeValid(event.keyCode)) {
      currentMode.keyup(event);
    }
  };
  events2.zoomend = function() {
    ctx.store.changeZoom();
  };
  events2.data = function(event) {
    if (event.dataType === "style") {
      var setup = ctx.setup;
      var map = ctx.map;
      var options = ctx.options;
      var store = ctx.store;
      var hasLayers = options.styles.some(function(style) {
        return map.getLayer(style.id);
      });
      if (!hasLayers) {
        setup.addLayers();
        store.setDirty();
        store.render();
      }
    }
  };
  function changeMode(modename, nextModeOptions, eventOptions) {
    if (eventOptions === void 0) eventOptions = {};
    currentMode.stop();
    var modebuilder = modes2[modename];
    if (modebuilder === void 0) {
      throw new Error(modename + " is not valid");
    }
    currentModeName = modename;
    var mode = modebuilder(ctx, nextModeOptions);
    currentMode = ModeHandler(mode, ctx);
    if (!eventOptions.silent) {
      ctx.map.fire(events$1.MODE_CHANGE, { mode: modename });
    }
    ctx.store.setDirty();
    ctx.store.render();
  }
  var actionState = {
    trash: false,
    combineFeatures: false,
    uncombineFeatures: false
  };
  function actionable(actions) {
    var changed = false;
    Object.keys(actions).forEach(function(action) {
      if (actionState[action] === void 0) {
        throw new Error("Invalid action type");
      }
      if (actionState[action] !== actions[action]) {
        changed = true;
      }
      actionState[action] = actions[action];
    });
    if (changed) {
      ctx.map.fire(events$1.ACTIONABLE, { actions: actionState });
    }
  }
  var api = {
    start: function start() {
      currentModeName = ctx.options.defaultMode;
      currentMode = ModeHandler(modes2[currentModeName](ctx), ctx);
    },
    changeMode,
    actionable,
    currentModeName: function currentModeName$1() {
      return currentModeName;
    },
    currentModeRender: function currentModeRender(geojson, push) {
      return currentMode.render(geojson, push);
    },
    fire: function fire(name, event) {
      if (events2[name]) {
        events2[name](event);
      }
    },
    addEventListeners: function addEventListeners() {
      ctx.map.on("mousemove", events2.mousemove);
      ctx.map.on("mousedown", events2.mousedown);
      ctx.map.on("mouseup", events2.mouseup);
      ctx.map.on("data", events2.data);
      ctx.map.on("touchmove", events2.touchmove);
      ctx.map.on("touchstart", events2.touchstart);
      ctx.map.on("touchend", events2.touchend);
      ctx.container.addEventListener("mouseout", events2.mouseout);
      if (ctx.options.keybindings) {
        ctx.container.addEventListener("keydown", events2.keydown);
        ctx.container.addEventListener("keyup", events2.keyup);
      }
    },
    removeEventListeners: function removeEventListeners() {
      ctx.map.off("mousemove", events2.mousemove);
      ctx.map.off("mousedown", events2.mousedown);
      ctx.map.off("mouseup", events2.mouseup);
      ctx.map.off("data", events2.data);
      ctx.map.off("touchmove", events2.touchmove);
      ctx.map.off("touchstart", events2.touchstart);
      ctx.map.off("touchend", events2.touchend);
      ctx.container.removeEventListener("mouseout", events2.mouseout);
      if (ctx.options.keybindings) {
        ctx.container.removeEventListener("keydown", events2.keydown);
        ctx.container.removeEventListener("keyup", events2.keyup);
      }
    },
    trash: function trash(options) {
      currentMode.trash(options);
    },
    combineFeatures: function combineFeatures() {
      currentMode.combineFeatures();
    },
    uncombineFeatures: function uncombineFeatures() {
      currentMode.uncombineFeatures();
    },
    getMode: function getMode() {
      return currentModeName;
    }
  };
  return api;
}
function toDenseArray(x) {
  return [].concat(x).filter(function(y) {
    return y !== void 0;
  });
}
function render() {
  var store = this;
  var mapExists = store.ctx.map && store.ctx.map.getSource(sources.HOT) !== void 0;
  if (!mapExists) {
    return cleanup();
  }
  var mode = store.ctx.events.currentModeName();
  store.ctx.ui.queueMapClasses({ mode });
  var newHotIds = [];
  var newColdIds = [];
  if (store.isDirty) {
    newColdIds = store.getAllIds();
  } else {
    newHotIds = store.getChangedIds().filter(function(id) {
      return store.get(id) !== void 0;
    });
    newColdIds = store.sources.hot.filter(function(geojson) {
      return geojson.properties.id && newHotIds.indexOf(geojson.properties.id) === -1 && store.get(geojson.properties.id) !== void 0;
    }).map(function(geojson) {
      return geojson.properties.id;
    });
  }
  store.sources.hot = [];
  var lastColdCount = store.sources.cold.length;
  store.sources.cold = store.isDirty ? [] : store.sources.cold.filter(function(geojson) {
    var id = geojson.properties.id || geojson.properties.parent;
    return newHotIds.indexOf(id) === -1;
  });
  var coldChanged = lastColdCount !== store.sources.cold.length || newColdIds.length > 0;
  newHotIds.forEach(function(id) {
    return renderFeature(id, "hot");
  });
  newColdIds.forEach(function(id) {
    return renderFeature(id, "cold");
  });
  function renderFeature(id, source) {
    var feature2 = store.get(id);
    var featureInternal = feature2.internal(mode);
    store.ctx.events.currentModeRender(featureInternal, function(geojson) {
      store.sources[source].push(geojson);
    });
  }
  if (coldChanged) {
    store.ctx.map.getSource(sources.COLD).setData({
      type: geojsonTypes.FEATURE_COLLECTION,
      features: store.sources.cold
    });
  }
  store.ctx.map.getSource(sources.HOT).setData({
    type: geojsonTypes.FEATURE_COLLECTION,
    features: store.sources.hot
  });
  if (store._emitSelectionChange) {
    store.ctx.map.fire(events$1.SELECTION_CHANGE, {
      features: store.getSelected().map(function(feature2) {
        return feature2.toGeoJSON();
      }),
      points: store.getSelectedCoordinates().map(function(coordinate) {
        return {
          type: geojsonTypes.FEATURE,
          properties: {},
          geometry: {
            type: geojsonTypes.POINT,
            coordinates: coordinate.coordinates
          }
        };
      })
    });
    store._emitSelectionChange = false;
  }
  if (store._deletedFeaturesToEmit.length) {
    var geojsonToEmit = store._deletedFeaturesToEmit.map(function(feature2) {
      return feature2.toGeoJSON();
    });
    store._deletedFeaturesToEmit = [];
    store.ctx.map.fire(events$1.DELETE, {
      features: geojsonToEmit
    });
  }
  cleanup();
  store.ctx.map.fire(events$1.RENDER, {});
  function cleanup() {
    store.isDirty = false;
    store.clearChangedIds();
  }
}
function Store(ctx) {
  var this$1$1 = this;
  this._features = {};
  this._featureIds = new StringSet();
  this._selectedFeatureIds = new StringSet();
  this._selectedCoordinates = [];
  this._changedFeatureIds = new StringSet();
  this._deletedFeaturesToEmit = [];
  this._emitSelectionChange = false;
  this._mapInitialConfig = {};
  this.ctx = ctx;
  this.sources = {
    hot: [],
    cold: []
  };
  var renderRequest;
  this.render = function() {
    if (!renderRequest) {
      renderRequest = requestAnimationFrame(function() {
        renderRequest = null;
        render.call(this$1$1);
      });
    }
  };
  this.isDirty = false;
}
Store.prototype.createRenderBatch = function() {
  var this$1$1 = this;
  var holdRender = this.render;
  var numRenders = 0;
  this.render = function() {
    numRenders++;
  };
  return function() {
    this$1$1.render = holdRender;
    if (numRenders > 0) {
      this$1$1.render();
    }
  };
};
Store.prototype.setDirty = function() {
  this.isDirty = true;
  return this;
};
Store.prototype.featureChanged = function(featureId) {
  this._changedFeatureIds.add(featureId);
  return this;
};
Store.prototype.getChangedIds = function() {
  return this._changedFeatureIds.values();
};
Store.prototype.clearChangedIds = function() {
  this._changedFeatureIds.clear();
  return this;
};
Store.prototype.getAllIds = function() {
  return this._featureIds.values();
};
Store.prototype.add = function(feature2) {
  this.featureChanged(feature2.id);
  this._features[feature2.id] = feature2;
  this._featureIds.add(feature2.id);
  return this;
};
Store.prototype.delete = function(featureIds, options) {
  var this$1$1 = this;
  if (options === void 0) options = {};
  toDenseArray(featureIds).forEach(function(id) {
    if (!this$1$1._featureIds.has(id)) {
      return;
    }
    this$1$1._featureIds.delete(id);
    this$1$1._selectedFeatureIds.delete(id);
    if (!options.silent) {
      if (this$1$1._deletedFeaturesToEmit.indexOf(this$1$1._features[id]) === -1) {
        this$1$1._deletedFeaturesToEmit.push(this$1$1._features[id]);
      }
    }
    delete this$1$1._features[id];
    this$1$1.isDirty = true;
  });
  refreshSelectedCoordinates(this, options);
  return this;
};
Store.prototype.get = function(id) {
  return this._features[id];
};
Store.prototype.getAll = function() {
  var this$1$1 = this;
  return Object.keys(this._features).map(function(id) {
    return this$1$1._features[id];
  });
};
Store.prototype.select = function(featureIds, options) {
  var this$1$1 = this;
  if (options === void 0) options = {};
  toDenseArray(featureIds).forEach(function(id) {
    if (this$1$1._selectedFeatureIds.has(id)) {
      return;
    }
    this$1$1._selectedFeatureIds.add(id);
    this$1$1._changedFeatureIds.add(id);
    if (!options.silent) {
      this$1$1._emitSelectionChange = true;
    }
  });
  return this;
};
Store.prototype.deselect = function(featureIds, options) {
  var this$1$1 = this;
  if (options === void 0) options = {};
  toDenseArray(featureIds).forEach(function(id) {
    if (!this$1$1._selectedFeatureIds.has(id)) {
      return;
    }
    this$1$1._selectedFeatureIds.delete(id);
    this$1$1._changedFeatureIds.add(id);
    if (!options.silent) {
      this$1$1._emitSelectionChange = true;
    }
  });
  refreshSelectedCoordinates(this, options);
  return this;
};
Store.prototype.clearSelected = function(options) {
  if (options === void 0) options = {};
  this.deselect(this._selectedFeatureIds.values(), { silent: options.silent });
  return this;
};
Store.prototype.setSelected = function(featureIds, options) {
  var this$1$1 = this;
  if (options === void 0) options = {};
  featureIds = toDenseArray(featureIds);
  this.deselect(this._selectedFeatureIds.values().filter(function(id) {
    return featureIds.indexOf(id) === -1;
  }), { silent: options.silent });
  this.select(featureIds.filter(function(id) {
    return !this$1$1._selectedFeatureIds.has(id);
  }), { silent: options.silent });
  return this;
};
Store.prototype.setSelectedCoordinates = function(coordinates) {
  this._selectedCoordinates = coordinates;
  this._emitSelectionChange = true;
  return this;
};
Store.prototype.clearSelectedCoordinates = function() {
  this._selectedCoordinates = [];
  this._emitSelectionChange = true;
  return this;
};
Store.prototype.getSelectedIds = function() {
  return this._selectedFeatureIds.values();
};
Store.prototype.getSelected = function() {
  var this$1$1 = this;
  return this._selectedFeatureIds.values().map(function(id) {
    return this$1$1.get(id);
  });
};
Store.prototype.getSelectedCoordinates = function() {
  var this$1$1 = this;
  var selected = this._selectedCoordinates.map(function(coordinate) {
    var feature2 = this$1$1.get(coordinate.feature_id);
    return {
      coordinates: feature2.getCoordinate(coordinate.coord_path)
    };
  });
  return selected;
};
Store.prototype.isSelected = function(featureId) {
  return this._selectedFeatureIds.has(featureId);
};
Store.prototype.setFeatureProperty = function(featureId, property, value) {
  this.get(featureId).setProperty(property, value);
  this.featureChanged(featureId);
};
function refreshSelectedCoordinates(store, options) {
  var newSelectedCoordinates = store._selectedCoordinates.filter(function(point2) {
    return store._selectedFeatureIds.has(point2.feature_id);
  });
  if (store._selectedCoordinates.length !== newSelectedCoordinates.length && !options.silent) {
    store._emitSelectionChange = true;
  }
  store._selectedCoordinates = newSelectedCoordinates;
}
Store.prototype.storeMapConfig = function() {
  var this$1$1 = this;
  interactions.forEach(function(interaction) {
    var interactionSet = this$1$1.ctx.map[interaction];
    if (interactionSet) {
      this$1$1._mapInitialConfig[interaction] = this$1$1.ctx.map[interaction].isEnabled();
    }
  });
};
Store.prototype.restoreMapConfig = function() {
  var this$1$1 = this;
  Object.keys(this._mapInitialConfig).forEach(function(key) {
    var value = this$1$1._mapInitialConfig[key];
    if (value) {
      this$1$1.ctx.map[key].enable();
    } else {
      this$1$1.ctx.map[key].disable();
    }
  });
};
Store.prototype.getInitialConfigValue = function(interaction) {
  if (this._mapInitialConfig[interaction] !== void 0) {
    return this._mapInitialConfig[interaction];
  } else {
    return true;
  }
};
var immutable = extend;
var hasOwnProperty$1 = Object.prototype.hasOwnProperty;
function extend() {
  var arguments$1 = arguments;
  var target = {};
  for (var i = 0; i < arguments.length; i++) {
    var source = arguments$1[i];
    for (var key in source) {
      if (hasOwnProperty$1.call(source, key)) {
        target[key] = source[key];
      }
    }
  }
  return target;
}
var xtend = getDefaultExportFromCjs(immutable);
var classTypes = ["mode", "feature", "mouse"];
function ui(ctx) {
  var buttonElements = {};
  var activeButton = null;
  var currentMapClasses = {
    mode: null,
    // e.g. mode-direct_select
    feature: null,
    // e.g. feature-vertex
    mouse: null
    // e.g. mouse-move
  };
  var nextMapClasses = {
    mode: null,
    feature: null,
    mouse: null
  };
  function clearMapClasses() {
    queueMapClasses({ mode: null, feature: null, mouse: null });
    updateMapClasses();
  }
  function queueMapClasses(options) {
    nextMapClasses = xtend(nextMapClasses, options);
  }
  function updateMapClasses() {
    var ref, ref$1;
    if (!ctx.container) {
      return;
    }
    var classesToRemove = [];
    var classesToAdd = [];
    classTypes.forEach(function(type) {
      if (nextMapClasses[type] === currentMapClasses[type]) {
        return;
      }
      classesToRemove.push(type + "-" + currentMapClasses[type]);
      if (nextMapClasses[type] !== null) {
        classesToAdd.push(type + "-" + nextMapClasses[type]);
      }
    });
    if (classesToRemove.length > 0) {
      (ref = ctx.container.classList).remove.apply(ref, classesToRemove);
    }
    if (classesToAdd.length > 0) {
      (ref$1 = ctx.container.classList).add.apply(ref$1, classesToAdd);
    }
    currentMapClasses = xtend(currentMapClasses, nextMapClasses);
  }
  function createControlButton(id, options) {
    if (options === void 0) options = {};
    var button = document.createElement("button");
    button.className = classes.CONTROL_BUTTON + " " + options.className;
    button.setAttribute("title", options.title);
    options.container.appendChild(button);
    button.addEventListener("click", function(e2) {
      e2.preventDefault();
      e2.stopPropagation();
      var clickedButton = e2.target;
      if (clickedButton === activeButton) {
        deactivateButtons();
        options.onDeactivate();
        return;
      }
      setActiveButton(id);
      options.onActivate();
    }, true);
    return button;
  }
  function deactivateButtons() {
    if (!activeButton) {
      return;
    }
    activeButton.classList.remove(classes.ACTIVE_BUTTON);
    activeButton = null;
  }
  function setActiveButton(id) {
    deactivateButtons();
    var button = buttonElements[id];
    if (!button) {
      return;
    }
    if (button && id !== "trash") {
      button.classList.add(classes.ACTIVE_BUTTON);
      activeButton = button;
    }
  }
  function addButtons() {
    var controls = ctx.options.controls;
    var controlGroup = document.createElement("div");
    controlGroup.className = classes.CONTROL_GROUP + " " + classes.CONTROL_BASE;
    if (!controls) {
      return controlGroup;
    }
    if (controls[types$1.POINT]) {
      buttonElements[types$1.POINT] = createControlButton(types$1.POINT, {
        container: controlGroup,
        className: classes.CONTROL_BUTTON_POINT,
        title: "Marker tool " + (ctx.options.keybindings ? "(m)" : ""),
        onActivate: function() {
          return ctx.events.changeMode(modes$1.DRAW_POINT);
        },
        onDeactivate: function() {
          return ctx.events.trash();
        }
      });
    }
    if (controls[types$1.LINE]) {
      buttonElements[types$1.LINE] = createControlButton(types$1.LINE, {
        container: controlGroup,
        className: classes.CONTROL_BUTTON_LINE,
        title: "LineString tool " + (ctx.options.keybindings ? "(l)" : ""),
        onActivate: function() {
          return ctx.events.changeMode(modes$1.DRAW_LINE_STRING);
        },
        onDeactivate: function() {
          return ctx.events.trash();
        }
      });
    }
    if (controls[types$1.POLYGON]) {
      buttonElements[types$1.POLYGON] = createControlButton(types$1.POLYGON, {
        container: controlGroup,
        className: classes.CONTROL_BUTTON_POLYGON,
        title: "Polygon tool " + (ctx.options.keybindings ? "(p)" : ""),
        onActivate: function() {
          return ctx.events.changeMode(modes$1.DRAW_POLYGON);
        },
        onDeactivate: function() {
          return ctx.events.trash();
        }
      });
    }
    if (controls.trash) {
      buttonElements.trash = createControlButton("trash", {
        container: controlGroup,
        className: classes.CONTROL_BUTTON_TRASH,
        title: "Delete",
        onActivate: function() {
          ctx.events.trash();
        }
      });
    }
    if (controls.combine_features) {
      buttonElements.combine_features = createControlButton("combineFeatures", {
        container: controlGroup,
        className: classes.CONTROL_BUTTON_COMBINE_FEATURES,
        title: "Combine",
        onActivate: function() {
          ctx.events.combineFeatures();
        }
      });
    }
    if (controls.uncombine_features) {
      buttonElements.uncombine_features = createControlButton("uncombineFeatures", {
        container: controlGroup,
        className: classes.CONTROL_BUTTON_UNCOMBINE_FEATURES,
        title: "Uncombine",
        onActivate: function() {
          ctx.events.uncombineFeatures();
        }
      });
    }
    if (controls.srmode) {
      buttonElements.srmode = createControlButton("srmode", {
        container: controlGroup,
        className: classes.CONTROL_BUTTON_SRMODE,
        title: "SRMode",
        onActivate: function() {
          var tmp = ctx.store.getSelected();
          if (tmp.length === 0 || tmp[0].type === "Point" || tmp[0].type === "MultiPoint") {
            deactivateButtons();
            return;
          }
          ctx.events.changeMode("SRMode", {
            canScale: true,
            canRotate: true,
            // only rotation enabled
            canTrash: false,
            // disable feature delete
            rotatePivot: SRCenter.Center,
            // rotate around center
            scaleCenter: SRCenter.Opposite,
            // scale around opposite vertex
            singleRotationPoint: true,
            // only one rotation point
            rotationPointRadius: 1.2,
            // offset rotation point
            canSelectFeatures: true
          });
        },
        onDeactivate: function() {
          ctx.events.changeMode(modes$1.SIMPLE_SELECT);
        }
      });
    }
    return controlGroup;
  }
  function removeButtons() {
    Object.keys(buttonElements).forEach(function(buttonId) {
      var button = buttonElements[buttonId];
      if (button.parentNode) {
        button.parentNode.removeChild(button);
      }
      delete buttonElements[buttonId];
    });
  }
  return {
    setActiveButton,
    queueMapClasses,
    updateMapClasses,
    clearMapClasses,
    addButtons,
    removeButtons,
    deactivateButtons
  };
}
function runSetup(ctx) {
  var controlContainer = null;
  var mapLoadedInterval = null;
  var setup = {
    onRemove: function onRemove() {
      ctx.map.off("load", setup.connect);
      clearInterval(mapLoadedInterval);
      setup.removeLayers();
      ctx.store.restoreMapConfig();
      ctx.ui.removeButtons();
      ctx.events.removeEventListeners();
      ctx.ui.clearMapClasses();
      if (ctx.boxZoomInitial) {
        ctx.map.boxZoom.enable();
      }
      ctx.map = null;
      ctx.container = null;
      ctx.store = null;
      if (controlContainer && controlContainer.parentNode) {
        controlContainer.parentNode.removeChild(controlContainer);
      }
      controlContainer = null;
      return this;
    },
    connect: function connect() {
      ctx.map.off("load", setup.connect);
      clearInterval(mapLoadedInterval);
      setup.addLayers();
      ctx.store.storeMapConfig();
      ctx.events.addEventListeners();
    },
    onAdd: function onAdd(map) {
      {
        var _fire = map.fire;
        map.fire = function(type, event) {
          var args = arguments;
          if (_fire.length === 1 && arguments.length !== 1) {
            args = [xtend({}, { type }, event)];
          }
          return _fire.apply(map, args);
        };
      }
      ctx.map = map;
      ctx.events = events(ctx);
      ctx.ui = ui(ctx);
      ctx.container = map.getContainer();
      ctx.store = new Store(ctx);
      controlContainer = ctx.ui.addButtons();
      if (ctx.options.boxSelect) {
        ctx.boxZoomInitial = map.boxZoom.isEnabled();
        map.boxZoom.disable();
        map.dragPan.disable();
        map.dragPan.enable();
      }
      if (map.loaded()) {
        setup.connect();
      } else {
        map.on("load", setup.connect);
        mapLoadedInterval = setInterval(function() {
          if (map.loaded()) {
            setup.connect();
          }
        }, 16);
      }
      ctx.events.start();
      return controlContainer;
    },
    addLayers: function addLayers() {
      if (!ctx.map.getSource(sources.COLD)) {
        ctx.map.addSource(sources.COLD, {
          data: {
            type: geojsonTypes.FEATURE_COLLECTION,
            features: []
          },
          type: "geojson"
        });
      }
      if (!ctx.map.getSource(sources.HOT)) {
        ctx.map.addSource(sources.HOT, {
          data: {
            type: geojsonTypes.FEATURE_COLLECTION,
            features: []
          },
          type: "geojson"
        });
      }
      ctx.options.styles.forEach(function(style) {
        if (!ctx.map.getLayer(style.id)) {
          ctx.map.addLayer(style);
        }
      });
      ctx.store.setDirty(true);
      ctx.store.render();
    },
    // Check for layers and sources before attempting to remove
    // If user adds draw control and removes it before the map is loaded, layers and sources will be missing
    removeLayers: function removeLayers() {
      ctx.options.styles.forEach(function(style) {
        if (ctx.map.getLayer(style.id)) {
          ctx.map.removeLayer(style.id);
        }
      });
      if (ctx.map.getSource(sources.COLD)) {
        ctx.map.removeSource(sources.COLD);
      }
      if (ctx.map.getSource(sources.HOT)) {
        ctx.map.removeSource(sources.HOT);
      }
    }
  };
  ctx.setup = setup;
  return setup;
}
var theme = [
  {
    "id": "gl-draw-polygon-fill-inactive",
    "type": "fill",
    "filter": [
      "all",
      ["==", "active", "false"],
      ["==", "$type", "Polygon"],
      ["!=", "mode", "static"]
    ],
    "paint": {
      "fill-color": "#3bb2d0",
      "fill-outline-color": "#3bb2d0",
      "fill-opacity": 0.1
    }
  },
  {
    "id": "gl-draw-polygon-fill-active",
    "type": "fill",
    "filter": ["all", ["==", "active", "true"], ["==", "$type", "Polygon"]],
    "paint": {
      "fill-color": "#fbb03b",
      "fill-outline-color": "#fbb03b",
      "fill-opacity": 0.1
    }
  },
  {
    "id": "gl-draw-polygon-midpoint",
    "type": "circle",
    "filter": [
      "all",
      ["==", "$type", "Point"],
      ["==", "meta", "midpoint"]
    ],
    "paint": {
      "circle-radius": 3,
      "circle-color": "#fbb03b"
    }
  },
  {
    "id": "gl-draw-polygon-stroke-inactive",
    "type": "line",
    "filter": [
      "all",
      ["==", "active", "false"],
      ["==", "$type", "Polygon"],
      ["!=", "mode", "static"]
    ],
    "layout": {
      "line-cap": "round",
      "line-join": "round"
    },
    "paint": {
      "line-color": "#3bb2d0",
      "line-width": 2
    }
  },
  {
    "id": "gl-draw-polygon-stroke-active",
    "type": "line",
    "filter": ["all", ["==", "active", "true"], ["==", "$type", "Polygon"]],
    "layout": {
      "line-cap": "round",
      "line-join": "round"
    },
    "paint": {
      "line-color": "#fbb03b",
      "line-dasharray": [0.2, 2],
      "line-width": 2
    }
  },
  {
    "id": "gl-draw-line-inactive",
    "type": "line",
    "filter": [
      "all",
      ["==", "active", "false"],
      ["==", "$type", "LineString"],
      ["!=", "mode", "static"]
    ],
    "layout": {
      "line-cap": "round",
      "line-join": "round"
    },
    "paint": {
      "line-color": "#3bb2d0",
      "line-width": 2
    }
  },
  {
    "id": "gl-draw-line-active",
    "type": "line",
    "filter": [
      "all",
      ["==", "$type", "LineString"],
      ["==", "active", "true"]
    ],
    "layout": {
      "line-cap": "round",
      "line-join": "round"
    },
    "paint": {
      "line-color": "#fbb03b",
      "line-dasharray": [0.2, 2],
      "line-width": 2
    }
  },
  {
    "id": "gl-draw-polygon-and-line-vertex-stroke-inactive",
    "type": "circle",
    "filter": [
      "all",
      ["==", "meta", "vertex"],
      ["==", "$type", "Point"],
      ["!=", "mode", "static"]
    ],
    "paint": {
      "circle-radius": 5,
      "circle-color": "#fff"
    }
  },
  {
    "id": "gl-draw-polygon-and-line-vertex-inactive",
    "type": "circle",
    "filter": [
      "all",
      ["==", "meta", "vertex"],
      ["==", "$type", "Point"],
      ["!=", "mode", "static"]
    ],
    "paint": {
      "circle-radius": 3,
      "circle-color": "#fbb03b"
    }
  },
  {
    "id": "gl-draw-point-point-stroke-inactive",
    "type": "circle",
    "filter": [
      "all",
      ["==", "active", "false"],
      ["==", "$type", "Point"],
      ["==", "meta", "feature"],
      ["!=", "mode", "static"]
    ],
    "paint": {
      "circle-radius": 5,
      "circle-opacity": 1,
      "circle-color": "#fff"
    }
  },
  {
    "id": "gl-draw-point-inactive",
    "type": "circle",
    "filter": [
      "all",
      ["==", "active", "false"],
      ["==", "$type", "Point"],
      ["==", "meta", "feature"],
      ["!=", "mode", "static"]
    ],
    "paint": {
      "circle-radius": 3,
      "circle-color": "#3bb2d0"
    }
  },
  {
    "id": "gl-draw-point-stroke-active",
    "type": "circle",
    "filter": [
      "all",
      ["==", "$type", "Point"],
      ["==", "active", "true"],
      ["!=", "meta", "midpoint"]
    ],
    "paint": {
      "circle-radius": 7,
      "circle-color": "#fff"
    }
  },
  {
    "id": "gl-draw-point-active",
    "type": "circle",
    "filter": [
      "all",
      ["==", "$type", "Point"],
      ["!=", "meta", "midpoint"],
      ["==", "active", "true"]
    ],
    "paint": {
      "circle-radius": 5,
      "circle-color": "#fbb03b"
    }
  },
  {
    "id": "gl-draw-polygon-fill-static",
    "type": "fill",
    "filter": ["all", ["==", "mode", "static"], ["==", "$type", "Polygon"]],
    "paint": {
      "fill-color": "#404040",
      "fill-outline-color": "#404040",
      "fill-opacity": 0.1
    }
  },
  {
    "id": "gl-draw-polygon-stroke-static",
    "type": "line",
    "filter": ["all", ["==", "mode", "static"], ["==", "$type", "Polygon"]],
    "layout": {
      "line-cap": "round",
      "line-join": "round"
    },
    "paint": {
      "line-color": "#404040",
      "line-width": 2
    }
  },
  {
    "id": "gl-draw-line-static",
    "type": "line",
    "filter": ["all", ["==", "mode", "static"], ["==", "$type", "LineString"]],
    "layout": {
      "line-cap": "round",
      "line-join": "round"
    },
    "paint": {
      "line-color": "#404040",
      "line-width": 2
    }
  },
  {
    "id": "gl-draw-point-static",
    "type": "circle",
    "filter": ["all", ["==", "mode", "static"], ["==", "$type", "Point"]],
    "paint": {
      "circle-radius": 5,
      "circle-color": "#404040"
    }
  }
];
function isOfMetaType(type) {
  return function(e2) {
    var featureTarget = e2.featureTarget;
    if (!featureTarget) {
      return false;
    }
    if (!featureTarget.properties) {
      return false;
    }
    return featureTarget.properties.meta === type;
  };
}
function isShiftMousedown(e2) {
  if (!e2.originalEvent) {
    return false;
  }
  if (!e2.originalEvent.shiftKey) {
    return false;
  }
  return e2.originalEvent.button === 0;
}
function isActiveFeature(e2) {
  if (!e2.featureTarget) {
    return false;
  }
  if (!e2.featureTarget.properties) {
    return false;
  }
  return e2.featureTarget.properties.active === activeStates.ACTIVE && e2.featureTarget.properties.meta === meta.FEATURE;
}
function isInactiveFeature(e2) {
  if (!e2.featureTarget) {
    return false;
  }
  if (!e2.featureTarget.properties) {
    return false;
  }
  return e2.featureTarget.properties.active === activeStates.INACTIVE && e2.featureTarget.properties.meta === meta.FEATURE;
}
function noTarget(e2) {
  return e2.featureTarget === void 0;
}
function isFeature(e2) {
  if (!e2.featureTarget) {
    return false;
  }
  if (!e2.featureTarget.properties) {
    return false;
  }
  return e2.featureTarget.properties.meta === meta.FEATURE;
}
function isVertex$2(e2) {
  var featureTarget = e2.featureTarget;
  if (!featureTarget) {
    return false;
  }
  if (!featureTarget.properties) {
    return false;
  }
  return featureTarget.properties.meta === meta.VERTEX;
}
function isShiftDown(e2) {
  if (!e2.originalEvent) {
    return false;
  }
  return e2.originalEvent.shiftKey === true;
}
function isEscapeKey(e2) {
  return e2.keyCode === 27;
}
function isEnterKey(e2) {
  return e2.keyCode === 13;
}
function isTrue() {
  return true;
}
var common_selectors = Object.freeze({
  __proto__: null,
  isOfMetaType,
  isShiftMousedown,
  isActiveFeature,
  isInactiveFeature,
  noTarget,
  isFeature,
  isVertex: isVertex$2,
  isShiftDown,
  isEscapeKey,
  isEnterKey,
  isTrue
});
var pointGeometry = Point;
function Point(x, y) {
  this.x = x;
  this.y = y;
}
Point.prototype = {
  /**
   * Clone this point, returning a new point that can be modified
   * without affecting the old one.
   * @return {Point} the clone
   */
  clone: function() {
    return new Point(this.x, this.y);
  },
  /**
   * Add this point's x & y coordinates to another point,
   * yielding a new point.
   * @param {Point} p the other point
   * @return {Point} output point
   */
  add: function(p) {
    return this.clone()._add(p);
  },
  /**
   * Subtract this point's x & y coordinates to from point,
   * yielding a new point.
   * @param {Point} p the other point
   * @return {Point} output point
   */
  sub: function(p) {
    return this.clone()._sub(p);
  },
  /**
   * Multiply this point's x & y coordinates by point,
   * yielding a new point.
   * @param {Point} p the other point
   * @return {Point} output point
   */
  multByPoint: function(p) {
    return this.clone()._multByPoint(p);
  },
  /**
   * Divide this point's x & y coordinates by point,
   * yielding a new point.
   * @param {Point} p the other point
   * @return {Point} output point
   */
  divByPoint: function(p) {
    return this.clone()._divByPoint(p);
  },
  /**
   * Multiply this point's x & y coordinates by a factor,
   * yielding a new point.
   * @param {Point} k factor
   * @return {Point} output point
   */
  mult: function(k) {
    return this.clone()._mult(k);
  },
  /**
   * Divide this point's x & y coordinates by a factor,
   * yielding a new point.
   * @param {Point} k factor
   * @return {Point} output point
   */
  div: function(k) {
    return this.clone()._div(k);
  },
  /**
   * Rotate this point around the 0, 0 origin by an angle a,
   * given in radians
   * @param {Number} a angle to rotate around, in radians
   * @return {Point} output point
   */
  rotate: function(a) {
    return this.clone()._rotate(a);
  },
  /**
   * Rotate this point around p point by an angle a,
   * given in radians
   * @param {Number} a angle to rotate around, in radians
   * @param {Point} p Point to rotate around
   * @return {Point} output point
   */
  rotateAround: function(a, p) {
    return this.clone()._rotateAround(a, p);
  },
  /**
   * Multiply this point by a 4x1 transformation matrix
   * @param {Array<Number>} m transformation matrix
   * @return {Point} output point
   */
  matMult: function(m) {
    return this.clone()._matMult(m);
  },
  /**
   * Calculate this point but as a unit vector from 0, 0, meaning
   * that the distance from the resulting point to the 0, 0
   * coordinate will be equal to 1 and the angle from the resulting
   * point to the 0, 0 coordinate will be the same as before.
   * @return {Point} unit vector point
   */
  unit: function() {
    return this.clone()._unit();
  },
  /**
   * Compute a perpendicular point, where the new y coordinate
   * is the old x coordinate and the new x coordinate is the old y
   * coordinate multiplied by -1
   * @return {Point} perpendicular point
   */
  perp: function() {
    return this.clone()._perp();
  },
  /**
   * Return a version of this point with the x & y coordinates
   * rounded to integers.
   * @return {Point} rounded point
   */
  round: function() {
    return this.clone()._round();
  },
  /**
   * Return the magitude of this point: this is the Euclidean
   * distance from the 0, 0 coordinate to this point's x and y
   * coordinates.
   * @return {Number} magnitude
   */
  mag: function() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  },
  /**
   * Judge whether this point is equal to another point, returning
   * true or false.
   * @param {Point} other the other point
   * @return {boolean} whether the points are equal
   */
  equals: function(other) {
    return this.x === other.x && this.y === other.y;
  },
  /**
   * Calculate the distance from this point to another point
   * @param {Point} p the other point
   * @return {Number} distance
   */
  dist: function(p) {
    return Math.sqrt(this.distSqr(p));
  },
  /**
   * Calculate the distance from this point to another point,
   * without the square root step. Useful if you're comparing
   * relative distances.
   * @param {Point} p the other point
   * @return {Number} distance
   */
  distSqr: function(p) {
    var dx = p.x - this.x, dy = p.y - this.y;
    return dx * dx + dy * dy;
  },
  /**
   * Get the angle from the 0, 0 coordinate to this point, in radians
   * coordinates.
   * @return {Number} angle
   */
  angle: function() {
    return Math.atan2(this.y, this.x);
  },
  /**
   * Get the angle from this point to another point, in radians
   * @param {Point} b the other point
   * @return {Number} angle
   */
  angleTo: function(b) {
    return Math.atan2(this.y - b.y, this.x - b.x);
  },
  /**
   * Get the angle between this point and another point, in radians
   * @param {Point} b the other point
   * @return {Number} angle
   */
  angleWith: function(b) {
    return this.angleWithSep(b.x, b.y);
  },
  /*
   * Find the angle of the two vectors, solving the formula for
   * the cross product a x b = |a||b|sin(θ) for θ.
   * @param {Number} x the x-coordinate
   * @param {Number} y the y-coordinate
   * @return {Number} the angle in radians
   */
  angleWithSep: function(x, y) {
    return Math.atan2(
      this.x * y - this.y * x,
      this.x * x + this.y * y
    );
  },
  _matMult: function(m) {
    var x = m[0] * this.x + m[1] * this.y, y = m[2] * this.x + m[3] * this.y;
    this.x = x;
    this.y = y;
    return this;
  },
  _add: function(p) {
    this.x += p.x;
    this.y += p.y;
    return this;
  },
  _sub: function(p) {
    this.x -= p.x;
    this.y -= p.y;
    return this;
  },
  _mult: function(k) {
    this.x *= k;
    this.y *= k;
    return this;
  },
  _div: function(k) {
    this.x /= k;
    this.y /= k;
    return this;
  },
  _multByPoint: function(p) {
    this.x *= p.x;
    this.y *= p.y;
    return this;
  },
  _divByPoint: function(p) {
    this.x /= p.x;
    this.y /= p.y;
    return this;
  },
  _unit: function() {
    this._div(this.mag());
    return this;
  },
  _perp: function() {
    var y = this.y;
    this.y = this.x;
    this.x = -y;
    return this;
  },
  _rotate: function(angle) {
    var cos = Math.cos(angle), sin = Math.sin(angle), x = cos * this.x - sin * this.y, y = sin * this.x + cos * this.y;
    this.x = x;
    this.y = y;
    return this;
  },
  _rotateAround: function(angle, p) {
    var cos = Math.cos(angle), sin = Math.sin(angle), x = p.x + cos * (this.x - p.x) - sin * (this.y - p.y), y = p.y + sin * (this.x - p.x) + cos * (this.y - p.y);
    this.x = x;
    this.y = y;
    return this;
  },
  _round: function() {
    this.x = Math.round(this.x);
    this.y = Math.round(this.y);
    return this;
  }
};
Point.convert = function(a) {
  if (a instanceof Point) {
    return a;
  }
  if (Array.isArray(a)) {
    return new Point(a[0], a[1]);
  }
  return a;
};
var Point$1 = getDefaultExportFromCjs(pointGeometry);
function mouseEventPoint(mouseEvent, container) {
  var rect = container.getBoundingClientRect();
  return new Point$1(
    mouseEvent.clientX - rect.left - (container.clientLeft || 0),
    mouseEvent.clientY - rect.top - (container.clientTop || 0)
  );
}
function createVertex(parentId, coordinates, path, selected) {
  return {
    type: geojsonTypes.FEATURE,
    properties: {
      meta: meta.VERTEX,
      parent: parentId,
      coord_path: path,
      active: selected ? activeStates.ACTIVE : activeStates.INACTIVE
    },
    geometry: {
      type: geojsonTypes.POINT,
      coordinates
    }
  };
}
function createMidpoint(parent, startVertex, endVertex) {
  var startCoord = startVertex.geometry.coordinates;
  var endCoord = endVertex.geometry.coordinates;
  if (startCoord[1] > LAT_RENDERED_MAX$1 || startCoord[1] < LAT_RENDERED_MIN$1 || endCoord[1] > LAT_RENDERED_MAX$1 || endCoord[1] < LAT_RENDERED_MIN$1) {
    return null;
  }
  var mid = {
    lng: (startCoord[0] + endCoord[0]) / 2,
    lat: (startCoord[1] + endCoord[1]) / 2
  };
  return {
    type: geojsonTypes.FEATURE,
    properties: {
      meta: meta.MIDPOINT,
      parent,
      lng: mid.lng,
      lat: mid.lat,
      coord_path: endVertex.properties.coord_path
    },
    geometry: {
      type: geojsonTypes.POINT,
      coordinates: [mid.lng, mid.lat]
    }
  };
}
function createSupplementaryPoints(geojson, options, basePath) {
  if (options === void 0) options = {};
  if (basePath === void 0) basePath = null;
  var ref = geojson.geometry;
  var type = ref.type;
  var coordinates = ref.coordinates;
  var featureId = geojson.properties && geojson.properties.id;
  var supplementaryPoints = [];
  if (type === geojsonTypes.POINT) {
    supplementaryPoints.push(createVertex(featureId, coordinates, basePath, isSelectedPath(basePath)));
  } else if (type === geojsonTypes.POLYGON) {
    coordinates.forEach(function(line, lineIndex) {
      processLine(line, basePath !== null ? basePath + "." + lineIndex : String(lineIndex));
    });
  } else if (type === geojsonTypes.LINE_STRING) {
    processLine(coordinates, basePath);
  } else if (type.indexOf(geojsonTypes.MULTI_PREFIX) === 0) {
    processMultiGeometry();
  }
  function processLine(line, lineBasePath) {
    var firstPointString = "";
    var lastVertex = null;
    line.forEach(function(point2, pointIndex) {
      var pointPath = lineBasePath !== void 0 && lineBasePath !== null ? lineBasePath + "." + pointIndex : String(pointIndex);
      var vertex = createVertex(featureId, point2, pointPath, isSelectedPath(pointPath));
      if (options.midpoints && lastVertex) {
        var midpoint2 = createMidpoint(featureId, lastVertex, vertex);
        if (midpoint2) {
          supplementaryPoints.push(midpoint2);
        }
      }
      lastVertex = vertex;
      var stringifiedPoint = JSON.stringify(point2);
      if (firstPointString !== stringifiedPoint) {
        supplementaryPoints.push(vertex);
      }
      if (pointIndex === 0) {
        firstPointString = stringifiedPoint;
      }
    });
  }
  function isSelectedPath(path) {
    if (!options.selectedPaths) {
      return false;
    }
    return options.selectedPaths.indexOf(path) !== -1;
  }
  function processMultiGeometry() {
    var subType = type.replace(geojsonTypes.MULTI_PREFIX, "");
    coordinates.forEach(function(subCoordinates, index) {
      var subFeature = {
        type: geojsonTypes.FEATURE,
        properties: geojson.properties,
        geometry: {
          type: subType,
          coordinates: subCoordinates
        }
      };
      supplementaryPoints = supplementaryPoints.concat(createSupplementaryPoints(subFeature, options, index));
    });
  }
  return supplementaryPoints;
}
var doubleClickZoom = {
  enable: function enable(ctx) {
    setTimeout(function() {
      if (!ctx.map || !ctx.map.doubleClickZoom || !ctx._ctx || !ctx._ctx.store || !ctx._ctx.store.getInitialConfigValue) {
        return;
      }
      if (!ctx._ctx.store.getInitialConfigValue("doubleClickZoom")) {
        return;
      }
      ctx.map.doubleClickZoom.enable();
    }, 0);
  },
  disable: function disable(ctx) {
    setTimeout(function() {
      if (!ctx.map || !ctx.map.doubleClickZoom) {
        return;
      }
      ctx.map.doubleClickZoom.disable();
    }, 0);
  }
};
var geojsonExtent = { exports: {} };
var geojsonNormalize$1 = normalize;
var types = {
  Point: "geometry",
  MultiPoint: "geometry",
  LineString: "geometry",
  MultiLineString: "geometry",
  Polygon: "geometry",
  MultiPolygon: "geometry",
  GeometryCollection: "geometry",
  Feature: "feature",
  FeatureCollection: "featurecollection"
};
function normalize(gj) {
  if (!gj || !gj.type) {
    return null;
  }
  var type = types[gj.type];
  if (!type) {
    return null;
  }
  if (type === "geometry") {
    return {
      type: "FeatureCollection",
      features: [{
        type: "Feature",
        properties: {},
        geometry: gj
      }]
    };
  } else if (type === "feature") {
    return {
      type: "FeatureCollection",
      features: [gj]
    };
  } else if (type === "featurecollection") {
    return gj;
  }
}
var normalize$1 = getDefaultExportFromCjs(geojsonNormalize$1);
function e(t) {
  switch (t && t.type || null) {
    case "FeatureCollection":
      return t.features = t.features.reduce(function(t2, r) {
        return t2.concat(e(r));
      }, []), t;
    case "Feature":
      return t.geometry ? e(t.geometry).map(function(e2) {
        var r = { type: "Feature", properties: JSON.parse(JSON.stringify(t.properties)), geometry: e2 };
        return void 0 !== t.id && (r.id = t.id), r;
      }) : [t];
    case "MultiPoint":
      return t.coordinates.map(function(e2) {
        return { type: "Point", coordinates: e2 };
      });
    case "MultiPolygon":
      return t.coordinates.map(function(e2) {
        return { type: "Polygon", coordinates: e2 };
      });
    case "MultiLineString":
      return t.coordinates.map(function(e2) {
        return { type: "LineString", coordinates: e2 };
      });
    case "GeometryCollection":
      return t.geometries.map(e).reduce(function(e2, t2) {
        return e2.concat(t2);
      }, []);
    case "Point":
    case "Polygon":
    case "LineString":
      return [t];
  }
}
var index_es = Object.freeze({
  __proto__: null,
  "default": e
});
var require$$1 = getAugmentedNamespace(index_es);
var flatten$1 = function flatten(list) {
  return _flatten(list);
  function _flatten(list2) {
    if (Array.isArray(list2) && list2.length && typeof list2[0] === "number") {
      return [list2];
    }
    return list2.reduce(function(acc, item) {
      if (Array.isArray(item) && Array.isArray(item[0])) {
        return acc.concat(_flatten(item));
      } else {
        acc.push(item);
        return acc;
      }
    }, []);
  }
};
var geojsonNormalize = geojsonNormalize$1;
var geojsonFlatten = require$$1;
var flatten2 = flatten$1;
if (!(geojsonFlatten instanceof Function)) {
  geojsonFlatten = geojsonFlatten.default;
}
var geojsonCoords$1 = function(_) {
  if (!_) {
    return [];
  }
  var normalized = geojsonFlatten(geojsonNormalize(_)), coordinates = [];
  normalized.features.forEach(function(feature2) {
    if (!feature2.geometry) {
      return;
    }
    coordinates = coordinates.concat(flatten2(feature2.geometry.coordinates));
  });
  return coordinates;
};
var traverse$2 = { exports: {} };
var traverse$1 = traverse$2.exports = function(obj) {
  return new Traverse(obj);
};
function Traverse(obj) {
  this.value = obj;
}
Traverse.prototype.get = function(ps) {
  var node = this.value;
  for (var i = 0; i < ps.length; i++) {
    var key = ps[i];
    if (!node || !hasOwnProperty.call(node, key)) {
      node = void 0;
      break;
    }
    node = node[key];
  }
  return node;
};
Traverse.prototype.has = function(ps) {
  var node = this.value;
  for (var i = 0; i < ps.length; i++) {
    var key = ps[i];
    if (!node || !hasOwnProperty.call(node, key)) {
      return false;
    }
    node = node[key];
  }
  return true;
};
Traverse.prototype.set = function(ps, value) {
  var node = this.value;
  for (var i = 0; i < ps.length - 1; i++) {
    var key = ps[i];
    if (!hasOwnProperty.call(node, key)) {
      node[key] = {};
    }
    node = node[key];
  }
  node[ps[i]] = value;
  return value;
};
Traverse.prototype.map = function(cb) {
  return walk(this.value, cb, true);
};
Traverse.prototype.forEach = function(cb) {
  this.value = walk(this.value, cb, false);
  return this.value;
};
Traverse.prototype.reduce = function(cb, init) {
  var skip = arguments.length === 1;
  var acc = skip ? this.value : init;
  this.forEach(function(x) {
    if (!this.isRoot || !skip) {
      acc = cb.call(this, acc, x);
    }
  });
  return acc;
};
Traverse.prototype.paths = function() {
  var acc = [];
  this.forEach(function(x) {
    acc.push(this.path);
  });
  return acc;
};
Traverse.prototype.nodes = function() {
  var acc = [];
  this.forEach(function(x) {
    acc.push(this.node);
  });
  return acc;
};
Traverse.prototype.clone = function() {
  var parents = [], nodes = [];
  return function clone2(src) {
    for (var i = 0; i < parents.length; i++) {
      if (parents[i] === src) {
        return nodes[i];
      }
    }
    if (typeof src === "object" && src !== null) {
      var dst = copy(src);
      parents.push(src);
      nodes.push(dst);
      forEach(objectKeys(src), function(key) {
        dst[key] = clone2(src[key]);
      });
      parents.pop();
      nodes.pop();
      return dst;
    } else {
      return src;
    }
  }(this.value);
};
function walk(root, cb, immutable2) {
  var path = [];
  var parents = [];
  var alive = true;
  return function walker(node_) {
    var node = immutable2 ? copy(node_) : node_;
    var modifiers = {};
    var keepGoing = true;
    var state = {
      node,
      node_,
      path: [].concat(path),
      parent: parents[parents.length - 1],
      parents,
      key: path.slice(-1)[0],
      isRoot: path.length === 0,
      level: path.length,
      circular: null,
      update: function(x, stopHere) {
        if (!state.isRoot) {
          state.parent.node[state.key] = x;
        }
        state.node = x;
        if (stopHere) {
          keepGoing = false;
        }
      },
      "delete": function(stopHere) {
        delete state.parent.node[state.key];
        if (stopHere) {
          keepGoing = false;
        }
      },
      remove: function(stopHere) {
        if (isArray(state.parent.node)) {
          state.parent.node.splice(state.key, 1);
        } else {
          delete state.parent.node[state.key];
        }
        if (stopHere) {
          keepGoing = false;
        }
      },
      keys: null,
      before: function(f) {
        modifiers.before = f;
      },
      after: function(f) {
        modifiers.after = f;
      },
      pre: function(f) {
        modifiers.pre = f;
      },
      post: function(f) {
        modifiers.post = f;
      },
      stop: function() {
        alive = false;
      },
      block: function() {
        keepGoing = false;
      }
    };
    if (!alive) {
      return state;
    }
    function updateState() {
      if (typeof state.node === "object" && state.node !== null) {
        if (!state.keys || state.node_ !== state.node) {
          state.keys = objectKeys(state.node);
        }
        state.isLeaf = state.keys.length == 0;
        for (var i = 0; i < parents.length; i++) {
          if (parents[i].node_ === node_) {
            state.circular = parents[i];
            break;
          }
        }
      } else {
        state.isLeaf = true;
        state.keys = null;
      }
      state.notLeaf = !state.isLeaf;
      state.notRoot = !state.isRoot;
    }
    updateState();
    var ret = cb.call(state, state.node);
    if (ret !== void 0 && state.update) {
      state.update(ret);
    }
    if (modifiers.before) {
      modifiers.before.call(state, state.node);
    }
    if (!keepGoing) {
      return state;
    }
    if (typeof state.node == "object" && state.node !== null && !state.circular) {
      parents.push(state);
      updateState();
      forEach(state.keys, function(key, i) {
        path.push(key);
        if (modifiers.pre) {
          modifiers.pre.call(state, state.node[key], key);
        }
        var child = walker(state.node[key]);
        if (immutable2 && hasOwnProperty.call(state.node, key)) {
          state.node[key] = child.node;
        }
        child.isLast = i == state.keys.length - 1;
        child.isFirst = i == 0;
        if (modifiers.post) {
          modifiers.post.call(state, child);
        }
        path.pop();
      });
      parents.pop();
    }
    if (modifiers.after) {
      modifiers.after.call(state, state.node);
    }
    return state;
  }(root).node;
}
function copy(src) {
  if (typeof src === "object" && src !== null) {
    var dst;
    if (isArray(src)) {
      dst = [];
    } else if (isDate(src)) {
      dst = new Date(src.getTime ? src.getTime() : src);
    } else if (isRegExp(src)) {
      dst = new RegExp(src);
    } else if (isError(src)) {
      dst = { message: src.message };
    } else if (isBoolean(src)) {
      dst = new Boolean(src);
    } else if (isNumber$6(src)) {
      dst = new Number(src);
    } else if (isString(src)) {
      dst = new String(src);
    } else if (Object.create && Object.getPrototypeOf) {
      dst = Object.create(Object.getPrototypeOf(src));
    } else if (src.constructor === Object) {
      dst = {};
    } else {
      var proto = src.constructor && src.constructor.prototype || src.__proto__ || {};
      var T = function() {
      };
      T.prototype = proto;
      dst = new T();
    }
    forEach(objectKeys(src), function(key) {
      dst[key] = src[key];
    });
    return dst;
  } else {
    return src;
  }
}
var objectKeys = Object.keys || function keys(obj) {
  var res = [];
  for (var key in obj) {
    res.push(key);
  }
  return res;
};
function toS(obj) {
  return Object.prototype.toString.call(obj);
}
function isDate(obj) {
  return toS(obj) === "[object Date]";
}
function isRegExp(obj) {
  return toS(obj) === "[object RegExp]";
}
function isError(obj) {
  return toS(obj) === "[object Error]";
}
function isBoolean(obj) {
  return toS(obj) === "[object Boolean]";
}
function isNumber$6(obj) {
  return toS(obj) === "[object Number]";
}
function isString(obj) {
  return toS(obj) === "[object String]";
}
var isArray = Array.isArray || function isArray2(xs) {
  return Object.prototype.toString.call(xs) === "[object Array]";
};
var forEach = function(xs, fn) {
  if (xs.forEach) {
    return xs.forEach(fn);
  } else {
    for (var i = 0; i < xs.length; i++) {
      fn(xs[i], i, xs);
    }
  }
};
forEach(objectKeys(Traverse.prototype), function(key) {
  traverse$1[key] = function(obj) {
    var args = [].slice.call(arguments, 1);
    var t = new Traverse(obj);
    return t[key].apply(t, args);
  };
});
var hasOwnProperty = Object.hasOwnProperty || function(obj, key) {
  return key in obj;
};
var traverseExports = traverse$2.exports;
var extent$2 = Extent;
function Extent(bbox2) {
  if (!(this instanceof Extent)) {
    return new Extent(bbox2);
  }
  this._bbox = bbox2 || [Infinity, Infinity, -Infinity, -Infinity];
  this._valid = !!bbox2;
}
Extent.prototype.include = function(ll) {
  this._valid = true;
  this._bbox[0] = Math.min(this._bbox[0], ll[0]);
  this._bbox[1] = Math.min(this._bbox[1], ll[1]);
  this._bbox[2] = Math.max(this._bbox[2], ll[0]);
  this._bbox[3] = Math.max(this._bbox[3], ll[1]);
  return this;
};
Extent.prototype.equals = function(_) {
  var other;
  if (_ instanceof Extent) {
    other = _.bbox();
  } else {
    other = _;
  }
  return this._bbox[0] == other[0] && this._bbox[1] == other[1] && this._bbox[2] == other[2] && this._bbox[3] == other[3];
};
Extent.prototype.center = function(_) {
  if (!this._valid) {
    return null;
  }
  return [
    (this._bbox[0] + this._bbox[2]) / 2,
    (this._bbox[1] + this._bbox[3]) / 2
  ];
};
Extent.prototype.union = function(_) {
  this._valid = true;
  var other;
  if (_ instanceof Extent) {
    other = _.bbox();
  } else {
    other = _;
  }
  this._bbox[0] = Math.min(this._bbox[0], other[0]);
  this._bbox[1] = Math.min(this._bbox[1], other[1]);
  this._bbox[2] = Math.max(this._bbox[2], other[2]);
  this._bbox[3] = Math.max(this._bbox[3], other[3]);
  return this;
};
Extent.prototype.bbox = function() {
  if (!this._valid) {
    return null;
  }
  return this._bbox;
};
Extent.prototype.contains = function(ll) {
  if (!ll) {
    return this._fastContains();
  }
  if (!this._valid) {
    return null;
  }
  var lon = ll[0], lat = ll[1];
  return this._bbox[0] <= lon && this._bbox[1] <= lat && this._bbox[2] >= lon && this._bbox[3] >= lat;
};
Extent.prototype.intersect = function(_) {
  if (!this._valid) {
    return null;
  }
  var other;
  if (_ instanceof Extent) {
    other = _.bbox();
  } else {
    other = _;
  }
  return !(this._bbox[0] > other[2] || this._bbox[2] < other[0] || this._bbox[3] < other[1] || this._bbox[1] > other[3]);
};
Extent.prototype._fastContains = function() {
  if (!this._valid) {
    return new Function("return null;");
  }
  var body = "return " + this._bbox[0] + "<= ll[0] &&" + this._bbox[1] + "<= ll[1] &&" + this._bbox[2] + ">= ll[0] &&" + this._bbox[3] + ">= ll[1]";
  return new Function("ll", body);
};
Extent.prototype.polygon = function() {
  if (!this._valid) {
    return null;
  }
  return {
    type: "Polygon",
    coordinates: [
      [
        // W, S
        [this._bbox[0], this._bbox[1]],
        // E, S
        [this._bbox[2], this._bbox[1]],
        // E, N
        [this._bbox[2], this._bbox[3]],
        // W, N
        [this._bbox[0], this._bbox[3]],
        // W, S
        [this._bbox[0], this._bbox[1]]
      ]
    ]
  };
};
var geojsonCoords = geojsonCoords$1;
var traverse = traverseExports;
var extent = extent$2;
var geojsonTypesByDataAttributes = {
  features: ["FeatureCollection"],
  coordinates: ["Point", "MultiPoint", "LineString", "MultiLineString", "Polygon", "MultiPolygon"],
  geometry: ["Feature"],
  geometries: ["GeometryCollection"]
};
var dataAttributes = Object.keys(geojsonTypesByDataAttributes);
geojsonExtent.exports = function(_) {
  return getExtent(_).bbox();
};
geojsonExtent.exports.polygon = function(_) {
  return getExtent(_).polygon();
};
geojsonExtent.exports.bboxify = function(_) {
  return traverse(_).map(function(value) {
    if (!value) {
      return;
    }
    var isValid = dataAttributes.some(function(attribute) {
      if (value[attribute]) {
        return geojsonTypesByDataAttributes[attribute].indexOf(value.type) !== -1;
      }
      return false;
    });
    if (isValid) {
      value.bbox = getExtent(value).bbox();
      this.update(value);
    }
  });
};
function getExtent(_) {
  var ext = extent(), coords = geojsonCoords(_);
  for (var i = 0; i < coords.length; i++) {
    ext.include(coords[i]);
  }
  return ext;
}
var geojsonExtentExports = geojsonExtent.exports;
var extent$1 = getDefaultExportFromCjs(geojsonExtentExports);
var LAT_MIN = LAT_MIN$1;
var LAT_MAX = LAT_MAX$1;
var LAT_RENDERED_MIN = LAT_RENDERED_MIN$1;
var LAT_RENDERED_MAX = LAT_RENDERED_MAX$1;
var LNG_MIN = LNG_MIN$1;
var LNG_MAX = LNG_MAX$1;
function constrainFeatureMovement(geojsonFeatures, delta) {
  var northInnerEdge = LAT_MIN;
  var southInnerEdge = LAT_MAX;
  var northOuterEdge = LAT_MIN;
  var southOuterEdge = LAT_MAX;
  var westEdge = LNG_MAX;
  var eastEdge = LNG_MIN;
  geojsonFeatures.forEach(function(feature2) {
    var bounds = extent$1(feature2);
    var featureSouthEdge = bounds[1];
    var featureNorthEdge = bounds[3];
    var featureWestEdge = bounds[0];
    var featureEastEdge = bounds[2];
    if (featureSouthEdge > northInnerEdge) {
      northInnerEdge = featureSouthEdge;
    }
    if (featureNorthEdge < southInnerEdge) {
      southInnerEdge = featureNorthEdge;
    }
    if (featureNorthEdge > northOuterEdge) {
      northOuterEdge = featureNorthEdge;
    }
    if (featureSouthEdge < southOuterEdge) {
      southOuterEdge = featureSouthEdge;
    }
    if (featureWestEdge < westEdge) {
      westEdge = featureWestEdge;
    }
    if (featureEastEdge > eastEdge) {
      eastEdge = featureEastEdge;
    }
  });
  var constrainedDelta = delta;
  if (northInnerEdge + constrainedDelta.lat > LAT_RENDERED_MAX) {
    constrainedDelta.lat = LAT_RENDERED_MAX - northInnerEdge;
  }
  if (northOuterEdge + constrainedDelta.lat > LAT_MAX) {
    constrainedDelta.lat = LAT_MAX - northOuterEdge;
  }
  if (southInnerEdge + constrainedDelta.lat < LAT_RENDERED_MIN) {
    constrainedDelta.lat = LAT_RENDERED_MIN - southInnerEdge;
  }
  if (southOuterEdge + constrainedDelta.lat < LAT_MIN) {
    constrainedDelta.lat = LAT_MIN - southOuterEdge;
  }
  if (westEdge + constrainedDelta.lng <= LNG_MIN) {
    constrainedDelta.lng += Math.ceil(Math.abs(constrainedDelta.lng) / 360) * 360;
  }
  if (eastEdge + constrainedDelta.lng >= LNG_MAX) {
    constrainedDelta.lng -= Math.ceil(Math.abs(constrainedDelta.lng) / 360) * 360;
  }
  return constrainedDelta;
}
function moveFeatures(features, delta) {
  var constrainedDelta = constrainFeatureMovement(features.map(function(feature2) {
    return feature2.toGeoJSON();
  }), delta);
  features.forEach(function(feature2) {
    var currentCoordinates = feature2.getCoordinates();
    var moveCoordinate = function(coord) {
      var point2 = {
        lng: coord[0] + constrainedDelta.lng,
        lat: coord[1] + constrainedDelta.lat
      };
      return [point2.lng, point2.lat];
    };
    var moveRing = function(ring) {
      return ring.map(function(coord) {
        return moveCoordinate(coord);
      });
    };
    var moveMultiPolygon = function(multi) {
      return multi.map(function(ring) {
        return moveRing(ring);
      });
    };
    var nextCoordinates;
    if (feature2.type === geojsonTypes.POINT) {
      nextCoordinates = moveCoordinate(currentCoordinates);
    } else if (feature2.type === geojsonTypes.LINE_STRING || feature2.type === geojsonTypes.MULTI_POINT) {
      nextCoordinates = currentCoordinates.map(moveCoordinate);
    } else if (feature2.type === geojsonTypes.POLYGON || feature2.type === geojsonTypes.MULTI_LINE_STRING) {
      nextCoordinates = currentCoordinates.map(moveRing);
    } else if (feature2.type === geojsonTypes.MULTI_POLYGON) {
      nextCoordinates = currentCoordinates.map(moveMultiPolygon);
    }
    feature2.incomingCoords(nextCoordinates);
  });
}
var SimpleSelect = {};
SimpleSelect.onSetup = function(opts) {
  var this$1$1 = this;
  var state = {
    dragMoveLocation: null,
    boxSelectStartLocation: null,
    boxSelectElement: void 0,
    boxSelecting: false,
    canBoxSelect: false,
    dragMoving: false,
    canDragMove: false,
    initiallySelectedFeatureIds: opts.featureIds || []
  };
  this.setSelected(state.initiallySelectedFeatureIds.filter(function(id) {
    return this$1$1.getFeature(id) !== void 0;
  }));
  this.fireActionable();
  this.setActionableState({
    combineFeatures: true,
    uncombineFeatures: true,
    trash: true
  });
  return state;
};
SimpleSelect.fireUpdate = function() {
  this.map.fire(events$1.UPDATE, {
    action: updateActions.MOVE,
    features: this.getSelected().map(function(f) {
      return f.toGeoJSON();
    })
  });
};
SimpleSelect.fireActionable = function() {
  var this$1$1 = this;
  var selectedFeatures = this.getSelected();
  var multiFeatures = selectedFeatures.filter(
    function(feature2) {
      return this$1$1.isInstanceOf("MultiFeature", feature2);
    }
  );
  var combineFeatures = false;
  if (selectedFeatures.length > 1) {
    combineFeatures = true;
    var featureType = selectedFeatures[0].type.replace("Multi", "");
    selectedFeatures.forEach(function(feature2) {
      if (feature2.type.replace("Multi", "") !== featureType) {
        combineFeatures = false;
      }
    });
  }
  var uncombineFeatures = multiFeatures.length > 0;
  var trash = selectedFeatures.length > 0;
  this.setActionableState({
    combineFeatures,
    uncombineFeatures,
    trash
  });
};
SimpleSelect.getUniqueIds = function(allFeatures) {
  if (!allFeatures.length) {
    return [];
  }
  var ids = allFeatures.map(function(s) {
    return s.properties.id;
  }).filter(function(id) {
    return id !== void 0;
  }).reduce(function(memo, id) {
    memo.add(id);
    return memo;
  }, new StringSet());
  return ids.values();
};
SimpleSelect.stopExtendedInteractions = function(state) {
  if (state.boxSelectElement) {
    if (state.boxSelectElement.parentNode) {
      state.boxSelectElement.parentNode.removeChild(state.boxSelectElement);
    }
    state.boxSelectElement = null;
  }
  this.map.dragPan.enable();
  state.boxSelecting = false;
  state.canBoxSelect = false;
  state.dragMoving = false;
  state.canDragMove = false;
};
SimpleSelect.onStop = function() {
  doubleClickZoom.enable(this);
};
SimpleSelect.onMouseMove = function(state, e2) {
  var isFeature$1 = isFeature(e2);
  if (isFeature$1 && state.dragMoving) {
    this.fireUpdate();
  }
  this.stopExtendedInteractions(state);
  return true;
};
SimpleSelect.onMouseOut = function(state) {
  if (state.dragMoving) {
    return this.fireUpdate();
  }
  return true;
};
SimpleSelect.onTap = SimpleSelect.onClick = function(state, e2) {
  if (noTarget(e2)) {
    return this.clickAnywhere(state, e2);
  }
  if (isOfMetaType(meta.VERTEX)(e2)) {
    return this.clickOnVertex(state, e2);
  }
  if (isFeature(e2)) {
    return this.clickOnFeature(state, e2);
  }
};
SimpleSelect.clickAnywhere = function(state) {
  var this$1$1 = this;
  var wasSelected = this.getSelectedIds();
  if (wasSelected.length) {
    this.clearSelectedFeatures();
    wasSelected.forEach(function(id) {
      return this$1$1.doRender(id);
    });
  }
  doubleClickZoom.enable(this);
  this.stopExtendedInteractions(state);
};
SimpleSelect.clickOnVertex = function(state, e2) {
  this.changeMode(modes$1.DIRECT_SELECT, {
    featureId: e2.featureTarget.properties.parent,
    coordPath: e2.featureTarget.properties.coord_path,
    startPos: e2.lngLat
  });
  this.updateUIClasses({ mouse: cursors.MOVE });
};
SimpleSelect.startOnActiveFeature = function(state, e2) {
  this.stopExtendedInteractions(state);
  this.map.dragPan.disable();
  this.doRender(e2.featureTarget.properties.id);
  state.canDragMove = true;
  state.dragMoveLocation = e2.lngLat;
};
SimpleSelect.clickOnFeature = function(state, e2) {
  var this$1$1 = this;
  doubleClickZoom.disable(this);
  this.stopExtendedInteractions(state);
  var isShiftClick = isShiftDown(e2);
  var selectedFeatureIds = this.getSelectedIds();
  var featureId = e2.featureTarget.properties.id;
  var isFeatureSelected = this.isSelected(featureId);
  if (!isShiftClick && isFeatureSelected && this.getFeature(featureId).type !== geojsonTypes.POINT) {
    return this.changeMode(modes$1.DIRECT_SELECT, {
      featureId
    });
  }
  if (isFeatureSelected && isShiftClick) {
    this.deselect(featureId);
    this.updateUIClasses({ mouse: cursors.POINTER });
    if (selectedFeatureIds.length === 1) {
      doubleClickZoom.enable(this);
    }
  } else if (!isFeatureSelected && isShiftClick) {
    this.select(featureId);
    this.updateUIClasses({ mouse: cursors.MOVE });
  } else if (!isFeatureSelected && !isShiftClick) {
    selectedFeatureIds.forEach(function(id) {
      return this$1$1.doRender(id);
    });
    this.setSelected(featureId);
    this.updateUIClasses({ mouse: cursors.MOVE });
  }
  this.doRender(featureId);
};
SimpleSelect.onMouseDown = function(state, e2) {
  if (isActiveFeature(e2)) {
    return this.startOnActiveFeature(state, e2);
  }
  if (this.drawConfig.boxSelect && isShiftMousedown(e2)) {
    return this.startBoxSelect(state, e2);
  }
};
SimpleSelect.startBoxSelect = function(state, e2) {
  this.stopExtendedInteractions(state);
  this.map.dragPan.disable();
  state.boxSelectStartLocation = mouseEventPoint(e2.originalEvent, this.map.getContainer());
  state.canBoxSelect = true;
};
SimpleSelect.onTouchStart = function(state, e2) {
  if (isActiveFeature(e2)) {
    return this.startOnActiveFeature(state, e2);
  }
};
SimpleSelect.onDrag = function(state, e2) {
  if (state.canDragMove) {
    return this.dragMove(state, e2);
  }
  if (this.drawConfig.boxSelect && state.canBoxSelect) {
    return this.whileBoxSelect(state, e2);
  }
};
SimpleSelect.whileBoxSelect = function(state, e2) {
  state.boxSelecting = true;
  this.updateUIClasses({ mouse: cursors.ADD });
  if (!state.boxSelectElement) {
    state.boxSelectElement = document.createElement("div");
    state.boxSelectElement.classList.add(classes.BOX_SELECT);
    this.map.getContainer().appendChild(state.boxSelectElement);
  }
  var current = mouseEventPoint(e2.originalEvent, this.map.getContainer());
  var minX = Math.min(state.boxSelectStartLocation.x, current.x);
  var maxX = Math.max(state.boxSelectStartLocation.x, current.x);
  var minY = Math.min(state.boxSelectStartLocation.y, current.y);
  var maxY = Math.max(state.boxSelectStartLocation.y, current.y);
  var translateValue = "translate(" + minX + "px, " + minY + "px)";
  state.boxSelectElement.style.transform = translateValue;
  state.boxSelectElement.style.WebkitTransform = translateValue;
  state.boxSelectElement.style.width = maxX - minX + "px";
  state.boxSelectElement.style.height = maxY - minY + "px";
};
SimpleSelect.dragMove = function(state, e2) {
  state.dragMoving = true;
  e2.originalEvent.stopPropagation();
  var delta = {
    lng: e2.lngLat.lng - state.dragMoveLocation.lng,
    lat: e2.lngLat.lat - state.dragMoveLocation.lat
  };
  moveFeatures(this.getSelected(), delta);
  state.dragMoveLocation = e2.lngLat;
};
SimpleSelect.onTouchEnd = SimpleSelect.onMouseUp = function(state, e2) {
  var this$1$1 = this;
  if (state.dragMoving) {
    this.fireUpdate();
  } else if (state.boxSelecting) {
    var bbox2 = [
      state.boxSelectStartLocation,
      mouseEventPoint(e2.originalEvent, this.map.getContainer())
    ];
    var featuresInBox = this.featuresAt(null, bbox2, "click");
    var idsToSelect = this.getUniqueIds(featuresInBox).filter(function(id) {
      return !this$1$1.isSelected(id);
    });
    if (idsToSelect.length) {
      this.select(idsToSelect);
      idsToSelect.forEach(function(id) {
        return this$1$1.doRender(id);
      });
      this.updateUIClasses({ mouse: cursors.MOVE });
    }
  }
  this.stopExtendedInteractions(state);
};
SimpleSelect.toDisplayFeatures = function(state, geojson, display) {
  geojson.properties.active = this.isSelected(geojson.properties.id) ? activeStates.ACTIVE : activeStates.INACTIVE;
  display(geojson);
  this.fireActionable();
  if (geojson.properties.active !== activeStates.ACTIVE || geojson.geometry.type === geojsonTypes.POINT) {
    return;
  }
  createSupplementaryPoints(geojson).forEach(display);
};
SimpleSelect.onTrash = function() {
  this.deleteFeature(this.getSelectedIds());
  this.fireActionable();
};
SimpleSelect.onCombineFeatures = function() {
  var selectedFeatures = this.getSelected();
  if (selectedFeatures.length === 0 || selectedFeatures.length < 2) {
    return;
  }
  var coordinates = [], featuresCombined = [];
  var featureType = selectedFeatures[0].type.replace("Multi", "");
  for (var i = 0; i < selectedFeatures.length; i++) {
    var feature2 = selectedFeatures[i];
    if (feature2.type.replace("Multi", "") !== featureType) {
      return;
    }
    if (feature2.type.includes("Multi")) {
      feature2.getCoordinates().forEach(function(subcoords) {
        coordinates.push(subcoords);
      });
    } else {
      coordinates.push(feature2.getCoordinates());
    }
    featuresCombined.push(feature2.toGeoJSON());
  }
  if (featuresCombined.length > 1) {
    var multiFeature = this.newFeature({
      type: geojsonTypes.FEATURE,
      properties: featuresCombined[0].properties,
      geometry: {
        type: "Multi" + featureType,
        coordinates
      }
    });
    this.addFeature(multiFeature);
    this.deleteFeature(this.getSelectedIds(), { silent: true });
    this.setSelected([multiFeature.id]);
    this.map.fire(events$1.COMBINE_FEATURES, {
      createdFeatures: [multiFeature.toGeoJSON()],
      deletedFeatures: featuresCombined
    });
  }
  this.fireActionable();
};
SimpleSelect.onUncombineFeatures = function() {
  var this$1$1 = this;
  var selectedFeatures = this.getSelected();
  if (selectedFeatures.length === 0) {
    return;
  }
  var createdFeatures = [];
  var featuresUncombined = [];
  var loop = function(i2) {
    var feature2 = selectedFeatures[i2];
    if (this$1$1.isInstanceOf("MultiFeature", feature2)) {
      feature2.getFeatures().forEach(function(subFeature) {
        this$1$1.addFeature(subFeature);
        subFeature.properties = feature2.properties;
        createdFeatures.push(subFeature.toGeoJSON());
        this$1$1.select([subFeature.id]);
      });
      this$1$1.deleteFeature(feature2.id, { silent: true });
      featuresUncombined.push(feature2.toGeoJSON());
    }
  };
  for (var i = 0; i < selectedFeatures.length; i++) loop(i);
  if (createdFeatures.length > 1) {
    this.map.fire(events$1.UNCOMBINE_FEATURES, {
      createdFeatures,
      deletedFeatures: featuresUncombined
    });
  }
  this.fireActionable();
};
var isVertex$1 = isOfMetaType(meta.VERTEX);
var isMidpoint = isOfMetaType(meta.MIDPOINT);
var DirectSelect = {};
DirectSelect.fireUpdate = function() {
  this.map.fire(events$1.UPDATE, {
    action: updateActions.CHANGE_COORDINATES,
    features: this.getSelected().map(function(f) {
      return f.toGeoJSON();
    })
  });
};
DirectSelect.fireActionable = function(state) {
  this.setActionableState({
    combineFeatures: false,
    uncombineFeatures: false,
    trash: state.selectedCoordPaths.length > 0
  });
};
DirectSelect.startDragging = function(state, e2) {
  this.map.dragPan.disable();
  state.canDragMove = true;
  state.dragMoveLocation = e2.lngLat;
};
DirectSelect.stopDragging = function(state) {
  this.map.dragPan.enable();
  state.dragMoving = false;
  state.canDragMove = false;
  state.dragMoveLocation = null;
};
DirectSelect.onVertex = function(state, e2) {
  this.startDragging(state, e2);
  var about = e2.featureTarget.properties;
  var selectedIndex = state.selectedCoordPaths.indexOf(about.coord_path);
  if (!isShiftDown(e2) && selectedIndex === -1) {
    state.selectedCoordPaths = [about.coord_path];
  } else if (isShiftDown(e2) && selectedIndex === -1) {
    state.selectedCoordPaths.push(about.coord_path);
  }
  var selectedCoordinates = this.pathsToCoordinates(state.featureId, state.selectedCoordPaths);
  this.setSelectedCoordinates(selectedCoordinates);
};
DirectSelect.onMidpoint = function(state, e2) {
  this.startDragging(state, e2);
  var about = e2.featureTarget.properties;
  state.feature.addCoordinate(about.coord_path, about.lng, about.lat);
  this.fireUpdate();
  state.selectedCoordPaths = [about.coord_path];
};
DirectSelect.pathsToCoordinates = function(featureId, paths) {
  return paths.map(function(coord_path) {
    return { feature_id: featureId, coord_path };
  });
};
DirectSelect.onFeature = function(state, e2) {
  if (state.selectedCoordPaths.length === 0) {
    this.startDragging(state, e2);
  } else {
    this.stopDragging(state);
  }
};
DirectSelect.dragFeature = function(state, e2, delta) {
  moveFeatures(this.getSelected(), delta);
  state.dragMoveLocation = e2.lngLat;
};
DirectSelect.dragVertex = function(state, e2, delta) {
  var selectedCoords = state.selectedCoordPaths.map(function(coord_path) {
    return state.feature.getCoordinate(coord_path);
  });
  var selectedCoordPoints = selectedCoords.map(function(coords) {
    return {
      type: geojsonTypes.FEATURE,
      properties: {},
      geometry: {
        type: geojsonTypes.POINT,
        coordinates: coords
      }
    };
  });
  var constrainedDelta = constrainFeatureMovement(selectedCoordPoints, delta);
  for (var i = 0; i < selectedCoords.length; i++) {
    var coord = selectedCoords[i];
    state.feature.updateCoordinate(state.selectedCoordPaths[i], coord[0] + constrainedDelta.lng, coord[1] + constrainedDelta.lat);
  }
};
DirectSelect.clickNoTarget = function() {
  this.changeMode(modes$1.SIMPLE_SELECT);
};
DirectSelect.clickInactive = function() {
  this.changeMode(modes$1.SIMPLE_SELECT);
};
DirectSelect.clickActiveFeature = function(state) {
  state.selectedCoordPaths = [];
  this.clearSelectedCoordinates();
  state.feature.changed();
};
DirectSelect.onSetup = function(opts) {
  var featureId = opts.featureId;
  var feature2 = this.getFeature(featureId);
  if (!feature2) {
    throw new Error("You must provide a featureId to enter direct_select mode");
  }
  if (feature2.type === geojsonTypes.POINT) {
    throw new TypeError("direct_select mode doesn't handle point features");
  }
  var state = {
    featureId,
    feature: feature2,
    dragMoveLocation: opts.startPos || null,
    dragMoving: false,
    canDragMove: false,
    selectedCoordPaths: opts.coordPath ? [opts.coordPath] : []
  };
  this.setSelectedCoordinates(this.pathsToCoordinates(featureId, state.selectedCoordPaths));
  this.setSelected(featureId);
  doubleClickZoom.disable(this);
  this.setActionableState({
    trash: true
  });
  return state;
};
DirectSelect.onStop = function() {
  doubleClickZoom.enable(this);
  this.clearSelectedCoordinates();
};
DirectSelect.toDisplayFeatures = function(state, geojson, push) {
  if (state.featureId === geojson.properties.id) {
    geojson.properties.active = activeStates.ACTIVE;
    push(geojson);
    createSupplementaryPoints(geojson, {
      map: this.map,
      midpoints: true,
      selectedPaths: state.selectedCoordPaths
    }).forEach(push);
  } else {
    geojson.properties.active = activeStates.INACTIVE;
    push(geojson);
  }
  this.fireActionable(state);
};
DirectSelect.onTrash = function(state) {
  state.selectedCoordPaths.sort(function(a, b) {
    return b.localeCompare(a, "en", { numeric: true });
  }).forEach(function(id) {
    return state.feature.removeCoordinate(id);
  });
  this.fireUpdate();
  state.selectedCoordPaths = [];
  this.clearSelectedCoordinates();
  this.fireActionable(state);
  if (state.feature.isValid() === false) {
    this.deleteFeature([state.featureId]);
    this.changeMode(modes$1.SIMPLE_SELECT, {});
  }
};
DirectSelect.onMouseMove = function(state, e2) {
  var isFeature2 = isActiveFeature(e2);
  var onVertex = isVertex$1(e2);
  var isMidPoint = isMidpoint(e2);
  var noCoords = state.selectedCoordPaths.length === 0;
  if (isFeature2 && noCoords) {
    this.updateUIClasses({ mouse: cursors.MOVE });
  } else if (onVertex && !noCoords) {
    this.updateUIClasses({ mouse: cursors.MOVE });
  } else {
    this.updateUIClasses({ mouse: cursors.NONE });
  }
  var isDraggableItem = onVertex || isFeature2 || isMidPoint;
  if (isDraggableItem && state.dragMoving) {
    this.fireUpdate();
  }
  this.stopDragging(state);
  return true;
};
DirectSelect.onMouseOut = function(state) {
  if (state.dragMoving) {
    this.fireUpdate();
  }
  return true;
};
DirectSelect.onTouchStart = DirectSelect.onMouseDown = function(state, e2) {
  if (isVertex$1(e2)) {
    return this.onVertex(state, e2);
  }
  if (isActiveFeature(e2)) {
    return this.onFeature(state, e2);
  }
  if (isMidpoint(e2)) {
    return this.onMidpoint(state, e2);
  }
};
DirectSelect.onDrag = function(state, e2) {
  if (state.canDragMove !== true) {
    return;
  }
  state.dragMoving = true;
  e2.originalEvent.stopPropagation();
  var delta = {
    lng: e2.lngLat.lng - state.dragMoveLocation.lng,
    lat: e2.lngLat.lat - state.dragMoveLocation.lat
  };
  if (state.selectedCoordPaths.length > 0) {
    this.dragVertex(state, e2, delta);
  } else {
    this.dragFeature(state, e2, delta);
  }
  state.dragMoveLocation = e2.lngLat;
};
DirectSelect.onClick = function(state, e2) {
  if (noTarget(e2)) {
    return this.clickNoTarget(state, e2);
  }
  if (isActiveFeature(e2)) {
    return this.clickActiveFeature(state, e2);
  }
  if (isInactiveFeature(e2)) {
    return this.clickInactive(state, e2);
  }
  this.stopDragging(state);
};
DirectSelect.onTap = function(state, e2) {
  if (noTarget(e2)) {
    return this.clickNoTarget(state, e2);
  }
  if (isActiveFeature(e2)) {
    return this.clickActiveFeature(state, e2);
  }
  if (isInactiveFeature(e2)) {
    return this.clickInactive(state, e2);
  }
};
DirectSelect.onTouchEnd = DirectSelect.onMouseUp = function(state) {
  if (state.dragMoving) {
    this.fireUpdate();
  }
  this.stopDragging(state);
};
var DrawPoint = {};
DrawPoint.onSetup = function() {
  var point2 = this.newFeature({
    type: geojsonTypes.FEATURE,
    properties: {},
    geometry: {
      type: geojsonTypes.POINT,
      coordinates: []
    }
  });
  this.addFeature(point2);
  this.clearSelectedFeatures();
  this.updateUIClasses({ mouse: cursors.ADD });
  this.activateUIButton(types$1.POINT);
  this.setActionableState({
    trash: true
  });
  return { point: point2 };
};
DrawPoint.stopDrawingAndRemove = function(state) {
  this.deleteFeature([state.point.id], { silent: true });
  this.changeMode(modes$1.SIMPLE_SELECT);
};
DrawPoint.onTap = DrawPoint.onClick = function(state, e2) {
  this.updateUIClasses({ mouse: cursors.MOVE });
  state.point.updateCoordinate("", e2.lngLat.lng, e2.lngLat.lat);
  this.map.fire(events$1.CREATE, {
    features: [state.point.toGeoJSON()]
  });
  this.changeMode(modes$1.SIMPLE_SELECT, { featureIds: [state.point.id] });
};
DrawPoint.onStop = function(state) {
  this.activateUIButton();
  if (!state.point.getCoordinate().length) {
    this.deleteFeature([state.point.id], { silent: true });
  }
};
DrawPoint.toDisplayFeatures = function(state, geojson, display) {
  var isActivePoint = geojson.properties.id === state.point.id;
  geojson.properties.active = isActivePoint ? activeStates.ACTIVE : activeStates.INACTIVE;
  if (!isActivePoint) {
    return display(geojson);
  }
};
DrawPoint.onTrash = DrawPoint.stopDrawingAndRemove;
DrawPoint.onKeyUp = function(state, e2) {
  if (isEscapeKey(e2) || isEnterKey(e2)) {
    return this.stopDrawingAndRemove(state, e2);
  }
};
function isEventAtCoordinates(event, coordinates) {
  if (!event.lngLat) {
    return false;
  }
  return event.lngLat.lng === coordinates[0] && event.lngLat.lat === coordinates[1];
}
var DrawPolygon = {};
DrawPolygon.onSetup = function() {
  var polygon = this.newFeature({
    type: geojsonTypes.FEATURE,
    properties: {},
    geometry: {
      type: geojsonTypes.POLYGON,
      coordinates: [[]]
    }
  });
  this.addFeature(polygon);
  this.clearSelectedFeatures();
  doubleClickZoom.disable(this);
  this.updateUIClasses({ mouse: cursors.ADD });
  this.activateUIButton(types$1.POLYGON);
  this.setActionableState({
    trash: true
  });
  return {
    polygon,
    currentVertexPosition: 0
  };
};
DrawPolygon.clickAnywhere = function(state, e2) {
  if (state.currentVertexPosition > 0 && isEventAtCoordinates(e2, state.polygon.coordinates[0][state.currentVertexPosition - 1])) {
    return this.changeMode(modes$1.SIMPLE_SELECT, { featureIds: [state.polygon.id] });
  }
  this.updateUIClasses({ mouse: cursors.ADD });
  state.polygon.updateCoordinate("0." + state.currentVertexPosition, e2.lngLat.lng, e2.lngLat.lat);
  state.currentVertexPosition++;
  state.polygon.updateCoordinate("0." + state.currentVertexPosition, e2.lngLat.lng, e2.lngLat.lat);
};
DrawPolygon.clickOnVertex = function(state) {
  return this.changeMode(modes$1.SIMPLE_SELECT, { featureIds: [state.polygon.id] });
};
DrawPolygon.onMouseMove = function(state, e2) {
  state.polygon.updateCoordinate("0." + state.currentVertexPosition, e2.lngLat.lng, e2.lngLat.lat);
  if (isVertex$2(e2)) {
    this.updateUIClasses({ mouse: cursors.POINTER });
  }
};
DrawPolygon.onTap = DrawPolygon.onClick = function(state, e2) {
  if (isVertex$2(e2)) {
    return this.clickOnVertex(state, e2);
  }
  return this.clickAnywhere(state, e2);
};
DrawPolygon.onKeyUp = function(state, e2) {
  if (isEscapeKey(e2)) {
    this.deleteFeature([state.polygon.id], { silent: true });
    this.changeMode(modes$1.SIMPLE_SELECT);
  } else if (isEnterKey(e2)) {
    this.changeMode(modes$1.SIMPLE_SELECT, { featureIds: [state.polygon.id] });
  }
};
DrawPolygon.onStop = function(state) {
  this.updateUIClasses({ mouse: cursors.NONE });
  doubleClickZoom.enable(this);
  this.activateUIButton();
  if (this.getFeature(state.polygon.id) === void 0) {
    return;
  }
  state.polygon.removeCoordinate("0." + state.currentVertexPosition);
  if (state.polygon.isValid()) {
    this.map.fire(events$1.CREATE, {
      features: [state.polygon.toGeoJSON()]
    });
  } else {
    this.deleteFeature([state.polygon.id], { silent: true });
    this.changeMode(modes$1.SIMPLE_SELECT, {}, { silent: true });
  }
};
DrawPolygon.toDisplayFeatures = function(state, geojson, display) {
  var isActivePolygon = geojson.properties.id === state.polygon.id;
  geojson.properties.active = isActivePolygon ? activeStates.ACTIVE : activeStates.INACTIVE;
  if (!isActivePolygon) {
    return display(geojson);
  }
  if (geojson.geometry.coordinates.length === 0) {
    return;
  }
  var coordinateCount = geojson.geometry.coordinates[0].length;
  if (coordinateCount < 3) {
    return;
  }
  geojson.properties.meta = meta.FEATURE;
  display(createVertex(state.polygon.id, geojson.geometry.coordinates[0][0], "0.0", false));
  if (coordinateCount > 3) {
    var endPos = geojson.geometry.coordinates[0].length - 3;
    display(createVertex(state.polygon.id, geojson.geometry.coordinates[0][endPos], "0." + endPos, false));
  }
  if (coordinateCount <= 4) {
    var lineCoordinates = [
      [geojson.geometry.coordinates[0][0][0], geojson.geometry.coordinates[0][0][1]],
      [geojson.geometry.coordinates[0][1][0], geojson.geometry.coordinates[0][1][1]]
    ];
    display({
      type: geojsonTypes.FEATURE,
      properties: geojson.properties,
      geometry: {
        coordinates: lineCoordinates,
        type: geojsonTypes.LINE_STRING
      }
    });
    if (coordinateCount === 3) {
      return;
    }
  }
  return display(geojson);
};
DrawPolygon.onTrash = function(state) {
  this.deleteFeature([state.polygon.id], { silent: true });
  this.changeMode(modes$1.SIMPLE_SELECT);
};
var DrawLineString = {};
DrawLineString.onSetup = function(opts) {
  opts = opts || {};
  var featureId = opts.featureId;
  var line, currentVertexPosition;
  var direction = "forward";
  if (featureId) {
    line = this.getFeature(featureId);
    if (!line) {
      throw new Error("Could not find a feature with the provided featureId");
    }
    var from = opts.from;
    if (from && from.type === "Feature" && from.geometry && from.geometry.type === "Point") {
      from = from.geometry;
    }
    if (from && from.type === "Point" && from.coordinates && from.coordinates.length === 2) {
      from = from.coordinates;
    }
    if (!from || !Array.isArray(from)) {
      throw new Error("Please use the `from` property to indicate which point to continue the line from");
    }
    var lastCoord = line.coordinates.length - 1;
    if (line.coordinates[lastCoord][0] === from[0] && line.coordinates[lastCoord][1] === from[1]) {
      currentVertexPosition = lastCoord + 1;
      line.addCoordinate.apply(line, [currentVertexPosition].concat(line.coordinates[lastCoord]));
    } else if (line.coordinates[0][0] === from[0] && line.coordinates[0][1] === from[1]) {
      direction = "backwards";
      currentVertexPosition = 0;
      line.addCoordinate.apply(line, [currentVertexPosition].concat(line.coordinates[0]));
    } else {
      throw new Error("`from` should match the point at either the start or the end of the provided LineString");
    }
  } else {
    line = this.newFeature({
      type: geojsonTypes.FEATURE,
      properties: {},
      geometry: {
        type: geojsonTypes.LINE_STRING,
        coordinates: []
      }
    });
    currentVertexPosition = 0;
    this.addFeature(line);
  }
  this.clearSelectedFeatures();
  doubleClickZoom.disable(this);
  this.updateUIClasses({ mouse: cursors.ADD });
  this.activateUIButton(types$1.LINE);
  this.setActionableState({
    trash: true
  });
  return {
    line,
    currentVertexPosition,
    direction
  };
};
DrawLineString.clickAnywhere = function(state, e2) {
  if (state.currentVertexPosition > 0 && isEventAtCoordinates(e2, state.line.coordinates[state.currentVertexPosition - 1]) || state.direction === "backwards" && isEventAtCoordinates(e2, state.line.coordinates[state.currentVertexPosition + 1])) {
    return this.changeMode(modes$1.SIMPLE_SELECT, { featureIds: [state.line.id] });
  }
  this.updateUIClasses({ mouse: cursors.ADD });
  state.line.updateCoordinate(state.currentVertexPosition, e2.lngLat.lng, e2.lngLat.lat);
  if (state.direction === "forward") {
    state.currentVertexPosition++;
    state.line.updateCoordinate(state.currentVertexPosition, e2.lngLat.lng, e2.lngLat.lat);
  } else {
    state.line.addCoordinate(0, e2.lngLat.lng, e2.lngLat.lat);
  }
};
DrawLineString.clickOnVertex = function(state) {
  return this.changeMode(modes$1.SIMPLE_SELECT, { featureIds: [state.line.id] });
};
DrawLineString.onMouseMove = function(state, e2) {
  state.line.updateCoordinate(state.currentVertexPosition, e2.lngLat.lng, e2.lngLat.lat);
  if (isVertex$2(e2)) {
    this.updateUIClasses({ mouse: cursors.POINTER });
  }
};
DrawLineString.onTap = DrawLineString.onClick = function(state, e2) {
  if (isVertex$2(e2)) {
    return this.clickOnVertex(state, e2);
  }
  this.clickAnywhere(state, e2);
};
DrawLineString.onKeyUp = function(state, e2) {
  if (isEnterKey(e2)) {
    this.changeMode(modes$1.SIMPLE_SELECT, { featureIds: [state.line.id] });
  } else if (isEscapeKey(e2)) {
    this.deleteFeature([state.line.id], { silent: true });
    this.changeMode(modes$1.SIMPLE_SELECT);
  }
};
DrawLineString.onStop = function(state) {
  doubleClickZoom.enable(this);
  this.activateUIButton();
  if (this.getFeature(state.line.id) === void 0) {
    return;
  }
  state.line.removeCoordinate("" + state.currentVertexPosition);
  if (state.line.isValid()) {
    this.map.fire(events$1.CREATE, {
      features: [state.line.toGeoJSON()]
    });
  } else {
    this.deleteFeature([state.line.id], { silent: true });
    this.changeMode(modes$1.SIMPLE_SELECT, {}, { silent: true });
  }
};
DrawLineString.onTrash = function(state) {
  this.deleteFeature([state.line.id], { silent: true });
  this.changeMode(modes$1.SIMPLE_SELECT);
};
DrawLineString.toDisplayFeatures = function(state, geojson, display) {
  var isActiveLine = geojson.properties.id === state.line.id;
  geojson.properties.active = isActiveLine ? activeStates.ACTIVE : activeStates.INACTIVE;
  if (!isActiveLine) {
    return display(geojson);
  }
  if (geojson.geometry.coordinates.length < 2) {
    return;
  }
  geojson.properties.meta = meta.FEATURE;
  display(createVertex(
    state.line.id,
    geojson.geometry.coordinates[state.direction === "forward" ? geojson.geometry.coordinates.length - 2 : 1],
    "" + (state.direction === "forward" ? geojson.geometry.coordinates.length - 2 : 1),
    false
  ));
  display(geojson);
};
function feature$5(geom, properties, options) {
  if (options === void 0) {
    options = {};
  }
  var feat = { type: "Feature" };
  if (options.id === 0 || options.id) {
    feat.id = options.id;
  }
  if (options.bbox) {
    feat.bbox = options.bbox;
  }
  feat.properties = properties || {};
  feat.geometry = geom;
  return feat;
}
function point$5(coordinates, properties, options) {
  if (options === void 0) {
    options = {};
  }
  if (!coordinates) {
    throw new Error("coordinates is required");
  }
  if (!Array.isArray(coordinates)) {
    throw new Error("coordinates must be an Array");
  }
  if (coordinates.length < 2) {
    throw new Error("coordinates must be at least 2 numbers long");
  }
  if (!isNumber$5(coordinates[0]) || !isNumber$5(coordinates[1])) {
    throw new Error("coordinates must contain numbers");
  }
  var geom = {
    type: "Point",
    coordinates
  };
  return feature$5(geom, properties, options);
}
function lineString(coordinates, properties, options) {
  if (options === void 0) {
    options = {};
  }
  if (coordinates.length < 2) {
    throw new Error("coordinates must be an array of two or more positions");
  }
  var geom = {
    type: "LineString",
    coordinates
  };
  return feature$5(geom, properties, options);
}
function isNumber$5(num) {
  return !isNaN(num) && num !== null && !Array.isArray(num);
}
function radiansToDegrees$2(radians) {
  if (radians === null || radians === void 0) {
    throw new Error("radians is required");
  }
  var degrees = radians % (2 * Math.PI);
  return degrees * 180 / Math.PI;
}
function degreesToRadians$4(degrees) {
  if (degrees === null || degrees === void 0) {
    throw new Error("degrees is required");
  }
  var radians = degrees % 360;
  return radians * Math.PI / 180;
}
function isObject$8(input) {
  return !!input && input.constructor === Object;
}
function getCoord$6(coord) {
  if (!coord) {
    throw new Error("coord is required");
  }
  if (coord.type === "Feature" && coord.geometry !== null && coord.geometry.type === "Point") {
    return coord.geometry.coordinates;
  }
  if (coord.type === "Point") {
    return coord.coordinates;
  }
  if (Array.isArray(coord) && coord.length >= 2 && coord[0].length === void 0 && coord[1].length === void 0) {
    return coord;
  }
  throw new Error("coord must be GeoJSON Point or an Array of numbers");
}
function bearing(start, end, options) {
  options = options || {};
  if (!isObject$8(options)) {
    throw new Error("options is invalid");
  }
  var final = options.final;
  if (final === true) {
    return calculateFinalBearing(start, end);
  }
  var coordinates1 = getCoord$6(start);
  var coordinates2 = getCoord$6(end);
  var lon1 = degreesToRadians$4(coordinates1[0]);
  var lon2 = degreesToRadians$4(coordinates2[0]);
  var lat1 = degreesToRadians$4(coordinates1[1]);
  var lat2 = degreesToRadians$4(coordinates2[1]);
  var a = Math.sin(lon2 - lon1) * Math.cos(lat2);
  var b = Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1) * Math.cos(lat2) * Math.cos(lon2 - lon1);
  return radiansToDegrees$2(Math.atan2(a, b));
}
function calculateFinalBearing(start, end) {
  var bear = bearing(end, start);
  bear = (bear + 180) % 360;
  return bear;
}
function coordEach$2(geojson, callback, excludeWrapCoord) {
  if (geojson === null) {
    return;
  }
  var j, k, l, geometry2, stopG, coords, geometryMaybeCollection, wrapShrink = 0, coordIndex = 0, isGeometryCollection, type = geojson.type, isFeatureCollection = type === "FeatureCollection", isFeature2 = type === "Feature", stop = isFeatureCollection ? geojson.features.length : 1;
  for (var featureIndex = 0; featureIndex < stop; featureIndex++) {
    geometryMaybeCollection = isFeatureCollection ? geojson.features[featureIndex].geometry : isFeature2 ? geojson.geometry : geojson;
    isGeometryCollection = geometryMaybeCollection ? geometryMaybeCollection.type === "GeometryCollection" : false;
    stopG = isGeometryCollection ? geometryMaybeCollection.geometries.length : 1;
    for (var geomIndex = 0; geomIndex < stopG; geomIndex++) {
      var multiFeatureIndex = 0;
      var geometryIndex = 0;
      geometry2 = isGeometryCollection ? geometryMaybeCollection.geometries[geomIndex] : geometryMaybeCollection;
      if (geometry2 === null) {
        continue;
      }
      coords = geometry2.coordinates;
      var geomType = geometry2.type;
      wrapShrink = excludeWrapCoord && (geomType === "Polygon" || geomType === "MultiPolygon") ? 1 : 0;
      switch (geomType) {
        case null:
          break;
        case "Point":
          if (callback(coords, coordIndex, featureIndex, multiFeatureIndex, geometryIndex) === false) {
            return false;
          }
          coordIndex++;
          multiFeatureIndex++;
          break;
        case "LineString":
        case "MultiPoint":
          for (j = 0; j < coords.length; j++) {
            if (callback(coords[j], coordIndex, featureIndex, multiFeatureIndex, geometryIndex) === false) {
              return false;
            }
            coordIndex++;
            if (geomType === "MultiPoint") {
              multiFeatureIndex++;
            }
          }
          if (geomType === "LineString") {
            multiFeatureIndex++;
          }
          break;
        case "Polygon":
        case "MultiLineString":
          for (j = 0; j < coords.length; j++) {
            for (k = 0; k < coords[j].length - wrapShrink; k++) {
              if (callback(coords[j][k], coordIndex, featureIndex, multiFeatureIndex, geometryIndex) === false) {
                return false;
              }
              coordIndex++;
            }
            if (geomType === "MultiLineString") {
              multiFeatureIndex++;
            }
            if (geomType === "Polygon") {
              geometryIndex++;
            }
          }
          if (geomType === "Polygon") {
            multiFeatureIndex++;
          }
          break;
        case "MultiPolygon":
          for (j = 0; j < coords.length; j++) {
            if (geomType === "MultiPolygon") {
              geometryIndex = 0;
            }
            for (k = 0; k < coords[j].length; k++) {
              for (l = 0; l < coords[j][k].length - wrapShrink; l++) {
                if (callback(coords[j][k][l], coordIndex, featureIndex, multiFeatureIndex, geometryIndex) === false) {
                  return false;
                }
                coordIndex++;
              }
              geometryIndex++;
            }
            multiFeatureIndex++;
          }
          break;
        case "GeometryCollection":
          for (j = 0; j < geometry2.geometries.length; j++) {
            if (coordEach$2(geometry2.geometries[j], callback, excludeWrapCoord) === false) {
              return false;
            }
          }
          break;
        default:
          throw new Error("Unknown Geometry Type");
      }
    }
  }
}
function bbox(geojson) {
  var BBox = [Infinity, Infinity, -Infinity, -Infinity];
  coordEach$2(geojson, function(coord) {
    if (BBox[0] > coord[0]) {
      BBox[0] = coord[0];
    }
    if (BBox[1] > coord[1]) {
      BBox[1] = coord[1];
    }
    if (BBox[2] < coord[0]) {
      BBox[2] = coord[0];
    }
    if (BBox[3] < coord[1]) {
      BBox[3] = coord[1];
    }
  });
  return BBox;
}
function feature$4(geometry2, properties, options) {
  options = options || {};
  if (!isObject$7(options)) {
    throw new Error("options is invalid");
  }
  var bbox2 = options.bbox;
  var id = options.id;
  if (geometry2 === void 0) {
    throw new Error("geometry is required");
  }
  if (properties && properties.constructor !== Object) {
    throw new Error("properties must be an Object");
  }
  if (bbox2) {
    validateBBox$4(bbox2);
  }
  if (id) {
    validateId$4(id);
  }
  var feat = { type: "Feature" };
  if (id) {
    feat.id = id;
  }
  if (bbox2) {
    feat.bbox = bbox2;
  }
  feat.properties = properties || {};
  feat.geometry = geometry2;
  return feat;
}
function point$4(coordinates, properties, options) {
  if (!coordinates) {
    throw new Error("coordinates is required");
  }
  if (!Array.isArray(coordinates)) {
    throw new Error("coordinates must be an Array");
  }
  if (coordinates.length < 2) {
    throw new Error("coordinates must be at least 2 numbers long");
  }
  if (!isNumber$4(coordinates[0]) || !isNumber$4(coordinates[1])) {
    throw new Error("coordinates must contain numbers");
  }
  return feature$4({
    type: "Point",
    coordinates
  }, properties, options);
}
function isNumber$4(num) {
  return !isNaN(num) && num !== null && !Array.isArray(num);
}
function isObject$7(input) {
  return !!input && input.constructor === Object;
}
function validateBBox$4(bbox2) {
  if (!bbox2) {
    throw new Error("bbox is required");
  }
  if (!Array.isArray(bbox2)) {
    throw new Error("bbox must be an Array");
  }
  if (bbox2.length !== 4 && bbox2.length !== 6) {
    throw new Error("bbox must be an Array of 4 or 6 numbers");
  }
  bbox2.forEach(function(num) {
    if (!isNumber$4(num)) {
      throw new Error("bbox must only contain numbers");
    }
  });
}
function validateId$4(id) {
  if (!id) {
    throw new Error("id is required");
  }
  if (["string", "number"].indexOf(typeof id) === -1) {
    throw new Error("id must be a number or a string");
  }
}
function center(geojson, options) {
  options = options || {};
  if (!isObject$7(options)) {
    throw new Error("options is invalid");
  }
  var properties = options.properties;
  if (!geojson) {
    throw new Error("geojson is required");
  }
  var ext = bbox(geojson);
  var x = (ext[0] + ext[2]) / 2;
  var y = (ext[1] + ext[3]) / 2;
  return point$4([x, y], properties);
}
var earthRadius$3 = 63710088e-1;
var factors$3 = {
  meters: earthRadius$3,
  metres: earthRadius$3,
  millimeters: earthRadius$3 * 1e3,
  millimetres: earthRadius$3 * 1e3,
  centimeters: earthRadius$3 * 100,
  centimetres: earthRadius$3 * 100,
  kilometers: earthRadius$3 / 1e3,
  kilometres: earthRadius$3 / 1e3,
  miles: earthRadius$3 / 1609.344,
  nauticalmiles: earthRadius$3 / 1852,
  inches: earthRadius$3 * 39.37,
  yards: earthRadius$3 / 1.0936,
  feet: earthRadius$3 * 3.28084,
  radians: 1,
  degrees: earthRadius$3 / 111325
};
function feature$3(geometry2, properties, options) {
  options = options || {};
  if (!isObject$6(options)) {
    throw new Error("options is invalid");
  }
  var bbox2 = options.bbox;
  var id = options.id;
  if (geometry2 === void 0) {
    throw new Error("geometry is required");
  }
  if (properties && properties.constructor !== Object) {
    throw new Error("properties must be an Object");
  }
  if (bbox2) {
    validateBBox$3(bbox2);
  }
  if (id) {
    validateId$3(id);
  }
  var feat = { type: "Feature" };
  if (id) {
    feat.id = id;
  }
  if (bbox2) {
    feat.bbox = bbox2;
  }
  feat.properties = properties || {};
  feat.geometry = geometry2;
  return feat;
}
function point$3(coordinates, properties, options) {
  if (!coordinates) {
    throw new Error("coordinates is required");
  }
  if (!Array.isArray(coordinates)) {
    throw new Error("coordinates must be an Array");
  }
  if (coordinates.length < 2) {
    throw new Error("coordinates must be at least 2 numbers long");
  }
  if (!isNumber$3(coordinates[0]) || !isNumber$3(coordinates[1])) {
    throw new Error("coordinates must contain numbers");
  }
  return feature$3({
    type: "Point",
    coordinates
  }, properties, options);
}
function lengthToRadians$2(distance2, units) {
  if (distance2 === void 0 || distance2 === null) {
    throw new Error("distance is required");
  }
  if (units && typeof units !== "string") {
    throw new Error("units must be a string");
  }
  var factor = factors$3[units || "kilometers"];
  if (!factor) {
    throw new Error(units + " units is invalid");
  }
  return distance2 / factor;
}
function radiansToDegrees$1(radians) {
  if (radians === null || radians === void 0) {
    throw new Error("radians is required");
  }
  var degrees = radians % (2 * Math.PI);
  return degrees * 180 / Math.PI;
}
function degreesToRadians$3(degrees) {
  if (degrees === null || degrees === void 0) {
    throw new Error("degrees is required");
  }
  var radians = degrees % 360;
  return radians * Math.PI / 180;
}
function isNumber$3(num) {
  return !isNaN(num) && num !== null && !Array.isArray(num);
}
function isObject$6(input) {
  return !!input && input.constructor === Object;
}
function validateBBox$3(bbox2) {
  if (!bbox2) {
    throw new Error("bbox is required");
  }
  if (!Array.isArray(bbox2)) {
    throw new Error("bbox must be an Array");
  }
  if (bbox2.length !== 4 && bbox2.length !== 6) {
    throw new Error("bbox must be an Array of 4 or 6 numbers");
  }
  bbox2.forEach(function(num) {
    if (!isNumber$3(num)) {
      throw new Error("bbox must only contain numbers");
    }
  });
}
function validateId$3(id) {
  if (!id) {
    throw new Error("id is required");
  }
  if (["string", "number"].indexOf(typeof id) === -1) {
    throw new Error("id must be a number or a string");
  }
}
function getCoord$5(coord) {
  if (!coord) {
    throw new Error("coord is required");
  }
  if (coord.type === "Feature" && coord.geometry !== null && coord.geometry.type === "Point") {
    return coord.geometry.coordinates;
  }
  if (coord.type === "Point") {
    return coord.coordinates;
  }
  if (Array.isArray(coord) && coord.length >= 2 && coord[0].length === void 0 && coord[1].length === void 0) {
    return coord;
  }
  throw new Error("coord must be GeoJSON Point or an Array of numbers");
}
function destination(origin, distance2, bearing2, options) {
  options = options || {};
  if (!isObject$6(options)) {
    throw new Error("options is invalid");
  }
  var units = options.units;
  var properties = options.properties;
  var coordinates1 = getCoord$5(origin);
  var longitude1 = degreesToRadians$3(coordinates1[0]);
  var latitude1 = degreesToRadians$3(coordinates1[1]);
  var bearing_rad = degreesToRadians$3(bearing2);
  var radians = lengthToRadians$2(distance2, units);
  var latitude2 = Math.asin(Math.sin(latitude1) * Math.cos(radians) + Math.cos(latitude1) * Math.sin(radians) * Math.cos(bearing_rad));
  var longitude2 = longitude1 + Math.atan2(
    Math.sin(bearing_rad) * Math.sin(radians) * Math.cos(latitude1),
    Math.cos(radians) - Math.sin(latitude1) * Math.sin(latitude2)
  );
  var lng = radiansToDegrees$1(longitude2);
  var lat = radiansToDegrees$1(latitude2);
  return point$3([lng, lat], properties);
}
var earthRadius$2 = 63710088e-1;
var factors$2 = {
  meters: earthRadius$2,
  metres: earthRadius$2,
  millimeters: earthRadius$2 * 1e3,
  millimetres: earthRadius$2 * 1e3,
  centimeters: earthRadius$2 * 100,
  centimetres: earthRadius$2 * 100,
  kilometers: earthRadius$2 / 1e3,
  kilometres: earthRadius$2 / 1e3,
  miles: earthRadius$2 / 1609.344,
  nauticalmiles: earthRadius$2 / 1852,
  inches: earthRadius$2 * 39.37,
  yards: earthRadius$2 / 1.0936,
  feet: earthRadius$2 * 3.28084,
  radians: 1,
  degrees: earthRadius$2 / 111325
};
function radiansToLength$2(radians, units) {
  if (radians === void 0 || radians === null) {
    throw new Error("radians is required");
  }
  if (units && typeof units !== "string") {
    throw new Error("units must be a string");
  }
  var factor = factors$2[units || "kilometers"];
  if (!factor) {
    throw new Error(units + " units is invalid");
  }
  return radians * factor;
}
function degreesToRadians$2(degrees) {
  if (degrees === null || degrees === void 0) {
    throw new Error("degrees is required");
  }
  var radians = degrees % 360;
  return radians * Math.PI / 180;
}
function isObject$5(input) {
  return !!input && input.constructor === Object;
}
function getCoord$4(coord) {
  if (!coord) {
    throw new Error("coord is required");
  }
  if (coord.type === "Feature" && coord.geometry !== null && coord.geometry.type === "Point") {
    return coord.geometry.coordinates;
  }
  if (coord.type === "Point") {
    return coord.coordinates;
  }
  if (Array.isArray(coord) && coord.length >= 2 && coord[0].length === void 0 && coord[1].length === void 0) {
    return coord;
  }
  throw new Error("coord must be GeoJSON Point or an Array of numbers");
}
function distance(from, to, options) {
  options = options || {};
  if (!isObject$5(options)) {
    throw new Error("options is invalid");
  }
  var units = options.units;
  var coordinates1 = getCoord$4(from);
  var coordinates2 = getCoord$4(to);
  var dLat = degreesToRadians$2(coordinates2[1] - coordinates1[1]);
  var dLon = degreesToRadians$2(coordinates2[0] - coordinates1[0]);
  var lat1 = degreesToRadians$2(coordinates1[1]);
  var lat2 = degreesToRadians$2(coordinates2[1]);
  var a = Math.pow(Math.sin(dLat / 2), 2) + Math.pow(Math.sin(dLon / 2), 2) * Math.cos(lat1) * Math.cos(lat2);
  return radiansToLength$2(2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)), units);
}
function midpoint(point1, point2) {
  var dist = distance(point1, point2);
  var heading = bearing(point1, point2);
  var midpoint2 = destination(point1, dist / 2, heading);
  return midpoint2;
}
function feature$2(geometry2, properties, options) {
  options = options || {};
  if (!isObject$4(options)) {
    throw new Error("options is invalid");
  }
  var bbox2 = options.bbox;
  var id = options.id;
  if (geometry2 === void 0) {
    throw new Error("geometry is required");
  }
  if (properties && properties.constructor !== Object) {
    throw new Error("properties must be an Object");
  }
  if (bbox2) {
    validateBBox$2(bbox2);
  }
  if (id) {
    validateId$2(id);
  }
  var feat = { type: "Feature" };
  if (id) {
    feat.id = id;
  }
  if (bbox2) {
    feat.bbox = bbox2;
  }
  feat.properties = properties || {};
  feat.geometry = geometry2;
  return feat;
}
function point$2(coordinates, properties, options) {
  if (!coordinates) {
    throw new Error("coordinates is required");
  }
  if (!Array.isArray(coordinates)) {
    throw new Error("coordinates must be an Array");
  }
  if (coordinates.length < 2) {
    throw new Error("coordinates must be at least 2 numbers long");
  }
  if (!isNumber$2(coordinates[0]) || !isNumber$2(coordinates[1])) {
    throw new Error("coordinates must contain numbers");
  }
  return feature$2({
    type: "Point",
    coordinates
  }, properties, options);
}
function isNumber$2(num) {
  return !isNaN(num) && num !== null && !Array.isArray(num);
}
function isObject$4(input) {
  return !!input && input.constructor === Object;
}
function validateBBox$2(bbox2) {
  if (!bbox2) {
    throw new Error("bbox is required");
  }
  if (!Array.isArray(bbox2)) {
    throw new Error("bbox must be an Array");
  }
  if (bbox2.length !== 4 && bbox2.length !== 6) {
    throw new Error("bbox must be an Array of 4 or 6 numbers");
  }
  bbox2.forEach(function(num) {
    if (!isNumber$2(num)) {
      throw new Error("bbox must only contain numbers");
    }
  });
}
function validateId$2(id) {
  if (!id) {
    throw new Error("id is required");
  }
  if (["string", "number"].indexOf(typeof id) === -1) {
    throw new Error("id must be a number or a string");
  }
}
function coordEach$1(geojson, callback, excludeWrapCoord) {
  if (geojson === null) {
    return;
  }
  var j, k, l, geometry2, stopG, coords, geometryMaybeCollection, wrapShrink = 0, coordIndex = 0, isGeometryCollection, type = geojson.type, isFeatureCollection = type === "FeatureCollection", isFeature2 = type === "Feature", stop = isFeatureCollection ? geojson.features.length : 1;
  for (var featureIndex = 0; featureIndex < stop; featureIndex++) {
    geometryMaybeCollection = isFeatureCollection ? geojson.features[featureIndex].geometry : isFeature2 ? geojson.geometry : geojson;
    isGeometryCollection = geometryMaybeCollection ? geometryMaybeCollection.type === "GeometryCollection" : false;
    stopG = isGeometryCollection ? geometryMaybeCollection.geometries.length : 1;
    for (var geomIndex = 0; geomIndex < stopG; geomIndex++) {
      var multiFeatureIndex = 0;
      var geometryIndex = 0;
      geometry2 = isGeometryCollection ? geometryMaybeCollection.geometries[geomIndex] : geometryMaybeCollection;
      if (geometry2 === null) {
        continue;
      }
      coords = geometry2.coordinates;
      var geomType = geometry2.type;
      wrapShrink = excludeWrapCoord && (geomType === "Polygon" || geomType === "MultiPolygon") ? 1 : 0;
      switch (geomType) {
        case null:
          break;
        case "Point":
          if (callback(coords, coordIndex, featureIndex, multiFeatureIndex, geometryIndex) === false) {
            return false;
          }
          coordIndex++;
          multiFeatureIndex++;
          break;
        case "LineString":
        case "MultiPoint":
          for (j = 0; j < coords.length; j++) {
            if (callback(coords[j], coordIndex, featureIndex, multiFeatureIndex, geometryIndex) === false) {
              return false;
            }
            coordIndex++;
            if (geomType === "MultiPoint") {
              multiFeatureIndex++;
            }
          }
          if (geomType === "LineString") {
            multiFeatureIndex++;
          }
          break;
        case "Polygon":
        case "MultiLineString":
          for (j = 0; j < coords.length; j++) {
            for (k = 0; k < coords[j].length - wrapShrink; k++) {
              if (callback(coords[j][k], coordIndex, featureIndex, multiFeatureIndex, geometryIndex) === false) {
                return false;
              }
              coordIndex++;
            }
            if (geomType === "MultiLineString") {
              multiFeatureIndex++;
            }
            if (geomType === "Polygon") {
              geometryIndex++;
            }
          }
          if (geomType === "Polygon") {
            multiFeatureIndex++;
          }
          break;
        case "MultiPolygon":
          for (j = 0; j < coords.length; j++) {
            if (geomType === "MultiPolygon") {
              geometryIndex = 0;
            }
            for (k = 0; k < coords[j].length; k++) {
              for (l = 0; l < coords[j][k].length - wrapShrink; l++) {
                if (callback(coords[j][k][l], coordIndex, featureIndex, multiFeatureIndex, geometryIndex) === false) {
                  return false;
                }
                coordIndex++;
              }
              geometryIndex++;
            }
            multiFeatureIndex++;
          }
          break;
        case "GeometryCollection":
          for (j = 0; j < geometry2.geometries.length; j++) {
            if (coordEach$1(geometry2.geometries[j], callback, excludeWrapCoord) === false) {
              return false;
            }
          }
          break;
        default:
          throw new Error("Unknown Geometry Type");
      }
    }
  }
}
function centroid$1(geojson, properties) {
  var xSum = 0;
  var ySum = 0;
  var len = 0;
  coordEach$1(geojson, function(coord) {
    xSum += coord[0];
    ySum += coord[1];
    len++;
  }, true);
  return point$2([xSum / len, ySum / len], properties);
}
function radiansToDegrees(radians) {
  if (radians === null || radians === void 0) {
    throw new Error("radians is required");
  }
  var degrees = radians % (2 * Math.PI);
  return degrees * 180 / Math.PI;
}
function degreesToRadians$1(degrees) {
  if (degrees === null || degrees === void 0) {
    throw new Error("degrees is required");
  }
  var radians = degrees % 360;
  return radians * Math.PI / 180;
}
function isObject$3(input) {
  return !!input && input.constructor === Object;
}
function getCoord$3(coord) {
  if (!coord) {
    throw new Error("coord is required");
  }
  if (coord.type === "Feature" && coord.geometry !== null && coord.geometry.type === "Point") {
    return coord.geometry.coordinates;
  }
  if (coord.type === "Point") {
    return coord.coordinates;
  }
  if (Array.isArray(coord) && coord.length >= 2 && coord[0].length === void 0 && coord[1].length === void 0) {
    return coord;
  }
  throw new Error("coord must be GeoJSON Point or an Array of numbers");
}
function rhumbBearing(start, end, options) {
  options = options || {};
  if (!isObject$3(options)) {
    throw new Error("options is invalid");
  }
  var final = options.final;
  if (!start) {
    throw new Error("start point is required");
  }
  if (!end) {
    throw new Error("end point is required");
  }
  var bear360;
  if (final) {
    bear360 = calculateRhumbBearing(getCoord$3(end), getCoord$3(start));
  } else {
    bear360 = calculateRhumbBearing(getCoord$3(start), getCoord$3(end));
  }
  var bear180 = bear360 > 180 ? -(360 - bear360) : bear360;
  return bear180;
}
function calculateRhumbBearing(from, to) {
  var phi1 = degreesToRadians$1(from[1]);
  var phi2 = degreesToRadians$1(to[1]);
  var deltaLambda = degreesToRadians$1(to[0] - from[0]);
  if (deltaLambda > Math.PI) {
    deltaLambda -= 2 * Math.PI;
  }
  if (deltaLambda < -Math.PI) {
    deltaLambda += 2 * Math.PI;
  }
  var deltaPsi = Math.log(Math.tan(phi2 / 2 + Math.PI / 4) / Math.tan(phi1 / 2 + Math.PI / 4));
  var theta = Math.atan2(deltaLambda, deltaPsi);
  return (radiansToDegrees(theta) + 360) % 360;
}
var earthRadius$1 = 63710088e-1;
var factors$1 = {
  meters: earthRadius$1,
  metres: earthRadius$1,
  millimeters: earthRadius$1 * 1e3,
  millimetres: earthRadius$1 * 1e3,
  centimeters: earthRadius$1 * 100,
  centimetres: earthRadius$1 * 100,
  kilometers: earthRadius$1 / 1e3,
  kilometres: earthRadius$1 / 1e3,
  miles: earthRadius$1 / 1609.344,
  nauticalmiles: earthRadius$1 / 1852,
  inches: earthRadius$1 * 39.37,
  yards: earthRadius$1 / 1.0936,
  feet: earthRadius$1 * 3.28084,
  radians: 1,
  degrees: earthRadius$1 / 111325
};
function radiansToLength$1(radians, units) {
  if (radians === void 0 || radians === null) {
    throw new Error("radians is required");
  }
  if (units && typeof units !== "string") {
    throw new Error("units must be a string");
  }
  var factor = factors$1[units || "kilometers"];
  if (!factor) {
    throw new Error(units + " units is invalid");
  }
  return radians * factor;
}
function lengthToRadians$1(distance2, units) {
  if (distance2 === void 0 || distance2 === null) {
    throw new Error("distance is required");
  }
  if (units && typeof units !== "string") {
    throw new Error("units must be a string");
  }
  var factor = factors$1[units || "kilometers"];
  if (!factor) {
    throw new Error(units + " units is invalid");
  }
  return distance2 / factor;
}
function convertLength$1(length, originalUnit, finalUnit) {
  if (length === null || length === void 0) {
    throw new Error("length is required");
  }
  if (!(length >= 0)) {
    throw new Error("length must be a positive number");
  }
  return radiansToLength$1(lengthToRadians$1(length, originalUnit), finalUnit || "kilometers");
}
function isObject$2(input) {
  return !!input && input.constructor === Object;
}
function getCoord$2(coord) {
  if (!coord) {
    throw new Error("coord is required");
  }
  if (coord.type === "Feature" && coord.geometry !== null && coord.geometry.type === "Point") {
    return coord.geometry.coordinates;
  }
  if (coord.type === "Point") {
    return coord.coordinates;
  }
  if (Array.isArray(coord) && coord.length >= 2 && coord[0].length === void 0 && coord[1].length === void 0) {
    return coord;
  }
  throw new Error("coord must be GeoJSON Point or an Array of numbers");
}
function rhumbDistance(from, to, options) {
  options = options || {};
  if (!isObject$2(options)) {
    throw new Error("options is invalid");
  }
  var units = options.units;
  if (!from) {
    throw new Error("from point is required");
  }
  if (!to) {
    throw new Error("to point is required");
  }
  var origin = getCoord$2(from);
  var destination2 = getCoord$2(to);
  destination2[0] += destination2[0] - origin[0] > 180 ? -360 : origin[0] - destination2[0] > 180 ? 360 : 0;
  var distanceInMeters = calculateRhumbDistance(origin, destination2);
  var distance2 = convertLength$1(distanceInMeters, "meters", units);
  return distance2;
}
function calculateRhumbDistance(origin, destination2, radius) {
  radius = radius === void 0 ? earthRadius$1 : Number(radius);
  var R = radius;
  var phi1 = origin[1] * Math.PI / 180;
  var phi2 = destination2[1] * Math.PI / 180;
  var DeltaPhi = phi2 - phi1;
  var DeltaLambda = Math.abs(destination2[0] - origin[0]) * Math.PI / 180;
  if (DeltaLambda > Math.PI) {
    DeltaLambda -= 2 * Math.PI;
  }
  var DeltaPsi = Math.log(Math.tan(phi2 / 2 + Math.PI / 4) / Math.tan(phi1 / 2 + Math.PI / 4));
  var q = Math.abs(DeltaPsi) > 1e-11 ? DeltaPhi / DeltaPsi : Math.cos(phi1);
  var delta = Math.sqrt(DeltaPhi * DeltaPhi + q * q * DeltaLambda * DeltaLambda);
  var dist = delta * R;
  return dist;
}
var earthRadius = 63710088e-1;
var factors = {
  meters: earthRadius,
  metres: earthRadius,
  millimeters: earthRadius * 1e3,
  millimetres: earthRadius * 1e3,
  centimeters: earthRadius * 100,
  centimetres: earthRadius * 100,
  kilometers: earthRadius / 1e3,
  kilometres: earthRadius / 1e3,
  miles: earthRadius / 1609.344,
  nauticalmiles: earthRadius / 1852,
  inches: earthRadius * 39.37,
  yards: earthRadius / 1.0936,
  feet: earthRadius * 3.28084,
  radians: 1,
  degrees: earthRadius / 111325
};
function feature$1(geometry2, properties, options) {
  options = options || {};
  if (!isObject$1(options)) {
    throw new Error("options is invalid");
  }
  var bbox2 = options.bbox;
  var id = options.id;
  if (geometry2 === void 0) {
    throw new Error("geometry is required");
  }
  if (properties && properties.constructor !== Object) {
    throw new Error("properties must be an Object");
  }
  if (bbox2) {
    validateBBox$1(bbox2);
  }
  if (id) {
    validateId$1(id);
  }
  var feat = { type: "Feature" };
  if (id) {
    feat.id = id;
  }
  if (bbox2) {
    feat.bbox = bbox2;
  }
  feat.properties = properties || {};
  feat.geometry = geometry2;
  return feat;
}
function point$1(coordinates, properties, options) {
  if (!coordinates) {
    throw new Error("coordinates is required");
  }
  if (!Array.isArray(coordinates)) {
    throw new Error("coordinates must be an Array");
  }
  if (coordinates.length < 2) {
    throw new Error("coordinates must be at least 2 numbers long");
  }
  if (!isNumber$1(coordinates[0]) || !isNumber$1(coordinates[1])) {
    throw new Error("coordinates must contain numbers");
  }
  return feature$1({
    type: "Point",
    coordinates
  }, properties, options);
}
function radiansToLength(radians, units) {
  if (radians === void 0 || radians === null) {
    throw new Error("radians is required");
  }
  if (units && typeof units !== "string") {
    throw new Error("units must be a string");
  }
  var factor = factors[units || "kilometers"];
  if (!factor) {
    throw new Error(units + " units is invalid");
  }
  return radians * factor;
}
function lengthToRadians(distance2, units) {
  if (distance2 === void 0 || distance2 === null) {
    throw new Error("distance is required");
  }
  if (units && typeof units !== "string") {
    throw new Error("units must be a string");
  }
  var factor = factors[units || "kilometers"];
  if (!factor) {
    throw new Error(units + " units is invalid");
  }
  return distance2 / factor;
}
function degreesToRadians(degrees) {
  if (degrees === null || degrees === void 0) {
    throw new Error("degrees is required");
  }
  var radians = degrees % 360;
  return radians * Math.PI / 180;
}
function convertLength(length, originalUnit, finalUnit) {
  if (length === null || length === void 0) {
    throw new Error("length is required");
  }
  if (!(length >= 0)) {
    throw new Error("length must be a positive number");
  }
  return radiansToLength(lengthToRadians(length, originalUnit), finalUnit || "kilometers");
}
function isNumber$1(num) {
  return !isNaN(num) && num !== null && !Array.isArray(num);
}
function isObject$1(input) {
  return !!input && input.constructor === Object;
}
function validateBBox$1(bbox2) {
  if (!bbox2) {
    throw new Error("bbox is required");
  }
  if (!Array.isArray(bbox2)) {
    throw new Error("bbox must be an Array");
  }
  if (bbox2.length !== 4 && bbox2.length !== 6) {
    throw new Error("bbox must be an Array of 4 or 6 numbers");
  }
  bbox2.forEach(function(num) {
    if (!isNumber$1(num)) {
      throw new Error("bbox must only contain numbers");
    }
  });
}
function validateId$1(id) {
  if (!id) {
    throw new Error("id is required");
  }
  if (["string", "number"].indexOf(typeof id) === -1) {
    throw new Error("id must be a number or a string");
  }
}
function getCoord$1(coord) {
  if (!coord) {
    throw new Error("coord is required");
  }
  if (coord.type === "Feature" && coord.geometry !== null && coord.geometry.type === "Point") {
    return coord.geometry.coordinates;
  }
  if (coord.type === "Point") {
    return coord.coordinates;
  }
  if (Array.isArray(coord) && coord.length >= 2 && coord[0].length === void 0 && coord[1].length === void 0) {
    return coord;
  }
  throw new Error("coord must be GeoJSON Point or an Array of numbers");
}
function rhumbDestination(origin, distance2, bearing2, options) {
  options = options || {};
  if (!isObject$1(options)) {
    throw new Error("options is invalid");
  }
  var units = options.units;
  var properties = options.properties;
  if (!origin) {
    throw new Error("origin is required");
  }
  if (distance2 === void 0 || distance2 === null) {
    throw new Error("distance is required");
  }
  if (bearing2 === void 0 || bearing2 === null) {
    throw new Error("bearing is required");
  }
  if (!(distance2 >= 0)) {
    throw new Error("distance must be greater than 0");
  }
  var distanceInMeters = convertLength(distance2, units, "meters");
  var coords = getCoord$1(origin);
  var destination2 = calculateRhumbDestination(coords, distanceInMeters, bearing2);
  destination2[0] += destination2[0] - coords[0] > 180 ? -360 : coords[0] - destination2[0] > 180 ? 360 : 0;
  return point$1(destination2, properties);
}
function calculateRhumbDestination(origin, distance2, bearing2, radius) {
  radius = radius === void 0 ? earthRadius : Number(radius);
  var delta = distance2 / radius;
  var lambda1 = origin[0] * Math.PI / 180;
  var phi1 = degreesToRadians(origin[1]);
  var theta = degreesToRadians(bearing2);
  var DeltaPhi = delta * Math.cos(theta);
  var phi2 = phi1 + DeltaPhi;
  if (Math.abs(phi2) > Math.PI / 2) {
    phi2 = phi2 > 0 ? Math.PI - phi2 : -Math.PI - phi2;
  }
  var DeltaPsi = Math.log(Math.tan(phi2 / 2 + Math.PI / 4) / Math.tan(phi1 / 2 + Math.PI / 4));
  var q = Math.abs(DeltaPsi) > 1e-11 ? DeltaPhi / DeltaPsi : Math.cos(phi1);
  var DeltaLambda = delta * Math.sin(theta) / q;
  var lambda2 = lambda1 + DeltaLambda;
  return [(lambda2 * 180 / Math.PI + 540) % 360 - 180, phi2 * 180 / Math.PI];
}
function clone(geojson) {
  if (!geojson) {
    throw new Error("geojson is required");
  }
  switch (geojson.type) {
    case "Feature":
      return cloneFeature(geojson);
    case "FeatureCollection":
      return cloneFeatureCollection(geojson);
    case "Point":
    case "LineString":
    case "Polygon":
    case "MultiPoint":
    case "MultiLineString":
    case "MultiPolygon":
    case "GeometryCollection":
      return cloneGeometry(geojson);
    default:
      throw new Error("unknown GeoJSON type");
  }
}
function cloneFeature(geojson) {
  var cloned = { type: "Feature" };
  Object.keys(geojson).forEach(function(key) {
    switch (key) {
      case "type":
      case "properties":
      case "geometry":
        return;
      default:
        cloned[key] = geojson[key];
    }
  });
  cloned.properties = cloneProperties(geojson.properties);
  cloned.geometry = cloneGeometry(geojson.geometry);
  return cloned;
}
function cloneProperties(properties) {
  var cloned = {};
  if (!properties) {
    return cloned;
  }
  Object.keys(properties).forEach(function(key) {
    var value = properties[key];
    if (typeof value === "object") {
      if (value === null) {
        cloned[key] = null;
      } else if (value.length) {
        cloned[key] = value.map(function(item) {
          return item;
        });
      } else {
        cloned[key] = cloneProperties(value);
      }
    } else {
      cloned[key] = value;
    }
  });
  return cloned;
}
function cloneFeatureCollection(geojson) {
  var cloned = { type: "FeatureCollection" };
  Object.keys(geojson).forEach(function(key) {
    switch (key) {
      case "type":
      case "features":
        return;
      default:
        cloned[key] = geojson[key];
    }
  });
  cloned.features = geojson.features.map(function(feature2) {
    return cloneFeature(feature2);
  });
  return cloned;
}
function cloneGeometry(geometry2) {
  var geom = { type: geometry2.type };
  if (geometry2.bbox) {
    geom.bbox = geometry2.bbox;
  }
  if (geometry2.type === "GeometryCollection") {
    geom.geometries = geometry2.geometries.map(function(geom2) {
      return cloneGeometry(geom2);
    });
    return geom;
  }
  geom.coordinates = deepSlice(geometry2.coordinates);
  return geom;
}
function deepSlice(coords) {
  if (typeof coords[0] !== "object") {
    return coords.slice();
  }
  return coords.map(function(coord) {
    return deepSlice(coord);
  });
}
function getCoords$1(coords) {
  if (!coords) {
    throw new Error("coords is required");
  }
  if (coords.type === "Feature" && coords.geometry !== null) {
    return coords.geometry.coordinates;
  }
  if (coords.coordinates) {
    return coords.coordinates;
  }
  if (Array.isArray(coords)) {
    return coords;
  }
  throw new Error("coords must be GeoJSON Feature, Geometry Object or an Array");
}
function transformRotate(geojson, angle, options) {
  options = options || {};
  if (!isObject$4(options)) {
    throw new Error("options is invalid");
  }
  var pivot = options.pivot;
  var mutate = options.mutate;
  if (!geojson) {
    throw new Error("geojson is required");
  }
  if (angle === void 0 || angle === null || isNaN(angle)) {
    throw new Error("angle is required");
  }
  if (angle === 0) {
    return geojson;
  }
  if (!pivot) {
    pivot = centroid$1(geojson);
  }
  if (mutate === false || mutate === void 0) {
    geojson = clone(geojson);
  }
  coordEach$1(geojson, function(pointCoords) {
    var initialAngle = rhumbBearing(pivot, pointCoords);
    var finalAngle = initialAngle + angle;
    var distance2 = rhumbDistance(pivot, pointCoords);
    var newCoords = getCoords$1(rhumbDestination(pivot, distance2, finalAngle));
    pointCoords[0] = newCoords[0];
    pointCoords[1] = newCoords[1];
  });
  return geojson;
}
function feature(geometry2, properties, options) {
  options = options || {};
  if (!isObject(options)) {
    throw new Error("options is invalid");
  }
  var bbox2 = options.bbox;
  var id = options.id;
  if (geometry2 === void 0) {
    throw new Error("geometry is required");
  }
  if (properties && properties.constructor !== Object) {
    throw new Error("properties must be an Object");
  }
  if (bbox2) {
    validateBBox(bbox2);
  }
  if (id) {
    validateId(id);
  }
  var feat = { type: "Feature" };
  if (id) {
    feat.id = id;
  }
  if (bbox2) {
    feat.bbox = bbox2;
  }
  feat.properties = properties || {};
  feat.geometry = geometry2;
  return feat;
}
function point(coordinates, properties, options) {
  if (!coordinates) {
    throw new Error("coordinates is required");
  }
  if (!Array.isArray(coordinates)) {
    throw new Error("coordinates must be an Array");
  }
  if (coordinates.length < 2) {
    throw new Error("coordinates must be at least 2 numbers long");
  }
  if (!isNumber(coordinates[0]) || !isNumber(coordinates[1])) {
    throw new Error("coordinates must contain numbers");
  }
  return feature({
    type: "Point",
    coordinates
  }, properties, options);
}
function isNumber(num) {
  return !isNaN(num) && num !== null && !Array.isArray(num);
}
function isObject(input) {
  return !!input && input.constructor === Object;
}
function validateBBox(bbox2) {
  if (!bbox2) {
    throw new Error("bbox is required");
  }
  if (!Array.isArray(bbox2)) {
    throw new Error("bbox must be an Array");
  }
  if (bbox2.length !== 4 && bbox2.length !== 6) {
    throw new Error("bbox must be an Array of 4 or 6 numbers");
  }
  bbox2.forEach(function(num) {
    if (!isNumber(num)) {
      throw new Error("bbox must only contain numbers");
    }
  });
}
function validateId(id) {
  if (!id) {
    throw new Error("id is required");
  }
  if (["string", "number"].indexOf(typeof id) === -1) {
    throw new Error("id must be a number or a string");
  }
}
function coordEach(geojson, callback, excludeWrapCoord) {
  if (geojson === null) {
    return;
  }
  var j, k, l, geometry2, stopG, coords, geometryMaybeCollection, wrapShrink = 0, coordIndex = 0, isGeometryCollection, type = geojson.type, isFeatureCollection = type === "FeatureCollection", isFeature2 = type === "Feature", stop = isFeatureCollection ? geojson.features.length : 1;
  for (var featureIndex = 0; featureIndex < stop; featureIndex++) {
    geometryMaybeCollection = isFeatureCollection ? geojson.features[featureIndex].geometry : isFeature2 ? geojson.geometry : geojson;
    isGeometryCollection = geometryMaybeCollection ? geometryMaybeCollection.type === "GeometryCollection" : false;
    stopG = isGeometryCollection ? geometryMaybeCollection.geometries.length : 1;
    for (var geomIndex = 0; geomIndex < stopG; geomIndex++) {
      var multiFeatureIndex = 0;
      var geometryIndex = 0;
      geometry2 = isGeometryCollection ? geometryMaybeCollection.geometries[geomIndex] : geometryMaybeCollection;
      if (geometry2 === null) {
        continue;
      }
      coords = geometry2.coordinates;
      var geomType = geometry2.type;
      wrapShrink = excludeWrapCoord && (geomType === "Polygon" || geomType === "MultiPolygon") ? 1 : 0;
      switch (geomType) {
        case null:
          break;
        case "Point":
          if (callback(coords, coordIndex, featureIndex, multiFeatureIndex, geometryIndex) === false) {
            return false;
          }
          coordIndex++;
          multiFeatureIndex++;
          break;
        case "LineString":
        case "MultiPoint":
          for (j = 0; j < coords.length; j++) {
            if (callback(coords[j], coordIndex, featureIndex, multiFeatureIndex, geometryIndex) === false) {
              return false;
            }
            coordIndex++;
            if (geomType === "MultiPoint") {
              multiFeatureIndex++;
            }
          }
          if (geomType === "LineString") {
            multiFeatureIndex++;
          }
          break;
        case "Polygon":
        case "MultiLineString":
          for (j = 0; j < coords.length; j++) {
            for (k = 0; k < coords[j].length - wrapShrink; k++) {
              if (callback(coords[j][k], coordIndex, featureIndex, multiFeatureIndex, geometryIndex) === false) {
                return false;
              }
              coordIndex++;
            }
            if (geomType === "MultiLineString") {
              multiFeatureIndex++;
            }
            if (geomType === "Polygon") {
              geometryIndex++;
            }
          }
          if (geomType === "Polygon") {
            multiFeatureIndex++;
          }
          break;
        case "MultiPolygon":
          for (j = 0; j < coords.length; j++) {
            if (geomType === "MultiPolygon") {
              geometryIndex = 0;
            }
            for (k = 0; k < coords[j].length; k++) {
              for (l = 0; l < coords[j][k].length - wrapShrink; l++) {
                if (callback(coords[j][k][l], coordIndex, featureIndex, multiFeatureIndex, geometryIndex) === false) {
                  return false;
                }
                coordIndex++;
              }
              geometryIndex++;
            }
            multiFeatureIndex++;
          }
          break;
        case "GeometryCollection":
          for (j = 0; j < geometry2.geometries.length; j++) {
            if (coordEach(geometry2.geometries[j], callback, excludeWrapCoord) === false) {
              return false;
            }
          }
          break;
        default:
          throw new Error("Unknown Geometry Type");
      }
    }
  }
}
function featureEach(geojson, callback) {
  if (geojson.type === "Feature") {
    callback(geojson, 0);
  } else if (geojson.type === "FeatureCollection") {
    for (var i = 0; i < geojson.features.length; i++) {
      if (callback(geojson.features[i], i) === false) {
        break;
      }
    }
  }
}
function centroid(geojson, properties) {
  var xSum = 0;
  var ySum = 0;
  var len = 0;
  coordEach(geojson, function(coord) {
    xSum += coord[0];
    ySum += coord[1];
    len++;
  }, true);
  return point([xSum / len, ySum / len], properties);
}
function getCoord(coord) {
  if (!coord) {
    throw new Error("coord is required");
  }
  if (coord.type === "Feature" && coord.geometry !== null && coord.geometry.type === "Point") {
    return coord.geometry.coordinates;
  }
  if (coord.type === "Point") {
    return coord.coordinates;
  }
  if (Array.isArray(coord) && coord.length >= 2 && coord[0].length === void 0 && coord[1].length === void 0) {
    return coord;
  }
  throw new Error("coord must be GeoJSON Point or an Array of numbers");
}
function getCoords(coords) {
  if (!coords) {
    throw new Error("coords is required");
  }
  if (coords.type === "Feature" && coords.geometry !== null) {
    return coords.geometry.coordinates;
  }
  if (coords.coordinates) {
    return coords.coordinates;
  }
  if (Array.isArray(coords)) {
    return coords;
  }
  throw new Error("coords must be GeoJSON Feature, Geometry Object or an Array");
}
function getType(geojson, name) {
  if (!geojson) {
    throw new Error((name || "geojson") + " is required");
  }
  if (geojson.geometry && geojson.geometry.type) {
    return geojson.geometry.type;
  }
  if (geojson.type) {
    return geojson.type;
  }
  throw new Error((name || "geojson") + " is invalid");
}
function transformScale(geojson, factor, options) {
  options = options || {};
  if (!isObject(options)) {
    throw new Error("options is invalid");
  }
  var origin = options.origin;
  var mutate = options.mutate;
  if (!geojson) {
    throw new Error("geojson required");
  }
  if (typeof factor !== "number" || factor === 0) {
    throw new Error("invalid factor");
  }
  var originIsPoint = Array.isArray(origin) || typeof origin === "object";
  if (mutate !== true) {
    geojson = clone(geojson);
  }
  if (geojson.type === "FeatureCollection" && !originIsPoint) {
    featureEach(geojson, function(feature2, index) {
      geojson.features[index] = scale(feature2, factor, origin);
    });
    return geojson;
  }
  return scale(geojson, factor, origin);
}
function scale(feature2, factor, origin) {
  var isPoint = getType(feature2) === "Point";
  origin = defineOrigin(feature2, origin);
  if (factor === 1 || isPoint) {
    return feature2;
  }
  coordEach(feature2, function(coord) {
    var originalDistance = rhumbDistance(origin, coord);
    var bearing2 = rhumbBearing(origin, coord);
    var newDistance = originalDistance * factor;
    var newCoord = getCoords(rhumbDestination(origin, newDistance, bearing2));
    coord[0] = newCoord[0];
    coord[1] = newCoord[1];
    if (coord.length === 3) {
      coord[2] *= factor;
    }
  });
  return feature2;
}
function defineOrigin(geojson, origin) {
  if (origin === void 0 || origin === null) {
    origin = "centroid";
  }
  if (Array.isArray(origin) || typeof origin === "object") {
    return getCoord(origin);
  }
  var bbox$1 = geojson.bbox ? geojson.bbox : bbox(geojson);
  var west = bbox$1[0];
  var south = bbox$1[1];
  var east = bbox$1[2];
  var north = bbox$1[3];
  switch (origin) {
    case "sw":
    case "southwest":
    case "westsouth":
    case "bottomleft":
      return point([west, south]);
    case "se":
    case "southeast":
    case "eastsouth":
    case "bottomright":
      return point([east, south]);
    case "nw":
    case "northwest":
    case "westnorth":
    case "topleft":
      return point([west, north]);
    case "ne":
    case "northeast":
    case "eastnorth":
    case "topright":
      return point([east, north]);
    case "center":
      return center(geojson);
    case void 0:
    case null:
    case "centroid":
      return centroid(geojson);
    default:
      throw new Error("invalid origin");
  }
}
var img$1 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAYAAAByDd+UAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA1pJREFUeNrElk9IVFEUxs+89yYoDAumxUgkoYIDZfaXCqfA3GSBi8poEYWzjVrUJiqiJFoJZUEQEYYRBAaFpIsgq5F0UThYZJSLdKEtgpRSQd/M6zvXe8c743vznhs78GOGmXfPd+49551zQ47j0BKtGqyV31Pg95JWs6APO8AdMOC42wToBAlg+fkLaTuMgFMgDpLgLbgKDucEOPmdnLm/4rtRXEEULtL/HgLPwBWvDSpBFhsE0UVPwHl65CWlR7uF2CKDoBndR0ZpPRmRrerXbnAWDHsJNoPLmfF3cN5NVqyJQog+PfyU7K8PhWgQY0Fr+yUKrRJxz4Bd4LOb4Buwfy55hjK/BsgsP07OxDfxPfsgnBgl2EkENRNePX+84pkUcaD6jq2qc2RuqFeiVfpOXQVzIoKQiR1LB+6FNz1O9mBrjjDvVK7pA3uzp1DoiPhYV9S26dE+BkdBreQC6OWgwrtvChFl9uBtlfM9MmX+gsa6bWQjj3LhSvBIVmGPpEVWNQvPcGBZUeSdRaUdCCTIRZNG0aTHskcV93i0RRaIEOUaYOP0aLusFkftV3miWNZUkNZZvIyr8STosCqbyJkapxAKiNMi85jSO02z429jIBKgMz1xWZtQ/+sPsmjS5eEfoD2gmOI8eA7adLH81rYsZtAy238V3CSnhCM/6wL6WA86wYRcm09S+s6Zh+Vg2qVg6gIUSFeACv+iZqV6Dxu4k6RHu8j+eINMvEdWLMG/Xwf9wGtcbAQHuZfOvj7tOlXC8bs8RWKyafQYegfJjCXnOwy6i9Yh7hc4zmLVxgKPMPkplMzyxoW5239ROTkB3nvklLtHH3cTMR0qm1Rn8RXkLjvEA1T1QXFMGFfaTl/JwLjzX5O0gxIRLE8Ue8r9VqCZyqEt7yEd1mbcDGb/EOeTF7OoWdZIFgcSLqrBMzX5TrhJa+OocG/O6zRcKQ9EBJ9axbTIv0KEFu4tRNM/5ycCTiNnYJcdE+vZeJ7KY+aFKbfWlhUVkaNqdYeFjNPBk4KvGSpYmaLs1PfqpUdkrmJCGFcHruAMXxH1Y4Njvioa0TiZpYfyr4y67QQfCgmy8ep7clpHA3adXnALjGjDOqnE/AT1C3KDdLBFTW5pk/LVYKcvdMde9k+AAQDas8HyPpQD4AAAAABJRU5ErkJggg==";
var img = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAaCAYAAACpSkzOAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAActJREFUeNpi/P//PwMJwAWIbYH4MBDvIUUjA8giIvGy/6igmQS9RFnEA7fk1+f/v6/NQbZsGbUsAllyDGbJz73x/3+ss/r/61A2mE+KZUwEQnY6EFv+/3ib4de+BAYQDQL/3pxn+HU4h4Hh9xcQNxKIiwlFESGLQBHP8PtEJcP/b89R4xZo6e+zrSjq8AEWAvKg1CXPJOcJNPgOAyO3JMPfOysZmCTtIK4UMUBWR1Gqc0GOeVBCAMURWoIAARNK4wiUV1yBuAlZkJGVB8YsAWJTID5DrXzkAkt5f1+fI8knpOQjbBn2GimWgDAjiUWQIBAbQCP/DykaSbWIbMDEQCdAjkUGtLYoGYiPAfF5KK1Di2oiGZbc/n24BWM+A2IRYlMdMT4ygZVlf4BlG6hw/ff8EIgrSUwZR2zQgSw5DcTxYN9DC9Z/H27D5NdBg5Fii+pBBKggBWE4+POV4c/1ubBqw5KYaoJQPvoAxPw/t7jD6h5UVwJLcVaLdhBzIxAHUOIjcPHPZjuFgQFRkEJcyK/KwKKZRLVqQgZWlYNS24/NbuBqAlSlI1Xlx6hVqKJY9ut4BcntBVJKb7hl5LSAyCm9i5EakL2kaAQIMAAP/aLE8VYEBwAAAABJRU5ErkJggg==";
var SRMode = {};
function parseSRCenter(value, defaultSRCenter) {
  if (defaultSRCenter === void 0) defaultSRCenter = SRCenter.Center;
  if (value == void 0 || value == null) {
    return defaultSRCenter;
  }
  if (value === SRCenter.Center || value === SRCenter.Opposite) {
    return value;
  }
  if (value == "center") {
    return SRCenter.Center;
  }
  if (value == "opposite") {
    return SRCenter.Opposite;
  }
  throw Error("Invalid SRCenter: " + value);
}
SRMode.onSetup = function(opts) {
  var featureId = this.getSelected()[0].id;
  var feature2 = this.getFeature(featureId);
  if (!feature2) {
    throw new Error("You must provide a valid featureId to enter SRMode");
  }
  if (feature2.type === geojsonTypes.POINT || feature2.type === geojsonTypes.MULTI_POINT) {
    throw new TypeError("SRMode can not handle points");
  }
  var state = {
    featureId,
    feature: feature2,
    canTrash: opts.canTrash != void 0 ? opts.canTrash : true,
    canScale: opts.canScale != void 0 ? opts.canScale : true,
    canRotate: opts.canRotate != void 0 ? opts.canRotate : true,
    singleRotationPoint: opts.singleRotationPoint != void 0 ? opts.singleRotationPoint : false,
    rotationPointRadius: opts.rotationPointRadius != void 0 ? opts.rotationPointRadius : 1,
    rotatePivot: parseSRCenter(opts.rotatePivot, SRCenter.Center),
    scaleCenter: parseSRCenter(opts.scaleCenter, SRCenter.Center),
    canSelectFeatures: opts.canSelectFeatures != void 0 ? opts.canSelectFeatures : true,
    // selectedFeatureMode: opts.selectedFeatureMode != undefined ? opts.selectedFeatureMode : 'simple_select',
    dragMoveLocation: opts.startPos || null,
    dragMoving: false,
    canDragMove: false,
    selectedCoordPaths: opts.coordPath ? [opts.coordPath] : []
  };
  if (!(state.canRotate || state.canScale)) {
    console.warn("Non of canScale or canRotate is true");
  }
  this.setSelectedCoordinates(
    this.pathsToCoordinates(featureId, state.selectedCoordPaths)
  );
  this.setSelected(featureId);
  doubleClickZoom.disable(this);
  this.setActionableState({
    combineFeatures: false,
    uncombineFeatures: false,
    trash: state.canTrash
  });
  var _this = this;
  this.map.loadImage(img$1, function(error, image) {
    if (error) {
      throw error;
    }
    if (!_this.map.getImage("rotate")) {
      _this.map.addImage("rotate", image);
    }
  });
  this.map.loadImage(img, function(error, image) {
    if (error) {
      throw error;
    }
    if (!_this.map.getImage("scale")) {
      _this.map.addImage("scale", image);
    }
  });
  return state;
};
SRMode.toDisplayFeatures = function(state, geojson, push) {
  if (state.featureId === geojson.properties.id) {
    geojson.properties.active = activeStates.ACTIVE;
    push(geojson);
    var suppPoints = createSupplementaryPoints(geojson, {
      map: this.map,
      midpoints: false,
      selectedPaths: state.selectedCoordPaths
    });
    if (state.canScale) {
      this.computeBisectrix(suppPoints);
      suppPoints.forEach(push);
    }
    if (state.canRotate) {
      var rotPoints = this.createRotationPoints(state, geojson, suppPoints);
      rotPoints.forEach(push);
    }
  } else {
    geojson.properties.active = activeStates.INACTIVE;
    push(geojson);
  }
  this.setActionableState({
    combineFeatures: false,
    uncombineFeatures: false,
    trash: state.canTrash
  });
};
SRMode.onStop = function() {
  doubleClickZoom.enable(this);
  this.clearSelectedCoordinates();
};
SRMode.pathsToCoordinates = function(featureId, paths) {
  return paths.map(function(coord_path) {
    return { feature_id: featureId, coord_path };
  });
};
SRMode.computeBisectrix = function(points) {
  for (var i1 = 0; i1 < points.length; i1++) {
    var i0 = (i1 - 1 + points.length) % points.length;
    var i2 = (i1 + 1) % points.length;
    lineString([
      points[i0].geometry.coordinates,
      points[i1].geometry.coordinates
    ]);
    lineString([
      points[i1].geometry.coordinates,
      points[i2].geometry.coordinates
    ]);
    var a1 = bearing(
      points[i0].geometry.coordinates,
      points[i1].geometry.coordinates
    );
    var a2 = bearing(
      points[i2].geometry.coordinates,
      points[i1].geometry.coordinates
    );
    var a = (a1 + a2) / 2;
    if (a < 0) {
      a += 360;
    }
    if (a > 360) {
      a -= 360;
    }
    points[i1].properties.heading = a;
  }
};
SRMode._createRotationPoint = function(rotationWidgets, featureId, v1, v2, rotCenter, radiusScale) {
  var cR0 = midpoint(v1, v2).geometry.coordinates;
  var heading = bearing(rotCenter, cR0);
  var distance0 = distance(rotCenter, cR0);
  var distance1 = radiusScale * distance0;
  var cR1 = destination(rotCenter, distance1, heading, {}).geometry.coordinates;
  rotationWidgets.push({
    type: geojsonTypes.FEATURE,
    properties: {
      meta: meta.MIDPOINT,
      icon: "rotate",
      parent: featureId,
      lng: cR1[0],
      lat: cR1[1],
      coord_path: v1.properties.coord_path,
      heading
    },
    geometry: {
      type: geojsonTypes.POINT,
      coordinates: cR1
    }
  });
};
SRMode.createRotationPoints = function(state, geojson, suppPoints) {
  var this$1$1 = this;
  var ref = geojson.geometry;
  var type = ref.type;
  ref.coordinates;
  var featureId = geojson.properties && geojson.properties.id;
  var rotationWidgets = [];
  if (type === geojsonTypes.POINT || type === geojsonTypes.MULTI_POINT) {
    return;
  }
  var corners = suppPoints.slice(0);
  corners[corners.length] = corners[0];
  var v1 = null;
  var rotCenter = this.computeRotationCenter(state, geojson);
  if (state.singleRotationPoint) {
    this._createRotationPoint(
      rotationWidgets,
      featureId,
      corners[0],
      corners[1],
      rotCenter,
      state.rotationPointRadius
    );
  } else {
    corners.forEach(function(v2) {
      if (v1 != null) {
        this$1$1._createRotationPoint(
          rotationWidgets,
          featureId,
          v1,
          v2,
          rotCenter,
          state.rotationPointRadius
        );
      }
      v1 = v2;
    });
  }
  return rotationWidgets;
};
SRMode.startDragging = function(state, e2) {
  this.map.dragPan.disable();
  state.canDragMove = true;
  state.dragMoveLocation = e2.lngLat;
};
SRMode.stopDragging = function(state) {
  this.map.dragPan.enable();
  state.dragMoving = false;
  state.canDragMove = false;
  state.dragMoveLocation = null;
};
var isRotatePoint = isOfMetaType(meta.MIDPOINT);
var isVertex = isOfMetaType(meta.VERTEX);
SRMode.onTouchStart = SRMode.onMouseDown = function(state, e2) {
  if (isVertex(e2)) {
    return this.onVertex(state, e2);
  }
  if (isRotatePoint(e2)) {
    return this.onRotatePoint(state, e2);
  }
  if (isActiveFeature(e2)) {
    return this.onFeature(state, e2);
  }
};
var TxMode = {
  Scale: 1,
  Rotate: 2
};
SRMode.onVertex = function(state, e2) {
  this.computeAxes(state, state.feature.toGeoJSON());
  this.startDragging(state, e2);
  var about = e2.featureTarget.properties;
  state.selectedCoordPaths = [about.coord_path];
  state.txMode = TxMode.Scale;
};
SRMode.onRotatePoint = function(state, e2) {
  this.computeAxes(state, state.feature.toGeoJSON());
  this.startDragging(state, e2);
  var about = e2.featureTarget.properties;
  state.selectedCoordPaths = [about.coord_path];
  state.txMode = TxMode.Rotate;
};
SRMode.onFeature = function(state, e2) {
  state.selectedCoordPaths = [];
  this.startDragging(state, e2);
};
SRMode.coordinateIndex = function(coordPaths) {
  if (coordPaths.length >= 1) {
    var parts = coordPaths[0].split(".");
    return parseInt(parts[parts.length - 1]);
  } else {
    return 0;
  }
};
SRMode.computeRotationCenter = function(state, polygon) {
  var center0 = center(polygon);
  return center0;
};
SRMode.computeAxes = function(state, polygon) {
  var center0 = this.computeRotationCenter(state, polygon);
  var corners;
  if (polygon.geometry.type === geojsonTypes.POLYGON) {
    corners = polygon.geometry.coordinates[0].slice(0);
  } else if (polygon.geometry.type === geojsonTypes.MULTI_POLYGON) {
    var temp = [];
    polygon.geometry.coordinates.forEach(function(c) {
      c.forEach(function(c22) {
        c22.forEach(function(c32) {
          temp.push(c32);
        });
      });
    });
    corners = temp;
  } else if (polygon.geometry.type === geojsonTypes.LINE_STRING) {
    corners = polygon.geometry.coordinates;
  } else if (polygon.geometry.type === geojsonTypes.MULTI_LINE_STRING) {
    var temp$1 = [];
    polygon.geometry.coordinates.forEach(function(c) {
      c.forEach(function(c22) {
        temp$1.push(c22);
      });
    });
    corners = temp$1;
  }
  var n = corners.length - 1;
  var iHalf = Math.floor(n / 2);
  var rotateCenters = [];
  var headings = [];
  for (var i1 = 0; i1 < n; i1++) {
    var i0 = i1 - 1;
    if (i0 < 0) {
      i0 += n;
    }
    var c0$1 = corners[i0];
    var c1$1 = corners[i1];
    var rotPoint = midpoint(point$5(c0$1), point$5(c1$1));
    var rotCenter = center0;
    if (SRCenter.Opposite === state.rotatePivot) {
      var i3 = (i1 + iHalf) % n;
      var i2 = i3 - 1;
      if (i2 < 0) {
        i2 += n;
      }
      var c2 = corners[i2];
      var c3 = corners[i3];
      rotCenter = midpoint(point$5(c2), point$5(c3));
    }
    rotateCenters[i1] = rotCenter.geometry.coordinates;
    headings[i1] = bearing(rotCenter, rotPoint);
  }
  state.rotation = {
    feature0: polygon,
    // initial feature state
    centers: rotateCenters,
    headings
    // rotation start heading for each point
  };
  var scaleCenters = [];
  var distances = [];
  for (var i = 0; i < n; i++) {
    var c1 = corners[i];
    var c0 = center0.geometry.coordinates;
    if (SRCenter.Opposite === state.scaleCenter) {
      var i2 = (i + iHalf) % n;
      c0 = corners[i2];
    }
    scaleCenters[i] = c0;
    distances[i] = distance(point$5(c0), point$5(c1), { units: "meters" });
  }
  state.scaling = {
    feature0: polygon,
    // initial feature state
    centers: scaleCenters,
    distances
  };
};
SRMode.onDrag = function(state, e2) {
  if (state.canDragMove !== true) {
    return;
  }
  state.dragMoving = true;
  e2.originalEvent.stopPropagation();
  var delta = {
    lng: e2.lngLat.lng - state.dragMoveLocation.lng,
    lat: e2.lngLat.lat - state.dragMoveLocation.lat
  };
  if (state.selectedCoordPaths.length > 0 && state.txMode) {
    switch (state.txMode) {
      case TxMode.Rotate:
        this.dragRotatePoint(state, e2, delta);
        break;
      case TxMode.Scale:
        this.dragScalePoint(state, e2, delta);
        break;
    }
  } else {
    this.dragFeature(state, e2, delta);
  }
  state.dragMoveLocation = e2.lngLat;
};
SRMode.dragRotatePoint = function(state, e2, delta) {
  if (state.rotation === void 0 || state.rotation == null) {
    throw new Error("state.rotation required");
  }
  state.feature.toGeoJSON();
  var m1 = point$5([e2.lngLat.lng, e2.lngLat.lat]);
  var n = state.rotation.centers.length;
  var cIdx = (this.coordinateIndex(state.selectedCoordPaths) + 1) % n;
  var cCenter = state.rotation.centers[cIdx];
  var center2 = point$5(cCenter);
  var heading1 = bearing(center2, m1);
  var heading0 = state.rotation.headings[cIdx];
  var rotateAngle = heading1 - heading0;
  if (isShiftDown(e2)) {
    rotateAngle = 5 * Math.round(rotateAngle / 5);
  }
  var rotatedFeature = transformRotate(state.rotation.feature0, rotateAngle, {
    pivot: center2,
    mutate: false
  });
  state.feature.incomingCoords(rotatedFeature.geometry.coordinates);
  this.fireUpdate();
};
SRMode.dragScalePoint = function(state, e2, delta) {
  if (state.scaling === void 0 || state.scaling == null) {
    throw new Error("state.scaling required");
  }
  state.feature.toGeoJSON();
  var cIdx = this.coordinateIndex(state.selectedCoordPaths);
  var cCenter = state.scaling.centers[cIdx];
  var center2 = point$5(cCenter);
  var m1 = point$5([e2.lngLat.lng, e2.lngLat.lat]);
  var dist = distance(center2, m1, { units: "meters" });
  var scale2 = dist / state.scaling.distances[cIdx];
  if (isShiftDown(e2)) {
    scale2 = 0.05 * Math.round(scale2 / 0.05);
  }
  var scaledFeature = transformScale(state.scaling.feature0, scale2, {
    origin: cCenter,
    mutate: false
  });
  state.feature.incomingCoords(scaledFeature.geometry.coordinates);
  this.fireUpdate();
};
SRMode.dragFeature = function(state, e2, delta) {
  moveFeatures(this.getSelected(), delta);
  state.dragMoveLocation = e2.lngLat;
  this.fireUpdate();
};
SRMode.fireUpdate = function() {
  this.map.fire(events$1.UPDATE, {
    action: updateActions.CHANGE_COORDINATES,
    features: this.getSelected().map(function(f) {
      return f.toGeoJSON();
    })
  });
};
SRMode.onMouseOut = function(state) {
  if (state.dragMoving) {
    this.fireUpdate();
  }
};
SRMode.onTouchEnd = SRMode.onMouseUp = function(state) {
  if (state.dragMoving) {
    this.fireUpdate();
  }
  this.stopDragging(state);
};
SRMode.clickActiveFeature = function(state) {
  state.selectedCoordPaths = [];
  this.clearSelectedCoordinates();
  state.feature.changed();
};
SRMode.onClick = function(state, e2) {
  if (noTarget(e2)) {
    return this.clickNoTarget(state, e2);
  }
  if (isActiveFeature(e2)) {
    return this.clickActiveFeature(state, e2);
  }
  if (isInactiveFeature(e2)) {
    return this.clickInactive(state, e2);
  }
  this.stopDragging(state);
};
SRMode.clickNoTarget = function(state, e2) {
  if (state.canSelectFeatures) {
    state.feature.ctx.ui.deactivateButtons();
    this.changeMode(modes$1.SIMPLE_SELECT);
  }
};
SRMode.clickInactive = function(state, e2) {
  if (state.canSelectFeatures) {
    state.feature.ctx.ui.deactivateButtons();
    this.changeMode(modes$1.SIMPLE_SELECT, {
      featureIds: [e2.featureTarget.properties.id]
    });
  }
};
SRMode.onTrash = function() {
  this.deleteFeature(this.getSelectedIds());
};
var modes = {
  simple_select: SimpleSelect,
  direct_select: DirectSelect,
  draw_point: DrawPoint,
  draw_polygon: DrawPolygon,
  draw_line_string: DrawLineString,
  SRMode
};
var SRStyle = [
  {
    id: "gl-draw-polygon-fill-inactive",
    type: "fill",
    filter: [
      "all",
      ["==", "active", "false"],
      ["==", "$type", "Polygon"],
      ["!=", "user_type", "overlay"],
      ["!=", "mode", "static"]
    ],
    paint: {
      "fill-color": "#3bb2d0",
      "fill-outline-color": "#3bb2d0",
      "fill-opacity": 0.2
    }
  },
  {
    id: "gl-draw-polygon-fill-active",
    type: "fill",
    filter: [
      "all",
      ["==", "active", "true"],
      ["==", "$type", "Polygon"],
      ["!=", "user_type", "overlay"]
    ],
    paint: {
      "fill-color": "#fbb03b",
      "fill-outline-color": "#fbb03b",
      "fill-opacity": 0.2
    }
  },
  {
    id: "gl-draw-overlay-polygon-fill-inactive",
    type: "fill",
    filter: [
      "all",
      ["==", "active", "false"],
      ["==", "$type", "Polygon"],
      ["==", "user_type", "overlay"],
      ["!=", "mode", "static"]
    ],
    paint: {
      "fill-color": "#3bb2d0",
      "fill-outline-color": "#3bb2d0",
      "fill-opacity": 0.01
    }
  },
  {
    id: "gl-draw-overlay-polygon-fill-active",
    type: "fill",
    filter: [
      "all",
      ["==", "active", "true"],
      ["==", "$type", "Polygon"],
      ["==", "user_type", "overlay"]
    ],
    paint: {
      "fill-color": "#fbb03b",
      "fill-outline-color": "#fbb03b",
      "fill-opacity": 0.01
    }
  },
  {
    id: "gl-draw-polygon-stroke-inactive",
    type: "line",
    filter: [
      "all",
      ["==", "active", "false"],
      ["==", "$type", "Polygon"],
      ["!=", "user_type", "overlay"],
      ["!=", "mode", "static"]
    ],
    layout: {
      "line-cap": "round",
      "line-join": "round"
    },
    paint: {
      "line-color": "#3bb2d0",
      "line-width": 2
    }
  },
  {
    id: "gl-draw-polygon-stroke-active",
    type: "line",
    filter: ["all", ["==", "active", "true"], ["==", "$type", "Polygon"]],
    layout: {
      "line-cap": "round",
      "line-join": "round"
    },
    paint: {
      "line-color": "#fbb03b",
      "line-dasharray": [0.2, 2],
      "line-width": 2
    }
  },
  {
    id: "gl-draw-polygon-midpoint",
    type: "circle",
    filter: ["all", ["==", "$type", "Point"], ["==", "meta", "midpoint"]],
    paint: {
      "circle-radius": 3,
      "circle-color": "#fbb03b"
    }
  },
  {
    id: "gl-draw-line-inactive",
    type: "line",
    filter: [
      "all",
      ["==", "active", "false"],
      ["==", "$type", "LineString"],
      ["!=", "mode", "static"]
    ],
    layout: {
      "line-cap": "round",
      "line-join": "round"
    },
    paint: {
      "line-color": "#3bb2d0",
      "line-width": 2
    }
  },
  {
    id: "gl-draw-line-active",
    type: "line",
    filter: ["all", ["==", "$type", "LineString"], ["==", "active", "true"]],
    layout: {
      "line-cap": "round",
      "line-join": "round"
    },
    paint: {
      "line-color": "#fbb03b",
      "line-dasharray": [0.2, 2],
      "line-width": 2
    }
  },
  {
    id: "gl-draw-polygon-and-line-vertex-stroke-inactive",
    type: "circle",
    filter: [
      "all",
      ["==", "meta", "vertex"],
      ["==", "$type", "Point"],
      ["!=", "mode", "static"]
    ],
    paint: {
      "circle-radius": 4,
      "circle-color": "#fff"
    }
  },
  {
    id: "gl-draw-polygon-and-line-vertex-inactive",
    type: "circle",
    filter: [
      "all",
      ["==", "meta", "vertex"],
      ["==", "$type", "Point"],
      ["!=", "mode", "static"]
    ],
    paint: {
      "circle-radius": 2,
      "circle-color": "#fbb03b"
    }
  },
  {
    id: "gl-draw-polygon-and-line-vertex-scale-icon",
    type: "symbol",
    filter: [
      "all",
      ["==", "meta", "vertex"],
      ["==", "$type", "Point"],
      ["!=", "mode", "static"],
      ["has", "heading"]
    ],
    layout: {
      "icon-image": "scale",
      "icon-allow-overlap": true,
      "icon-ignore-placement": true,
      "icon-rotation-alignment": "map",
      "icon-rotate": ["get", "heading"]
    },
    paint: {
      "icon-opacity": 1,
      "icon-opacity-transition": {
        delay: 0,
        duration: 0
      }
    }
  },
  {
    id: "gl-draw-point-point-stroke-inactive",
    type: "circle",
    filter: [
      "all",
      ["==", "active", "false"],
      ["==", "$type", "Point"],
      ["==", "meta", "feature"],
      ["!=", "mode", "static"]
    ],
    paint: {
      "circle-radius": 5,
      "circle-opacity": 1,
      "circle-color": "#fff"
    }
  },
  {
    id: "gl-draw-point-inactive",
    type: "circle",
    filter: [
      "all",
      ["==", "active", "false"],
      ["==", "$type", "Point"],
      ["==", "meta", "feature"],
      ["!=", "mode", "static"]
    ],
    paint: {
      "circle-radius": 3,
      "circle-color": "#3bb2d0"
    }
  },
  {
    id: "gl-draw-point-stroke-active",
    type: "circle",
    filter: [
      "all",
      ["==", "$type", "Point"],
      ["==", "active", "true"],
      ["!=", "meta", "midpoint"]
    ],
    paint: {
      "circle-radius": 4,
      "circle-color": "#fff"
    }
  },
  {
    id: "gl-draw-point-active",
    type: "circle",
    filter: [
      "all",
      ["==", "$type", "Point"],
      ["!=", "meta", "midpoint"],
      ["==", "active", "true"]
    ],
    paint: {
      "circle-radius": 2,
      "circle-color": "#fbb03b"
    }
  },
  {
    id: "gl-draw-polygon-fill-static",
    type: "fill",
    filter: ["all", ["==", "mode", "static"], ["==", "$type", "Polygon"]],
    paint: {
      "fill-color": "#404040",
      "fill-outline-color": "#404040",
      "fill-opacity": 0.1
    }
  },
  {
    id: "gl-draw-polygon-stroke-static",
    type: "line",
    filter: ["all", ["==", "mode", "static"], ["==", "$type", "Polygon"]],
    layout: {
      "line-cap": "round",
      "line-join": "round"
    },
    paint: {
      "line-color": "#404040",
      "line-width": 2
    }
  },
  {
    id: "gl-draw-line-static",
    type: "line",
    filter: ["all", ["==", "mode", "static"], ["==", "$type", "LineString"]],
    layout: {
      "line-cap": "round",
      "line-join": "round"
    },
    paint: {
      "line-color": "#404040",
      "line-width": 2
    }
  },
  {
    id: "gl-draw-point-static",
    type: "circle",
    filter: ["all", ["==", "mode", "static"], ["==", "$type", "Point"]],
    paint: {
      "circle-radius": 5,
      "circle-color": "#404040"
    }
  },
  // {
  //     'id': 'gl-draw-polygon-rotate-point',
  //     'type': 'circle',
  //     'filter': ['all',
  //         ['==', '$type', 'Point'],
  //         ['==', 'meta', 'rotate_point']],
  //     'paint': {
  //         'circle-radius': 5,
  //         'circle-color': '#fbb03b'
  //     }
  // },
  {
    id: "gl-draw-line-rotate-point",
    type: "line",
    filter: [
      "all",
      ["==", "meta", "midpoint"],
      ["==", "icon", "rotate"],
      ["==", "$type", "LineString"],
      ["!=", "mode", "static"]
    ],
    layout: {
      "line-cap": "round",
      "line-join": "round"
    },
    paint: {
      "line-color": "#fbb03b",
      "line-dasharray": [0.2, 2],
      "line-width": 2
    }
  },
  {
    id: "gl-draw-polygon-rotate-point-stroke",
    type: "circle",
    filter: [
      "all",
      ["==", "meta", "midpoint"],
      ["==", "icon", "rotate"],
      ["==", "$type", "Point"],
      ["!=", "mode", "static"]
    ],
    paint: {
      "circle-radius": 4,
      "circle-color": "#fff"
    }
  },
  {
    id: "gl-draw-polygon-rotate-point",
    type: "circle",
    filter: [
      "all",
      ["==", "meta", "midpoint"],
      ["==", "icon", "rotate"],
      ["==", "$type", "Point"],
      ["!=", "mode", "static"]
    ],
    paint: {
      "circle-radius": 2,
      "circle-color": "#fbb03b"
    }
  },
  {
    id: "gl-draw-polygon-rotate-point-icon",
    type: "symbol",
    filter: [
      "all",
      ["==", "meta", "midpoint"],
      ["==", "icon", "rotate"],
      ["==", "$type", "Point"],
      ["!=", "mode", "static"]
    ],
    layout: {
      "icon-image": "rotate",
      "icon-allow-overlap": true,
      "icon-ignore-placement": true,
      "icon-rotation-alignment": "map",
      "icon-rotate": ["get", "heading"]
    },
    paint: {
      "icon-opacity": 1,
      "icon-opacity-transition": {
        delay: 0,
        duration: 0
      }
    }
  }
];
var defaultOptions = {
  defaultMode: modes$1.SIMPLE_SELECT,
  keybindings: true,
  touchEnabled: true,
  clickBuffer: 2,
  touchBuffer: 25,
  boxSelect: true,
  displayControlsDefault: true,
  styles: SRStyle,
  modes,
  controls: {},
  userProperties: false
};
var showControls = {
  point: true,
  line_string: true,
  polygon: true,
  trash: true,
  combine_features: true,
  uncombine_features: true,
  srmode: true
};
var hideControls = {
  point: false,
  line_string: false,
  polygon: false,
  trash: false,
  combine_features: false,
  uncombine_features: false,
  srmode: false
};
function addSources(styles, sourceBucket) {
  return styles.map(function(style) {
    if (style.source) {
      return style;
    }
    return xtend(style, {
      id: style.id + "." + sourceBucket,
      source: sourceBucket === "hot" ? sources.HOT : sources.COLD
    });
  });
}
function setupOptions(options) {
  if (options === void 0) options = {};
  var withDefaults = xtend(options);
  if (!options.controls) {
    withDefaults.controls = {};
  }
  if (options.displayControlsDefault === false) {
    withDefaults.controls = xtend(hideControls, options.controls);
  } else {
    withDefaults.controls = xtend(showControls, options.controls);
  }
  withDefaults = xtend(defaultOptions, withDefaults);
  withDefaults.styles = addSources(withDefaults.styles, "cold").concat(addSources(withDefaults.styles, "hot"));
  return withDefaults;
}
var lodash_isequal = { exports: {} };
lodash_isequal.exports;
(function(module, exports) {
  var LARGE_ARRAY_SIZE = 200;
  var HASH_UNDEFINED = "__lodash_hash_undefined__";
  var COMPARE_PARTIAL_FLAG = 1, COMPARE_UNORDERED_FLAG = 2;
  var MAX_SAFE_INTEGER = 9007199254740991;
  var argsTag = "[object Arguments]", arrayTag = "[object Array]", asyncTag = "[object AsyncFunction]", boolTag = "[object Boolean]", dateTag = "[object Date]", errorTag = "[object Error]", funcTag = "[object Function]", genTag = "[object GeneratorFunction]", mapTag = "[object Map]", numberTag = "[object Number]", nullTag = "[object Null]", objectTag = "[object Object]", promiseTag = "[object Promise]", proxyTag = "[object Proxy]", regexpTag = "[object RegExp]", setTag = "[object Set]", stringTag = "[object String]", symbolTag = "[object Symbol]", undefinedTag = "[object Undefined]", weakMapTag = "[object WeakMap]";
  var arrayBufferTag = "[object ArrayBuffer]", dataViewTag = "[object DataView]", float32Tag = "[object Float32Array]", float64Tag = "[object Float64Array]", int8Tag = "[object Int8Array]", int16Tag = "[object Int16Array]", int32Tag = "[object Int32Array]", uint8Tag = "[object Uint8Array]", uint8ClampedTag = "[object Uint8ClampedArray]", uint16Tag = "[object Uint16Array]", uint32Tag = "[object Uint32Array]";
  var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;
  var reIsHostCtor = /^\[object .+?Constructor\]$/;
  var reIsUint = /^(?:0|[1-9]\d*)$/;
  var typedArrayTags = {};
  typedArrayTags[float32Tag] = typedArrayTags[float64Tag] = typedArrayTags[int8Tag] = typedArrayTags[int16Tag] = typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] = typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] = typedArrayTags[uint32Tag] = true;
  typedArrayTags[argsTag] = typedArrayTags[arrayTag] = typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] = typedArrayTags[dataViewTag] = typedArrayTags[dateTag] = typedArrayTags[errorTag] = typedArrayTags[funcTag] = typedArrayTags[mapTag] = typedArrayTags[numberTag] = typedArrayTags[objectTag] = typedArrayTags[regexpTag] = typedArrayTags[setTag] = typedArrayTags[stringTag] = typedArrayTags[weakMapTag] = false;
  var freeGlobal = typeof global == "object" && global && global.Object === Object && global;
  var freeSelf = typeof self == "object" && self && self.Object === Object && self;
  var root = freeGlobal || freeSelf || Function("return this")();
  var freeExports = exports && !exports.nodeType && exports;
  var freeModule = freeExports && true && module && !module.nodeType && module;
  var moduleExports = freeModule && freeModule.exports === freeExports;
  var freeProcess = moduleExports && freeGlobal.process;
  var nodeUtil = function() {
    try {
      return freeProcess && freeProcess.binding && freeProcess.binding("util");
    } catch (e2) {
    }
  }();
  var nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;
  function arrayFilter(array, predicate) {
    var index = -1, length = array == null ? 0 : array.length, resIndex = 0, result = [];
    while (++index < length) {
      var value = array[index];
      if (predicate(value, index, array)) {
        result[resIndex++] = value;
      }
    }
    return result;
  }
  function arrayPush(array, values) {
    var index = -1, length = values.length, offset = array.length;
    while (++index < length) {
      array[offset + index] = values[index];
    }
    return array;
  }
  function arraySome(array, predicate) {
    var index = -1, length = array == null ? 0 : array.length;
    while (++index < length) {
      if (predicate(array[index], index, array)) {
        return true;
      }
    }
    return false;
  }
  function baseTimes(n, iteratee) {
    var index = -1, result = Array(n);
    while (++index < n) {
      result[index] = iteratee(index);
    }
    return result;
  }
  function baseUnary(func) {
    return function(value) {
      return func(value);
    };
  }
  function cacheHas(cache, key) {
    return cache.has(key);
  }
  function getValue(object, key) {
    return object == null ? void 0 : object[key];
  }
  function mapToArray(map) {
    var index = -1, result = Array(map.size);
    map.forEach(function(value, key) {
      result[++index] = [key, value];
    });
    return result;
  }
  function overArg(func, transform) {
    return function(arg) {
      return func(transform(arg));
    };
  }
  function setToArray(set) {
    var index = -1, result = Array(set.size);
    set.forEach(function(value) {
      result[++index] = value;
    });
    return result;
  }
  var arrayProto = Array.prototype, funcProto = Function.prototype, objectProto = Object.prototype;
  var coreJsData = root["__core-js_shared__"];
  var funcToString = funcProto.toString;
  var hasOwnProperty2 = objectProto.hasOwnProperty;
  var maskSrcKey = function() {
    var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || "");
    return uid ? "Symbol(src)_1." + uid : "";
  }();
  var nativeObjectToString = objectProto.toString;
  var reIsNative = RegExp(
    "^" + funcToString.call(hasOwnProperty2).replace(reRegExpChar, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
  );
  var Buffer = moduleExports ? root.Buffer : void 0, Symbol = root.Symbol, Uint8Array = root.Uint8Array, propertyIsEnumerable = objectProto.propertyIsEnumerable, splice = arrayProto.splice, symToStringTag = Symbol ? Symbol.toStringTag : void 0;
  var nativeGetSymbols = Object.getOwnPropertySymbols, nativeIsBuffer = Buffer ? Buffer.isBuffer : void 0, nativeKeys = overArg(Object.keys, Object);
  var DataView = getNative(root, "DataView"), Map = getNative(root, "Map"), Promise2 = getNative(root, "Promise"), Set = getNative(root, "Set"), WeakMap = getNative(root, "WeakMap"), nativeCreate = getNative(Object, "create");
  var dataViewCtorString = toSource(DataView), mapCtorString = toSource(Map), promiseCtorString = toSource(Promise2), setCtorString = toSource(Set), weakMapCtorString = toSource(WeakMap);
  var symbolProto = Symbol ? Symbol.prototype : void 0, symbolValueOf = symbolProto ? symbolProto.valueOf : void 0;
  function Hash(entries) {
    var index = -1, length = entries == null ? 0 : entries.length;
    this.clear();
    while (++index < length) {
      var entry = entries[index];
      this.set(entry[0], entry[1]);
    }
  }
  function hashClear() {
    this.__data__ = nativeCreate ? nativeCreate(null) : {};
    this.size = 0;
  }
  function hashDelete(key) {
    var result = this.has(key) && delete this.__data__[key];
    this.size -= result ? 1 : 0;
    return result;
  }
  function hashGet(key) {
    var data = this.__data__;
    if (nativeCreate) {
      var result = data[key];
      return result === HASH_UNDEFINED ? void 0 : result;
    }
    return hasOwnProperty2.call(data, key) ? data[key] : void 0;
  }
  function hashHas(key) {
    var data = this.__data__;
    return nativeCreate ? data[key] !== void 0 : hasOwnProperty2.call(data, key);
  }
  function hashSet(key, value) {
    var data = this.__data__;
    this.size += this.has(key) ? 0 : 1;
    data[key] = nativeCreate && value === void 0 ? HASH_UNDEFINED : value;
    return this;
  }
  Hash.prototype.clear = hashClear;
  Hash.prototype["delete"] = hashDelete;
  Hash.prototype.get = hashGet;
  Hash.prototype.has = hashHas;
  Hash.prototype.set = hashSet;
  function ListCache(entries) {
    var index = -1, length = entries == null ? 0 : entries.length;
    this.clear();
    while (++index < length) {
      var entry = entries[index];
      this.set(entry[0], entry[1]);
    }
  }
  function listCacheClear() {
    this.__data__ = [];
    this.size = 0;
  }
  function listCacheDelete(key) {
    var data = this.__data__, index = assocIndexOf(data, key);
    if (index < 0) {
      return false;
    }
    var lastIndex = data.length - 1;
    if (index == lastIndex) {
      data.pop();
    } else {
      splice.call(data, index, 1);
    }
    --this.size;
    return true;
  }
  function listCacheGet(key) {
    var data = this.__data__, index = assocIndexOf(data, key);
    return index < 0 ? void 0 : data[index][1];
  }
  function listCacheHas(key) {
    return assocIndexOf(this.__data__, key) > -1;
  }
  function listCacheSet(key, value) {
    var data = this.__data__, index = assocIndexOf(data, key);
    if (index < 0) {
      ++this.size;
      data.push([key, value]);
    } else {
      data[index][1] = value;
    }
    return this;
  }
  ListCache.prototype.clear = listCacheClear;
  ListCache.prototype["delete"] = listCacheDelete;
  ListCache.prototype.get = listCacheGet;
  ListCache.prototype.has = listCacheHas;
  ListCache.prototype.set = listCacheSet;
  function MapCache(entries) {
    var index = -1, length = entries == null ? 0 : entries.length;
    this.clear();
    while (++index < length) {
      var entry = entries[index];
      this.set(entry[0], entry[1]);
    }
  }
  function mapCacheClear() {
    this.size = 0;
    this.__data__ = {
      "hash": new Hash(),
      "map": new (Map || ListCache)(),
      "string": new Hash()
    };
  }
  function mapCacheDelete(key) {
    var result = getMapData(this, key)["delete"](key);
    this.size -= result ? 1 : 0;
    return result;
  }
  function mapCacheGet(key) {
    return getMapData(this, key).get(key);
  }
  function mapCacheHas(key) {
    return getMapData(this, key).has(key);
  }
  function mapCacheSet(key, value) {
    var data = getMapData(this, key), size = data.size;
    data.set(key, value);
    this.size += data.size == size ? 0 : 1;
    return this;
  }
  MapCache.prototype.clear = mapCacheClear;
  MapCache.prototype["delete"] = mapCacheDelete;
  MapCache.prototype.get = mapCacheGet;
  MapCache.prototype.has = mapCacheHas;
  MapCache.prototype.set = mapCacheSet;
  function SetCache(values) {
    var index = -1, length = values == null ? 0 : values.length;
    this.__data__ = new MapCache();
    while (++index < length) {
      this.add(values[index]);
    }
  }
  function setCacheAdd(value) {
    this.__data__.set(value, HASH_UNDEFINED);
    return this;
  }
  function setCacheHas(value) {
    return this.__data__.has(value);
  }
  SetCache.prototype.add = SetCache.prototype.push = setCacheAdd;
  SetCache.prototype.has = setCacheHas;
  function Stack(entries) {
    var data = this.__data__ = new ListCache(entries);
    this.size = data.size;
  }
  function stackClear() {
    this.__data__ = new ListCache();
    this.size = 0;
  }
  function stackDelete(key) {
    var data = this.__data__, result = data["delete"](key);
    this.size = data.size;
    return result;
  }
  function stackGet(key) {
    return this.__data__.get(key);
  }
  function stackHas(key) {
    return this.__data__.has(key);
  }
  function stackSet(key, value) {
    var data = this.__data__;
    if (data instanceof ListCache) {
      var pairs = data.__data__;
      if (!Map || pairs.length < LARGE_ARRAY_SIZE - 1) {
        pairs.push([key, value]);
        this.size = ++data.size;
        return this;
      }
      data = this.__data__ = new MapCache(pairs);
    }
    data.set(key, value);
    this.size = data.size;
    return this;
  }
  Stack.prototype.clear = stackClear;
  Stack.prototype["delete"] = stackDelete;
  Stack.prototype.get = stackGet;
  Stack.prototype.has = stackHas;
  Stack.prototype.set = stackSet;
  function arrayLikeKeys(value, inherited) {
    var isArr = isArray3(value), isArg = !isArr && isArguments(value), isBuff = !isArr && !isArg && isBuffer(value), isType = !isArr && !isArg && !isBuff && isTypedArray(value), skipIndexes = isArr || isArg || isBuff || isType, result = skipIndexes ? baseTimes(value.length, String) : [], length = result.length;
    for (var key in value) {
      if ((inherited || hasOwnProperty2.call(value, key)) && !(skipIndexes && // Safari 9 has enumerable `arguments.length` in strict mode.
      (key == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
      isBuff && (key == "offset" || key == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
      isType && (key == "buffer" || key == "byteLength" || key == "byteOffset") || // Skip index properties.
      isIndex(key, length)))) {
        result.push(key);
      }
    }
    return result;
  }
  function assocIndexOf(array, key) {
    var length = array.length;
    while (length--) {
      if (eq(array[length][0], key)) {
        return length;
      }
    }
    return -1;
  }
  function baseGetAllKeys(object, keysFunc, symbolsFunc) {
    var result = keysFunc(object);
    return isArray3(object) ? result : arrayPush(result, symbolsFunc(object));
  }
  function baseGetTag(value) {
    if (value == null) {
      return value === void 0 ? undefinedTag : nullTag;
    }
    return symToStringTag && symToStringTag in Object(value) ? getRawTag(value) : objectToString(value);
  }
  function baseIsArguments(value) {
    return isObjectLike(value) && baseGetTag(value) == argsTag;
  }
  function baseIsEqual(value, other, bitmask, customizer, stack) {
    if (value === other) {
      return true;
    }
    if (value == null || other == null || !isObjectLike(value) && !isObjectLike(other)) {
      return value !== value && other !== other;
    }
    return baseIsEqualDeep(value, other, bitmask, customizer, baseIsEqual, stack);
  }
  function baseIsEqualDeep(object, other, bitmask, customizer, equalFunc, stack) {
    var objIsArr = isArray3(object), othIsArr = isArray3(other), objTag = objIsArr ? arrayTag : getTag(object), othTag = othIsArr ? arrayTag : getTag(other);
    objTag = objTag == argsTag ? objectTag : objTag;
    othTag = othTag == argsTag ? objectTag : othTag;
    var objIsObj = objTag == objectTag, othIsObj = othTag == objectTag, isSameTag = objTag == othTag;
    if (isSameTag && isBuffer(object)) {
      if (!isBuffer(other)) {
        return false;
      }
      objIsArr = true;
      objIsObj = false;
    }
    if (isSameTag && !objIsObj) {
      stack || (stack = new Stack());
      return objIsArr || isTypedArray(object) ? equalArrays(object, other, bitmask, customizer, equalFunc, stack) : equalByTag(object, other, objTag, bitmask, customizer, equalFunc, stack);
    }
    if (!(bitmask & COMPARE_PARTIAL_FLAG)) {
      var objIsWrapped = objIsObj && hasOwnProperty2.call(object, "__wrapped__"), othIsWrapped = othIsObj && hasOwnProperty2.call(other, "__wrapped__");
      if (objIsWrapped || othIsWrapped) {
        var objUnwrapped = objIsWrapped ? object.value() : object, othUnwrapped = othIsWrapped ? other.value() : other;
        stack || (stack = new Stack());
        return equalFunc(objUnwrapped, othUnwrapped, bitmask, customizer, stack);
      }
    }
    if (!isSameTag) {
      return false;
    }
    stack || (stack = new Stack());
    return equalObjects(object, other, bitmask, customizer, equalFunc, stack);
  }
  function baseIsNative(value) {
    if (!isObject2(value) || isMasked(value)) {
      return false;
    }
    var pattern = isFunction(value) ? reIsNative : reIsHostCtor;
    return pattern.test(toSource(value));
  }
  function baseIsTypedArray(value) {
    return isObjectLike(value) && isLength(value.length) && !!typedArrayTags[baseGetTag(value)];
  }
  function baseKeys(object) {
    if (!isPrototype(object)) {
      return nativeKeys(object);
    }
    var result = [];
    for (var key in Object(object)) {
      if (hasOwnProperty2.call(object, key) && key != "constructor") {
        result.push(key);
      }
    }
    return result;
  }
  function equalArrays(array, other, bitmask, customizer, equalFunc, stack) {
    var isPartial = bitmask & COMPARE_PARTIAL_FLAG, arrLength = array.length, othLength = other.length;
    if (arrLength != othLength && !(isPartial && othLength > arrLength)) {
      return false;
    }
    var stacked = stack.get(array);
    if (stacked && stack.get(other)) {
      return stacked == other;
    }
    var index = -1, result = true, seen = bitmask & COMPARE_UNORDERED_FLAG ? new SetCache() : void 0;
    stack.set(array, other);
    stack.set(other, array);
    while (++index < arrLength) {
      var arrValue = array[index], othValue = other[index];
      if (customizer) {
        var compared = isPartial ? customizer(othValue, arrValue, index, other, array, stack) : customizer(arrValue, othValue, index, array, other, stack);
      }
      if (compared !== void 0) {
        if (compared) {
          continue;
        }
        result = false;
        break;
      }
      if (seen) {
        if (!arraySome(other, function(othValue2, othIndex) {
          if (!cacheHas(seen, othIndex) && (arrValue === othValue2 || equalFunc(arrValue, othValue2, bitmask, customizer, stack))) {
            return seen.push(othIndex);
          }
        })) {
          result = false;
          break;
        }
      } else if (!(arrValue === othValue || equalFunc(arrValue, othValue, bitmask, customizer, stack))) {
        result = false;
        break;
      }
    }
    stack["delete"](array);
    stack["delete"](other);
    return result;
  }
  function equalByTag(object, other, tag, bitmask, customizer, equalFunc, stack) {
    switch (tag) {
      case dataViewTag:
        if (object.byteLength != other.byteLength || object.byteOffset != other.byteOffset) {
          return false;
        }
        object = object.buffer;
        other = other.buffer;
      case arrayBufferTag:
        if (object.byteLength != other.byteLength || !equalFunc(new Uint8Array(object), new Uint8Array(other))) {
          return false;
        }
        return true;
      case boolTag:
      case dateTag:
      case numberTag:
        return eq(+object, +other);
      case errorTag:
        return object.name == other.name && object.message == other.message;
      case regexpTag:
      case stringTag:
        return object == other + "";
      case mapTag:
        var convert = mapToArray;
      case setTag:
        var isPartial = bitmask & COMPARE_PARTIAL_FLAG;
        convert || (convert = setToArray);
        if (object.size != other.size && !isPartial) {
          return false;
        }
        var stacked = stack.get(object);
        if (stacked) {
          return stacked == other;
        }
        bitmask |= COMPARE_UNORDERED_FLAG;
        stack.set(object, other);
        var result = equalArrays(convert(object), convert(other), bitmask, customizer, equalFunc, stack);
        stack["delete"](object);
        return result;
      case symbolTag:
        if (symbolValueOf) {
          return symbolValueOf.call(object) == symbolValueOf.call(other);
        }
    }
    return false;
  }
  function equalObjects(object, other, bitmask, customizer, equalFunc, stack) {
    var isPartial = bitmask & COMPARE_PARTIAL_FLAG, objProps = getAllKeys(object), objLength = objProps.length, othProps = getAllKeys(other), othLength = othProps.length;
    if (objLength != othLength && !isPartial) {
      return false;
    }
    var index = objLength;
    while (index--) {
      var key = objProps[index];
      if (!(isPartial ? key in other : hasOwnProperty2.call(other, key))) {
        return false;
      }
    }
    var stacked = stack.get(object);
    if (stacked && stack.get(other)) {
      return stacked == other;
    }
    var result = true;
    stack.set(object, other);
    stack.set(other, object);
    var skipCtor = isPartial;
    while (++index < objLength) {
      key = objProps[index];
      var objValue = object[key], othValue = other[key];
      if (customizer) {
        var compared = isPartial ? customizer(othValue, objValue, key, other, object, stack) : customizer(objValue, othValue, key, object, other, stack);
      }
      if (!(compared === void 0 ? objValue === othValue || equalFunc(objValue, othValue, bitmask, customizer, stack) : compared)) {
        result = false;
        break;
      }
      skipCtor || (skipCtor = key == "constructor");
    }
    if (result && !skipCtor) {
      var objCtor = object.constructor, othCtor = other.constructor;
      if (objCtor != othCtor && ("constructor" in object && "constructor" in other) && !(typeof objCtor == "function" && objCtor instanceof objCtor && typeof othCtor == "function" && othCtor instanceof othCtor)) {
        result = false;
      }
    }
    stack["delete"](object);
    stack["delete"](other);
    return result;
  }
  function getAllKeys(object) {
    return baseGetAllKeys(object, keys2, getSymbols);
  }
  function getMapData(map, key) {
    var data = map.__data__;
    return isKeyable(key) ? data[typeof key == "string" ? "string" : "hash"] : data.map;
  }
  function getNative(object, key) {
    var value = getValue(object, key);
    return baseIsNative(value) ? value : void 0;
  }
  function getRawTag(value) {
    var isOwn = hasOwnProperty2.call(value, symToStringTag), tag = value[symToStringTag];
    try {
      value[symToStringTag] = void 0;
      var unmasked = true;
    } catch (e2) {
    }
    var result = nativeObjectToString.call(value);
    if (unmasked) {
      if (isOwn) {
        value[symToStringTag] = tag;
      } else {
        delete value[symToStringTag];
      }
    }
    return result;
  }
  var getSymbols = !nativeGetSymbols ? stubArray : function(object) {
    if (object == null) {
      return [];
    }
    object = Object(object);
    return arrayFilter(nativeGetSymbols(object), function(symbol) {
      return propertyIsEnumerable.call(object, symbol);
    });
  };
  var getTag = baseGetTag;
  if (DataView && getTag(new DataView(new ArrayBuffer(1))) != dataViewTag || Map && getTag(new Map()) != mapTag || Promise2 && getTag(Promise2.resolve()) != promiseTag || Set && getTag(new Set()) != setTag || WeakMap && getTag(new WeakMap()) != weakMapTag) {
    getTag = function(value) {
      var result = baseGetTag(value), Ctor = result == objectTag ? value.constructor : void 0, ctorString = Ctor ? toSource(Ctor) : "";
      if (ctorString) {
        switch (ctorString) {
          case dataViewCtorString:
            return dataViewTag;
          case mapCtorString:
            return mapTag;
          case promiseCtorString:
            return promiseTag;
          case setCtorString:
            return setTag;
          case weakMapCtorString:
            return weakMapTag;
        }
      }
      return result;
    };
  }
  function isIndex(value, length) {
    length = length == null ? MAX_SAFE_INTEGER : length;
    return !!length && (typeof value == "number" || reIsUint.test(value)) && (value > -1 && value % 1 == 0 && value < length);
  }
  function isKeyable(value) {
    var type = typeof value;
    return type == "string" || type == "number" || type == "symbol" || type == "boolean" ? value !== "__proto__" : value === null;
  }
  function isMasked(func) {
    return !!maskSrcKey && maskSrcKey in func;
  }
  function isPrototype(value) {
    var Ctor = value && value.constructor, proto = typeof Ctor == "function" && Ctor.prototype || objectProto;
    return value === proto;
  }
  function objectToString(value) {
    return nativeObjectToString.call(value);
  }
  function toSource(func) {
    if (func != null) {
      try {
        return funcToString.call(func);
      } catch (e2) {
      }
      try {
        return func + "";
      } catch (e$1) {
      }
    }
    return "";
  }
  function eq(value, other) {
    return value === other || value !== value && other !== other;
  }
  var isArguments = baseIsArguments(/* @__PURE__ */ function() {
    return arguments;
  }()) ? baseIsArguments : function(value) {
    return isObjectLike(value) && hasOwnProperty2.call(value, "callee") && !propertyIsEnumerable.call(value, "callee");
  };
  var isArray3 = Array.isArray;
  function isArrayLike(value) {
    return value != null && isLength(value.length) && !isFunction(value);
  }
  var isBuffer = nativeIsBuffer || stubFalse;
  function isEqual2(value, other) {
    return baseIsEqual(value, other);
  }
  function isFunction(value) {
    if (!isObject2(value)) {
      return false;
    }
    var tag = baseGetTag(value);
    return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
  }
  function isLength(value) {
    return typeof value == "number" && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
  }
  function isObject2(value) {
    var type = typeof value;
    return value != null && (type == "object" || type == "function");
  }
  function isObjectLike(value) {
    return value != null && typeof value == "object";
  }
  var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;
  function keys2(object) {
    return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
  }
  function stubArray() {
    return [];
  }
  function stubFalse() {
    return false;
  }
  module.exports = isEqual2;
})(lodash_isequal, lodash_isequal.exports);
var lodash_isequalExports = lodash_isequal.exports;
var isEqual = getDefaultExportFromCjs(lodash_isequalExports);
function stringSetsAreEqual(a, b) {
  if (a.length !== b.length) {
    return false;
  }
  return JSON.stringify(a.map(function(id) {
    return id;
  }).sort()) === JSON.stringify(b.map(function(id) {
    return id;
  }).sort());
}
var featureTypes = {
  Polygon,
  LineString,
  Point: Point$2,
  MultiPolygon: MultiFeature,
  MultiLineString: MultiFeature,
  MultiPoint: MultiFeature
};
function setupAPI(ctx, api) {
  api.modes = modes$1;
  api.getFeatureIdsAt = function(point2) {
    var features = featuresAt.click({ point: point2 }, null, ctx);
    return features.map(function(feature2) {
      return feature2.properties.id;
    });
  };
  api.getSelectedIds = function() {
    return ctx.store.getSelectedIds();
  };
  api.getSelected = function() {
    return {
      type: geojsonTypes.FEATURE_COLLECTION,
      features: ctx.store.getSelectedIds().map(function(id) {
        return ctx.store.get(id);
      }).map(function(feature2) {
        return feature2.toGeoJSON();
      })
    };
  };
  api.getSelectedPoints = function() {
    return {
      type: geojsonTypes.FEATURE_COLLECTION,
      features: ctx.store.getSelectedCoordinates().map(function(coordinate) {
        return {
          type: geojsonTypes.FEATURE,
          properties: {},
          geometry: {
            type: geojsonTypes.POINT,
            coordinates: coordinate.coordinates
          }
        };
      })
    };
  };
  api.set = function(featureCollection) {
    if (featureCollection.type === void 0 || featureCollection.type !== geojsonTypes.FEATURE_COLLECTION || !Array.isArray(featureCollection.features)) {
      throw new Error("Invalid FeatureCollection");
    }
    var renderBatch = ctx.store.createRenderBatch();
    var toDelete = ctx.store.getAllIds().slice();
    var newIds = api.add(featureCollection);
    var newIdsLookup = new StringSet(newIds);
    toDelete = toDelete.filter(function(id) {
      return !newIdsLookup.has(id);
    });
    if (toDelete.length) {
      api.delete(toDelete);
    }
    renderBatch();
    return newIds;
  };
  api.add = function(geojson) {
    var featureCollection = JSON.parse(JSON.stringify(normalize$1(geojson)));
    var ids = featureCollection.features.map(function(feature2) {
      feature2.id = feature2.id || hat$1();
      if (feature2.geometry === null) {
        throw new Error("Invalid geometry: null");
      }
      if (ctx.store.get(feature2.id) === void 0 || ctx.store.get(feature2.id).type !== feature2.geometry.type) {
        var Model = featureTypes[feature2.geometry.type];
        if (Model === void 0) {
          throw new Error("Invalid geometry type: " + feature2.geometry.type + ".");
        }
        var internalFeature = new Model(ctx, feature2);
        ctx.store.add(internalFeature);
      } else {
        var internalFeature$1 = ctx.store.get(feature2.id);
        internalFeature$1.properties = feature2.properties;
        if (!isEqual(internalFeature$1.getCoordinates(), feature2.geometry.coordinates)) {
          internalFeature$1.incomingCoords(feature2.geometry.coordinates);
        }
      }
      return feature2.id;
    });
    ctx.store.render();
    return ids;
  };
  api.get = function(id) {
    var feature2 = ctx.store.get(id);
    if (feature2) {
      return feature2.toGeoJSON();
    }
  };
  api.getAll = function() {
    return {
      type: geojsonTypes.FEATURE_COLLECTION,
      features: ctx.store.getAll().map(function(feature2) {
        return feature2.toGeoJSON();
      })
    };
  };
  api.delete = function(featureIds) {
    ctx.store.delete(featureIds, { silent: true });
    if (api.getMode() === modes$1.DIRECT_SELECT && !ctx.store.getSelectedIds().length) {
      ctx.events.changeMode(modes$1.SIMPLE_SELECT, void 0, { silent: true });
    } else {
      ctx.store.render();
    }
    return api;
  };
  api.deleteAll = function() {
    ctx.store.delete(ctx.store.getAllIds(), { silent: true });
    if (api.getMode() === modes$1.DIRECT_SELECT) {
      ctx.events.changeMode(modes$1.SIMPLE_SELECT, void 0, { silent: true });
    } else {
      ctx.store.render();
    }
    return api;
  };
  api.changeMode = function(mode, modeOptions) {
    if (modeOptions === void 0) modeOptions = {};
    if (mode === modes$1.SIMPLE_SELECT && api.getMode() === modes$1.SIMPLE_SELECT) {
      if (stringSetsAreEqual(modeOptions.featureIds || [], ctx.store.getSelectedIds())) {
        return api;
      }
      ctx.store.setSelected(modeOptions.featureIds, { silent: true });
      ctx.store.render();
      return api;
    }
    if (mode === modes$1.DIRECT_SELECT && api.getMode() === modes$1.DIRECT_SELECT && modeOptions.featureId === ctx.store.getSelectedIds()[0]) {
      return api;
    }
    ctx.events.changeMode(mode, modeOptions, { silent: true });
    return api;
  };
  api.getMode = function() {
    return ctx.events.getMode();
  };
  api.trash = function() {
    ctx.events.trash({ silent: true });
    return api;
  };
  api.combineFeatures = function() {
    ctx.events.combineFeatures({ silent: true });
    return api;
  };
  api.uncombineFeatures = function() {
    ctx.events.uncombineFeatures({ silent: true });
    return api;
  };
  api.setFeatureProperty = function(featureId, property, value) {
    ctx.store.setFeatureProperty(featureId, property, value);
    return api;
  };
  return api;
}
var lib = Object.freeze({
  __proto__: null,
  CommonSelectors: common_selectors,
  constrainFeatureMovement,
  createMidPoint: createMidpoint,
  createSupplementaryPoints,
  createVertex,
  doubleClickZoom,
  euclideanDistance,
  featuresAt,
  getFeatureAtAndSetCursors,
  isClick,
  isEventAtCoordinates,
  isTap,
  mapEventToBoundingBox,
  ModeHandler,
  moveFeatures,
  sortFeatures,
  stringSetsAreEqual,
  StringSet,
  theme,
  toDenseArray
});
var setupDraw = function(options, api) {
  options = setupOptions(options);
  var ctx = {
    options
  };
  api = setupAPI(ctx, api);
  ctx.api = api;
  var setup = runSetup(ctx);
  api.onAdd = setup.onAdd;
  api.onRemove = setup.onRemove;
  api.types = types$1;
  api.options = options;
  return api;
};
function MapboxDraw(options) {
  setupDraw(options, this);
}
MapboxDraw.modes = modes;
MapboxDraw.constants = Constants;
MapboxDraw.lib = lib;
export {
  MapboxDraw as default
};
//# sourceMappingURL=maplibre-gl-draw.js.map
