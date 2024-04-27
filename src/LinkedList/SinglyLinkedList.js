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

    deleteAtBeginning() {
        if (this.head !== null) {
            const removedData = this.head.data;
            this.head = this.head.next;
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

export default SinglyLinkedList;
