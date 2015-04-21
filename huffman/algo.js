/**
    algo.js

    CODING PRACTICE
    Vincent Le Quang
    April 18, 2015
*/


function Algo() {
    

    this.start = function() {
    }
    
    this.compress = function(text) {
        
        //  DYNAMIC HUFFMAN
        function getValue(obj) {
            return -obj.frequency;
        }
        
        function getBinary(char) {
            var code = char.charCodeAt(0);
            var str = "";
            for(var i=0;i<8;i++) {
                str = ((code & (1<<i))?"1":"0") + str;
            }
            return str;
        }
        
        function getTableBinary(root,code) {
            if(root.left && root.right) {
                code.push("1");
                getTableBinary(root.left,code);
                getTableBinary(root.right,code);
            }
            else {
                code.push("0");
                code.push(getBinary(root.char));
            }
        }
        
        var heap = [];
        var nodes = {
        };
        for(var i=0;i<text.length;i++) {
            var char = text.charAt(i);
            var node = nodes[char];
            if(!node) {
                node = nodes[char] = {char:char,frequency:0};
            }
            node.frequency++;
        }
        for(var c in nodes) {
            heapInsert(heap,nodes[c],getValue);
        }
        
        while(heap.length>1) {
            var low1 = heapRetrieve(heap,getValue);
            var low2 = heapRetrieve(heap,getValue);
            heapInsert(heap,{left:low1,right:low2,frequency:low1.frequency+low2.frequency},getValue);
        }
        
        //  create huffman map
        var map = {};
        function createMap(map,node,code) {
            if(node.left && node.right) {
                createMap(map,node.left,code+"0");
                createMap(map,node.right,code+"1");
            }
            else {
                map[node.char] = code;
            }
        }
        createMap(map,heap[0],"");
        
        console.log(map);
        
        //  compress
        //  store table first
        var treeCode = [];
        getTableBinary(heap[0],treeCode);
        
        var codes = [];
        for(var i=0;i<text.length;i++) {
            var char = text.charAt(i);
            codes.push(map[char]);
        }
        
        console.log(codes.join("").length);
        
        return treeCode.join("")+codes.join("");
    }
    
    this.uncompress = function(text) {
        //  turn the text into an array and reverse for easy pop
        var input = text.split("").reverse();
        
        function getCharacter(input) {
            var num = 0;
            for(var i=0;i<8;i++) {
                num <<=1;
                num += input[input.length-1-i]=='1'?1:0;
            }
            input.splice(input.length-8);
            return String.fromCharCode(num);
        }
        
        
        //  first retrieve the table
        function retrieveTable(input) {
            
            var root = {};
            
            var inp = input.pop();
            if(inp=='1') {
                root.left = retrieveTable(input);
                root.right = retrieveTable(input);
            }
            else {
                root.char = getCharacter(input);
            }
            
            return root;
        }
        
        var table = retrieveTable(input);

        function decode(input,table,chars) {
            if(!table.left && !table.right) {
                chars.push(table.char);
                return;
            }
            var inp = input.pop();
            if(inp=='0')
                decode(input,table.left,chars);
            else
                decode(input,table.right,chars);
        
        }
        
        var chars = [];
        while(input.length)
            decode(input,table,chars);
        
        return chars.join("");
    }

}


