/**
    algo.js

    CODING PRACTICE
    Vincent Le Quang
    April 18, 2015
*/


function Algo() {
    

    this.start = function() {
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
                    edges.push({connection:{from:tree1,to:tree2},indexes:[i,j]});
            }
        }
        return edges;
    }
    
    this.connect = function(trees,criticals,needsRecalculate) {
        //  get edges
        var edges = getEdges(trees);
        
        if(needsRecalculate) {
            
            var roadTo = new Array(trees.length);
            for(var i=0;i<roadTo.length;i++) {
                roadTo[i] = [];
            }
            for(var i=0;i<edges.length;i++) {
                var edge = edges[i];
                if(edge.indexes[0]!=edge.indexes[1])
                    roadTo[edge.indexes[0]].push(edge.indexes[1]);
            }
            
            var visited = new Array(trees.length);
            var time = 0;
            var st = new Array(trees.length);
            var low = new Array(trees.length);
            var parents = new Array(trees.length);
            function GetArticulationPoints(u) {
                visited[u] = true;
                st[u] = time++;
                low[u] = st[u];
                var dfsChild = 0;
                for(var i=0;i<roadTo[u].length;i++) {
                    var ni = roadTo[u][i];
                    if(!visited[ni]) {
                        GetArticulationPoints(ni);
                        dfsChild = dfsChild + 1;
                        parents[ni] = u;
                        low[u] = Math.min(low[u],low[ni]);
                    }
                    else if(ni != parents[u]) {
                        low[u] = Math.min(low[u],st[ni]);
                    }
                }
                if(low[u]==st[u] && dfsChild>0 && parents[u]!=null || parents[u]==null && dfsChild>1) {
                    criticals.push(u);
                }
            }
            
            GetArticulationPoints(0);
//            console.log(st);
        }
        
        var connections = [];
        for(var i=0;i<edges.length;i++) {
            var edge = edges[i];
            connections.push(edge.connection);
        }
        
        return connections;
    }
}


