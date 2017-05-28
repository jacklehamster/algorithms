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

//    cout(input.D+"\n");

    var start = {x:0,y:0};
    var distStart = {};
    var distFinish = {};
    for(var y=0;y<map.length;y++) {
        var x = map[y].indexOf("S");
        if(x>=0) {
            start.x = x;
            start.y = y;
            var result = travel(x,y,input,distStart,{});
            if(result.success) {
                cout("POSSIBLE\n");
                if(result.key) {
                    changeMap(map,result.key.x,result.key.y,'.');
                }
                for(var y=0;y<map.length;y++) {
                    cout(map[y]+"\n");
                }
                return;
            } else {
                cout("IMPOSSIBLE\n");
            }
        }
    }
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

function travel(x,y,dimension,visited) {
    var far = {x:-100000,y:-100000,dist:-1,key:null};
    far.from = far;
    var point = {x:x,y:y,dist:0,key:null,from:far};
    var bag = [point];

    while(bag.length) {
        var pos = bag.shift();
        if(pos.dist>dimension.D) {
            continue;
        }


        if(pos.from.from.x===pos.x && pos.from.from.y===pos.y) continue;
        if(outside(pos.x,pos.y,dimension)) continue;
//        if(visited[pos.x+"_"+pos.y+"_"+(pos.key===null)]) continue;
  //      visited[pos.x+"_"+pos.y+"_"+(pos.key===null)] = true;

        if(dimension.map[pos.y][pos.x]==='F') {
            if(pos.dist===dimension.D) {
                return {key: pos.key, success: true};
            } else {
                continue;
            }
        }

        var key = pos.key;
        if(dimension.map[pos.y][pos.x]==='#') {
            if(key) {
                continue;
            } else {
                key = {x:pos.x, y:pos.y};
            }
        }

        bag.push({x:pos.x+1,y:pos.y,dist:pos.dist+1,key:key,from:pos});
        bag.push({x:pos.x-1,y:pos.y,dist:pos.dist+1,key:key,from:pos});
        bag.push({x:pos.x,y:pos.y+1,dist:pos.dist+1,key:key,from:pos});
        bag.push({x:pos.x,y:pos.y-1,dist:pos.dist+1,key:key,from:pos});
    }
    return {success: false};
}