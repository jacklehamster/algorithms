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
    for (var i = 1; i < arrLines.length; i++) {
        var curLine = arrLines[i];
//        console.log("Line #" + (i + 1) + " is: '" + curLine + "'");
        processLine(i, curLine);
    }
}

function process(output) {
    document.getElementById("result").innerHTML = "";
    var lines = output.split("\n");
    var numCase = parseInt(lines.shift());
    for(var l=0;l<numCase;l++) {
        var line = lines.shift();
        processLine(l+1,line);
    }
}

var lineInfo = "";

function processLine(caseNumber,line) {
    var split = line.split(" ");
    lineInfo = "#"+caseNumber+": "+line;
    var result = solve.apply(null,split);
    cout("Case #"+caseNumber+": "+result);
}

function cout(str) {
    console.log(str);
    document.getElementById("result").innerHTML += str + "\n";
}
