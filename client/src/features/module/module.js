
import { useNavigate } from 'react-router-dom'

import { useSelector } from 'react-redux'
import { selectModulesById } from './modulesApiSlice'

const Module = ({ moduleId }) => {

    const module = useSelector(state => selectModulesById(state, moduleId))

    const navigate = useNavigate()

    if (module) {

        const handlestart = () => navigate(`/layout/modules/${moduleId}`)

        return (
            <tr className="table__row">
                <td className="table__cell note__status">
                    {module.module_name}
                </td>
                <td className="table__cell note__created">{module.language}</td>
                <td className="table__cell note__updated">{module.Blob_Desc}</td>
                <td className="table__cell">
                    <button
                        className="icon-button table__button"
                        onClick={handlestart}
                    >
                        GO!
                    </button>
                </td>
            </tr>
        )

    } else return null
}
export default Module