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

function heapInsert(heap,element) {
    heap.push(element);
    var index = heap.length-1;
    var parent = Math.floor((index-1)/2);
    while(index>0 && heap[parent]<heap[index]) {
        //  swap
        var temp = heap[parent];
        heap[parent] = heap[index];
        heap[index] = temp;
        index = parent;
        parent = Math.floor((index-1)/2);
    }
}

//0 -> 1,2
//1 -> 3,4
//2 -> 5,6
//3 -> 7,8

function heapRetrieve(heap) {
    var element = heap[0];
    heap[0] = heap[heap.length-1];
    heap.pop();
    var index = 0;
    var left = index*2+1;
    var right = index*2+2;
    while(left<heap.length && heap[index]<Math.max(heap[left],right<heap.length?heap[right]:0)) {
        var temp = heap[index];
        if(right>=heap.length || heap[left]>heap[right]) {
            //  swap left
            heap[index] = heap[left];
            heap[left] = temp;
            index = left;
        }
        else {
            //  swap right
            heap[index] = heap[right];
            heap[right] = temp;
            index = right;
        }
        left = index*2+1;
        right = index*2+2;
    }
    return element;
}

function processLine(caseNumber,line,line2) {
    console.log("#"+caseNumber,line2);
    var D = parseInt(line);
    var split = line2.split(" ");
    var plates = [];
    for(var i=0;i<D;i++) {
        heapInsert(plates,parseInt(split[i]));
    }
    record = plates[0]+1;
    solve2(plates,0,{action:"begin",plates:plates,parent:null},false,false,false);
    var best = record;
    solve2(plates,0,{action:"begin",plates:plates,parent:null},false,true,false);
    if(record<best) {
        console.log("!!!!!",record,"<",best);
    }
    
    var result = record;
    

    //displayNode(recordNode);
    
    cout("Case #"+caseNumber+": "+result);
}

function displayNode(recordNode) {
    var pp = [];
    while(recordNode) 
    {
        pp.push(recordNode);
        recordNode = recordNode.parent;
    }
    
    var minute = 0;
    while(pp.length) {

        minute++;
        var node = pp.pop();
        console.log(minute,node.action,node.plates);
    }
}

var record = 0,recordNode = null;

function solve2(plates,minute,parent,noMoreSlice,allow3,showNode) {
    
    if(minute + Math.floor(Math.log2(plates[0]))>=record) {
        return;
    }
    
    if(plates[0]==0) {
        if(minute<record) {
            record = Math.min(record,minute);
            recordNode = parent;
            if(showNode)
                displayNode(recordNode);
            console.log(">>",record);
        }
        return;
    }
    
    //  choices: do nothing / divide top by 2 / divide top by 3
    var a = [];
    var act1 = function() {
        var didNothing = doNothing(plates);
        solve2(didNothing,minute+1,{action:'nothing',plates:didNothing,parent:parent},true,false,showNode);
    }
    a.push(act1);
    
    if(!noMoreSlice) {
        var act2 = function() {
            var slice2 = sliceTop2(plates);
            solve2(slice2,minute+1,{action:'slice2',plates:slice2,parent:parent},false,false,showNode);
        }
        a.push(act2);

        var act3 = function() {
            var slice3 = sliceTop3(plates);
            solve2(slice3,minute+1,{action:'slice3',plates:slice3,parent:parent},false,allow3,showNode);
        }
        if(allow3)
            a.push(act3);
    }
    //  shufffle
    if(Math.random()<.3) {
        a.push(a.shift());
    }
    if(Math.random()<.5) {
        a.push(a.shift());
    }
    a[0]();
    if(a[1])
        a[1]();
    if(a[2])
        a[2]();
    
    return;
}

function solve(plates) {
    
    //  choices: do nothing / divide top by 2 / divide top by 3
    var scenarios = [{action:"begin",plates:plates,parent:null}];
    
    var minute = 0;
    var done = null;
    do {
        minute++;
        //  go through each scenarios and perform one of the actions
        var newScenarios = [];
        while(scenarios.length) {
            var scenario = scenarios.pop();
            var didNothing = doNothing(scenario.plates);
            if(didNothing[0]==0) {
                done = {action:"end",plates:didNothing,parent:scenario};
                break;
            }
            newScenarios.push({action:"did nothing",plates:didNothing,parent:scenario});
            if(scenario.plates[0]>=2) {
                var slice2 = sliceTop2(scenario.plates);
                newScenarios.push({action:"slice2",plates:slice2,parent:scenario});
            }
            if(scenario.plates[0]>=3) {
                var slice3 = sliceTop3(scenario.plates);
                newScenarios.push({action:"slice3",plates:slice3,parent:scenario});
            }
        }
        scenarios = newScenarios;
//        break;
    } while(!done);
    console.log(minute);
    var p = [];
    while(done) {
        p.push(done);
        done = done.parent;
    }
    while(p.length) {
        done = p.pop();
        console.log(done.action,done.plates);
    }
    return minute;
}
    
function doNothing(plates) {
    plates = plates.concat([]);
    for(var i=0;i<plates.length;i++) {
        if(plates[i])
            plates[i]--
    }
//    console.log("did nothing",plates);
    return plates;
}
    
function sliceTop2(plates) {
    plates = plates.concat([]);
    var top = heapRetrieve(plates);
    var plate1 = Math.floor(top/2);
    var plate2 = top-plate1;
    heapInsert(plates,plate1);
    heapInsert(plates,plate2);
//    console.log("div top 2",plates);
    return plates;
}

function sliceTop3(plates) {
    plates = plates.concat([]);
    var top = heapRetrieve(plates);
    var plate1 = Math.floor(top/3);
    var plate2 = top-plate1;
    heapInsert(plates,plate1);
    heapInsert(plates,plate2);
//    console.log("div top 3",plates);
    return plates;
}

function cout(str) {
    console.log(str);
    document.getElementById("result").innerHTML += str + "\n";
}