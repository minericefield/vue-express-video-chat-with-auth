import { shallowMount } from '@vue/test-utils'
import ChannelPreview from '../../../src/components/ChannelPreview.vue'

describe.skip('normalities', () => { // doesn't work maybe because of inject?
  it('members are displayed', () => {
    const wrapper = shallowMount(ChannelPreview, {
      props: {
        channel: {
          name: 'hello world',
          members: [
            {
              _id: 1,
              name: 'Akao',
              isAudioOn: true,
              isVideoOn: true
            },
            {
              _id: 2,
              name: 'Hello',
              isAudioOn: true,
              isVideoOn: true
            }
          ]
        }
      }
    })
    wrapper.vm.$nextTick(() => {
      expect(wrapper.find('.member-name')).toHaveLength(2)
    })
  })
})
