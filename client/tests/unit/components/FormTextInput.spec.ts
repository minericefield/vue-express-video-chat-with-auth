import { shallowMount } from '@vue/test-utils'
import FormTextInput from '../../../src/components/FormTextInput.vue'

describe('normalities', () => {
  it('error message would be displayed', () => {
    const wrapper = shallowMount(FormTextInput, {
      props: {
        text: '',
        target: '',
        label: '',
        errorMessage: 'Error!'
      }
    })
    expect(wrapper.find('.text-danger').exists()).toBe(true)
  })
})
