import {useGetModulesQuery} from '../module/modulesApiSlice.js'
import Module from './module.js'

const ModulesList = () => {
  const {
      data: modules,
      isLoading,
      isSuccess,
      isError,
      error
  } = useGetModulesQuery()

  let content

  if (isLoading) content = <p className='module-loading'>Loading...</p>

  if (isError) {
      content = <p className="errmsg">{error?.data?.message}</p>
  }

  if (isSuccess) {
      const { ids } = modules

      const tableContent = ids?.length
          ? ids.map(moduleId => <Module key={moduleId} moduleId={moduleId} />)
          : null

      content = (
          <table className="table table--notes">
              <thead className="table__thead">
                  <tr>
                      <th scope="col" className="table__th note__status"></th>
                      <th scope="col" className="table__th note__created"></th>
                      <th scope="col" className="table__th note__updated"></th>
                      <th scope="col" className="table__th note__title"></th>
                      <th scope="col" className="table__th note__username"></th>
                      <th scope="col" className="table__th note__edit"></th>
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