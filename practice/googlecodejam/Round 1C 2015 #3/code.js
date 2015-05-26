		var reader = new FileReader();

		function readText(that){

			if(that.files && that.files[0]){
				var reader = new FileReader();
				reader.onload = function (e) {  
					var output=e.target.result;
				

                    process(output);
//                    console.log(output);
				};//end onload()
				reader.readAsText(that.files[0]);
			}//end if html5 filelist support
		} 


function LoadFile() {
    var oFrame = document.getElementById("frmFile");
    var strRawContents = oFrame.contentWindow.document.body.childNodes[0].innerHTML;
    while (strRawContents.indexOf("\r") >= 0)
        strRawContents = strRawContents.replace("\r", "");
    var arrLines = strRawContents.split("\n");
    console.log("File " + oFrame.src + " has " + arrLines.length + " lines");
    for (var i = 0; i < arrLines.length; i++) {
        var curLine = arrLines[i];
        console.log("Line #" + (i + 1) + " is: '" + curLine + "'");
    }
}

function process(output) {
    document.getElementById("result").innerHTML = "";
    var lines = output.split("\n");
    var numCase = parseInt(lines.shift());
    for(var l=0;l<numCase;l++) {
        var line = lines.shift();
        var coins = lines.shift();
        processLine(l+1,line,coins);
    }
}

var lineInfo = "";

function processLine(caseNumber,line,coins) {
    var split = line.split(" ").map(function(n) {return parseInt(n);});
//    console.log(coins);
    coins = coins.split(" ").map(function(n) {return parseInt(n);});
//    console.log(coins);
    var maxCoins = split[0];
    var value = split[2];
    lineInfo = "#"+caseNumber+": "+line;
    console.log(lineInfo,coins);
    var result = solve(coins,maxCoins,value);
    cout("Case #"+caseNumber+": "+result);
}


function solve(coins,maxCoins,value) {
    /// create combos
    var hashCoin = new Array(value);
    var combos = [];
    for(var i=0;i<coins.length;i++) {
        hashCoin[coins[i]] = true;
        for(var c=1;c<=maxCoins;c++) {
            combos.push({
                mul:c,
                val:coins[i]
            });
        }
    }
//    console.log(combos);
    var coinMap = new Array(value);
    combine(combos,coinMap,0,{},value);
    
    var missing = [];
    for(var i=0;i<=value;i++) {
        if(!coinMap[i]) {
            missing.push(i);
        }
    }
    
//    console.log("missing",missing);
    if(!missing.length)
        return 0;
    
    var thingsToAdd = [];
    for(var i=1;i<=value;i++) {
        if(!hashCoin[i]) {
            var cc = [];
            for(var c=1;c<=maxCoins;c++) {
                cc.push({
                    mul:c,
                    val:i
                });
            }
            thingsToAdd.push(cc);
        }
    }

    
    var orgCoinMap = coinMap;
    for(var lNeed=1;lNeed<=missing.length;lNeed++) {
        for(var i=0;i<thingsToAdd.length;i++) {
            coinMap = orgCoinMap.concat([]);
            doCount = 0;
            combine(combos.concat(thingsToAdd[i]),coinMap,0,{},value);
            //console.log(">>>",thingsToAdd[i][0].val,doCount);
            if(doCount>=missing.length) {
                return lNeed;
            }
        }
    }
    
    //  fill out missing blanks
    
//    console.log(">",missing);
    return 0;
}

var doCount = 0;
function combine(combos,coinMap,amount,usedValues,value) {
    if(!coinMap[amount]) {
        coinMap[amount] = 1;
        doCount++;
    }
    for(var i=0;i<combos.length;i++) {
        var val = combos[i].val;
        var mul = combos[i].mul;
//        console.log("$",amount,val,mul,"<=",value);
        if(!usedValues[val] && amount+val*mul<=value) {
            usedValues[val] = true;
            combine(combos,coinMap,amount+val*mul,usedValues,value);
            delete usedValues[val];
        }
    }
}

function cout(str) {
    console.log(str);
    document.getElementById("result").innerHTML += str + "\n";
}