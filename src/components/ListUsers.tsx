import { type FC } from 'react'
import { type User } from '../types'

interface Props {
  deleteUser: (username: string) => void
  rowsColor: boolean
  users: User[]
}

export const ListUsers: FC<Props> = ({ deleteUser, rowsColor, users }) => {
  return (
    <table className={rowsColor ? 'color_table' : ''}>
      <caption>Lista de usuarios</caption>
      <thead>
        <tr>
          <th>Foto</th>
          <th><div >Nombre</div></th>
          <th><div >Apellido</div></th>
          <th><div >País</div></th>
          <th>Acciones</th>
        </tr>
      </thead>

      <tbody>
      {
        users.map(({ login, picture, name, location }) => (
            <tr key={login.username}>
              <td><img src={picture.medium} alt={`${name.first} photo`} /></td>
              <td>{name.first}</td>
              <td>{name.last}</td>
              <td>{location.country}</td>
              <td>
                <button
                  className='outline'
                  onClick={() => {
                    deleteUser(login.username)
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
        ))
      }
      </tbody>
    </table>
  )
}
