import React, { useEffect, useState } from 'react';
import { getAppointment } from '../../api/services/appointmentService';
import { useNavigate } from 'react-router-dom';

const MyAppointments = () => {
    const [appointments, setData] = useState([]);
    const navigate = useNavigate()

    useEffect(() => {
        const fetchAppo = async () => {
            const data = await getAppointment();
            setData(data);
        };

        fetchAppo();
    }, [])

    const Goinsid = (id)=>{
        navigate(`/patient/appointments/${id}`)
    }


    return (
        <table className="table table-hover">
            <thead>
                <tr>
                    <th scope="col">Token #</th>
                    <th scope="col">Date</th>
                    <th scope="col">Time Slot</th>
                    <th scope="col">Patient ID</th>
                    <th scope="col">Status</th>
                    <th scope='col'>Action</th>
                </tr>
            </thead>
            <tbody>
                {appointments.map((appointment) => (
                    <tr key={appointment.id}>
                        <th scope="row">{appointment.queueEntry?.tokenNumber || 'N/A'}</th>

                        <td>{new Date(appointment.appointmentDate).toLocaleDateString()}</td>

                        <td>{appointment.timeSlot}</td>
                        <td>{appointment.patientId}</td>

                        <td>

                            {appointment.status}

                        </td>
                        <td><button type="button" class="btn btn-info" onClick={() => Goinsid(appointment.id)}>Medication and reports</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default MyAppointments;
