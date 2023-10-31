import TurnoCard from "./TurnoCard";

const ListaTurno = ({ turnos }) => {

    if (!Array.isArray(turnos) || turnos.length === 0) {
        return (
        <div className="flex items-center justify-center h-screen">
            <p className="text-2xl font-bold text-black">No hay turnos reservados</p>
        </div>
        );
    }

    return (
        <div className="flex overflow-x-auto gap-10">
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
