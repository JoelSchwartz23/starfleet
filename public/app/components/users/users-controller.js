import UsersService from "./users-service.js";

let _auth = {}
let _usersService = new UsersService()


export default class UsersController {
  constructor(auth) {
    _auth = auth
    this.drawCurrentUser()
  }

  drawCurrentUser() {

  }
}