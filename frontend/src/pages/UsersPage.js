import React, { useState } from 'react'
import UserList from '../components/UserList'
import AddUser from '../components/AddUser'

function UsersPage() {
  const [refresh, setRefresh] = useState(false)

  const handleUserAdded = () => {
    setRefresh(!refresh)
  }

  return (
    <div>
      <h1>gestionare utilizatori</h1> {/* titlu pagina */}
      <AddUser onUserAdded={handleUserAdded} /> {/* formular adaugare utilizator */}
      <UserList key={refresh} /> {/* lista utilizatori, re-randata cand refresh se schimba */}
    </div>
  )
}

export default UsersPage
