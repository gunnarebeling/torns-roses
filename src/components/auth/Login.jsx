import React, { useState } from "react"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import "./Login.css"
import { getUserByEmailAndPassword } from "../../services/userServices/userServices"

export const Login = () => {
    const [email, set] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()
  
    const handleLogin = (e) => {
      e.preventDefault()
  
      getUserByEmailAndPassword(email, password).then((foundUsers) => {
        if (foundUsers.length === 1) {
          const user = foundUsers[0]
          localStorage.setItem(
            "thorns_roses_user",
            JSON.stringify({
              id: user.id,
            })
          )
          navigate("/")
        } else {
          window.alert("Invalid login")
        }
      })
    }
  
    return (
      <main className="container-login mt-5 mx-auto pt-5">
        <section>
          <form className="form-login mx-auto text-center" onSubmit={handleLogin}>
            <h1 className="text-center mb-5">Login to Thorns -N- Roses</h1>
            <fieldset>
              <div className="form-group">
                <input
                  type="email"
                  value={email}
                  onChange={(evt) => set(evt.target.value)}
                  className="form-control mx-auto"
                  placeholder="Email address"
                  required
                  autoFocus
                />
              </div>
            </fieldset>
            <fieldset>
              <div className="form-group">
                <input
                  type="password"
                  value={password}
                  onChange={(evt) => setPassword(evt.target.value)}
                  className="form-control  mx-auto"
                  placeholder="Password"
                  required
                  autoFocus
                />
              </div>
            </fieldset>
            <fieldset>
              <div className="form-group">
                <button className="mt-3 login btn fw-bold" type="submit">
                  SUBMIT
                </button>
              </div>
            </fieldset>
          </form>
        </section>
        <section className="text-center register mt-3">
          <Link to="/register" className="register">Not a member yet?</Link>
        </section>
      </main>
    )
  }