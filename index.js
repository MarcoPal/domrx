const trueTypeOf = function (obj) {
  return Object.prototype.toString.call(obj).slice(8, -1).toLowerCase();
};

export class Component {
  constructor ($root) {
    this.state = {};
    this.state.$root = $root;
    this.init();
  }

  init () {
    if (this.initState) {
      this.setState(this.initState(), false);
    }
    if (this.initEvents) {
      const items = this.initEvents();
      Object.keys(items).map(item => {
        Object.keys(items[item]).map(event => {
          if (item === 'document') {
            document.addEventListener(event, items[item][event]);
            return;
          }
          if (item === 'window') {
            window.addEventListener(event, items[item][event]);
            return;
          }

          const keys = Object.keys(this.state[item]);
          const keysNum = parseInt(keys.join(''));

          if (!isNaN(keysNum)) {
            for (let i = 0; i < keys.length; i++) {
              this.state[item][i].addEventListener(event, items[item][event]);
            }
            return;
          }

          this.state[item].addEventListener(event, items[item][event]);
        });
      });
    }

    if (this.onMount) {
      this.onMount();
    }
  }

  setState (obj, update = true) {
    if (trueTypeOf(obj) !== 'object') throw new Error('The provided data is not an object.');
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        this.state[key] = obj[key];
      }
    }

    update && this.update();
  };
}