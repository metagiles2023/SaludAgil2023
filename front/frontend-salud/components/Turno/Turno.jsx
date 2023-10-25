const ListaTurno = ({ turnos }) => {
    return (
    <div className="turnoTable">
        <table>
        <thead>
            <tr>
            <th>Id</th>
            <th>Ocupado</th>
            <th>Id_Medico</th>
            <th>ID_Paciente</th>
            <th>Fecha</th>
            </tr>
        </thead>
        <tbody>
            {turnos.map((fila) => (
            <tr key={fila.id}>
                <td>{fila.id}</td>
                <td>{fila.fecha}</td>
                <td>{fila.ocupado}</td>
                <td>{fila.medico_u_id}</td>
                <td>{fila.paciente_u_id}</td>
            </tr>
            ))}
        </tbody>
        </table>
    </div>
    );
    };

export default ListaTurno;