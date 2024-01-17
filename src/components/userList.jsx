import { useEffect, useState } from "react"
import React from 'react';
import { Link } from "react-router-dom"

const UserList = () => {

    const [users, setUsers] = useState([])

    const getUsers = async() => {
        try {
           const response = await fetch('http://localhost:4000/product', {
                method: 'GET',
                headers: {
                    authorization: localStorage.getItem('token')
                }
           })
           const users = await response.json()
           setUsers(users)

        } catch (error) {
            console.log("error", error)
        }
    }

    const deleteUser = async (id) => {
        await fetch(`http://localhost:4000/user/${id}`, {
            method: 'DELETE',
            headers: {
                authorization: localStorage.getItem('token')
            }
        })

        getUsers()
    }

    useEffect( () => {
        getUsers()
    }, [])

  return (
      
    <table>
        <thead>
          <tr>
              <th>Correo</th>
              <th>Constraseña</th>
              <th>Actions</th>
          </tr>
        </thead>

      <tbody>
          { 
           users.map((user, i) => (
              <tr key={i}>
                  <td>{user.email}</td>
                  <td>{user.password}</td>
                  <td><Link onClick={() => deleteUser(user.id)}>Eliminar</Link></td>
              </tr>
          ))
        }
      </tbody>
    </table>
    
  )
}

export default UserList