import {useGetModulesQuery} from '../module/modulesApiSlice'
import Module from "./module"

const ModulesList = () => {
    const {
        data: modules,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetModulesQuery(undefined, {
        pollingInterval: 60000,
        refetchOnFocus:true,
        refetchOnMountOrArgChange:true
    })

    let content

    if (isLoading) content = <p className='module-loading'>Loading...</p>

    if (isError) {
        content = <p className="errmsg">{error?.data?.message}</p>
    }

    if (isSuccess) {
        const { ids } = modules

        const tableContent = ids?.length
            ? ids.map(noteId => <Note key={noteId} noteId={noteId} />)
            : null
        //references davegray MERN full stack course
        content = (
            <table className="table table--notes">
                <thead className="table__thead">
                    <tr>
                        <th scope="col" className="table__th note__status">Username</th>
                        <th scope="col" className="table__th note__created">Created</th>
                        <th scope="col" className="table__th note__updated">Updated</th>
                        <th scope="col" className="table__th note__title">Title</th>
                        <th scope="col" className="table__th note__username">Owner</th>
                        <th scope="col" className="table__th note__edit">Edit</th>
                    </tr>
                </thead>
                <tbody>
                    {tableContent}
                </tbody>
            </table>
        )
    }

    return content
}
export default ModulesList