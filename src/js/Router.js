const getFragments = route => {
  let fragments = route.split('/');

  // remove fragments[0], it's always an empty string
  fragments.shift();

  return fragments;
}

// TODO: Don't push the same route if it's already active
// TODO: Clean the code up
class Router {
  constructor(titles) {
    this.titles = titles;
    this.routes = {};
    this.getLinks();
    window.addEventListener('popstate', () => {
      setTimeout(() => {
        this.goTo(location.pathname, true);
      }, 0);
    });
  }

  getLinks() {
    this.links = document.querySelectorAll('a');
    this.bindEventHandlersToLinks();
  }

  bindEventHandlersToLinks() {
    this.links.forEach(
      link => link.addEventListener('click',
        event => this.handleLinkClick(event, link)
      )
    );
  }

  handleLinkClick(event, link) {
    let route = link.getAttribute('href');
    this.goTo(route);
    event.preventDefault();
    return false;
  }

  goTo(route, replace = false) {
    let fragments = getFragments(route);

    for (let rt in this.routes) {
      let rtf = getFragments(rt);

      if (fragments.length == rtf.length) {
        let args = {};
        let match = true;

        for (let i = 0; i < rtf.length; i++) {
          if (rtf[i].includes(':')) {
            let param = rtf[i].substr(rtf[i].indexOf(':') + 1);
            args[param] = fragments[i];
            continue;
          }
          if (rtf[i] != fragments[i]) match = false;
        }

        if (match) {
          let title = this.titles[rt] || 'App';
          document.title = title;
          if (replace) {
            history.replaceState({}, title, route);
          } else {
            history.pushState({}, title, route);
          }
          this.routes[rt](args);
          return true;
        }
      }
    }

    document.title = '404 Not Found';
    if (replace) {
      history.replaceState({}, '404 Not Found', '/404');
    } else {
      history.pushState({}, '404 Not Found', '/404');
    }
    this.routes['404']();
  }

  on(route, handler) {
    this.routes[route] = handler;
  }
}

export default Router;