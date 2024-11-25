        // Stack class using array implementation
        class Stack {
            constructor() {
                this.items = [];
            }

            push(element) {
                this.items.push(element);
            }

            pop() {
                if (this.isEmpty()) {
                    return null;
                }
                return this.items.pop();
            }

            peek() {
                if (this.isEmpty()) {
                    return null;
                }
                return this.items[this.items.length - 1];
            }

            isEmpty() {
                return this.items.length === 0;
            }

            getStack() {
                return this.items;
            }
        }

        const stack = new Stack();

        function updateStackDisplay() {
            const stackDisplay = document.getElementById('stack-display');
            stackDisplay.innerHTML = '';
            const currentStack = stack.getStack();

            if (currentStack.length === 0) {
                stackDisplay.innerHTML = '<p>Stack is empty</p>';
                return;
            }

            currentStack.forEach((value, index) => {
                const element = document.createElement('div');
                element.classList.add('stack-element');
                if (index === currentStack.length - 1) {
                    element.classList.add('highlight');
                }
                element.textContent = value;
                stackDisplay.appendChild(element);
            });
        }

        function push() {
            const input = document.getElementById('push-value');
            const value = input.value;
            if (value === '') {
                alert('Please enter a value to push!');
                return;
            }
            stack.push(value);
            input.value = '';
            updateStackDisplay();
        }

        function pop() {
            const poppedValue = stack.pop();
            if (poppedValue === null) {
                alert('Stack is empty!');
            } else {
                alert(`Popped: ${poppedValue}`);
            }
            updateStackDisplay();
        }

        function peek() {
            const topValue = stack.peek();
            if (topValue === null) {
                alert('Stack is empty!');
            } else {
                alert(`Top of the stack: ${topValue}`);
            }
        }

        function isEmpty() {
            alert(stack.isEmpty() ? 'Yes, the stack is empty!' : 'No, the stack is not empty!');
        }

        function openOverlay() {
            document.getElementById('stack-overlay').style.display = 'flex';
        }

        function closeOverlay() {
            document.getElementById('stack-overlay').style.display = 'none';
        }

        updateStackDisplay();