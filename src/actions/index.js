const actions = {
    mark(position) {
        return {
            type: constants.MARK,
            position: position
        };
    },
    reset() {
        return {
            type: constants.RESET,
        };
    }
};