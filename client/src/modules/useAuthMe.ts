import { reactive, InjectionKey, toRefs } from 'vue'

import AuthApi from '../api/Auth'

export const useAuthMe = () => {
  const me = reactive({
    isAuthenticated: false,
    name: '',
    email: ''
  })

  const updateMyInfo = ({ isAuthenticated, name, email }: { isAuthenticated: boolean; name: string; email: string }) => {
    me.isAuthenticated = isAuthenticated
    me.name = name
    me.email = email
  }

  const fetchMyInfo = async () => {
    const result = await new AuthApi().isUserActive()
    if (result.succeed) {
      updateMyInfo({ isAuthenticated: true, name: result.data.name, email: result.data.email })
    } else {
      updateMyInfo({ isAuthenticated: false, name: '', email: '' })
    }
  }

  return {
    ...toRefs(me),

    fetchMyInfo,
    updateMyInfo
  }
}

export type AuthMe = ReturnType<typeof useAuthMe>

export const UseAuthMeKey: InjectionKey<AuthMe> = Symbol('UseAuthMe')