# domrx
Add reactivity to DOM elements

#### Example:

```

import {Component} from "...";


class Button extends Component {

  initState () {
    return {
      counter: 0
    }
  }

  initEvents () {
    return {
      $root: {
        click: () => this.increase()
      }
    }
  }

  increase () {
    this.setState({
      counter: this.state.counter + 1
    });
  }

  onMount () {
    console.log('Mounted');
    console.log(this);
  }

  update () {
    const {counter} = this.state;
    console.log(counter);
  }
}


const button = document.querySelector('#my-button');
new Button(button);


```