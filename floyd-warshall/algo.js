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


