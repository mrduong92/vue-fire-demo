// let user = {}
// if (localStorage.user) {
const authUser = JSON.parse(localStorage.getItem('user')) || null
// }
export {authUser}
