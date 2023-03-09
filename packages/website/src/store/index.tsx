import { makeAutoObservable } from 'mobx'
import { login, registration, logout } from '../services/AuthServices'
import axios, { AxiosResponse } from 'axios'
import $api, { API_URL } from '../http'

export default class Store {
  isAuth = false
  isRegistration = false
  user = {} as User
  userName = '' as string
  isLoading = false

  constructor () {
    makeAutoObservable(this)
  }

  setAuth (bool: boolean) {
    this.isAuth = bool
  }

  setRegistration (bool: boolean) {
    this.isRegistration = bool
  }

  setUser (user: User) {
    this.user = user
  }

  setUserName (userName: string) {
    this.userName = userName
  }

  setLoading (bool: boolean) {
    this.isLoading = bool
  }

  async registration (data: Data) {
    try {
      const response = await registration(data)
      console.log(response)
      this.setRegistration(true)
      this.setUserName(response.data.user.username)
      this.setAuth(true)
      localStorage.setItem('token', response.data.accessToken)
    } catch (e) {
      console.log(e)
    }
  }

  async login (data: Data) {
    try {
      const response = await login(data)
      console.log(response)
      this.setAuth(true)
      this.setUserName(response.data.user.username)
      localStorage.setItem('token', response.data.accessToken)
    } catch (e) {
      console.log(e)
    }
  }

  async logout () {
    try {
      const response = await logout()
      localStorage.removeItem('token')
      this.setAuth(false)
      this.setUserName('')
      this.setUser({} as any)
    } catch (e) {
      console.log(e)
    }
  }


  async checkAuth () {
    this.setLoading(true)
    try {
      const response = await axios.get<AuthResponse>(`${API_URL}/refresh`, { withCredentials: true })
      console.log(response)
      console.log(this.isRegistration, 'checkAuth this.isRegistration')
      localStorage.setItem('token', response.data.accessToken)
      this.setAuth(true)
      console.log(this.isAuth)
      console.log(response.data.user.username)
      this.setUserName(response.data.user.username)
      this.setUser(response.data.user)
    } catch (e) {
      console.log(e)
    } finally {
      this.setLoading(false)
    }
  }
}
