function persistHistory(key, stack) {
    if (key) {
        sessionStorage.setItem(key, JSON.stringify(stack));
    }
}

function clearHistory(key) {
    if (key) {
        sessionStorage.removeItem(key);
    }
}

module.exports = function createHistory(persistHistoryAs = null) {
    let stack = [];
    if (persistHistoryAs) {
        if (sessionStorage.getItem(persistHistoryAs)) {
            stack = JSON.parse(sessionStorage.getItem(persistHistoryAs));
        }
    }
    return {
        persistHistoryAs,
        stack,
        push(key) {
            this.stack.push(key);
            persistHistory(this.persistHistoryAs, this.stack);
        },
        pop() {
            this.stack.pop();
            persistHistory(this.persistHistoryAs, this.stack);
        },
        clear() {
            this.stack = [];
            clearHistory(this.persistHistoryAs);
        },
        last() {
            return this.stack[this.stack.length - 1] ?
                this.stack[this.stack.length - 1] :
                undefined;
        },
        direction(key, last) {
            if (this.last() === key) {
                // if the page that comes it was in the final of the history queue i pop from that
                this.pop();
                return 'prev';
            } else if (last) {
                // if direction is go the next i save the state of the last element
                this.push(last.key);
            }

            return 'next';
        }
    };
};

