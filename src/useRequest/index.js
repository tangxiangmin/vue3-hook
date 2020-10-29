import {ref} from 'vue'


export default function useApi(api) {
    const loading = ref(false)
    const result = ref(null)
    const error = ref(null)

    const fetchResource = (params) => {
        loading.value = true
        return api(params).then(data => {
            result.value = data
        }).catch(e => {
            error.value = e
        }).finally(() => {
            loading.value = false
        })
    }
    return {
        loading,
        error,
        result,
        fetchResource
    }
}
