function Heap() {

    function standardCompare(a,b) {
        return a<b?-1:a>b?1:0;
    }

    function heapInsert(heap,value,compare) {
        heap.push(value);
        fixUp(heap,heap.length-1,compare);
    }

    function heapRetrieve(heap,compare) {
        var value = heap[1];
        heap[1] = heap[heap.length-1];
        heap.pop();
        var index = 1;
        var count = 0;
        while(index*2<heap.length) {
            var left = index*2;
            var right = index*2+1;
            var child;
            if(right>=heap.length || compare(heap[left],heap[right])<0) {
                child = left;
            }
            else {
                child = right;
            }
            if(compare(heap[index],heap[child])>0) {
                swap(heap,index,child);
                index = child;
            }
            else {
                break;
            }
        }
        return value;
    }

    function fixUp(heap,index,compare) {
        var parentIndex = Math.floor(index/2);
        while(parentIndex>0 && compare(heap[parentIndex],heap[index])>0) {
            swap(heap,index,parentIndex);
            index = parentIndex;
            parentIndex = Math.floor(index/2);
        }
    }
    
    function swap(heap,index1,index2) {
        var temp = heap[index1];
        heap[index1] = heap[index2];
        heap[index2] = temp;
    }
    
    var array = [0];
    this.compare = standardCompare;
    this.length = 0;
    this.insert = function() {
        for(var i=0;i<arguments.length;i++) {
            heapInsert(array,arguments[i],this.compare);
        }
        this.length = array.length-1;
        return array.length;
    }
    this.retrieve = function() {
        var value = heapRetrieve(array,this.compare);
        this.length = array.length-1;
        return value;
    }
    this.modify = function(value) {
        var index = array.indexOf(value);
        if(index>=0) {
            fixUp(array,index,this.compare);
            return true;
        }
        else {
            return false;
        }
    }
    this.getArray = function() {
        return array.slice(1);
    }
}
var heap = new Heap();