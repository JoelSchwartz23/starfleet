let _authService = {}

//draw when user is not logged in
function drawUserLogin() {
  console.log('not logged In')
  document.getElementById('auth').innerHTML = `
  <form onsubmit="app.controllers.authController.login(event)">
      <input type="text" name="username" placeholder="username" required>
      <input type="password" name="password" placeholder="password" required>
      <button type="submit">Login</button>
    </form>
    <p onclick="app.controllers.authController.showRegister()">Click to Register</p>
    `

}
//draw when user is logged in
function drawLogout() {
  console.log('logged in')
  document.getElementById('auth').innerHTML = `<button onclick="app.controllers.authController.logout()">logout</button>`
  console.log(_authService.user)
  let template = `
  Name: ${_authService.user.username}
  Rank: ${_authService.user.rank}
  Title: ${_authService.user.title}
  Ship: ${_authService.user.shipname}
  `
  document.getElementById('current-user').innerHTML = template

}

function _drawRegister() {
  document.getElementById('auth').innerHTML = `
  <form onsubmit="app.controllers.authController.register(event)">
      <input type="text" name="username" placeholder="username" required>
      <input type="password" name="password" placeholder="password" required>
      <input type="text" name="title" placeholder="rank title" required>
      <input type="number" name="rank" placeholder="rank 1-6" required>
      <input type="text" name="shipname" placeholder="ship name" required>
      <button type="submit">Register</button>
    </form>
    <p onclick="app.controllers.authController.showLogin()">Existing User?</p>
    `
}

export default class AuthController {
  constructor(auth) {
    _authService = auth
    _authService.authenticate(drawLogout, drawUserLogin)
  }
  login(event) {
    event.preventDefault();
    let creds = {
      username: event.target.username.value,
      password: event.target.password.value
    }
    _authService.login(creds, drawLogout)
  }
  register(event) {
    event.preventDefault();
    let creds = {
      username: event.target.username.value,
      password: event.target.password.value,
      title: event.target.title.value,
      rank: event.target.rank.value,
      shipname: event.target.shipname.value
    }
    _authService.register(creds, drawLogout)
  }
  logout() {
    _authService.logout(drawUserLogin)
    document.getElementById('current-user').innerHTML = ''
  }
  showRegister() {
    _drawRegister()
  }
  showLogin() {
    drawUserLogin()
  }
}