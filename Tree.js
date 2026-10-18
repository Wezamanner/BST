
class Node {
    constructor(data) {
        // 1. Store the data passed to the constructor.
        this.data = data
        // 2. Initialize the left child.
        this.left= null;
        // 3. Initialize the right child.
        this.right=null
    }
}
export class Tree {
    constructor(array) {
        // Store the root using the result of buildTree(array).
        this.root = this.#buildTree(array)/* your code here */;
    }
   #buildTree(array){
    const sortedArray = [...new Set(array)].sort((a,b)=> a-b);
    if(sortedArray.length===0){
        return null;
    }
    const mid =Math.floor(sortedArray.length/2);

    const root = new Node(sortedArray[mid])

    root.left= this.#buildTree(sortedArray.slice(0,mid))
    root.right=this.#buildTree(sortedArray.slice(mid+1));
    return root;
}

includes(value) {
    let current = this.root;

while (current !== null) {
        // 1. Check if current.data equals value.
        if(current.data===value){
            return true;
        }
        // 2. If value is smaller, move left.
        else if(current.data>value){
            current=current.left;
        }
        // 3. Otherwise, move right.
          else{
            current=current.right;
        }
    }
    return false;
    // 4. What should we return if we reach null?
}
insert(value){
    if (this.root === null) {
        this.root = new Node(value);
        return;
    }
    let current = this.root;
while (current !== null) {
        // 1. Check if current.data equals value.
        if(current.data===value){
         return;
        }
       
        // 2. If value is smaller, move left.
        else if(current.data>value){
            if(current.left===null){
                current.left=new Node(value)
                return;
            }else{
            current=current.left;
            }
        }
        // 3. Otherwise, move right.
          else{
            if(current.right===null){
                current.right=new Node(value)
                return;
            }else{
            current=current.right;
            }
        }
    }

   
}
deleteItem(value) {
    let current = this.root;
    let parent = null;

    // Find the node to delete.
    while (current !== null) {
        if (current.data === value) {
            break;
        } else if (value < current.data) {
            parent = current;
            current = current.left;
        } else {
            parent = current;
            current = current.right;
        }
    }

    // Value not found.
    if (current === null) return;

    // Handle a node with two children.
    if (current.left !== null && current.right !== null) {
        let successor = current.right;
        let sucParent = current;

        // Find the in-order successor.
        while (successor.left !== null) {
            sucParent = successor;
            successor = successor.left;
        }

        // Replace the node's data with the successor's data.
        current.data = successor.data;

        // Remove the successor while preserving its right child.
        if (sucParent === current) {
            current.right = successor.right;
        } else {
            sucParent.left = successor.right;
        }

        return;
    }

    // Handle a node with zero or one child.
    let child;

    if (current.left !== null) {
        child = current.left;
    } else {
        child = current.right;
    }

    // If deleting the root, update the root reference.
    if (parent === null) {
        this.root = child;
    } else if (parent.left === current) {
        parent.left = child;
    } else {
        parent.right = child;
    }
}
levelOrderForEach(callback) {
    const queue = [];

    if (this.root === null) return;

    queue.push(this.root);

    while (queue.length > 0) {
        // 1. Remove the first node from the queue.
        let node = queue.shift();
       
        // 2. Pass that node to callback.
            callback(node)
        // 3. Add its left child if it exists.
        if(node.left!==null){
            queue.push(node.left)
        }
        // 4. Add its right child if it exists.
        if(node.right!==null){
            queue.push(node.right)
        }
    }
}
inOrderForEach(callback) {
    function traverse(node) {
        // 1. Handle the base case.
            if(node===null){
                return;
            }
        // 2. Traverse the left subtree.
            traverse(node.left)
        // 3. Process the current node.
            callback(node)
        // 4. Traverse the right subtree.
        traverse(node.right)
    }

    traverse(this.root);
}
preOrderForEach(callback) {
    function traverse(node) {
        // 1. Handle the base case.
            if(node===null){
                return;
            }
            callback(node)
        // 2. Traverse the left subtree.
            traverse(node.left)
        // 3. Process the current node.
        // 4. Traverse the right subtree.
        traverse(node.right)
    }

    traverse(this.root);
}
postOrderForEach(callback) {
    function traverse(node) {
        // 1. Handle the base case.
            if(node===null){
                return;
            }
            traverse(node.left)
            traverse(node.right)
            callback(node)
        // 2. Traverse the left subtree.
        // 3. Process the current node.
        // 4. Traverse the right subtree.
    }

    traverse(this.root);
}
height(node){
    

    if(node===null){
        return -1;
    }
  let  leftHeight = 1+this.height(node.left);
  let rightHeight = 1+this.height(node.right);
  return 1 + Math.max(leftHeight,rightHeight)
}
depth(value) {
    let current = this.root;
    let depth = 0;

    while (current !== null) {
        if (current.data === value) {
            return depth;
        }
        if(value<current.data){
            current=current.left
        } else{
                current=current.right;
            }
            depth++;        
        // If targetNode is smaller, move left.
        // Otherwise, move right.

        // Increase depth after moving to a child.
    }

    return undefined;
}
isBalanced() {
 
   function check(node) {
       if (node === null) {
           return true;
        }
        
        const leftHeight= this.height(node.left)
        const rightHeight=this.height(node.right)
        if(Math.abs(leftHeight-rightHeight)>1){
        return false
        }

        return check(node.left) && check(node.right);
        // Check the height difference.

        // Recursively check the left and right subtrees.
    }

    return check(this.root);
}
rebalance(){
    if(this.isBalanced()){
        return;
    }
    const values = [];
    this.inOrderForEach((node)=>{
        values.push(node.data)
    });

    this.root= this.#buildTree(values);
}
 }


// const tree = new Tree([1, 2, 3, 4, 5, 6, 7]);
// console.log(tree.root);
// tree.deleteItem(1); // Delete a leaf
// tree.deleteItem(3); // Delete a node with one child (depending on current tree)
// tree.deleteItem(4); // Delete the root

// console.log(tree.includes(1)); // false
// console.log(tree.includes(4)); // false
// console.log(tree.includes(7)); // true
// console.log(tree.root);
