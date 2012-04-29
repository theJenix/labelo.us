const widgets = require("widget");
const tabs = require("tabs");
const cm   = require("context-menu");
const data = require("self").data;

var width  = 360;
var height = 180;

var thumb_width  = width / 2;
var thumb_height = height - 60;

var baseURL = 'http://localhost:3000/upload';
function createLabelousPanel(url, styleJs) {
    console.log('Creating a panel with url: ' + url);
    var panel = require("panel").Panel({
        width: width,
        height: height,
        contentURL: url,
        contentScriptFile: data.url(styleJs)
    });
    panel.on("show", function() {
        panel.port.emit("show", thumb_width, thumb_height);
    });
    return panel;
}

var widgetPanel = createLabelousPanel(baseURL);
var widget = widgets.Widget({
  id: "labelous-widget",
  label: "Labelo.us",
  contentURL: "http://www.mozilla.org/favicon.ico",
  panel: createLabelousPanel(baseURL)
});

cm.Item({
  label: "Send to labelo.us...",
  context: cm.SelectorContext("img"),
  contentScript: 'self.on("click", function (node, data) {' +
                 '  self.postMessage(node.src);' +
                 '});',
  onMessage: function (imgSrc) {
    openTagAndSave(imgSrc);
  }
});

cm.Item({
  label: "Search in labelo.us...",
  context: cm.SelectionContext(),
  contentScript: 'self.on("click", function (node, data) {' +
                 '  self.postMessage(node.src);' +
                 '});',
  onMessage: function (text) {
    openSearch(text);
  }
});

openTagAndSave = function(imageSrc) {
 
    var panel = createLabelousPanel(baseURL + '?url=' + imageSrc, 'style-upload.js');
    panel.show();
}

openSearch = function(text) {
 
    var panel = createLabelousPanel(baseURL + '?search=' + text, 'style-search.js');
    panel.show();
}
console.log("The add-on is running.");
