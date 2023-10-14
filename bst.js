class Node {
  constructor(d, left = null, right = null) {
    this.data = d;
    this.left = left;
    this.right = right;
  }
}
class BSTree {
  constructor(arr) {
    arr = this.preprocess(arr);
    this.root = this.buildTree(arr);
  }
  preprocess(arr) {
    arr = [...new Set(arr)]
      .sort((a, b) => a - b)
      .map((d) => (typeof d == "number" ? new Node(d) : d));
    return arr;
  }
  buildTree(arr) {
    if (arr.length === 0) return null;
    const mid = parseInt(arr.length / 2);
    const root = arr[mid];
    root.left = this.buildTree(arr.slice(0, mid));
    root.right = this.buildTree(arr.slice(mid + 1));

    return root;
  }
  prettyPrint(node, prefix = "", isLeft = true) {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      this.prettyPrint(
        node.right,
        `${prefix}${isLeft ? "│   " : "    "}`,
        false
      );
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
      this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  }
  insert(root, d) {
    if (typeof d == "number") d = new Node(d);
    if (d.data == root.data) return;
    else if (d.data < root.data) {
      if (root.left == null) {
        root.left = d;
        return;
      } else {
        this.insert(root.left, d);
      }
    } else {
      if (root.right == null) {
        root.right = d;
        return;
      } else {
        this.insert(root.right, d);
      }
    }
  }
  findSmallestData(root) {
    if (!root.left) {
      return root.data;
    } else {
      return this.findSmallestData(root.left);
    }
  }
  delete(root, d, parent = null) {
    if (typeof d == "number") d = new Node(d);
    if (!root) return;
    else if (d.data < root.data) {
      return this.delete(root.left, d, root);
    } else if (d.data > root.data) {
      return this.delete(root.right, d, root);
    } else {
      // we found it
      let deleted_node = root;
      if (!root.left && !root.right) {
        if (parent) {
          if (parent.left == root) parent.left = null;
          else parent.right = null;
        } else {
          this.root = null;
        }
      } else if (!root.right) {
        if (parent) {
          if (parent.left == root) {
            parent.left = root.left;
          } else {
            parent.right = root.left;
          }
        } else {
          this.root = root.left;
          this.root.left = null;
        }
      } else if (!root.left) {
        if (parent) {
          if (parent.left == root) {
            parent.left = root.right;
          } else {
            parent.right = root.right;
          }
        } else {
          this.root = root.right;
          this.root.right = null;
        }
      } else {
        if (parent) {
          let smallest_on_right = this.findSmallestData(root.right);
          if (parent.left == root) {
            this.delete(parent.left.right, smallest_on_right, parent.left);
            parent.left.data = smallest_on_right;
          } else {
            this.delete(parent.right.right, smallest_on_right, parent.right);
            parent.right.data = smallest_on_right;
          }
        } else {
          let smallest_on_right = this.findSmallestData(root.right);
          this.delete(this.root.right, smallest_on_right);
          this.root.data = smallest_on_right;
        }
      }
      return root;
    }
  }

  find(root = this.root, d) {
    if (typeof d != "number") return null;
    if (root == null) return null;
    if (d < root.data) {
      return this.find(root.left, d);
    } else if (d > root.data) {
      return this.find(root.right, d);
    } else {
      return root;
    }
  }
  levelOrder(root, fun = null, queue = null, list = []) {
    if (queue == null) {
      queue = [];
      queue.push(root);
    }
    if (fun == null) fun = (x) => x;
    if (queue.length == 0) {
      return list;
    } else {
      let temp = queue.shift();
      list.push(fun(temp.data));
      if (temp.left) queue.push(temp.left);
      if (temp.right) queue.push(temp.right);
      return this.levelOrder(root, fun, queue, list);
    }
  }
  inorder(root, fun = null, list = []) {
    // LKR
    if (fun == null) fun = (x) => x;
    if (!root) {
      return;
    }
    this.inorder(root.left, fun, list);
    list.push(fun(root.data));
    this.inorder(root.right, fun, list);
    if (list.length) return list;
  }
  preorder(root, fun = null, list = []) {
    // KLR
    if (fun == null) fun = (x) => x;
    if (!root) {
      return;
    }
    list.push(fun(root.data));
    this.preorder(root.left, fun, list);
    this.preorder(root.right, fun, list);
    if (list.length) return list;
  }
  postorder(root, fun = null, list = []) {
    // LRK
    if (fun == null) fun = (x) => x;
    if (!root) {
      return;
    }
    this.postorder(root.left, fun, list);
    this.postorder(root.right, fun, list);
    list.push(fun(root.data));
    if (list.length) return list;
  }
  height(node) {
    /**
     * Height is defined as the number of edges in longest path from a given node to a leaf node.
     */
    if (node == null) return -1;
    let leftHeight = this.height(node.left);
    let rightHeight = this.height(node.right);
    return Math.max(leftHeight, rightHeight) + 1;
  }
  depth(node, root = this.root, level = 0) {
    /**
     *  Depth is defined as the number of edges in path from a given node to the tree’s root node.
     */
    if (node == null) return null;
    if (root == null) return 0;
    if (root.data == node.data) return level;
    let count = this.depth(node, root.left, level + 1);
    if (count != 0) return count;
    return this.depth(node, root.right, level + 1);
  }
  isBalanced(root = this.root) {
    /**
     * balanced tree is one where the difference between heights of left subtree
     * and right subtree of every node is not more than 1.
     */
    if (!root) return true;
    let leftHeight = this.height(root.left);
    let rightHeight = this.height(root.right);
    return (
      Math.abs(leftHeight - rightHeight) <= 1 &&
      this.isBalanced(root.left) &&
      this.isBalanced(root.right)
    );
  }
  rebalance(root = this.root, parent = null) {
    if (root == null) return;
    let temp = this.buildTree(this.preprocess(this.inorder(root)));
    if (root == this.root) this.root = temp;
    else if (parent) {
      if (parent.left == root) parent.left = temp;
      else parent.right = temp;
    } else return Error("expected a parent");
  }
}
a = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, -2, -3, -13, 9, 67, 6345, 324, -32, 12];
let t = new BSTree(a);
// t.insert(t.root, -13);
// t.insert(t.root, -32);
// t.insert(t.root, -100);
// console.log(t.levelOrder(t.root, (x) => x * 2));
// t.prettyPrint(t.root);
// console.log("is balanced: " + t.isBalanced());
// console.log(
//   "___________________________________________________________________"
// );
// t.rebalance();
// t.prettyPrint(t.root);
// console.log("is balanced: " + t.isBalanced());
// console.log(t.depth(t.root.right.right.right));
// console.log(t.height(t.root.right.right.right));
// console.log("left root right");
// console.log(t.inorder(t.root));
// console.log("left right root");
// console.log(t.postorder(t.root));
// console.log("root left right ");
// console.log(t.preorder(t.root));
// t.insert(t.root, -13);
// t.insert(t.root, 92839);
// t.insert(t.root, 2);
// t.prettyPrint(t.root);
// let new_node = t.delete(t.root, 8);
// console.log("%c new node: " + new_node.data, "color: green");
// t.prettyPrint(t.root);
// console.log(t.find(t.root, 7));
