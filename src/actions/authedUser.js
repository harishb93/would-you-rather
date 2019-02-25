export const SET_AUTHED_USER = 'SET_AUTHED_USER'
export const LOGOUT_USER='LOGOUT_USER'

//setAuthedUser action creator
export function setAuthedUser(id){
  return {
    type: SET_AUTHED_USER,
    id
  }
}

export function logoutUser(){
  return {
    type: LOGOUT_USER
  }
}
