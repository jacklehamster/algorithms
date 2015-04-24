/**
    algo.js

    CODING PRACTICE
    Vincent Le Quang
    April 18, 2015
*/


function Algo() {
    

    this.start = function() {
    }
    
    //  Helper functions
    function getDist(obj) {
        return -obj.dist;
    }
    
    function distance(posA,posB) {
        var dx = posA.x - posB.x;
        var dy = posA.y - posB.y;
        var dist = Math.sqrt(dx*dx + dy*dy);
        return dist;
    }
    
    //  Vertices manipulation funcions
    function popMinVertex(vertices) {
        return heapRetrieve(vertices,getDist);
    }
    
    function addVertex(value,vertices) {
        heapInsert(vertices,value,getDist);
    }
    
    //  processing functions
    function processNeighbors(u,visited,vertices,canGoXY,to) {
        
        //  We don't really have a list of vertices. So we consider all neighbors to be the surroundings
        //  A B C
        //  D . E
        //  F G H
        //
        var jumpDist = 20;
        var positions = [
            {x:u.pos.x+0,y:u.pos.y-jumpDist},
            {x:u.pos.x-jumpDist,y:u.pos.y+0},
            {x:u.pos.x+jumpDist,y:u.pos.y+0},
            {x:u.pos.x+0,y:u.pos.y+jumpDist},
            {x:u.pos.x-jumpDist,y:u.pos.y-jumpDist},
            {x:u.pos.x-jumpDist,y:u.pos.y+jumpDist},
            {x:u.pos.x+jumpDist,y:u.pos.y-jumpDist},
            {x:u.pos.x+jumpDist,y:u.pos.y+jumpDist}
        ];
        
        for(var i=0;i<positions.length;i++) {
            var pos = positions[i];
            if(!canGoXY(pos.x,pos.y)) {
                continue;
            }
            var dist = distance(pos,to);
            var id = pos.x+"_"+pos.y;
            var neighbor = visited[id];
            if(!neighbor) {
                neighbor = {
                    pos:pos,
                    dist:dist,
                    from:u
                };
                visited[id] = neighbor;
                addVertex(neighbor,vertices);
            }
        }
    }

    this.calculateVoyage = function(from,to,canGoXY) {
        if(!from) {
            return [to];
        }
        var vertices = [{pos:from,dist:0,from:null}];
        var visited = {};
        
        while(vertices.length) {
            var u = popMinVertex(vertices);
            var distTo = distance(u.pos,to);
            if(distTo<30) {
                return getPath(u).concat([to]);
            }
            processNeighbors(u,visited,vertices,canGoXY,to);    
        }
        
        return [to];
    }

    //  Once we got the path, turn it into an array of positions
    function getPath(u,from) {
        var array = [];
        var parent = u;
        while(parent && parent!=from) {
            array.push(parent.pos);
            parent = parent.from;
        }
        array.reverse();
        return array;
    }
    
}


