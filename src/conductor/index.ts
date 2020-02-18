interface Model<T> {
    subscribe: (arg: Function) => void;
    set: (arg: T) => void;
    update: (arg: Function) => void;
  }
  type Subscriber<T> = (value: T) => void;

  function fireHandlers<T>(fns: Subscriber<T>[], value: T) {
    fns.forEach(fn => {
      fn(value);
    });
  }

  export function createModel<T>(initialValue: T): Model<T> {
    let value: T = initialValue;
    let subscribers: Subscriber<T>[] = [];

    function set(newValue: T) {
      value = newValue;
      fireHandlers(subscribers, value);
    }

    function update(fn: (v: T) => T) {
      value = fn(value);
      fireHandlers(subscribers, value);
    }

    function subscribe(subscriber: Subscriber<T>) {
      subscribers.push(subscriber);
      return function unsubscribe() {
        const index = subscribers.indexOf(subscriber);
        subscribers.splice(index, 1);
      };
    }

    return {
      subscribe,
      update,
      set
    };
  }

  const cameraState = {
    zoom: 1,
    rotation: [0, 0, 0]
  };
  const m = createModel(cameraState);
  const unusb = m.subscribe(v => {
    console.log(v);
  });

  unusb();

  m.update(state => ({
    ...state,
    hello: "world"
  }));
  // function derive<T>(model: Model<T>) {}
