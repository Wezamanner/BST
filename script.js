
import { Tree } from "./Tree.js";

// 1. Generate random numbers less than 100.
function generateRandomNumbers(size) {
    return Array.from(
        { length: size },
        () => Math.floor(Math.random() * 100)
    );
}

const numbers = generateRandomNumbers(15);
console.log("Original array:", numbers);

// 2. Create the BST and confirm it is balanced.
const tree = new Tree(numbers);

console.log("Initially balanced:", tree.isBalanced());

// Helper function to print all traversals.
function printTraversals(tree) {
    const traversals = {
        levelOrder: [],
        preOrder: [],
        postOrder: [],
        inOrder: [],
    };

    tree.levelOrderForEach((node) => {
        traversals.levelOrder.push(node.data);
    });

    tree.preOrderForEach((node) => {
        traversals.preOrder.push(node.data);
    });

    tree.postOrderForEach((node) => {
        traversals.postOrder.push(node.data);
    });

    tree.inOrderForEach((node) => {
        traversals.inOrder.push(node.data);
    });

    console.log("Level order:", traversals.levelOrder);
    console.log("Pre-order:", traversals.preOrder);
    console.log("Post-order:", traversals.postOrder);
    console.log("In-order:", traversals.inOrder);
}

// 3. Print traversals of the balanced tree.
console.log("\n--- Initial balanced tree ---");
printTraversals(tree);

// 4. Unbalance the tree by inserting values greater than 100.
tree.insert(101);
tree.insert(110);
tree.insert(120);
tree.insert(130);
tree.insert(140);

console.log("\nBalanced after insertions:", tree.isBalanced());

// 5. Rebalance the tree.
tree.rebalance();

console.log("Balanced after rebalancing:", tree.isBalanced());

// 6. Print traversals of the rebalanced tree.
console.log("\n--- Rebalanced tree ---");
printTraversals(tree);
