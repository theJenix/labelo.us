
    function getUrlVars()
    {
        var vars = [], hash;
        var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
        for(var i = 0; i < hashes.length; i++)
        {
            hash = hashes[i].split('=');
            vars.push(hash[0]);
            vars[hash[0]] = hash[1];
        }
        return vars;
    }

    function PresetUrl(image_id) {
        var vars = getUrlVars();
        $('#' + image_id).attr("src", vars['url']);
    }

    function label_input_keypress(e) {
        var input = $('#label_input');
        var code = e.keyCode || e.charCode;
        if (code == 13 || code == 32 || code == 33 || code == 44 || code == 46 || code == 63) {
            var label_text = input.val();
            if (label_text != '') {
                add_label(label_text);
                input.val('');
            }
            e.preventDefault(); 
        }
    }

    function add_label(label_text) {
        var label = $('<li>');
        label.on("click", function(e) {
            label.remove();
        });
        label.text(label_text);
        $('#label_list').append(label);
    }
