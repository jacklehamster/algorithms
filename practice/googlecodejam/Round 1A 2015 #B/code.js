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
        var times = lines.shift();
        processLine(l+1,line,times);
    }
}

var lineInfo = "";

function processLine(caseNumber,line,times) {
    var split = line.split(" ");
    lineInfo = "#"+caseNumber+": "+line;
    var B = parseInt(split[0]), N = parseInt(split[1]);
    times = times.split(" ").map(function(num){return parseInt(num);});
    console.log(lineInfo,times);
    var result = solve(N,times);
    cout("Case #"+caseNumber+": "+result);
}

function GDC(a,b) {
    while(b) {
        var t = b;
        b = a % b;
        a = t;
    }
    return a;
}



function solve(N,times) {
    
    function custServed(t) {
        if(t<0)
            return 0;
        var cust = 0;
        for(var i=0;i<times.length;i++) {
            cust += Math.floor(t/times[i])+1;
        }
        return cust;
    }
    
    
    var mint = -1, maxt = 10000*N;
    
    while(mint+1<maxt) {
        var midt = Math.floor((mint+maxt)/2);
        var cust = custServed(midt);
        if(cust<N) {
            mint = midt;
        }
        else {
            maxt = midt;
        }
    }
    var t = maxt;
    var precust = custServed(t-1);
    var leftCustomers = N-precust;
    for(var i=0;i<times.length;i++) {
        if(t % times[i]==0) {
            leftCustomers--;
            if(!leftCustomers)
                return i+1;
        }
    }
    return 0;
    /*
    var customersLeft = N-cust;
    console.log(customersLeft);
    var bestTimeLeft = Number.MAX_VALUE, besti = -1;
    for(var i=0;i<times.length;i++) {
        var timeLeft = times[i] - (midt % times[i]);
//        console.log(midt,i,times[i],timeLeft);
        if(timeLeft<bestTimeLeft) {
            bestTimeLeft = timeLeft;
            besti = i;
        }
    }
    */
    
//    return besti+1;
    //  find cycle by finding least common multiples of times
    var lcm = times[0];
    for(var i=1;i<times.length;i++) {
        lcm *= times[i] / GDC(lcm,times[i]);
    }
    //  after lcm minutes, all barbers are free
    var cycle = 0;
    for(var i=0;i<times.length;i++) {
        cycle += lcm/times[i];
    }
    
    
    console.log("lcm",lcm,"cycle",cycle);
    
    
    
    var nextFree = new Array(times.length);
    var heap = new Heap();
    heap.compare = function(a,b) {
        return nextFree[a]==nextFree[b]?a-b:nextFree[a]-nextFree[b];
    }
    for(var i=0;i<times.length;i++) {
        nextFree[i] = 0;
        heap.insert(i);
    }
    function work(barber) {
        nextFree[barber]+=times[barber];
        heap.insert(barber);
    }
    
    N = N%cycle+cycle;
    
    var barber=0;
    for(var i=0;i<N;i++) {
        barber = heap.retrieve();
        work(barber);
    }
    return barber+1;
}

function cout(str) {
    console.log(str);
    document.getElementById("result").innerHTML += str + "\n";
}