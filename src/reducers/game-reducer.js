export default (state, action) => {
    switch (action.type) {
        case 'PLAYER_MOVE':
            const addPlay = {...action.squares};
            return {
                xIsNext: action.xIsNext,
                history: action.history.concat([{
                    squares: addPlay
                }])
            }
        default:
            return state;
    }
}