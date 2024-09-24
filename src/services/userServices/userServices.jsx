export const getUserByEmail = (email) => {
    return fetch(`http://localhost:8088/customers?email=${email}`).then((res) =>
      res.json()
    )
  }
export const getUserByEmailAndPassword = (email, password) => {
    return fetch(`http://localhost:8088/customers?email=${email}&password=${password}`).then((res) =>
      res.json()
    )
  }
  
  export const createUser = (customer) => {
    return fetch("http://localhost:8088/customers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(customer),
    }).then((res) => res.json())
  }