import { Dom } from "./dom"



$(document).ready(()=>{
    $('#gameForm').submit(e=>{
        e.preventDefault();
        fetch('../shipData.json')
            .then(res => res.json())
            .then(data => new Dom(data));
    })
})