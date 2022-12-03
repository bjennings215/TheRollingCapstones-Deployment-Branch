import {
    createSelector,
    createEntityAdapter
} from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice"

const modulesAdapter = createEntityAdapter({
    sortComparer: (a, b) => (a.completed === b.completed) ? 0 : a.completed ? 1 : -1
})

const initialState = modulesAdapter.getInitialState()

export const modulesApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getModules: builder.query({
            query: () => '/modules',
            validateStatus: (response, result) => {
                return response.status === 200 && !result.isError
            },
            transformResponse: responseData => {
                const loadedModules = responseData.map(module => {
                    module.id = module._id
                    return module
                });
                return modulesAdapter.setAll(initialState, loadedModules)
            },
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: 'Module', id: 'LIST' },
                        ...result.ids.map(id => ({ type: 'Module', id }))
                    ]
                } else return [{ type: 'Module', id: 'LIST' }]
            }
        }),
    }),
})

export const {
    useGetModulesQuery,
} = modulesApiSlice

// returns the query result object
export const selectModuleResult = modulesApiSlice.endpoints.getModules.select()

// creates memoized selector
const selectModuleData = createSelector(
    selectModuleResult,
    moduleResult => moduleResult.data // normalized state object with ids & entities
)

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
    selectAll: selectAllModules,
    selectById: selectModulesById,
    selectIds: selectModulesIds
    // Pass in a selector that returns the modules slice of state
} = modulesAdapter.getSelectors(state => selectModuleData(state) ?? initialState)