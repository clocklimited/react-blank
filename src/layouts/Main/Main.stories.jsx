import React from 'react'
import { storiesOf } from '@storybook/react'
import Main from '.'

storiesOf('Layouts/Main', module)
.add('Default', () =>
  <Main>
    <h1>Hello</h1>
    <p>This is the main layout.</p>
  </Main>
)
