//const express = require('express');
//const path = require('path');
//const PORT = 5000;

function test() {
    var weight = document.getElementById("weight").value;
    console.log(weight);

    var type = document.getElementById("mailType").value;
    console.log(type);

    var postage = calcPostage(weight, type);

    console.log(postage);
}

function calcPostage(weight, type) {
    var tWeight = Math.trunc(weight);
    var postage=0;
    if(tWeight!=0){
        tWeight-=1;
    }

    if (type == "stamped") {
        postage = 0.55 + tWeight * 0.15;
        if (weight < 3.5 && weight > 3) {
            postage += 0.15;
        }
    } else if (type == "metered") {
        postage = 0.5 + tWeight * 0.15;
        if (weight < 3.5 && weight > 3) {
            postage += 0.15;
        }
    } else if (type == "flat") {
        postage = 1 + tWeight * 0.15;
    } else if (type == "package") {
        if(tWeight<3){
            postage=3.66;
        }else if(tWeight<7){
            postage=4.39;
        }else if(tWeight<13){
            postage=5.19;
        }else{
            postage=5.71;
        }
    }

    return postage;
}