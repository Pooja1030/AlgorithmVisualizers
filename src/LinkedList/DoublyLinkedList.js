// DoublyLinkedList.js
class Node {
    constructor(data) {
        this.data = data;
        this.prev = null;
        this.next = null;
        this.isHead = false; // Property to indicate if the node is the head
        this.isTail = false; // Property to indicate if the node is the tail
        this.visited = false;
    }
}

class DoublyLinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
    }

    insertAtBeginning(data) {
        const newNode = new Node(data);
        if (!this.head) {
            this.head = newNode;
            this.tail = newNode;
            newNode.isHead = true; // Set isHead to true for the new head node
            newNode.isTail = true; // Set isTail to true for the new tail node
        } else {
            newNode.next = this.head;
            this.head.prev = newNode;
            this.head = newNode;
            newNode.isHead = true; // Set isHead to true for the new head node
        }
        if (newNode.next) {
            newNode.next.isHead = false; // Set isHead to false for the old head node
        } else {
            newNode.isTail = true; // If the list was empty, set isTail to true for the new tail node
        }
    }

    insertAtEnd(data) {
        const newNode = new Node(data);
        if (!this.head) {
            this.head = newNode;
            this.tail = newNode;
            newNode.isHead = true; // Set isHead to true for the new head node
            newNode.isTail = true; // Set isTail to true for the new tail node
            return;
        } else {
            newNode.prev = this.tail;
            newNode.prev.isTail = false; // Set isTail to false for the old tail node
            this.tail.next = newNode;
            this.tail = newNode;
            newNode.isTail = true; // Set isTail to true for the new tail node
        }
    }

    insertAfterNode(prevData, newData) {
        const newNode = new Node(newData);
        let current = this.head;
        while (current) {
            if (current.data === prevData) {
                newNode.prev = current;
                newNode.next = current.next;
                if (current.next) {
                    current.next.prev = newNode;
                } else {
                    this.tail = newNode;
                }
                current.next = newNode;
                break;
            }
            current = current.next;
        }
    }

    insertBeforeNode(nextData, newData) {
        const newNode = new Node(newData);
        let current = this.head;
        while (current) {
            if (current.data === nextData) {
                if (current === this.head) {
                    newNode.next = current;
                    current.prev = newNode;
                    this.head = newNode;
                } else {
                    newNode.prev = current.prev;
                    newNode.next = current;
                    current.prev.next = newNode;
                    current.prev = newNode;
                }
                return;
            }
            current = current.next;
        }
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

    deleteFromEnd() {
        if (!this.head) return null;
        const removedData = this.tail.data;
        this.tail = this.tail.prev;
        // Update isTail property of the new tail node
        if (this.tail) {
            this.tail.isTail = true;
            this.tail.next = null;
        } else {
            // If there is no tail, the list is empty
            this.head = null;
        }
        return removedData;
    }

    deleteFromMiddle(dataToDelete) {
        let current = this.head;
        while (current) {
            if (current.data === dataToDelete) {
                if (current === this.head) {
                    return this.deleteAtBeginning();
                } else if (current === this.tail) {
                    return this.deleteFromEnd();
                } else {
                    current.prev.next = current.next;
                    current.next.prev = current.prev;
                    return current.data;
                }
            }
            current = current.next;
        }
        return null;
    }

    search(dataToSearch) {
        let current = this.head;
        while (current) {
            if (current.data === dataToSearch) {
                return current;
            }
            current = current.next;
        }
        return null; // Node with dataToSearch not found
    }

    traverse() {
        let current = this.head;
        const result = [];
        while (current !== null) {
            current.visited = true;
            result.push(current);
            current = current.next;
        }
        return result;
    }

    displayList() {
        let current = this.head;
        let listValues = '';
        while (current !== null) {
            listValues += `${current.data} <--> `;
            current = current.next;
        }
        listValues = 'null <-- '+listValues+'null';
        return listValues;
    }
}

export default DoublyLinkedList;
