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

    steps(operation) {
        switch (operation) {
            case "insertAtBeginning":
                return  [
                    { code: "1. Create new node" },
                    { code: "2. Set prev and next pointers of new node" },
                    { code: "3. Make new node as head node" },
                ]
            case "insertAfterNode":
                return [
                    { code: "1. Create new node" },
                    { code: "2. Traverse to node just before the required position of new node" },
                    { code: "3. Set the next pointer of new node and previous node" },
                    { code: "4. Set the prev pointer of new node and the next node" },
                ]
            case "insertBeforeNode":
                return [
                    { code: "1. Create new node" },
                    { code: "2. Traverse to the node before which you want to insert the new node." },
                    { code: "3. Set the next pointer of new node and previous node" },
                    { code: "4. Set the prev pointer of new node and the next node" },
                ]
            case "insertAtEnd":
                return [
                    { code: "1. Create new node" },
                    { code: "2. Traverse to last node" },
                    { code: "3. Set prev and next pointers of new node and the previous node" },
                ]
            case "deleteAtBeginning":
                return [
                    { code: "1. Point head to the second node" },
                    { code: "2. update the head to point to the second node (if it exists)." },
                    { code: "3. Update the previous pointer of the new head to be null." },
                ]
            case "deleteFromMiddle":
                 return [
                    { code: "1. Traverse to element before the element to be deleted" },
                    { code: "2. Update the pointers of the previous and next nodes of the node to be deleted to bypass it." },
                ]
            case "deleteFromEnd":
                return [
                    { code: "1. Traverse to the last element" },
                    { code: "2. Change next pointer of second last node to null" },
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

export default DoublyLinkedList;
