import {
    create
} from 'zustand'

const useCachedStore = create((set) => ({
    state: {},
    save: (key, value) => {
        set(rootState => ({
            state: {
                ...rootState.state,
                [key]: value
            }
        }))
    }
}))

export const useGet = (key) => useCachedStore((rootState) => rootState.state?.[key]);
export const useSave = () => useCachedStore(rootState => rootState.save);