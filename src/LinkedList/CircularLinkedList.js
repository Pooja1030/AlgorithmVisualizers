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
            newNode.next = newNode; // Point to itself if it's the only node
            this.head = newNode;
        } else {
            let current = this.head;
            while (current.next !== this.head) {
                current = current.next;
            }
            current.next = newNode;
            newNode.next = this.head;
            this.head = newNode;
        }
    }

    insertAtEnd(data) {
        const newNode = new Node(data);
        if (!this.head) {
            newNode.next = newNode; // Point to itself if it's the only node
            this.head = newNode;
        } else {
            let current = this.head;
            while (current.next !== this.head) {
                current = current.next;
            }
            current.next = newNode;
            newNode.next = this.head;
        }
    }

    insertAfterNode(prevData, newData) {
        const newNode = new Node(newData);
        if (!this.head) {
            this.head = newNode;
            newNode.next = newNode; // Point to itself if it's the only node
            return;
        }
        let current = this.head;
        do {
            if (current.data === prevData) {
                newNode.next = current.next;
                current.next = newNode;
                return;
            }
            current = current.next;
        } while (current !== this.head);
        // If prevData not found, insert at the end
        this.insertAtEnd(newData);
    }

    deleteAtBeginning() {
        if (!this.head) return null;
        let removedData = this.head.data;
        if (this.head.next === this.head) {
            this.head = null; // Reset head if it's the only node
        } else {
            let current = this.head;
            while (current.next !== this.head) {
                current = current.next;
            }
            current.next = this.head.next;
            this.head = this.head.next;
        }
        return removedData;
    }

    deleteAtEnd() {
        if (!this.head) return null;
        let removedData = this.head.data;
        if (this.head.next === this.head) {
            this.head = null; // Reset head if it's the only node
        } else {
            let current = this.head;
            while (current.next.next !== this.head) {
                current = current.next;
            }
            removedData = current.next.data;
            current.next = this.head;
        }
        return removedData;
    }

    deleteFromMiddle(dataToDelete) {
        if (!this.head) return null;
        if (this.head.data === dataToDelete) {
            return this.deleteAtBeginning();
        }
        let current = this.head;
        while (current.next !== this.head) {
            if (current.next.data === dataToDelete) {
                let removedData = current.next.data;
                current.next = current.next.next;
                return removedData;
            }
            current = current.next;
        }
        return null; // Node with dataToDelete not found
    }

    search(dataToSearch) {
        if (!this.head) return null;
        let current = this.head;
        do {
            if (current.data === dataToSearch) {
                return current;
            }
            current = current.next;
        } while (current !== this.head);
        return null; // Node with dataToSearch not found
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
