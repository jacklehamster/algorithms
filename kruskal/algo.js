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
                    edges.push({connection:{from:tree1,to:tree2},indexes:[i,j],distance:dist});
            }
        }
        return edges;
    }
    
    function getGroups(trees) {
        var groups = [];
        for(var i=0;i<trees.length;i++) {
            groups.push({parent:i,color:"#"+(Math.floor(Math.random()*parseInt("ffffff",16))).toString(16) });
        }
        return groups;
    }
    
    function findRoot(index,groups) {
        var orgIndex = index;
        var p = groups[index].parent;
        while(p!=index) {
            index = p;
            p = groups[index].parent;
        }
        groups[orgIndex].parent = p;
        return p;
    }
    
    function sameGroup(index1,index2,groups) {
        var root1 = findRoot(index1,groups);
        var root2 = findRoot(index2,groups);
        if(root1==root2) {
            return true;
        }
        return false;
    }
    
    function combineGroup(index1,index2,groups) {
        var root1 = findRoot(index1,groups);
        var root2 = findRoot(index2,groups);
        groups[root1].parent = root2;
    }

    this.connect = function(trees,colors) {
        //  get edges
        var edges = getEdges(trees);
        var groups = getGroups(trees);
        var heap = [];
        var groupcount = groups.length;
        
        //  store edges
        for (var i=0;i<edges.length;i++) {
            heapInsert(heap,edges[i],getDist);
        }
        
        var validEdges = [];
        while(heap.length && groupcount>1) {
            var edge = heapRetrieve(heap,getDist);
            if(sameGroup(edge.indexes[0],edge.indexes[1],groups)) {
            }
            else {
                groupcount--;
                combineGroup(edge.indexes[0],edge.indexes[1],groups);
                validEdges.push(edge);
            }
        }
        
        for(var i=0;i<groups.length;i++) {
            colors[i] = groups[findRoot(i,groups)].color;
        }
        
        var connections = [];
        for(var i=0;i<validEdges.length;i++) {
            var edge = validEdges[i];
            connections.push(edge.connection);
        }
        
        return connections;
    }
}


