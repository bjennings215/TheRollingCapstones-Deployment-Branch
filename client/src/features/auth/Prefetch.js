import { store } from '../../app/store.js'
import { modulesApiSlice } from '../module/modulesApiSlice.js'
import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'

const Prefetch = () => {
        useEffect(() => {
            console.log('subscribing')
            const modules = store.dispatch(modulesApiSlice.endpoints.getModules.initiate())

            return () => {
                console.log('unsubscribing')
                modules.unsubscribe()
            }
        },[])
    return <Outlet />
}
export default Prefetch