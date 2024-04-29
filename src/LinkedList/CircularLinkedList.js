// CircularLinkedList.js
class Node {
    constructor(data) {
        this.data = data;
        this.next = null;
    }
}

class CircularLinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
    }

    insertAtBeginning(data) {
        const newNode = new Node(data);
        if (!this.head) {
            this.head = newNode;
            this.tail = newNode;
            newNode.next = newNode; // Circular reference
        } else {
            newNode.next = this.head;
            this.tail.next = newNode; // Update tail's next to new node
            this.head = newNode;
        }
    }

    insertAtEnd(data) {
        const newNode = new Node(data);
        if (!this.head) {
            this.head = newNode;
            this.tail = newNode;
            newNode.next = newNode; // Circular reference
        } else {
            newNode.next = this.head;
            this.tail.next = newNode; // Update current tail's next to new node
            this.tail = newNode; // Update tail to new node
        }
    }

    insertAfterNode(prevData, newData) {
        const newNode = new Node(newData);
        let current = this.head;
        do {
            if (current.data === prevData) {
                newNode.next = current.next;
                current.next = newNode;
                if (current === this.tail) {
                    this.tail = newNode; // Update tail if inserting after the tail
                }
                return;
            }
            current = current.next;
        } while (current !== this.head);
        throw new Error("Previous node not found");
    }

    deleteAtBeginning() {
        if (!this.head) return null;
        const removedData = this.head.data;
        if (this.head === this.tail) {
            this.head = null;
            this.tail = null;
        } else {
            this.tail.next = this.head.next; // Update tail's next pointer
            this.head = this.head.next; // Move head to the next node
        }
        return removedData;
    }

    deleteFromEnd() {
        if (!this.head) return null;
        const removedData = this.tail.data;
        if (this.head === this.tail) {
            this.head = null;
            this.tail = null;
        } else {
            let current = this.head;
            while (current.next !== this.tail) {
                current = current.next;
            }
            current.next = this.head; // Update the next pointer of the node before tail
            this.tail = current; // Move tail to the node before
        }
        return removedData;
    }

    deleteFromMiddle(dataToDelete) {
        if (!this.head) return null;
        let current = this.head;
        let prev = null;
        do {
            if (current.data === dataToDelete) {
                if (current === this.head) {
                    return this.deleteAtBeginning();
                } else if (current === this.tail) {
                    return this.deleteFromEnd();
                } else {
                    prev.next = current.next; // Update previous node's next pointer
                    return current.data;
                }
            }
            prev = current;
            current = current.next;
        } while (current !== this.head);
        return null; // Node with dataToDelete not found
    }

    search(dataToSearch) {
        let current = this.head;
        do {
            if (current.data === dataToSearch) {
                return current;
            }
            current = current.next;
        } while (current !== this.head);
        return null; // Node with dataToSearch not found
    }
}

export default CircularLinkedList;
