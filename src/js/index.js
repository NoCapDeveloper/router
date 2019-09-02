import Router from './Router.js';

let h1 = document.querySelector('h1');

const titles = {
  '/': 'Router',
  '/login': 'Login',
  '/about': 'About Us'
};

let router = new Router(titles);
router.on('/', () => h1.innerText = 'Home');
router.on('/about', () => h1.innerText = 'We Are Awesome');
router.on('/login', () => h1.innerText = 'Sign in');
router.on('/user/:id', args => h1.innerText = `User ${args.id}`);
router.on('/topics/:topic/:lesson', args => h1.innerText = `${args.topic}: ${args.lesson}`);
router.on('404', () => h1.innerText = `404 NOT FOUND`);

router.goTo(location.pathname);