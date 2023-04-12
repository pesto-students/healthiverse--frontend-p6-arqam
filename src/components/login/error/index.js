import { ErrorMessage } from "formik"

const ValidationMessage = ({name}) => {
    return (
        <ErrorMessage
            name={name}
            component="div"
            className="alert alert-danger text-xs px-3 py-1"
        />
    )
}

export default ValidationMessage;