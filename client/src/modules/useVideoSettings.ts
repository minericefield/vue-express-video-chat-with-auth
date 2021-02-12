import { reactive, toRefs, InjectionKey } from 'vue'
import { get, set } from 'local-storage'

export type State = {
  isAudioOn: boolean;
  isVideoOn: boolean;
}
export const useVideoSettings = () => {
  const state = reactive<State>({
    isAudioOn: true,
    isVideoOn: true
  })

  const updateSettings = ({ isAudioOn, isVideoOn }: Partial<State>) => {
    if (isAudioOn !== undefined) state.isAudioOn = isAudioOn
    if (isVideoOn !== undefined) state.isVideoOn = isVideoOn

    set('videoSettings', state)
  }

  const restoreSettings = () => {
    const restoredState = get<State | undefined>('videoSettings')
    if (restoredState) updateSettings(restoredState)
  }

  return {
    ...toRefs(state),

    updateSettings,
    restoreSettings
  }
}

export type VideoSettings = ReturnType<typeof useVideoSettings>

export const UseVideoSettingsKey: InjectionKey<VideoSettings> = Symbol('UseVideoSettings')

export const videoSettingsDefault = useVideoSettings()
