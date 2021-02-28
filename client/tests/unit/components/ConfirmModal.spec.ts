import { shallowMount } from '@vue/test-utils'
import ConfirmModal from '../../../src/components/ConfirmModal.vue'

describe('normalities', () => {
  it('button text would be overwritten', () => {
    const wrapper = shallowMount(ConfirmModal, {
      props: {
        submitText: 'Hello'
      }
    })
    wrapper.vm.$nextTick(() => {
      expect(wrapper.find('.btn-primary').text()).toBe('Hello')
    })
  })
})
