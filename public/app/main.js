import AuthController from "./components/auth/auth-controller.js";
import AuthService from "./components/auth/auth-service.js";
import UsersController from "./components/users/users-controller.js";



let auth = new AuthService()



class App {
  constructor() {
    this.controllers = {
      authController: new AuthController(auth),
      usersController: new UsersController(auth)
    }
  }
}


// @ts-ignore
window.app = new App()