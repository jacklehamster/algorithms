/**
    input.js

    CODING PRACTICE
    Vincent Le Quang
    April 18, 2015
*/

function formatOutput(type,result) {
    switch(type) {
        case "array":
            return result.join(" ");
            break;
    }
}

function getInput(type,input) {
    switch(type) {
        case "array":
            return input.value.split(" ");
            break;
        case "integer":
            return parseInt(input.value);
            break;
    }    
}

function createInput(type) {
    switch(type) {
        case "array":
            return createArrayInput();
            break;
        case "integer":
            return createIntegerInput();
            break;
    }
    
    
    
    
    function createArrayInput() {
        var a = [];
        for(var i=0;i<20;i++) {
            a.push(Math.floor(Math.random()*100));
        }
        var input = document.createElement("input");
        input.type = "text";
        input.size = 100;
        input.value = a.join(" ");
        return input;
    }
    
    function createIntegerInput() {
        var input = document.createElement("input");
        input.type = "text";
        input.size = 8;
        input.value = Math.floor(Math.random()*20);
        return input;
    }
}
    
