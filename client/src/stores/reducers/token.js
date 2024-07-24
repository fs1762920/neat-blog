export default function token(state = null, action) {
    if (action.type === 'SET_TOKEN') {
        state = action.payload
    }
    if (action.type === 'CLAEN_TOKEN') {
        state = null
    }
    return state
}