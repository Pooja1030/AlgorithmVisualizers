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

    steps(operation) {
        switch (operation) {
            case "insertAtBeginning":
                return  [
                    { code: "1. Create new node" },
                    { code: "2. Change next of new node to point to head" },
                    { code: "3. Change head to point to recently created node" },
                ]
            case "insertAfterNode":
                return [
                    { code: "1. Create new node" },
                    { code: "2. Traverse to node just before the required position of new node" },
                    { code: "3. Change next pointers to include new node in between" },
                ]
            case "insertAtEnd":
                return [
                    { code: "1. Create new node" },
                    { code: "2. Traverse to last node" },
                    { code: "3. Change next of last node to recently created node" },
                ]
            case "deleteAtBeginning":
                return [
                    { code: "1. Point head to the second node" },
                ]
            case "deleteFromMiddle":
                 return [
                    { code: "1. Traverse to element before the element to be deleted" },
                    { code: "2. Change next pointers to exclude the node from the chain" },
                ]
            case "deleteFromEnd":
                return [
                    { code: "1. Traverse to second last element" },
                    { code: "2. Change its next pointer to null" },
                ]
            case "search":
                return [
                    { code: "1. Make head as the current node." },
                    { code: "2. Run a loop until the current node is NULL because the last element points to NULL." },
                    { code: "3. In each iteration, check if the key of the node is equal to item. If it the key matches the item, return true otherwise return false." },
                ]
            case "traverse":
                return [
                    { code: "1. Initialize a pointer to the head node" },
                    { code: "2. Check that the pointer is null or not null, if it is null then return." },
                    { code: "3. While the pointer is not null, access the data from that node and store it to print." },
                    { code: "4. Move the pointer to next node." },
                    { code: "5. Check the pointer is null or not null, until it reaches to the end of the list." },
                ]
            default:
                return [
                    { code: "" },
                ]
        }
    }
}



export default SinglyLinkedList;

