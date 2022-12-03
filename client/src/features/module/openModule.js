import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectModulesById } from './modulesApiSlice'
import  OpenedAssignment  from './OpenAssignment'

const OpenModule = () => {
    const { id } = useParams()

    const module = useSelector(state => selectModulesById(state, id))

    const content = module ? <OpenedAssignment module={module} /> : <p className='module-loading'>Loading...</p>

    return content
}
export default OpenModule