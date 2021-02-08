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

export type Loader = ReturnType<typeof useLoader>

export const UseLoaderKey: InjectionKey<Loader> = Symbol('UseLoader')
