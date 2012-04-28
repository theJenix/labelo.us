
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
        if ( e.keyCode == 13 || e.keyCode == 32 || e.keyCode == 44) {
            var label_text = $('#label_input').val();
            add_label(label_text);
            $('#label_input').val('');
            e.preventDefault(); 
        }
    }

    function add_label(label_text) {
        var label = $('<li>');
        label.text(label_text);
        $('#label_list').append(label);
    }
