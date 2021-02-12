import { reactive, InjectionKey, toRefs } from 'vue'

export const useToasting = () => {
  const state = reactive({
    isVisible: false,
    message: '',
    isError: false
  })

  const displayToasting = ({ message, isError = false }: { message: string; isError?: boolean }) => {
    state.isVisible = true
    state.message = message
    state.isError = isError
  }

  const hideToasting = () => {
    state.isVisible = false
    state.message = ''
    state.isError = false
  }
  
  return {
    ...toRefs(state),

    displayToasting,
    hideToasting
  }
}

export type Toasting = ReturnType<typeof useToasting>

export const UseToastingKey: InjectionKey<Toasting> = Symbol('UseToasting')

export const toastingDefault = useToasting()
