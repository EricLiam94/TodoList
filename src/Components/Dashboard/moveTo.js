import { db, auth } from "../../Firebase"

const list = ["todo", "doing", "done", "backlog"]

const moveItemTo = async (item, from, to) => {
    try {
        console.log(item, from, to)
        await db.ref(`list/${auth.currentUser.uid}/${from}/${item.id}`).remove();
        await db.ref(`list/${auth.currentUser.uid}/${to}/${item.id}`).set(item)
        return true
    } catch (error) {
        console.log(error.message)
        return false;
    }

}

export const dragTo = (width, delta, type, item) => {
    console.log(width, delta, type)
    if (Math.abs(delta) < width) return false
    let index = list.indexOf(type)
    let res = delta / width
    let moveDistance = res > 0 ? Math.floor(res) : Math.ceil(res)
    console.log(moveDistance)
    let newIndex = index + moveDistance
    if (newIndex < 0 || newIndex >= list.length) return false
    return moveItemTo(item, type, list[newIndex])
}



export const constMoveToNext = (item, from) => {
    if (from === "backlog") return false
    let next = list[list.indexOf(from) + 1]
    moveItemTo(item, from, next)

}

export default moveItemTo;