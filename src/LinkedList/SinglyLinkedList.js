// SinglyLinkedList.js
class Node {
    constructor(data) {
        this.data = data;
        this.next = null;
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
        if (this.head === null) {
            this.head = newNode;
        } else {
            let current = this.head;
            while (current.next !== null) {
                current = current.next;
            }
            current.next = newNode;
        }
    }

    deleteAtBeginning() {
        if (this.head !== null) {
            const removedData = this.head.data;
            this.head = this.head.next;
            return removedData;
        }
        return null;
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
        if (this.head === null) {
            return null;
        }

        if (this.head.next === null) {
            const removedData = this.head.data;
            this.head = null;
            return removedData;
        }

        let prev = null;
        let current = this.head;
        while (current.next !== null) {
            prev = current;
            current = current.next;
        }
        prev.next = null;
        return current.data;
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

    displayList() {
        let current = this.head;
        let listValues = 'head ->';
        while (current !== null) {
            listValues += `${current.data} -> `;
            current = current.next;
        }
        listValues += 'null';
        return listValues;
    }
}

export default SinglyLinkedList;
