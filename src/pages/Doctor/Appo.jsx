import React, { useEffect, useState } from 'react';
import { getAppointment, getAppointmentForD } from '../../api/services/appointmentService';
import { useNavigate } from 'react-router-dom';

const DoctorQueue = () => {
    const [appointments, setData] = useState([]);
    const navigate = useNavigate()


    useEffect(() => {
        const fetchAppo = async () => {
            const data = await getAppointmentForD();
            setData(data);
        };

        fetchAppo();
    }, [])

    const addMedicine = (id)=>{
        navigate(`/doctor/prescriptions/${id}`)
    }

    const addReports = (id)=>{
        navigate(`/doctor/reports/${id}`)
    }

  


    return (
        <table className="table table-hover">
            <thead>
                <tr>
                    <th scope="col">Token #</th>
                    <th scope="col">Date</th>
                    <th scope="col">Patient ID</th>
                    <th scope="col">Appointment ID</th>
                    <th scope="col">Status</th>
                    <th scope='col' colSpan="2">Action</th>
                </tr>
            </thead>
            <tbody>
                {appointments.map((appointment) => (
                    <tr key={appointment.id}>
                        <th scope="row">{appointment.queueEntry?.tokenNumber || 'N/A'}</th>

                        <td>{new Date(appointment.appointmentDate).toLocaleDateString()}</td>

                        <td>{appointment.patientId}</td>
                        <td>{appointment.appointmentId}</td>

                        <td>

                            {appointment.status}

                        </td>
                        <td><button type="button" class="btn btn-info" onClick={() => addMedicine(appointment.id)}>Add Medicine</button>
                        </td>
                        <td><button type="button" class="btn btn-info" onClick={() => addReports(appointment.id)}>Add Reports</button></td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default DoctorQueue;
