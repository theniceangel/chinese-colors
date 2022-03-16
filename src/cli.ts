import chalk from "chalk"
import { getColors, colors } from './index'

const input = (process.argv[2] || '').trim().toLocaleLowerCase()
const limit = +(process.argv[3]) || (input ? 15 : -1)

const whiteHex = '#fff'
const blackHex = '#000'
let items = input ? getColors(input) : colors
if (!isNaN(limit) && limit > 0)
  items = items.slice(0, limit)

console.log()
items
  .forEach((i) => {
    console.log(
      chalk
        .bgHex(i.hex)
        .hex(i.l > 50 ? blackHex : whiteHex)(
          `  ${i.hex}  ${i.name}(${i.pinyin})`,
        )
    )
  })
console.log()
