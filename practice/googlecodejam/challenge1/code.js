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
    var numCase = parseInt(lines[0]);
    for(var l=0;l<numCase;l++) {
        var line = lines[l+1];
        processLine(l+1,line);
//        console.log(line);
    }
}

function processLine(caseNumber,line) {
    console.log(line);
    var split = line.split(" ");
    var maxShy = parseInt(split[0]);
    var invites = 0;
    var clapCount = 0;
    for(var i=0;i<=maxShy;i++) {
        if(i>clapCount) {
            invites++;
            clapCount++;
        }
        clapCount += parseInt(split[1].charAt(i));
    }
    console.log(invites);
    cout("Case #"+caseNumber+": "+invites);
}

function cout(str) {
    document.getElementById("result").innerHTML += str + "\n";
}