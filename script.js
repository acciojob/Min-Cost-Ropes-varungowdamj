function mincost(arr) {
    // Create a min-heap using a priority queue
    const heap = new MinHeap();
    
    // Insert all the rope lengths into the heap
    for (let length of arr) {
        heap.insert(length);
    }
    
    // Initialize total cost to 0
    let totalCost = 0;
    
    // While there's more than one rope left to combine
    while (heap.size() > 1) {
        // Extract the two shortest ropes
        const firstMin = heap.extractMin();
        const secondMin = heap.extractMin();
        
        // Calculate the cost of combining these two ropes
        const cost = firstMin + secondMin;
        
        // Add this cost to the total cost
        totalCost += cost;
        
        // Insert the combined rope back into the heap
        heap.insert(cost);
    }
    
    // Return the total minimum cost to combine all ropes
    return totalCost;
}

// Min-Heap implementation
class MinHeap {
    constructor() {
        this.heap = [];
    }
    
    size() {
        return this.heap.length;
    }
    
    insert(value) {
        this.heap.push(value);
        this._heapifyUp();
    }
    
    extractMin() {
        if (this.size() === 1) {
            return this.heap.pop();
        }
        
        const min = this.heap[0];
        this.heap[0] = this.heap.pop();
        this._heapifyDown();
        return min;
    }
    
    _heapifyUp() {
        let index = this.heap.length - 1;
        while (index > 0) {
            const parentIndex = Math.floor((index - 1) / 2);
            if (this.heap[index] >= this.heap[parentIndex]) {
                break;
            }
            [this.heap[index], this.heap[parentIndex]] = [this.heap[parentIndex], this.heap[index]];
            index = parentIndex;
        }
    }
    
    _heapifyDown() {
        let index = 0;
        const length = this.heap.length;
        const element = this.heap[0];
        
        while (true) {
            let leftChildIndex = 2 * index + 1;
            let rightChildIndex = 2 * index + 2;
            let leftChild, rightChild;
            let swap = null;
            
            if (leftChildIndex < length) {
                leftChild = this.heap[leftChildIndex];
                if (leftChild < element) {
                    swap = leftChildIndex;
                }
            }
            
            if (rightChildIndex < length) {
                rightChild = this.heap[rightChildIndex];
                if ((swap === null && rightChild < element) || (swap !== null && rightChild < leftChild)) {
                    swap = rightChildIndex;
                }
            }
            
            if (swap === null) {
                break;
            }
            
            [this.heap[index], this.heap[swap]] = [this.heap[swap], this.heap[index]];
            index = swap;
        }
    }
}

module.exports = mincost;