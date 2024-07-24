let initUserInfo = {
    avatarPath: "",
    nickName: ""
}

export default function userInfo(state=initUserInfo, action) {
    if (action.type === 'SET_USER_INFO') {
        state = action.payload
    }
    if (action.type === 'CLAEN_USER_INFO') {
        state = initUserInfo
    }
    return state
}