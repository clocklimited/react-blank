import React from 'react'
import { setAddon, configure, addDecorator } from '@storybook/react'
import { setOptions } from '@storybook/addon-options'
import config from '../config.json'
import BrowserRouter from 'react-router-dom/BrowserRouter'
const req = require.context('../src', true, /\.stories\.jsx$/)
const loadStories = () => {
  req.keys().forEach((filename) => req(filename))
}
import 'babel-polyfill'

setOptions({
  name: config.global.title,
  url: '/',
  addonPanelInRight: false
})

addDecorator(story => (
  <BrowserRouter>
    {story()}
  </BrowserRouter>
))

configure(loadStories, module)
