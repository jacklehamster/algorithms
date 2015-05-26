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
    var result = solve(parseInt(split[0]),parseInt(split[1]),parseInt(split[2]));
    cout("Case #"+caseNumber+": "+result);
}

function crawl(X,R,C,map,cellPositions) {
    snake(X,R,C,[],map,cellPositions,'S');
//    snake(X,R,C,[],map,cellPositions,'Z');
}


function rotateSnakeId(id) {
    var lines = id.split("\n");
    var str = "";
    for(var c=0;c<lines[0].length;c++) {
        for(var r=lines.length-1;r>=0;r--) {
            str += lines[r].charAt(c);
        }
        str += "\n";
    }
    return str;
}

var hashSnakeID = {};

function getSnakeId(map,R,C,cellPositions,value) {
    
    
    var minCol=C-1,minRow=R-1,maxCol=0,maxRow=0;
    
    for(var i=0;i<cellPositions.length;i++) {
        var pos = cellPositions[i];
        var cell = getCell(map,pos);
        if(cell==value) {
            minCol=Math.min(pos.x,minCol);
            maxCol=Math.max(pos.x,maxCol);
            minRow=Math.min(pos.y,minRow);
            maxRow=Math.max(pos.y,maxRow);
        }
    }
    var str = "";
    for(var r=minRow;r<=maxRow;r++) {
        for(var c=minCol;c<=maxCol;c++) {
            str += getCell(map,{x:c,y:r})==value?'S':' ';
        }
        str += "\n";
    }
    if(hashSnakeID[str]) {
        return hashSnakeID[str];
    }

    var array = [];
    array.push(str);
    str = rotateSnakeId(str);
    array.push(str);
    str = rotateSnakeId(str);
    array.push(str);
    str = rotateSnakeId(str);
    array.push(str);
    array.sort();
    
    var lastID = array[array.length-1];
    for(var i=0;i<array.length;i++) {
        hashSnakeID[array[i]] = lastID;
    }
    
    return lastID;
}

var hashPossibilities = {};


function copy(map) {
    var array = new Array(map.length);
    for(var r=0;r<map.length;r++) {
        array[r] = new Array(map[r].length);
        for(var c=0;c<map[r].length;c++) {
            array[r][c] = map[r][c];
        }
    }
    return array;
}

function snake(X,R,C,tail,map,cellPositions,value) {
    //console.log(display(map),tail.length)
    if(X==tail.length) {
//        console.log(display(map))
        if(value=='S') {
            var id = getSnakeId(map,R,C,cellPositions,'S');
            if(!hashPossibilities[id]) {
                hashPossibilities[id] = {id:id,solved:false,maps:{}};
            }
            else {
                var mapCopy = copy(map);
                var mapDisplay = display(mapCopy);
                if(!hashPossibilities[id].maps[mapDisplay]) {
                    hashPossibilities[id].maps[mapDisplay] = mapCopy;
                }
//                hashPossibilities[id].maps.push(copy(map));
            }
            
            
            /*
            if(hashPossibilities[id].solved) {
            }
            else {
                snakeWithoutLimit(X,R,C,[],map,cellPositions,'Z',id);
            }
            */
            
            
            
//            console.log("Snake ID","\n"+getSnakeId(map,R,C,cellPositions,'S'));
        }
    }
    else if(!tail.length) {
        //  start snake anywhere
        for(var i=0;i<cellPositions.length;i++) {
            var pos = cellPositions[i];
            //console.log("pos",pos);
            if(getCell(map,pos)==' ') {
                setCell(map,R,C,pos,value);
                snake(X,R,C,[pos],map,cellPositions,value);
                setCell(map,R,C,pos,' ');
            }
        }
    }
    else {  //  continue snake
        for(var i=0;i<cellPositions.length;i++) {
            var pos = cellPositions[i];
            if(canSnake(map,R,C,pos,value)) {
                setCell(map,R,C,pos,value);
                snake(X,R,C,tail.concat(pos),map,cellPositions,value);
                setCell(map,R,C,pos,' ');
            }
        }
    }
}

function snakeWithoutLimit(X,R,C,tail,map,cellPositions,value,snakeID) {
    //console.log(display(map),tail.length)
    var canSnakeMore = false;
    if(!tail.length) {
        //  start snake anywhere
        for(var i=0;i<cellPositions.length;i++) {
            var pos = cellPositions[i];
            //console.log("pos",pos);
            if(getCell(map,pos)==' ') {
                canSnakeMore = true;
                setCell(map,R,C,pos,value);
                snakeWithoutLimit(X,R,C,[pos],map,cellPositions,value,snakeID);
                setCell(map,R,C,pos,' ');
                if(hashPossibilities[snakeID].done)
                    return;
            }
        }
    }
    else {  //  continue snake
        for(var i=0;i<cellPositions.length;i++) {
            var pos = cellPositions[i];
            if(canSnake(map,R,C,pos,value)) {
                canSnakeMore = true;
                setCell(map,R,C,pos,value);
                snakeWithoutLimit(X,R,C,tail.concat(pos),map,cellPositions,value,snakeID);
                setCell(map,R,C,pos,' ');
                if(hashPossibilities[snakeID].done)
                    return;
            }
        }
    }
    if(!canSnakeMore) {
        if(tail.length && tail.length%X==0) {
            hashPossibilities[snakeID].solved = true;
        }
        hashPossibilities[snakeID].done = true;
//        console.log(lineInfo);
//        console.log("Snaked until",tail.length);
//        console.log(display(map))
    }
}

function canSnake(map,R,C,pos,value) {
    if(getCell(map,pos)!=' ')
        return false;
    var surroundPos = [
        {x:pos.x,y:pos.y-1},
        {x:pos.x,y:pos.y+1},
        {x:pos.x-1,y:pos.y},
        {x:pos.x+1,y:pos.y},
    ];
    for(var i=0;i<surroundPos.length;i++) {
        var spos = surroundPos[i];
        if(!outBound(spos,R,C) && getCell(map,spos)==value) {
            return true;
        }
    }
    return false;
}

function getCell(map,pos) {
    return map[pos.y][pos.x];
}

function outBound(pos,R,C) {
    return pos.x<0||pos.x>=C||pos.y<0||pos.y>=R;
}

function setCell(map,R,C,pos,value,cellFilter) {
        //console.log(">",pos.x,pos.y,value);
    if(outBound(pos,R,C))
        return;
    if(!cellFilter || cellFilter.indexOf(getCell(map,pos))>=0) {
        //console.log(">>",pos.x,pos.y,value);
        map[pos.y][pos.x] = value;
    }
}

/*function setFlower(map,R,C,pos,value) {
    flowerHelper(map,R,C,{x:pos.x,y:pos.y-1},value);
    flowerHelper(map,R,C,{x:pos.x,y:pos.y+1},value);
    flowerHelper(map,R,C,{x:pos.x-1,y:pos.y},value);
    flowerHelper(map,R,C,{x:pos.x+1,y:pos.y},value);
}

function flowerHelper(map,R,C,pos,value) {
    if(outBound(pos,R,C))
        return;
    var cell = getCell(map,pos);
    if(cell=='S')
        return;
    var flowerCount = cell==' '?0:parseInt(cell);
    flowerCount += value;
    setCell(map,R,C,pos,flowerCount==0?' ':flowerCount);
}*/

function display(map) {
    var str = [];
    for(var r=0;r<map.length;r++) {
        str.push("|"+map[r].join("")+"|");
    }
    str.push("_____________");
    return str.join("\n");
}

function canMakeUnfit(X,R,C) {
    
 //   console.log(X,R+"x"+C,"doz it fit?");
    for(var row=1;row<X;row++) {  //  5x1, 4x2, 3x3
        var col = (X+1)-row;
        if(Math.max(row,col)>R && Math.max(row,col)>C) {
            //  the biggest size can't even fit
        console.log(row+"x"+col,"Doesn't fit");
            return true;
        }
        
        if(Math.min(row,col)>R || Math.min(row,col)>C) {
            //  the small dimension can't fit
        console.log(row+"x"+col,"Doesn't fit");
            return true;
        }
        
        
    }
//    console.log("HERE");
    
    return false;
    
}

function solve(X,R,C) {
    var cellPositions = [];
    var map = new Array(R);
    for(var r=0;r<R;r++) {
        map[r] = new Array(C);
        for(var c=0;c<C;c++) {
            map[r][c] = ' ';
            cellPositions.push({x:c,y:r});
        }
    }
    hashPossibilities = {};
//    console.log(display(map))
    var cantSolve = false;
    var didntPlay = true;
    var lasti = null;
    if(canMakeUnfit(X,R,C)) {
    }
    else {
        crawl(X,R,C,map,cellPositions);

    //    console.log(hashPossibilities);



        for (var id in hashPossibilities) {
            didntPlay  =false;

            var scenario = hashPossibilities[id];
            for(var i in scenario.maps) {
                //console.log(i);
                snakeWithoutLimit(X,R,C,[],scenario.maps[i],cellPositions,'Z',id);
                lasti = i;
                if(scenario.solved) {
                    break;
                }
            }
            if(!scenario.solved) {
                console.log("RICHARD wins",X,C+"x"+R);
    //            console.log(scenario.id);
                console.log(lasti);
                cantSolve = true;
                break;
            }
    /*            if(hashPossibilities[id].solved) {
                }
                else {
                    snakeWithoutLimit(X,R,C,[],map,cellPositions,'Z',id);
                }
    */        


        }
    }
    if(didntPlay) {
        console.log("RICHARD wins",X,C+"x"+R);
        console.log("He cheated.");
    }
    else if(!cantSolve) {
        console.log("GABRIEL wins",X,C+"x"+R);
        console.log(lasti);
    }
    return didntPlay||cantSolve?"RICHARD":"GABRIEL";
}



function cout(str) {
    console.log(str);
    document.getElementById("result").innerHTML += str + "\n";
}