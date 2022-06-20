import { readable } from "svelte/store";

export default function zustandToSvelte(zustandStore) {
  return readable(zustandStore.getState(), (set) => {
    zustandStore.subscribe((value) => set(value));

    return () => zustandStore.destroy();
  });
}
