import { reactive, InjectionKey, toRefs } from 'vue'

import router from '../router/'

import AuthApi from '../api/Auth'

export const useAuthMe = () => {
  const me = reactive({
    isAuthenticated: false,
    _id: '',
    name: '',
    email: ''
  })

  const updateMyInfo = ({ isAuthenticated, _id, name, email }: { isAuthenticated: boolean; _id?: string; name: string; email: string }) => {
    me.isAuthenticated = isAuthenticated
    _id === undefined ? me._id = '' : me._id = _id
    me.name = name
    me.email = email
  }

  const fetchMyInfo = async () => {
    const result = await new AuthApi().isUserActive()
    if (result.succeed) {
      updateMyInfo({ isAuthenticated: true, _id: result.data._id, name: result.data.name, email: result.data.email })
    } else {
      updateMyInfo({ isAuthenticated: false, name: '', email: '' })
    }
  }

  const logout = async () => {
    const result = await new AuthApi().logout()
    if (result.succeed) {
      updateMyInfo({ isAuthenticated: false, name: '', email: '' })
      router.push({ name: 'AuthLogin' })
    }
  }

  return {
    ...toRefs(me),

    fetchMyInfo,
    updateMyInfo,
    logout
  }
}

export type AuthMe = ReturnType<typeof useAuthMe>

export const UseAuthMeKey: InjectionKey<AuthMe> = Symbol('UseAuthMe')

export const authMeDefault = useAuthMe()
