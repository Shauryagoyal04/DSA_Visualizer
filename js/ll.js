class Node {
    constructor(data) {
        this.data = data;
        this.next = null;
    }
}

class LinkedList {
    constructor() {
        this.head = null;
    }

    insertAtTop(data) {
        const newNode = new Node(data);
        newNode.next = this.head;
        this.head = newNode;
    }

    insertAtBottom(data) {
        const newNode = new Node(data);
        if (!this.head) {
            this.head = newNode;
            return;
        }
        let temp = this.head;
        while (temp.next) temp = temp.next;
        temp.next = newNode;
    }

    insertAtPosition(data, position) {
        const newNode = new Node(data);
        if (position === 1 || !this.head) {
            this.insertAtTop(data);
            return;
        }

        let temp = this.head;
        let count = 1;

        while (temp && count < position - 1) {
            temp = temp.next;
            count++;
        }

        if (!temp) {
            this.insertAtBottom(data);
        } else {
            newNode.next = temp.next;
            temp.next = newNode;
        }
    }

    deleteNodeByValue(value) {
        if (!this.head) return false;

        if (this.head.data === value) {
            this.head = this.head.next;
            return true;
        }

        let temp = this.head;
        while (temp.next && temp.next.data !== value) {
            temp = temp.next;
        }

        if (!temp.next) return false;

        temp.next = temp.next.next;
        return true;
    }

    searchNode(value) {
        let temp = this.head;
        let index = 1;

        while (temp) {
            if (temp.data == value) return index;
            temp = temp.next;
            index++;
        }

        return -1;
    }

    getNodes() {
        const nodes = [];
        let temp = this.head;

        while (temp) {
            nodes.push(temp.data);
            temp = temp.next;
        }

        return nodes;
    }
}

const list = new LinkedList();

function updateUI() {
    const linkedListDisplay = document.getElementById('linkedlist-display');
    linkedListDisplay.innerHTML = '';

    const nodes = list.getNodes();

    nodes.forEach((data) => {
        const nodeElement = document.createElement('div');
        nodeElement.classList.add('node');
        nodeElement.textContent = data;

        linkedListDisplay.appendChild(nodeElement);
    });
}

function insertAtTop() {
    const valueInput = document.getElementById('value');
    const value = valueInput.value;

    if (!value) {
        alert('Enter a value!');
        return;
    }

    list.insertAtTop(value);
    valueInput.value = '';
    updateUI();
}

function insertAtBottom() {
    const valueInput = document.getElementById('value');
    const value = valueInput.value;

    if (!value) {
        alert('Enter a value!');
        return;
    }

    list.insertAtBottom(value);
    valueInput.value = '';
    updateUI();
}

function insertAtK() {
    const valueInput = document.getElementById('value');
    const positionInput = document.getElementById('position');
    const value = valueInput.value;
    const position = parseInt(positionInput.value, 10);

    if (!value || isNaN(position)) {
        alert('Enter a valid value and position!');
        return;
    }

    list.insertAtPosition(value, position);
    valueInput.value = '';
    positionInput.value = '';
    updateUI();
}

function deleteNode() {
    const valueInput = document.getElementById('value');
    const value = valueInput.value;

    if (!value) {
        alert('Enter a value to delete!');
        return;
    }

    const success = list.deleteNodeByValue(value);

    if (!success) {
        alert('Node not found!');
    } else {
        alert(`Deleted node with value: ${value}`);
    }

    valueInput.value = '';
    updateUI();
}

function searchNode() {
    const valueInput = document.getElementById('value');
    const value = valueInput.value;

    if (!value) {
        alert('Enter a value to search!');
        return;
    }

    const index = list.searchNode(value);

    if (index === -1) {
        alert('Node not found!');
    } else {
        alert(`Node found at position: ${index}`);
    }

    valueInput.value = '';
}

// Overlay for "About LinkedList"
function openOverlay() {
    document.getElementById('linkedlist-overlay').style.display = 'flex';
}

function closeOverlay() {
    document.getElementById('linkedlist-overlay').style.display = 'none';
}

// Initialize UI
updateUI();
