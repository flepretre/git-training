export { theme } from './theme/theme';

const loadSlide = i => require(`./slides/${i}.mdx`).default;

const slides = [];

const n = 6;
for (let i = 1; i <= n; i++) {
  slides.push(...loadSlide(i));
}

export default slides;
