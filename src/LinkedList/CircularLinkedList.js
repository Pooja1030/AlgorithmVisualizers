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
    }

    insertAtBeginning(data) {
        const newNode = new Node(data);
        if (!this.head) {
            newNode.next = newNode; // Circular reference to itself
            this.head = newNode;
        } else {
            newNode.next = this.head.next;
            this.head.next = newNode;
        }
    }

    deleteAtBeginning() {
        if (this.head !== null) {
            const removedData = this.head.next.data;
            if (this.head.next === this.head) {
                this.head = null;
            } else {
                this.head.next = this.head.next.next;
            }
            return removedData;
        }
        return null;
    }

    displayList() {
        if (this.head === null) {
            return 'List is empty';
        }
        let current = this.head.next;
        let listValues = `${this.head.data} -> `;
        while (current !== this.head) {
            listValues += `${current.data} -> `;
            current = current.next;
        }
        listValues += `${this.head.data} (Head)`;
        return listValues;
    }
}

export default CircularLinkedList;
