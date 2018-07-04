import React from 'react'
import { setAddon, configure, addDecorator } from '@storybook/react'
import { setOptions } from '@storybook/addon-options'
import { withInfo } from '@storybook/addon-info'
import config from '../config.json'
import BrowserRouter from 'react-router-dom/BrowserRouter'
import 'babel-polyfill'
import Main from '../src/layouts/Main'
const req = require.context('../src', true, /stories\.jsx$/)
const loadStories = () => {
  req.keys().forEach((filename) => req(filename))
}


setOptions({
  name: config.global.title,
  url: '/',
  addonPanelInRight: false
})
addDecorator((story, context) => withInfo('common info')(story)(context))
addDecorator(story =>
  <div>
    {story()}
  </div>
)
addDecorator(story => (
  <BrowserRouter>
    <Main>
      {story()}
    </Main>
  </BrowserRouter>
))

configure(loadStories, module)
