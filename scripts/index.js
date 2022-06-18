//  The script to link html with all script files.

import { Dom } from "./Dom.js"

let domObj; // The DOM class.

$(document).ready(()=>{
    $('form').submit(e=>{
        e.preventDefault();

        // Gets data from the json file and starts the program.
        fetch('../shipData.json')
            .then(res => res.json())
            .then(data => {
                domObj = new Dom(data);
                domObj.initialize();
                domObj.setupListeners();
            });
        $('#gameForm')[0].classList.add('hidden');
        $('.ships')[0].classList.remove('hidden');
        $('.gameboards')[0].classList.remove('hidden');
    })
})