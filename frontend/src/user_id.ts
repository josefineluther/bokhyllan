import { v4 as uuidv4 } from 'uuid'

export default function getUserId() {
  let userId = localStorage.getItem('userId')
  if (!userId) {
    userId = uuidv4()
    localStorage.setItem('userId', userId)
  }
  return userId
}
