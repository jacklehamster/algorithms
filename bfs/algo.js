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
            for(var j=i+1;j<trees.length;j++) {
                var tree2 = trees[j];
                var dist = distance(tree1,tree2);
                if(dist<100)
                    edges.push({connection:{from:tree1,to:tree2},indexes:[i,j]});
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
            path[edge.indexes[0]].push(edge.indexes[1]);
            path[edge.indexes[1]].push(edge.indexes[0]);
            connections.push(edge.connection);
        }
        
        if(from>=0 && to>=0) {
            var visited = new Array(trees.length);
            var queue = [{parent:null,index:from}];
            while(queue.length) {
                var vertex = queue.shift();
                if(vertex.index==to) {
                    while(vertex.index!=from) {
                        shortestPath.push(vertex.index);
                        vertex = vertex.parent;
                    }
                    shortestPath.push(from);
                    shortestPath.reverse();
                    console.log(shortestPath);
                    break;
                }
                visited[vertex.index] = true;
                for(var i=0;i<path[vertex.index].length;i++) {
                    var toIndex = path[vertex.index][i];
                    if(!visited[toIndex]) {
                        queue.push({parent:vertex,index:toIndex});
                    }
                }
            }            
        }        
        
        
        return connections;
    }
}


