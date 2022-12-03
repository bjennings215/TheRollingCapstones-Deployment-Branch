import {
    createSelector,
    createEntityAdapter
} from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice"

//references davegray MERN full stack course
const initialState = modulesAdapter.getInitialState()

export const usersApiSlice = apiSlice.injectEndpoints({
    //will be needed for future post feature
    endpoints: builder => ({
        getUsers: builder.query({
            query: () => '/users',
            validateStatus: (response, result) => {
                return response.status === 200 && !result.isError
            },
            transformResponse: responseData => {
                const loadedUsers = responseData.map(user => {
                    user.id = user._id
                    return user
                });
                return usersAdapter.setAll(initialState, loadedModules)
            },
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: 'User', id: 'LIST' },
                        ...result.ids.map(id => ({ type: 'User', id }))
                    ]
                } else return [{ type: 'User', id: 'LIST' }]
            }
        }),
        //used to signup new users
        addUser: builder.mutation({
            query: initialUserData => ({
                url:'/users',
                method:'POST',
                body: {
                    ...initialUserData,
                }
            }),
            invalidatesTags: [{type:'User',id:"LIST"}]
        }),
        editUser: builder.mutation({
            query: initialUserData => ({
                url:'/users',
                method:'PATCH',
                body: {
                    ...initialUserData,
                }
            }),
            invalidatesTags: (result,error,arg) => [{type:'User', id: arg.id}]
        }),
        deleteUser: builder.mutation({
            query: initialUserData => ({
                url:'/users',
                method:'Delete',
                body: { id }
            }),
            invalidatesTags: (result,error,arg) => [{type:'User', id: arg.id}]
        }),
    }),
})

export const {
    useGetUsersQuery,
    useAddNewUserMutation
} = usersApiSlice


// returns the query result object
export const selectUsersResult = usersApiSlice.endpoints.getUsers.select()

// creates memoized selector
const selectUserData = createSelector(
    selectUsersResult,
    usersResult => usersResult.data 
)


export const {
    selectAll: selectAllUsers,
    selectById: selectUserById,
    selectIds: selectUserIds
} = usersAdapter.getSelectors(state => selectUserData(state) ?? initialState)

