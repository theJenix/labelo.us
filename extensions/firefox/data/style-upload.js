self.port.on("show", function(arg) {
    //create the css style sheet...we'll style the upload form using this style
    //sheet
    var style = document.createElement('style');
    style.type = 'text/css';

    document.getElementsByTagName('head')[0].appendChild(style);

    style.innerHTML = 'body {margin: 0px; padding: 0px}';
    style.innerHTML = style.innerHTML + 'li { display: inline; list-style-type: none; padding-right: 20px; }';
    style.innerHTML = style.innerHTML + '#label_list {display: inline}';
    style.innerHTML = style.innerHTML + '#image {display: inline-block}';
    style.innerHTML = style.innerHTML + '#fileselect {display: none}';
    style.innerHTML = style.innerHTML + '#submitbutton {float: left}';
});
