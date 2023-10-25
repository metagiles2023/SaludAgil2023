import ListaTurno from '../Turno/Turno';

const ListaMultiple = ({datos}) => {
    console.log(datos);

    return (
        <ListaTurno turnos={datos}/>
    )
};

export default ListaMultiple;