import { useEffect, useRef, useState } from 'react'
import { type User } from './types'
import { ListUsers } from './components/ListUsers'

export const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([])
  const [rowsColor, setRowsColor] = useState(false)
  const [ascending, setAscending] = useState(false)
  const [filterCountry, setFilterCountry] = useState<string | null>(null)

  const originalUsers = useRef<User[]>([])

  const changeColor = () => {
    setRowsColor(!rowsColor)
  }

  const orderByCountry = () => {
    setAscending(!ascending)
  }

  const handleDelete = (username: string) => {
    const newUsers = users.filter((user) => user.login.username !== username)
    setUsers(newUsers)
  }

  const resetUsers = () => {
    setUsers(originalUsers.current)
  }

  useEffect(() => {
    fetch('https://randomuser.me/api/?results=100')
      .then(async res => await res.json())
      .then(res => {
        setUsers(res.results)
        originalUsers.current = res.results
      })
      .catch(error => {
        console.log(error)
      })
  }, [])

  const filteredUsers = (filterCountry !== null && filterCountry.length > 0)
    ? users.filter(user => {
      return user.location.country.toLowerCase().includes(filterCountry.toLowerCase())
    })
    : users

  const sortedUsers = ascending
    ? filteredUsers.toSorted((a, b) => {
      return a.location.country.localeCompare(b.location.country)
    })
    : filteredUsers

  return (
    <>
      <header>
        <h1>Prueba Técnica </h1>
        <span>Buscando: {filterCountry}</span>
        <nav>
          <input
            type="text"
            onChange={(e) => {
              setFilterCountry(e.target.value)
            }}
          />
          <button onClick={orderByCountry}>{ ascending ? 'no ordenar' : 'ordenar' }</button>
          <button onClick={resetUsers}>Reset</button>
          <button onClick={changeColor}>Rows color</button>
        </nav>
      </header>
      <main>
        <ListUsers rowsColor={rowsColor} users={sortedUsers} deleteUser={handleDelete}/>
      </main>
    </>
  )
}
