const map = new WeakMap()
export default function useModel(hook) {
    if (!map.get(hook)) {
        let ans = hook()
        map.set(hook, ans)
    }
    return map.get(hook)
}
