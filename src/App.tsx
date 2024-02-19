import { useEffect, useState } from 'react'
import { type User } from './types'
import { ListUsers } from './components/ListUsers'

export const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([])
  useEffect(() => {
    fetch('https://randomuser.me/api/?results=100')
      .then(async res => await res.json())
      .then(res => {
        setUsers(res.results)
      })
      .catch(error => {
        console.log(error)
      })
  }, [])

  return (
    <main>
      <h1>Prueba Técnica</h1>
      <ListUsers users={users}/>
    </main>
  )
}
