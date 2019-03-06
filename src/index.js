import greet from './greet/greet.js'
import './index.less'
greet()

const $h2 = document.querySelector('h2')
$h2.className = ''
setTimeout(() => {
  $h2.className = 'rubberBand'
}, 300)

console.log('111333333')
