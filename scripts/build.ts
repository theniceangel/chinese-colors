import fs from 'fs/promises'
import { colord } from 'colord'
import namer from 'color-namer'
import colors from '../raw-colors.json'

async function start() {
  const items = colors
    .map(({ hex, pinyin, name }) => {
      const { h, s, l } = colord(hex).toHsl()
      // @ts-ignore
      const nameSets = namer(hex, { distance: 'deltaE' })

      const names = Array.from(
        new Set(
          Object.entries(nameSets)
            .flatMap(([key, list]) => {
              return list
                .filter(i => i.distance < 4)
                .map(i => i.name.toLowerCase().split(' ').slice(-1)[0])
                .filter(i => i.length > 2)
            }),
        ),
      )
      // push origin name
      names.push(pinyin, name)
      return {
        h,
        s,
        l,
        hex,
        pinyin,
        name,
        names
      }
    })

  await fs.writeFile('./src/colors.json', `${JSON.stringify(items, null, 2)}\n`, 'utf-8')
}

start()
