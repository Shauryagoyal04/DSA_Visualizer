let array = [];
let animations = [];
let animationIndex = 0;
let isSorting = false;

// Update the UI with the array bars
function updateUI() {
    const arrayDisplay = document.getElementById('array-display');
    arrayDisplay.innerHTML = '';

    array.forEach(value => {
        const bar = document.createElement('div');
        bar.classList.add('array-bar');
        bar.style.height = `${value * 3}px`;
        bar.textContent = value;
        arrayDisplay.appendChild(bar);
    });
}

// Highlight specific bars
function highlightBars(indices, highlight = true) {
    const bars = document.querySelectorAll('.array-bar');
    indices.forEach(index => {
        if (highlight) {
            bars[index].classList.add('highlight');
        } else {
            bars[index].classList.remove('highlight');
        }
    });
}

// Insert an element into the array
function insertElement() {
    const input = document.getElementById('array-input');
    const value = parseInt(input.value, 10);

    if (!isNaN(value)) {
        array.push(value);
        updateUI();
        input.value = '';
    } else {
        alert('Please enter a valid number.');
    }
}

// Bubble Sort implementation with animations
function bubbleSort(arr) {
    let n = arr.length;
    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            // Compare adjacent elements
            animations.push([j, j + 1, 'compare']); // Mark as compare
            if (arr[j] > arr[j + 1]) {
                // Swap if out of order
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                animations.push([j, arr[j], 'swap']);  // Swap animation
                animations.push([j + 1, arr[j + 1], 'swap']); // Swap animation
            }
        }
    }
}

// Execute animations for sorting
function playAnimations() {
    if (animationIndex >= animations.length || !isSorting) {
        isSorting = false;
        return;
    }

    const [index1, index2, action] = animations[animationIndex++];
    const bars = document.querySelectorAll('.array-bar');

    // Highlight the bars based on the action
    if (action === 'compare') {
        highlightBars([index1, index2]);
    } else if (action === 'swap') {
        // Swap the heights of the bars
        bars[index1].style.height = `${array[index1] * 3}px`;
        bars[index1].textContent = array[index1];
        bars[index2].style.height = `${array[index2] * 3}px`;
        bars[index2].textContent = array[index2];
        highlightBars([index1, index2], false);
    }

    // Pause to show the effect
    setTimeout(() => {
        playAnimations();
    }, 500);
}

// Start the bubble sort and animations
function startBubbleSort() {
    if (isSorting) return;
    isSorting = true;

    animations = [];
    const arrayCopy = [...array]; // Create a copy of the array to preserve the original
    bubbleSort(arrayCopy); // Sort the copy
    animationIndex = 0;
    playAnimations();
}

// Stop the sorting animation
function stopAnimation() {
    isSorting = false;
}

// Overlay functions
function openOverlay() {
    document.getElementById('merge-sort-overlay').style.display = 'flex';
}

function closeOverlay() {
    document.getElementById('merge-sort-overlay').style.display = 'none';
}
