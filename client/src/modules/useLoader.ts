import { ref, InjectionKey } from 'vue'

export const useLoader = () => {
  const isVisible = ref(false)

  const displayLoader = (shouldBeVisible: boolean) => {
    isVisible.value = shouldBeVisible
  }
  
  return {
    isVisible,

    displayLoader
  }
}

export const UseLoaderKey: InjectionKey<ReturnType<typeof useLoader>> = Symbol('UseLoader')
