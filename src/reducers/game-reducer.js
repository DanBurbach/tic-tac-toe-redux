const initialState = {
        history: [{
            squares: [null, null, null, null, null, null, null, null, null]
        }],
        xIsNext: true
    }


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
        case 'RESET_GAME': {
            return initialState;
        }
        default:
            return state;
    }
}