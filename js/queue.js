// Queue class using array implementation
class Queue {
    constructor() {
        this.items = [];
    }

    enqueue(element) {
        this.items.push(element);
    }

    dequeue() {
        if (this.isEmpty()) {
            return null;
        }
        return this.items.shift();
    }

    peek() {
        if (this.isEmpty()) {
            return null;
        }
        return this.items[0];
    }

    isEmpty() {
        return this.items.length === 0;
    }

    getQueue() {
        return this.items;
    }
}

const queue = new Queue();

function updateQueueDisplay() {
    const queueDisplay = document.getElementById('queue-display');
    queueDisplay.innerHTML = '';

    const currentQueue = queue.getQueue();

    if (currentQueue.length === 0) {
        queueDisplay.innerHTML = '<p>Queue is empty</p>';
        return;
    }

    currentQueue.forEach(value => {
        const element = document.createElement('div');
        element.classList.add('queue-element');
        element.textContent = value;
        queueDisplay.appendChild(element);
    });
}

function enqueue() {
    const input = document.getElementById('enqueue-value');
    const value = input.value;
    if (value === '') {
        alert('Please enter a value to enqueue!');
        return;
    }
    queue.enqueue(value);
    input.value = '';
    updateQueueDisplay();
}

function dequeue() {
    const dequeuedValue = queue.dequeue();
    if (dequeuedValue === null) {
        alert('Queue is empty!');
    } else {
        alert(`Dequeued: ${dequeuedValue}`);
    }
    updateQueueDisplay();
}

function peek() {
    const frontValue = queue.peek();
    if (frontValue === null) {
        alert('Queue is empty!');
    } else {
        alert(`Front of the queue: ${frontValue}`);
    }
}

function isEmpty() {
    alert(queue.isEmpty() ? 'Yes, the queue is empty!' : 'No, the queue is not empty!');
}

function openOverlay() {
    document.getElementById('queue-overlay').style.display = 'flex';
}

function closeOverlay() {
    document.getElementById('queue-overlay').style.display = 'none';
}

updateQueueDisplay();