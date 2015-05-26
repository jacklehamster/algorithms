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
        var line2 = lines.shift();
        processLine(l+1,line,line2);
    }
}


function processLine(caseNumber,line,line2) {
    console.log("#"+caseNumber,line2);
    var D = parseInt(line);
    var split = line2.split(" ").map(function(n){return parseInt(n);});
    
    var bestMin = Number.MAX_VALUE;
    for(var i=1;i<=1000;i++) {
        var count = 0;
        var plates = split.concat();
        for(var j=0;j<plates.length;j++) {
            while(plates[j]>i) {
                plates[j]-=i;
                plates.push(i);
                count++;
            }
        }
        var min = count + i;
        if(min<bestMin) {
            bestMin = min;
        }
    }
    
    var result = bestMin;
    

    cout("Case #"+caseNumber+": "+result);
}



function cout(str) {
    console.log(str);
    document.getElementById("result").innerHTML += str + "\n";
}