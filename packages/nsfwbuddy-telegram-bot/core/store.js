let store = null;

const setStore = newStore => store = newStore;
const connect = component => (getActions, getProps) => props => {
  const newComponent = new component(Object.assign(
    component.defaultProps || {},
    props || {},
    getProps(store.getState()),
    getActions(store.dispatch),

  ));

  newComponent.unsubscribe = store.subscribe(() => {
    const newProps = getProps(store.getState());
    newComponent.componentWillReceiveProps(newProps);
    newComponent.setProps(newProps);
  });

  return newComponent;
}

module.exports = { setStore, connect, store };
