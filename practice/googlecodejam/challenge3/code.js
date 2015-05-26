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
//        console.log(line);
    }
}

function compose(str,times) {
    if(times==1) {
        return str;
    }
    if(times%2==0) {
        return compose(str.concat(str),times/2);
    }
    else {
        return compose(str,times-1).concat(str);
    }
}

function processLine(caseNumber,line,line2) {
//    console.log(caseNumber,line,line2);
//    return;
    var split = line.split(" ");
    var numChar = parseInt(split[0]);
    var times = parseInt(split[1]);
    var str = [];
    for(var i=0;i<numChar;i++) {
        str.push( line2.charAt(i));
    }
//    var str2 = [];
    var str2 = compose(str,times);
//    for(var i=0;i<times;i++) {
//        str2 = str2.concat(str);
//    }
    console.log("-------------------");
    console.log("-------------------");
//    console.log(str2);
    console.log("-------------------");
//    var success = voyage(str2.split(""),"ijk".split(""),0);
  
    var success = solve(str2,"ijk");
    
    
    cout("Case #"+caseNumber+": "+(success?"YES":"NO"));
}

var mapping = {
    "1":{
        "1":"1",
        "i":"i",
        "j":"j",
        "k":"k"
    },
    "i":{
        "1":"i",
        "i":"-1",
        "j":"k",
        "k":"-j"
    },
    "j":{
        "1":"j",
        "i":"-k",
        "j":"-1",
        "k":"i"
    },
    "k":{
        "1":"k",
        "i":"j",
        "j":"-i",
        "k":"-1"
    }
}

function solve(str,goal) {
 
    //  transform into arrays
//    str = str.split("");
    goal = goal.split("");
    
    
    //  attempt reduce left side
    var sign = 1;
    while(str.length>=3 && str[0]!=goal[0]) {
        var m = mapping[str[0]][str[1]];
        if(m.charAt(0)=='-') {
            m = m.charAt(1);
            sign = -sign;
        }
        str.splice(0,2,m);
    }
    if(str.length<3)
        return false;
    goal.shift();
    str.shift();    //  we cleared i
   // console.log(">>",str.join(""),goal.join(""));
    
    //  attempt reduce again
    while(str.length>=2 && str[0]!=goal[0]) {
        var m = mapping[str[0]][str[1]];
        if(m.charAt(0)=='-') {
            m = m.charAt(1);
            sign = -sign;
        }
        str.splice(0,2,m);
    }
    if(str.length<2)
        return false;
    goal.shift();
    str.shift();    //  we cleared j
    //console.log(">>",str.join(""),goal.join(""));
    
    //  attempt reduce again
    while(str.length>=2) {
        var m = mapping[str[0]][str[1]];
        if(m.charAt(0)=='-') {
            m = m.charAt(1);
            sign = -sign;
        }
        str.splice(0,2,m);
    }
    //console.log(">>",str.join(""),goal.join(""));
    return str[0]==goal[0] && sign==1;
    
    
    
    
    
}

//var visited = {};

/*var maxdepth =0;
var countiter = 0;

var hash = {};
function voyage(str,goal,depth) {   //  goal ijk
    
    if(goal.length>1) {
        for(var i=1;i<str.length;i++) {
            var result1 = voyage(str.slice(0,i),goal[0],depth+1);
            if(result1!=0) {
                result1 *= voyage(str.slice(i),goal.slice(1),depth+1)
            }
            if(result1!=0) {
                return result1;
            }
        }
    }
    else {
        var sign = 1;
        var pushes = [];
        while(str.length>1) {
            var sorg = str.join("");
            if(hash[sorg]) {
                str = [hash[sorg].letter];
                sign = hash[sorg].sign;
            }
            else {
                pushes.push(sorg);
                var m = mapping[str[0]][str[1]];
                if(m.charAt(0)=='-') {
                    m = m.charAt(1);
                    sign = -sign;
                }
                str.splice(0,2,m);
            }
        }
        
        var hashResult = {letter:str[0],sign:sign};
        for(var i=0;i<pushes.length;i++) {
            hash[pushes[i]] = hashResult;
        }
        
        return str[0]==goal[0]?sign:0;
    }
    return 0;
    
/*
//    if(depth>maxdepth) {
//        console.log(">>>",left,str,sign,goal,depth);
//        maxdepth = depth;
//    }
    if(goal=="") {
        console.log(left);
        return str.length==0?sign:0;
    }
    else if(left.length>=3) {
        return 0;
    }
    

    while(str.length>=goal.length) {
        
        countiter++;
        if(countiter%100000==0) {
            console.log("...",left,str.join("").substr(0,20)+"..("+str.length+")",sign,goal,depth,countiter);
            if(countiter>10000000) {
                return 0;
            }
        }
        
        if(str[0]==goal.charAt(0)) {
            if(goal.length>1) {
                var sgn = voyage(left+str[0],str.slice(1),sign,goal.substr(1),depth+1);
                if(sgn * sign)
                    return sgn * sign;
            }
            else {
                if(str.length==1) {
                    return sign;
                }
                else {
                    return 0;
                }
            }
        }
        var sub = str.slice(0,2).join("");
        if(sub.length<2) {
            break;
        }
        var m = mapping[sub];
//        console.log(">>",sub);
        if(m.charAt(0)=='-') {
            m = m.charAt(1);
            sign = -sign;
        }
        str = [m].concat(str.slice(2));
    }
    
    return 0;
    */
    /*
    return;
    if(visited[left]) {
        return visited[left].success;
    }
    if(left.length>goal.length) {
        visited[left] = {success:false};
        return false;
    }
    if(str.length==0) {
        var success = left==goal && sign==1;
//        console.log((sign<0?"-":"")+left,goal,success?"YES":"NO");
        visited[left] = {success:success};
        return success;
    }
    
//    var n=0;
    do {
        if(voyage(left+str.charAt(0),str.substr(1),sign,goal,depth+1)) {
            return true;
        }

        if(str.length>1) {
    //        console.log(str,"<<");
            var m = mapping[str.substr(0,2)];
            if(m.charAt(0)=='-') {
                m = m.charAt(1);
                sign = -sign;
            }

//            if(voyage(left,m+str.substr(2),sign,goal,depth+1)) {
//                return true;
//            }
            str = m+str.substr(2);
        }
//        n++;
//        if(n>10)
//            break;
//        console.log(str,"<<<<<");
    } while(str.length>1);
    if(voyage(left+str.charAt(0),str.substr(1),sign,goal,depth+1)) {
        return true;
    }
    return false;*/
//}

function cout(str) {
    console.log(str);
    document.getElementById("result").innerHTML += str + "\n";
}