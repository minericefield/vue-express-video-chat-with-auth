import { shallowMount } from '@vue/test-utils'
import CircleIconButton from '../../../src/components/CircleIconButton.vue'

describe('normalities', () => {
  it('disabled-overlay would be hidden default', () => {
    const wrapper = shallowMount(CircleIconButton, {
      props: {
        icon: '',
      }
    })
    expect(wrapper.find('.circle-icon-button-disabled-overlay').isVisible()).toBe(false)
  })

  it('disabled-overlay would be shown when false was inserted for isActive', () => {
    const wrapper = shallowMount(CircleIconButton, {
      props: {
        icon: '',
        isActive: false
      }
    })
    expect(wrapper.find('.circle-icon-button-disabled-overlay').isVisible()).toBe(true)
  })
})
