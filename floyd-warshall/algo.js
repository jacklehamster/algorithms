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
        return -obj.distance;
    }
    
    function distance(posA,posB) {
        var dx = posA.x - posB.x;
        var dy = posA.y - posB.y;
        var dist = Math.sqrt(dx*dx + dy*dy);
        return dist;
    }
    
    function getEdges(trees) {
        var edges = [];
        for(var i=0;i<trees.length;i++) {
            var tree1 = trees[i];
            for(var j=0;j<trees.length;j++) {
                var tree2 = trees[j];
                var dist = distance(tree1,tree2);
                if(dist<100)
                    edges.push({connection:{from:tree1,to:tree2},indexes:[i,j],distance:dist});
            }
        }
        return edges;
    }
    
    this.connect = function(trees,shortestPaths,needsRecalculate) {
        //  get edges
        var edges = getEdges(trees);
        
        if(needsRecalculate) {
            var distances = [];
            for(var i=0;i<trees.length;i++) {
                distances[i] = new Array(trees.length);
                shortestPaths[i] = new Array(trees.length);
                for(var j=0;j<trees.length;j++) {
                    distances[i][j] = Number.MAX_VALUE;
                    shortestPaths[i][j] = i==j?i:-1;
                }
            }

            for(var i=0;i<edges.length;i++) {
                var edge = edges[i];
                distances[edge.indexes[0]][edge.indexes[1]] = edge.distance;
                shortestPaths[edge.indexes[0]][edge.indexes[1]] = edge.indexes[1];
            }
            
            for(var k=0;k<trees.length;k++) {
                for(var i=0;i<trees.length;i++) {
                    for(var j=0;j<trees.length;j++) {
                        var dist = distances[i][k] + distances[k][j];
                        if(k!=i && distances[i][j] > dist) {
                            distances[i][j] = dist;
                            shortestPaths[i][j] = shortestPaths[i][k];
                        }
                    }
                }
            }
        }
        
        var connections = [];
        for(var i=0;i<edges.length;i++) {
            var edge = edges[i];
            connections.push(edge.connection);
        }
        
        return connections;
    }
}


function Algo2() {
    

    this.start = function() {
    }
    
    //  Helper functions
    function distance(posA,posB) {
        var dx = posA.x - posB.x;
        var dy = posA.y - posB.y;
        var dist = Math.sqrt(dx*dx + dy*dy);
        return dist;
    }
    
    function getEdges(trees) {
        var edges = [];
        for(var i=0;i<trees.length;i++) {
            var tree1 = trees[i];
            for(var j=i+1;j<trees.length;j++) {
                var tree2 = trees[j];
                var dist = distance(tree1,tree2);
                if(dist<100)
                    edges.push({connection:{from:tree1,to:tree2},indexes:[i,j],distance:distance(tree1,tree2)});
            }
        }
        return edges;
    }
    
    this.connect = function(trees,from,to,shortestPath) {
        //  get edges
        var edges = getEdges(trees);

        var path = new Array(trees.length);
        for(var i=0;i<trees.length;i++) {
            path[i] = [];
        }
        
        var connections = [];
        for(var i=0;i<edges.length;i++) {
            var edge = edges[i];
            connections.push(edge.connection);
            path[edge.indexes[0]].push({toIndex:edge.indexes[1],distance:edge.distance});
            path[edge.indexes[1]].push({toIndex:edge.indexes[0],distance:edge.distance});
            connections.push(edge.connection);
        }
        
        if(from>=0 && to>=0) {
            var g_score = new Array(trees.length);
            var inHeap = new Array(trees.length);
            var visited = new Array(trees.length);
            var heap = [];
            
            for(var i=0;i<g_score.length;i++) {
                g_score[i] = Number.MAX_VALUE;
            }
            g_score[from] = 0;
            
            function getH(obj) {
                var index = obj.index;
                return obj.f = -(g_score[index] + distance(trees[index],trees[to]));
            }
            
            function addVertex(index) {
                var vertex = inHeap[index];
                if(!vertex) {
                    vertex = {
                        index:index
                    };
                    inHeap[index] = vertex;
                    heapInsert(heap,vertex,getH);
                    //console.log("heap +",index,heap.concat([]));
                }
                else {
                    heapFix(heap,vertex,getH);
                    //console.log("heap =",index,heap.concat([]));
                }
                return vertex;
            }
            
            function extractVertex() {
                var vertex = heapRetrieve(heap,getH);
                inHeap[vertex.index] = null;
                return vertex;
            }

            
            addVertex(from);
            
            while(heap.length) {
                var h = heap.concat([]);
                var vertex = extractVertex();
                visited[vertex.index] = true;
                    //console.log(vertex,getH(vertex),h);
                if(vertex.index==to) {
                    //console.log("G",g_score);
                    while(vertex.index!=from) {
                        shortestPath.push(vertex.index);
                        vertex = vertex.parent;
                    }
                    shortestPath.push(from);
                    shortestPath.reverse();
                    //console.log(shortestPath);
                    break;
                }
                for(var i=0;i<path[vertex.index].length;i++) {
                    var p = path[vertex.index][i];
                    var toIndex = p.toIndex;
                    if(!visited[toIndex]) {
                        var g = g_score[vertex.index] + p.distance;
                        if(g<g_score[toIndex]) {
                            g_score[toIndex] = g;  
                            //console.log(toIndex,"=>",g,path[vertex.index],vertex.index);
                            var neighbor = addVertex(toIndex);
                            neighbor.parent = vertex;
                        }
                    }
                }
            }            
        }        
        
        
        return connections;
    }
}




