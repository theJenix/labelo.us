const widgets = require("widget");
const tabs = require("tabs");
const cm   = require("context-menu");
const data = require("self").data;

var baseURL = 'http://localhost:3000/upload';
function createLabelousPanel(url) {
    console.log('Creating a panel with url: ' + url);
    var panel = require("panel").Panel({
        width: 360,
        height: 180,
        contentURL: url,
        contentScriptFile: data.url('style-upload.js')
    });
    panel.on("show", function() {
        panel.port.emit("show");
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

openTagAndSave = function(imageSrc) {
 
    var panel = createLabelousPanel(baseURL + "?url=" + imageSrc);
    panel.show();
}
console.log("The add-on is running.");
