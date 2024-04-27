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

    deleteAtBeginning() {
        if (this.head !== null) {
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
        return null;
    }

    displayList() {
        let current = this.head;
        let listValues = '';
        while (current !== null) {
            listValues += `${current.data} -> `;
            current = current.next;
        }
        listValues += 'null';
        return listValues;
    }
}

export default DoublyLinkedList;
