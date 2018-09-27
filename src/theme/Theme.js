import { dark as t } from 'mdx-deck/themes';

export const theme = {
  ...t,
  css: {
    ...t.css,
    'background-image': `url(https://github.com/flepretre/m6git/raw/master/src/assets/background.png)`,
    'background-position': 'center',
    'background-repeat': 'no-repeat',
    'background-size': 'cover',
    'background-color': 'rgba(0, 0, 0, 0.5)',
    li: {
      'text-align': 'left',
    },
    pre: {
      ...t.code,
      'text-align': 'left',
    },
  },
};
