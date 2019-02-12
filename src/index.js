import greet from './greet/greet.js'
import './index.less'
greet()
const doc = document
doc.querySelector('#clickBtn').addEventListener('click', () => {
  doc.querySelector('#dialog').style.display = 'block'
})

doc.querySelector('#closeBtn').addEventListener('click', () => {
  doc.querySelector('#dialog').style.display = 'none'
})

console.log('刷新2222')
document.write('徐怀远')
