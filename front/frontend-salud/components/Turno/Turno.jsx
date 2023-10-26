import TurnoCard from "./TurnoCard";

const ListaTurno = ({ turnos }) => {
    return (
        <div className="flex overflow-x-auto space-x-10">
            {turnos.map((raw, index) => {
                const parts = raw.split(':');

                const id = parts[0];
                const fullName = parts[1].split(' '); // assuming name and surname are separated by a space
                const especialidad = parts[2];
                const date = parts[3];

                const turnosData = {
                    id: parts[0],
                    medico_nombre: parts[1].split(' ')[0],
                    medico_apellido: parts[1].split(' ')[1],
                    medico_especialidad: parts[2],
                    date: parts[3] + ":" + parts[4] + ":" + parts[5]
                };

                return (
                    <div key={index}>
                        <TurnoCard turno={turnosData} />
                    </div>
                );
            })}
        </div>
    );
};

export default ListaTurno;
