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
    var lines = output.split("\n");
    var numCase = parseInt(lines.shift());
    for(var l=0;l<numCase;l++) {
        var line = lines.shift();
        processLine(l+1,line);
//        console.log(line);
    }
}

var lineInfo = "";

function processLine(caseNumber,line) {
    var split = line.split(" ");
    lineInfo = "#"+caseNumber+": "+line;
    console.log(lineInfo);
    var result = solve(parseInt(line));
    cout("Case #"+caseNumber+": "+result);
}

var mem = {};
var Q = [1];
var level = 1;
function solve(number) {
    
    while(Q.length) {
        var newQ = [];
        while(Q.length) {
            var n = Q.pop();
            if(!mem[n]) {
                mem[n] = level;
                newQ.push(n+1,flip(n));
            }
        }
        Q = newQ;
        level++;
        if(mem[number]) {
            return mem[number];
        }        
    }
    return 0;
}

function flip(number) {
    var str = number.toString().split("");
    return parseInt(str.reverse().join(""));
}

function cout(str) {
    console.log(str);
    document.getElementById("result").innerHTML += str + "\n";
}