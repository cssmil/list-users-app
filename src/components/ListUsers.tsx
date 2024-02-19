export const ListUsers = ({ users }) => {
  return (

    <table>
      <caption>Lista de usuarios</caption>
      <thead>
        <tr>
          <th>Foto</th>
          <th>Nombre</th>
          <th>Apellido</th>
          <th>País</th>
          <th>Acciones</th>
        </tr>
      </thead>

      <tbody>
      {
        users.map(({ id, picture, name, location }) => (
            <tr key={id.value}>
              <td><img src={picture.medium} alt={`${name.first} photo`} /></td>
              <td>{name.first}</td>
              <td>{name.last}</td>
              <td>{location.country}</td>
              <td><button>Delete</button></td>
            </tr>
        ))
      }
      </tbody>
    </table>
  )
}
