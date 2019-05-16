import Vuex from 'vuex'

const createStore = () => {
  return new Vuex.Store({
    state: {
      organisations: [
        {
          name: "Kernel Green",
          form: 'Товариство з обмеженою відповідальністю "Kernel Green"',
          edrpou: 64528494
        },
        {
          name: "Kernel Green",
          form: 'Товариство з обмеженою відповідальністю "Kernel Green"',
          edrpou: 64528494
        },
        {
          name: "Kernel Green",
          form: 'Товариство з обмеженою відповідальністю "Kernel Green"',
          edrpou: 64528494
        },
        {
          name: "Kernel Green",
          form: 'Товариство з обмеженою відповідальністю "Kernel Green"',
          edrpou: 64528494
        },
        {
          name: "Kernel Green",
          form: 'Товариство з обмеженою відповідальністю "Kernel Green"',
          edrpou: 64528494
        }
      ]
    }
  })
}

export default createStore;