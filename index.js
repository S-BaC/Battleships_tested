import { Dom } from "./dom"

let data = {
    shipTypes: {
        carrier: 5,
        canoe: 2,
        submarine: 3
    }
}

$(document).ready(()=>{
    $('#gameForm').submit(e=>{
        e.preventDefault();
        new Dom(data);
    })
})