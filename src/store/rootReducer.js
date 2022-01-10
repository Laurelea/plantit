const initialState = {
    counter: 10,
    isAuthenticated: false
}

export default function rootReducer (state=initialState, action) {
    switch(action.type) {
        case 'authorized':
            return {
                isAuthenticated: true
            }
        case 'unauthorized':
            return {
                isAuthenticated: false
            }
    }
    return state
}
