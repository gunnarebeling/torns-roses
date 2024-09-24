import { useState } from "react"
import { useNavigate } from "react-router-dom"
import "./Login.css"
import { getUserByEmail, createUser } from "../../services/userServices/userServices"

export const Register = () => {
  const [customer, setCustomer] = useState({
    fullName: "",
    businessName: "",
    email: "",
    password: ""
  })
  let navigate = useNavigate()

  const registerNewUser = () => {
    createUser(customer).then((createdUser) => {
      if (createdUser.hasOwnProperty("id")) {
        localStorage.setItem(
          "thorns_roses_user",
          JSON.stringify({
            id: createdUser.id,
          })
        )
        navigate("/")
      }
    })
  }

  const handleRegister = (e) => {
    e.preventDefault()
    getUserByEmail(customer.email).then((response) => {
      if (response.length > 0) {
        // Duplicate email. No good.
        window.alert("Account with that email address already exists")
      } else {
        // Good email, create user.
        registerNewUser()
      }
    })
  }

  const updateCustomer = (evt) => {
    const copy = { ...customer }
    copy[evt.target.id] = evt.target.value
    setCustomer(copy)
  }

  return (
    <main className="container-login mt-5 mx-auto pt-5">
      <form className="form-login mx-auto text-center" onSubmit={handleRegister}>
      <h1 className="text-center mb-5">Register to Thorns -N- Roses</h1>
        <fieldset>
          <div className="form-group">
            <input
              onChange={updateCustomer}
              type="text"
              id="fullName"
              className="form-control  mx-auto"
              placeholder="Enter your name"
              required
              autoFocus
            />
          </div>
        </fieldset>
        <fieldset>
          <div className="form-group">
            <input
              onChange={updateCustomer}
              type="text"
              id="businessName"
              className="form-control  mx-auto"
              placeholder="Enter the name of your business"
              required
              autoFocus
            />
          </div>
        </fieldset>
        <fieldset>
          <div className="form-group">
            <input
              onChange={updateCustomer}
              type="email"
              id="email"
              className="form-control mx-auto"
              placeholder="Email address"
              required
            />
          </div>
        </fieldset>
        <fieldset>
          <div className="form-group">
            <input
              onChange={updateCustomer}
              type="password"
              id="password"
              className="form-control mx-auto"
              placeholder="Password"
              required
            />
          </div>
        </fieldset>
        <fieldset>
          <div className="form-group">
            <button className="mt-3 login btn fw-bold" type="submit">
              Register
            </button>
          </div>
        </fieldset>
      </form>
    </main>
  )
}
