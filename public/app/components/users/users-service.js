
let _api = axios.create({
  baseURL: '/api/users',
  withCredentials: true,
  timeout: 3000
})


export default class UsersService {
  constructor() {
    console.log('user service is up and running')
  }

}