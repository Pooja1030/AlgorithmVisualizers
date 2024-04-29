// DoublyLinkedList.js
class Node {
    constructor(data) {
        this.data = data;
        this.prev = null;
        this.next = null;
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
        } else {
            newNode.next = this.head;
            this.head.prev = newNode;
            this.head = newNode;
        }
    }

    insertAtEnd(data) {
        const newNode = new Node(data);
        if (!this.head) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            newNode.prev = this.tail;
            this.tail.next = newNode;
            this.tail = newNode;
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
        if (this.head === this.tail) {
            this.head = null;
            this.tail = null;
        } else {
            this.head = this.head.next;
            this.head.prev = null;
        }
        return removedData;
    }

    deleteFromEnd() {
        if (!this.tail) return null;
        const removedData = this.tail.data;
        if (this.head === this.tail) {
            this.head = null;
            this.tail = null;
        } else {
            this.tail = this.tail.prev;
            this.tail.next = null;
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

    displayList() {
        let current = this.head;
        let listValues = '';
        while (current !== null) {
            listValues += `${current.data} <-> `;
            current = current.next;
        }
        listValues += 'null';
        return listValues;
    }
}

export default DoublyLinkedList;
