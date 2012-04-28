/*
 * Javascript classes to install and support HTML5 Image support
 * This support includes:
 *  Image select w/ preview
 *  Drag and drop w/ preview
 *
 */
function InstallHTML5ImageDragDrop(drag_div_id, image_id) {

    var imagediv = $("#" + image_id);
    var filedrag = $("#" + drag_div_id);  
    
    if (!window.File || !window.FileList || !window.FileReader || !imagediv || !filedrag) {
        return;
    }

    // is XHR2 available?  
    var xhr = new XMLHttpRequest();  
    if (xhr.upload) {
        var _this = this;
        // file drop  
        filedrag.on("dragover",  FileDragHover);  
        filedrag.on("dragleave", FileDragHover);  
        filedrag.on("drop",      function(e) {
            FileSelectHandler(e, function(e, file) {
                OnImageDrop(e, file, imagediv);
            });
        });
        //filedrag.style.display = "block";  
        // remove submit button  
    //            submitbutton.style.display = "none";  
    }
}

function InstallHTML5ImageSelect(select_input_id, image_id, click_div_id) {
    var imagediv   = $("#" + image_id);
    var fileselect = $("#" + select_input_id);  
    
    if (!window.File || !window.FileList || !window.FileReader || !imagediv || !fileselect) {
        return;
    }


    // file select  
    fileselect.on("change", function(e) {
        FileSelectHandler(e, function(e, file) {
            OnImageDrop(e, file, imagediv);
        });
    });
    
    if (click_div_id) {
        var clickdiv = $("#" + click_div_id);
        clickdiv.on("click", function(e) {
            fileselect.click();
        });
    }
}

function OnImageDrop(e, file, image) {
    // Render thumbnail.
    this.image.attr("src", e.target.result);
//              var span = document.createElement('span');
//              span.innerHTML = ['<img class="thumb" src="', e.target.result,
//                                '" title="', escape(theFile.name), '"/>'].join('');
//              document.getElementById('list').insertBefore(span, null);

}

/*** Generic File Handler methods ***/

//  
// output information  
function Output(msg) {  
    var m = $("#messages");  
    m.html(msg + m.html());
} 

// file drag hover  
function FileDragHover(e) {  
    e.stopPropagation();  
    e.preventDefault();  
    e.target.className = (e.type == "dragover" ? "hover" : "");  
}  

// file selection  
function FileSelectHandler(e, file_load_func) {  
    e = e.originalEvent || e;
    // cancel event and hover styling  
    FileDragHover(e);  
    // fetch FileList object  

    var files = e.target.files || e.dataTransfer.files;  
    // process all File objects  
    for (var i = 0,
            f; f = files[i];
            i++) {  
      var reader = new FileReader();

      // Closure to capture the file information.
      reader.onload = (function(theFile) {
        return function(e) {
            file_load_func(e, theFile);
        };
      })(f);

      // Read in the image file as a data URL.
      reader.readAsDataURL(f);

    }  
}  

function ParseFile(file) {  
    Output(  
        "<p>File information: <strong>" + file.name +  
        "</strong> type: <strong>" + file.type +  
        "</strong> size: <strong>" + file.size +  
        "</strong> bytes</p>"  
    );  
}
