import { useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../../contexts/AuthContext"

const SignOut = () => {
    const { signOut } = useContext(AuthContext)
    const navigate = useNavigate()
    useEffect(() => {
        signOut()
        setTimeout(() => {
            navigate('/signin')
        })
    }, [])
    return(
        <>
          <div className="text-center my-5">
            <h3>
                Looking forward to seeing you soon
            </h3>
            <p>Redirecting ...</p>
        </div>
        </>
    )
}

export default SignOut;