import { defineConfig, presetUno, presetIcons } from 'unocss';

const icons = `
i-ri:external-link-line
i-ri:anchor-line
i-ri:arrow-down-s-line
i-ri:arrow-right-line
i-ri:menu-line
i-ri:upload-cloud-2-line
i-ri:checkbox-circle-fill
i-ri:road-map-line
i-ri:arrow-down-s-line
i-ri:table-2
i-ri:mail-line
i-ri:download-line
i-ri:search-line
i-ri:file-3-line
i-ri:save-line
i-ri:information-fill
i-ri:information-line
i-ri:computer-line
i-ri:walk-fill
i-ri:external-link-line
i-ri:close-fill
i-ri:file-edit-line
i-ri:alert-fill
i-ri:check-fill
i-ri:smartphone-line
i-ri:mail-unread-line
i-ri:calendar-event-fill
i-ri:menu-fill
i-ri:edit-2-fill
i-ri:arrow-right-line
`.split('\n').filter(s => s);

// console.log(icons);

const classes = `
flex
border-b-2
border-solid
border-current
p-1
p-2
p-4
mb-0
mr-auto
mr-2
ms-2
flex-col
items-center
gap-2
grow
justify-between
w-full
max-w-xl
font-bold
`.split('\n').filter(s => s);

const safelist = [...icons, ...classes];

export default defineConfig({
  blocklist: ['grid'],
  safelist,
  presets: [
    presetUno({ variablePrefix: 'nyc-' }),
    presetIcons({
      collections: {
        custom: {
          search: '<svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M9.96705 10.6748C9.03157 11.3652 7.87496 11.7734 6.62303 11.7734C3.50996 11.7734 0.986328 9.24976 0.986328 6.1367C0.986328 3.02364 3.50996 0.5 6.62303 0.5C9.73609 0.5 12.2597 3.02364 12.2597 6.1367C12.2597 7.38777 11.8521 8.54364 11.1625 9.47878L14.7412 13.0575C15.0714 13.3877 15.0714 13.923 14.7412 14.2532C14.411 14.5834 13.8757 14.5834 13.5455 14.2532L9.96705 10.6748ZM10.8507 6.13603C10.8507 8.47082 8.95799 10.3636 6.62319 10.3636C4.2884 10.3636 2.39567 8.47082 2.39567 6.13603C2.39567 3.80123 4.2884 1.9085 6.62319 1.9085C8.95799 1.9085 10.8507 3.80123 10.8507 6.13603Z" fill="currentColor"/></svg>'
        }
      }
    })
  ]
});
