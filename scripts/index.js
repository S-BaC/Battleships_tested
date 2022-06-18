import { Dom } from "./Dom.js"


$(document).ready(()=>{
    console.log('ready');
    $('form').submit(e=>{
        e.preventDefault();
        fetch('../shipData.json')
            .then(res => res.json())
            .then(data => new Dom(data));
        $('#gameForm')[0].classList.add('hidden');
        $('.ships')[0].classList.remove('hidden');
        $('.gameboards')[0].classList.remove('hidden');
    })
})

// console.log('hello');