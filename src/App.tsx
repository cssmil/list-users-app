import { useEffect, useMemo, useRef, useState } from 'react'
import { type User } from './types'
import { ListUsers } from './components/ListUsers'

export const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([])
  const [rowsColor, setRowsColor] = useState(false)
  const [orderTable, setOrderTable] = useState(false)
  const [tipeOrder, setTipeOrder] = useState('')
  const [filterCountry, setFilterCountry] = useState<string | null>(null)

  const originalUsers = useRef<User[]>([])

  const changeColor = () => {
    setRowsColor(!rowsColor)
  }

  const handleOrder = (tipe: string) => {
    setTipeOrder(tipe)
    tipe !== tipeOrder
      ? setOrderTable(true)
      : setOrderTable(!orderTable)
  }

  const orderBtnText = (() => {
    if (tipeOrder === 'country') {
      return orderTable ? 'desordenar' : 'ordenar'
    } else {
      return 'ordenar'
    }
  })()

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

  const filteredUsers = useMemo(() => {
    console.log('render de filterUsed por input')
    return (filterCountry !== null && filterCountry.length > 0)
      ? users.filter(user => {
        return user.location.country.toLowerCase().includes(filterCountry.toLowerCase())
      })
      : users
  }, [users, filterCountry])

  // const sortedUsers = useMemo(() => {
  //   console.log('render de sortedUsers por btn order')
  //   return orderTable
  //     ? filteredUsers.toSorted((a, b) => {
  //       return a.location.country.localeCompare(b.location.country)
  //     })
  //     : filteredUsers
  // }, [filteredUsers, orderTable])

  const sortedUsers = (() => {
    console.log('render de sortedUsers por btn order')
    return orderTable
      ? filteredUsers.toSorted((a, b) => {
        if (tipeOrder === 'firstName') {
          return a.name.first.localeCompare(b.name.first)
        }
        if (tipeOrder === 'lastName') {
          return a.name.last.localeCompare(b.name.last)
        }
        return a.location.country.localeCompare(b.location.country)
      })
      : filteredUsers
  })()
  // const filteredUsers = (() => {
  //   console.log('render de filterUsed por input')
  //   return (filterCountry !== null && filterCountry.length > 0)
  //     ? users.filter(user => {
  //       return user.location.country.toLowerCase().includes(filterCountry.toLowerCase())
  //     })
  //     : users
  // })()

  // const sortedUsers = (() => {
  //   console.log('render de sortedUsers por btn order')
  //   return orderTable
  //     ? filteredUsers.toSorted((a, b) => {
  //       return a.location.country.localeCompare(b.location.country)
  //     })
  //     : filteredUsers
  // })()

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
          <button onClick={() => { handleOrder('country') }}>{orderBtnText} por país</button>
          <button onClick={resetUsers}>Reset</button>
          <button onClick={changeColor}>Rows color</button>
        </nav>
      </header>
      <main>
        <ListUsers rowsColor={rowsColor} users={sortedUsers} deleteUser={handleDelete} orderBy={handleOrder}/>
      </main>
    </>
  )
}
