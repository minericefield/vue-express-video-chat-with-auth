import { reactive, InjectionKey, toRefs } from 'vue'

export const useToasting = () => {
  const state = reactive({
    isVisible: false,
    message: '',
    isError: false
  })

  const displayToasting = ({ shouldBeVisible, message, isError }: { shouldBeVisible: boolean; message: string; isError: boolean }) => {
    state.isVisible = shouldBeVisible
    state.message = message
    state.isError = isError
  }
  
  return {
    ...toRefs(state),

    displayToasting
  }
}

export const UseToastingKey: InjectionKey<ReturnType<typeof useToasting>> = Symbol('UseToasting')
