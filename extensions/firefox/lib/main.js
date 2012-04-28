const widgets = require("widget");
const tabs = require("tabs");
const cm   = require("context-menu");
const data = require("self").data;

var widget = widgets.Widget({
  id: "mozilla-link",
  label: "Mozilla website",
  contentURL: "http://www.mozilla.org/favicon.ico",
  onClick: function() {
    tabs.open("http://www.mozilla.org/");
  }
});

cm.Item({
  label: "Save Image",
  context: cm.SelectorContext("img"),
  contentScript: 'self.on("click", function (node, data) {' +
                 '  self.postMessage(node.src);' +
                 '});',
  onMessage: function (imgSrc) {
    openTagAndSave(imgSrc);
  }
});

openTagAndSave = function(imageSrc) {
 
    var panel = require("panel").Panel({
        width: 360,
        height: 180,
        contentURL: data.url('tag-and-save.html'),
        contentScriptFile: data.url('tag-and-save.js')
    });
 
    panel.on("show", function() {
        panel.port.emit("show", imageSrc);
    });
 
    panel.show();
}
console.log("The add-on is running.");
