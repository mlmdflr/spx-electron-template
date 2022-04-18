import { createStore } from "@/renderer/common/enhance/store";

const store = createStore({
    increment: () => state => ({ count: state.count + 1 })
},
    { count: 0 }
);


export default store