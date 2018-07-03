import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import Hoozit from '.'

storiesOf('Components/Hoozit', module)
.add('Default', () =>
  <Hoozit title='I am a hoozit' onClick={action(`I've been clicked`)}>
    <p>I am the body</p>
  </Hoozit>
)
.add('Without `title`', () =>
  <Hoozit onClick={action(`I've been clicked`)}>
    <p>I am the body</p>
  </Hoozit>
)
