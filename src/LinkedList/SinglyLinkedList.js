// SinglyLinkedList.js
class Node {
    constructor(data) {
        this.data = data;
        this.next = null;
        this.isHead = false; // Property to indicate if the node is the head
        this.isTail = false; // Property to indicate if the node is the tail
        this.visited = false;
    }
}

class SinglyLinkedList {
    constructor() {
        this.head = null;
    }

    insertAtBeginning(data) {
        const newNode = new Node(data);
        newNode.next = this.head;
        this.head = newNode;
        newNode.isHead = true; // Set isHead to true for the new head node
        if (newNode.next) {
            newNode.next.isHead = false;
        } else {
            newNode.isTail = true; // If the list was empty, set isTail to true for the new tail node
        }
    }

    insertAfterNode(prevNodeData, newData) {
        let current = this.head;
        while (current !== null) {
            if (current.data === prevNodeData) {
                const newNode = new Node(newData);
                newNode.next = current.next;
                current.next = newNode;
                break;
            }
            current = current.next;
        }
    }

    insertAtEnd(data) {
        const newNode = new Node(data);
        if (!this.head) {
            this.head = newNode;
            newNode.isHead = true; // Set isHead to true for the new head node
            newNode.isTail = true; // Set isTail to true for the new tail node
            return;
        }
        let current = this.head;
        while (current.next !== null) {
            current = current.next;
        }
        current.isTail = false; // Set isTail to false for the old tail node
        current.next = newNode;
        newNode.isTail = true; // Set isTail to true for the new tail node
    }

    deleteAtBeginning() {
        if (!this.head) return null;
        const removedData = this.head.data;
        this.head = this.head.next;
        // Update isHead property of the new head node
        if (this.head) {
            this.head.isHead = true;
        }
        return removedData;
    }

    deleteFromMiddle(data) {
        if (this.head === null) {
            return;
        }

        if (this.head.data === data) {
            this.head = this.head.next;
            return;
        }

        let prev = null;
        let current = this.head;
        while (current !== null) {
            if (current.data === data) {
                prev.next = current.next;
                return;
            }
            prev = current;
            current = current.next;
        }
    }

    deleteFromEnd() {
        if (!this.head) return null;
        let current = this.head;
        let prev = null;
        // Traverse to the last node while keeping track of the previous node
        while (current.next !== null) {
            prev = current;
            current = current.next;
        }
        // Update isTail property of the previous node
        if (prev) {
            prev.isTail = true;
        } else {
            // If there is no previous node, the head was the only node
            this.head = null;
        }
        // Remove the last node
        const removedData = current.data;
        if (prev) {
            prev.next = null;
        }
        return removedData;
    }

    search(data) {
        let current = this.head;
        while (current !== null) {
            if (current.data === data) {
                return true;
            }
            current = current.next;
        }
        return false;
    }

    traverse() {
        let current = this.head;
        const result = [];
        while (current !== null) {
            current.visited = true;
            result.push(current); // Create node object with 'visited' property
            current = current.next;
        }
        return result;
    }

    displayList() {
        let current = this.head;
        let listValues = 'head -->';
        while (current !== null) {
            listValues += `${current.data} --> `;
            current = current.next;
        }
        listValues += 'null';
        return listValues;
    }
}

export default SinglyLinkedList;
