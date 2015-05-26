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

var mem = {1:1};
var heap = new Heap();
heap.insert(1);
var solution = {1:1};

function solve(number) {

    function heuristic(n) {
        return Math.abs(number-n);
    }
    
    //  we change the heap function, so reheap everything
    var newHeap = new Heap();
    newHeap.compare = function(n1,n2) {
        return (mem[n1]+heuristic(n1))-(mem[n2]+heuristic(n2));
    }
    var array = heap.getArray();
    for(var i=0;i<array.length;i++) {
        newHeap.insert(array[i]);
    }
    heap = newHeap;
    
    while(!solution[number]) {
        var n = heap.retrieve();
        var level = mem[n];
//        console.log(n,level,level+heuristic(n));
        var children = [n+1,flip(n)];
        for(var i=0;i<children.length;i++) {
            var child = children[i];
            if(!solution[child]) {
                if(!mem[child]) {
                    mem[child] = level+1;
                    heap.insert(child);
                }
                else if(level+1<mem[child]) {
                    mem[child] = level+1;
                    if(!heap.modify(child)) {
                        heap.insert(child);
                    }
                }
            }
        }
        solution[n] = mem[n];
    }
    return solution[number];
}

function flip(number) {
    var str = number.toString().split("");
    return parseInt(str.reverse().join(""));
}

function cout(str) {
    console.log(str);
    document.getElementById("result").innerHTML += str + "\n";
}