function parse(stream) {
    var R = parseInt(stream.readString());
    var C = parseInt(stream.readString());
    var D = parseInt(stream.readLine());

    var map = [];
    for(var y=0;y<R;y++) {
        map.push(stream.readLine());
    }
    return {
        R:R,
        C:C,
        D:D,
        map:map,
    };
}

function solve(stream) {
    var input = parse(stream);
    var map = input.map;

    var start = {x:0,y:0};
    var distStart = {};
    var distFinish = {};
    for(var y=0;y<map.length;y++) {
        var x = map[y].indexOf("S");
        if(x>=0) {
            start.x = x;
            start.y = y;
            travel(x,y,input,0,distStart,{});
        }
        x = map[y].indexOf("F");
        if(x>=0) {
            travel(x,y,input,0,distFinish,{});
        }
    }
//    cout(input.D+"\n");

    for(var i in distStart) {
        for(var s in distStart[i]) {
            for(var f in distFinish[i]) {
                var total = parseInt(s) + parseInt(f);
                if(total==input.D) {
                    var split = i.split("_");
                    var xx = parseInt(split[0]);
                    var yy = parseInt(split[1]);
                    if(map[yy].charAt(xx)!=='.') {
                        cout("POSSIBLE\n");
//                        cout(split+"\n");
//                        console.log(xx,yy);
                        if(map[yy].charAt(xx)==='#') {
                            changeMap(map,xx,yy,'.');
                        }

//            testGame(start.x,start.y,input,0,{});

                        for(var y=0;y<map.length;y++) {
                            cout(map[y]+"\n");
                        }

                        return;
                    }
                }
            }
        }
    }

    cout("IMPOSSIBLE\n");
    return;
}

function changeMap(map,x,y,value) {
    var r = map[y].split("");
    r.splice(x,1,value);
    map[y] = r.join("");
    return map;
}

function testGame(x,y,dimension,dist,visited) {
    if(outside(x,y,dimension)) return;
    if(visited[x+"_"+y]) return;
    visited[x+"_"+y] = true;

    if(dimension.map[y][x]==='F') {
        console.log(dist,dimension.D);
        if(dist===dimension.D)
            return true;
    } else if(dist && dimension.map[y][x]!=='.') {
        return false;
    }
    if(testGame(x+1,y,dimension,dist+1,visited)) {
        changeMap(dimension.map,x,y,dist%10);
        return true;
    }
    if(testGame(x-1,y,dimension,dist+1,visited)) {
        changeMap(dimension.map,x,y,dist%10);
        return true;
    }
    if(testGame(x,y+1,dimension,dist+1,visited)) {
        changeMap(dimension.map,x,y,dist%10);
        return true;
    }
    if(testGame(x,y-1,dimension,dist+1,visited)) {
        changeMap(dimension.map,x,y,dist%10);
        return true;
    }

    visited[x+"_"+y] = false;
    return false;
}

function outside(x,y,dimension) {
    return x<0 || y<0 || x>=dimension.C || y>=dimension.R;
}

function travel(x,y,dimension,dist,distReport,visited) {
    if(outside(x,y,dimension)) return;
    if(visited[x+"_"+y]) return;
    visited[x+"_"+y] = true;

    if(!distReport[x+"_"+y]) {
        distReport[x+"_"+y] = {};
    }
    distReport[x+"_"+y][dist] = true;

    if(dimension.map[y][x]==='.' || dist===0) {
        travel(x-1,y,dimension,dist+1,distReport,visited);
        travel(x+1,y,dimension,dist+1,distReport,visited);
        travel(x,y-1,dimension,dist+1,distReport,visited);
        travel(x,y+1,dimension,dist+1,distReport,visited);
    }
}