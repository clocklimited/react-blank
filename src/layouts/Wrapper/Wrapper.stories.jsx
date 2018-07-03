import React from 'react'
import { storiesOf } from '@storybook/react'
import Wrapper from '.'

storiesOf('Layouts/Wrapper', module)
.add('Default', () =>
  <Wrapper>
    <h1>Hello</h1>
    <p>This is the Wrapper layout.</p>
  </Wrapper>
)
