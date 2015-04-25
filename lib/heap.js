    function heapInsert(heap,element,getValue) {
        heap.push(element);
        heapFix(heap,element,getValue);
    }
    
    function heapFix(heap,value,getValue) {
        var index = heap.indexOf(value);
        var parent = Math.floor((index-1)/2);
        while(index>0 && getValue(heap[parent])<getValue(heap[index])) {
            //  swap
            var temp = heap[parent];
            heap[parent] = heap[index];
            heap[index] = temp;
            index = parent;
            parent = Math.floor((index-1)/2);
        }
    }
    
    function heapRetrieve(heap,getValue) {
        var element = heap[0];
        heap[0] = heap[heap.length-1];
        heap.pop();
        var index = 0;
        var left = index*2+1;
        var right = index*2+2;
        
        while(left<heap.length 
              && getValue(heap[index])>
                Math.max(getValue(heap[left]),right<heap.length?getValue(heap[right]):Number.MIN_VALUE)) 
        {
            var temp = heap[index];
            if(right>=heap.length || getValue(heap[left])>getValue(heap[right])) {
                //  swap left
                heap[index] = heap[left];
                heap[left] = temp;
                index = left;
            }
            else {
                //  swap right
                heap[index] = heap[right];
                heap[right] = temp;
                index = right;
            }
            left = index*2+1;
            right = index*2+2;
        }
        return element;
    }
    