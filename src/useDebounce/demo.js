import {ref, watch} from 'vue'
import {useDebounce} from "./index";

function debounce(cb, delay = 100) {
    let timer
    return function () {
        clearTimeout(timer)
        let args = arguments,
            context = this
        timer = setTimeout(() => {
            cb.apply(context, args)
        }, delay)
    }
}

// demo: input输入时联想查询关键字
export function useAssociateSearch() {
    const keyword = ref('')

    const search = () => {
        console.log('search...', keyword.value)
        // mock 请求接口获取数据
    }

    // watch(keyword, search)
    // watch(keyword, debounce(search, 1000))
    const {handler} = useDebounce(search, 1000)
    watch(keyword, handler)

    return {
        keyword
    }
}
