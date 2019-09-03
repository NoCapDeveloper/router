# Router
JavaScript Router for single-page applications.
As simple as it can be.

## Usage
```js
import Router from './Router.js';

const titles = {
  '/': 'Home',
  '/login': 'Sign In'
};

let router = new Router(titles);
router.on('/', () => console.log('Show Home Page'));
router.on('/login', () => console.log('Show Login Page'));
router.on('/user/:id', e => console.log('Show user ' + e.id));

router.goTo(location.pathname); // run it after
// registering all routes to navigate
// to the route user typed in the address bar

// To navigate from JavaScript:
router.goTo('/user/3245');
```
   
## Update Links
Every time you are dynamically adding new links (`<a href="...">...</a>`), you need to show them to the router by running `router.getLinks()`. This selects all the links by `document.querySelectorAll('a')` and bind `click` event listeners to them.
Router does it only once by itself, on initialization.