import { shallowMount } from '@vue/test-utils'
import Toasting from '../../../src/components/Toasting.vue'

describe('normalities', () => {
  it('the message would be proper', () => {
    const message = 'Thank you'
    const wrapper = shallowMount(Toasting, {
      props: { message }
    })
    expect(wrapper.text()).toMatch(message)
  })
})
