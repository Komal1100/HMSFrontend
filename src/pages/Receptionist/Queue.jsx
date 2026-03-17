import { useNavigate } from "react-router-dom";
import { getAppointmentForR, updateAppo } from "../../api/services/appointmentService";
import { useEffect, useState } from "react";

const Queue = () => {
    const [data, setData] = useState([]);
    const navigate = useNavigate()
    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0];
    const [date, setDate] = useState(formattedDate);

    const handleDateChange = (event) => {
        setDate(event.target.value);
    };

    const handleInProgressClick = async (id) => {
        setData(prevData => prevData.map(item =>
            item.id === id ? { ...item, status: 'in_progress' } : item
        ));
        const data = {
            "status": "in-progress"
        }
        const res = await updateAppo(id, data);
    };

    const handleSkipClick = () => {

    }

    const handleDoneClick = () => {

    }
    useEffect(() => {
        const fetchAppo = async () => {
            const data = await getAppointmentForR(date);
            setData(data);
        };

        fetchAppo();
    }, [])

    return (


        <div className="table-responsive">
            <input
                type="date"
                value={date}
                onChange={handleDateChange}
                name="date"
            />
            <table className="table table-hover align-middle">
                <thead className="table-light">
                    <tr>
                        <th scope="col">Token</th>
                        <th scope="col">Patient</th>
                        <th scope="col">Time Slot</th>
                        <th scope="col">Phone</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item) => (
                        <tr key={item.id}>
                            <th scope="row" className="fw-bold">
                                {item.tokenNumber}
                            </th>
                            <td>{item.appointment.patient.name}</td>
                            <td>
                                <span className="badge bg-info text-dark">
                                    {item.appointment.timeSlot}
                                </span>
                            </td>
                            <td>
                                {item.appointment.patient.phone || <small className="text-muted">N/A</small>}
                            </td>
                            <td>
                                <div>
                                    {item.status === 'in_progress' ? (
                                        <button
                                            className="btn btn-primary btn-sm"
                                            onClick={handleDoneClick}
                                        >
                                            Done
                                        </button>
                                    ) : (
                                        <>
                                            <button
                                                className="btn btn-success btn-sm me-1"
                                                onClick={() => handleInProgressClick(item.id)}
                                            >
                                                In Progress
                                            </button>
                                            <button
                                                className="btn btn-outline-secondary btn-sm"
                                                onClick={() => console.log('Skip:', item.id)}
                                            >
                                                Skip
                                            </button>
                                        </>
                                    )}
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}


export default Queue