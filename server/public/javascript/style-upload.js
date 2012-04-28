function styleUploadForm(img_width, img_height) {
    //create the css style sheet...we'll style the upload form using this style
    //sheet
    var style = document.createElement('style');
    style.type = 'text/css';

    document.getElementsByTagName('head')[0].appendChild(style);

    style.innerHTML = 'body {margin: 0px; padding: 0px}';
    style.innerHTML = style.innerHTML + 'li { display: inline; list-style-type: none; padding-right: 20px; padding: 0.5em 1em;}';
    style.innerHTML = style.innerHTML + '#label_list {display: inline; padding-left:0px}';
    style.innerHTML = style.innerHTML + '#filedrag {width: ' + img_width + 'px; height: ' + img_height + 'px; border: 1px solid;}';
    style.innerHTML = style.innerHTML + '#image {display: inline-block}';
    style.innerHTML = style.innerHTML + '#fileselect {display: none}';
    style.innerHTML = style.innerHTML + '#submitbutton {float: left}';
}
