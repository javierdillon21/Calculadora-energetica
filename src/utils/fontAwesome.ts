/**
 * FontAwesome initial configuration. To next iterations
 * check the now in alpha, font Awesome 6.
 *
 * We can style easily the `<FontAwesome>` component
 * thanks that it support the `className` prop.
 * Also supoorts event props as `onClick`.
 * */
import '@fortawesome/fontawesome-svg-core/styles.css'
import { config, IconPack } from '@fortawesome/fontawesome-svg-core'
import { library } from '@fortawesome/fontawesome-svg-core'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'


library.add(fas as IconPack, fab as IconPack, far)

config.autoAddCss = false // Tell Font Awesome to skip adding the CSS automatically since it's being imported above
