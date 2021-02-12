import { reactive, InjectionKey, toRefs } from 'vue'

import { UserResponse } from '../types/swagger/'

import router from '../router/'

import AuthApi from '../api/Auth'

export const useAuthMe = () => {
  const me = reactive({
    isAuthenticated: false,
    _id: '',
    name: '',
    email: ''
  })

  const updateMyInfo = (isAuthenticated: boolean, userResponse: UserResponse) => {
    me.isAuthenticated = isAuthenticated
    me._id = userResponse._id
    me.name = userResponse.name
    me.email = userResponse.email
  }

  const resetMyInfo = () => {
    me.isAuthenticated = false
    me._id = ''
    me.name = ''
    me.email = ''
  }

  const fetchMyInfo = async () => {
    const result = await new AuthApi().isUserActive()
    if (result.succeed) {
      updateMyInfo(true, result.data)
    } else {
      resetMyInfo()
    }
  }

  const logout = async () => {
    const result = await new AuthApi().logout()
    if (result.succeed) {
      await router.push({ name: 'AuthLogin' })
      resetMyInfo()
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
