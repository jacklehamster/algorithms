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
        var keys = lines.shift();
        var target = lines.shift();
        processLine(l+1,line,keys,target);
    }
}

var lineInfo = "";

function processLine(caseNumber,line,keys,target) {
    var split = line.split(" ");
    lineInfo = "#"+caseNumber+": "+line+","+keys+","+target;
    console.log(lineInfo);
    var result = solve(line,keys,target);
    cout("Case #"+caseNumber+": "+result);
}


var count = 0;
var total = 0;
var maxbanana = 0;
function solve(line,keys,target) {
    var split = line.split(" ");
    var charCount = parseInt(split[2]);
    total = 0;
    count = 0;
    maxbanana = 0;
    monkey(charCount,keys.split(""),target,[]);
    var value = (Math.round((maxbanana - count/total)*10000000)/10000000);
    return value + (value==Math.round(value)?".0":"");
}

function countOccurences(string,sub) {
    var split1 = string.split("");
    var sub1 = sub.split("");
    var count = 0;
    for(var i=0;i<split1.length-sub1.length+1;i++) {
        var match = true;
        for(var j=0;j<sub1.length;j++) {
            if(split1[i+j]!=sub1[j]) {
                match = false;
                break;
            }
        }
        if(match) {
            count++;
        }
    }
    return count;
}

function monkey(charCount,keys,target,array) {
    if(array.length==charCount) {
        var occurences = countOccurences(array.join(""),target);
        maxbanana = Math.max(occurences,maxbanana);
        count += occurences;
        total++;
        return;
    }
    for(var i=0;i<keys.length;i++) {
        array.push(keys[i]);
        monkey(charCount,keys,target,array);
        array.pop();
    }
}

function cout(str) {
    console.log(str);
    document.getElementById("result").innerHTML += str + "\n";
}