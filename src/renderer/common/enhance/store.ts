/**
 * License: MIT
 * @author Santo Pfingsten
 * @see https://github.com/Lusito/tsx-dom
 */
export type State<T> = {
  [K in keyof T]: T[K];
};

export type SimpleActionHandler<T> = (data?: any) => Partial<State<T>> | void | Promise<State<T>>;

export type ComplexActionHandler<T> = (
  data?: any
) => (state: State<T>, actions: MappedActions<T>) => Partial<State<T>> | void | Promise<State<T>>;

export type Actions<T> = {
  [key: string]: SimpleActionHandler<T> | ComplexActionHandler<T>;
};

export type MappedActions<T> = {
  [key: string]: (data?: any) => Partial<State<T>> | void | Promise<T>;
};

export type SubscriptionFn<T> = (state: State<T>, triggerAction?: keyof MappedActions<T>) => void;

export type Store<T> = {
  getState: () => State<T>;
  actions: MappedActions<T>;
  subscribe: (listener: SubscriptionFn<T>) => void;
};

/**
 * @description 
 *  提供一個簡單的狀態管理
 * @注意
 *   多窗體間不互通,原因可以看看架子的運行機制
 * @解決
 *  可以藉助主進程來維護,請自行實現(參考i18n)
 * */
export function createStore<T>(actions: Actions<T>, state: T): Store<T> {
  const subscriptions: SubscriptionFn<T>[] = [];
  const mappedActions: MappedActions<T> = {};
  let globalState = { ...state };

  for (let [key, fn] of Object.entries(actions)) {
    ((name, action) => {
      mappedActions[name] = (data) => {
        let newState = action(data);

        if (typeof newState === 'function') newState = newState(globalState, mappedActions);

        if (newState && !(newState instanceof Promise)) {
          globalState = {
            ...globalState,
            ...newState
          };

          subscriptions.forEach((subscription) => subscription(globalState, name));
        }
      };
    })(key, fn);
  }

  const store: Store<T> = {
    actions: mappedActions,
    getState: () => globalState,
    subscribe: (listener) => {
      subscriptions.push(listener);
    }
  };
  return store;
}
