function solve(number) {
    var split = number.split("").map(function(a) {return parseInt(a);});
    for(var i=0;i<split.length-1;i++) {
        if(split[i]>split[i+1]) {
            split[i]--;
            for(var j=i+1;j<split.length;j++) {
                split[j] = 9;
            }
            for(var j=i;j>=1;j--) {
                if(split[j-1]>split[j]) {
                    split[j-1]--;
                    split[j] = 9;
                }
            }
            for(var j=0;j<split.length;j++) {
                if(split[j]===0) {
                    split[j] = "";
                } else {
                    break;
                }
            }
            return split.join("");
        }
    }
    return number;
}


/*
 132 => 129
 129

 1000
 999


 1463 => 1459
 4280 => 3999
 */