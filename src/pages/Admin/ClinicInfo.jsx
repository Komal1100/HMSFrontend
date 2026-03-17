import { useEffect, useState } from "react";
import { getClinicInfor } from "../../api/services/adminService";

const ClinicInfo = () => {
    const [clinic, setData] = useState({});

    useEffect( () => {
        const fetchClinic = async () => {
            const data = await getClinicInfor();
            setData(data);
        };

        fetchClinic();
    },[])
    console.log(clinic)
    return (
        <>
            <div className="card" style={{ width: '18rem' }}>
              
                <div className="card-body">
                    <h5 className="card-title">{clinic.name}</h5>
                    <p className="card-text text-muted small">{clinic.code}</p>
                </div>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">Users: {clinic.userCount}</li>
                    <li className="list-group-item">Appointments: {clinic.appointmentCount}</li>
                    <li className="list-group-item">Queue: {clinic.queueCount}</li>
                </ul>
                <div className="card-body">
                    <a href="#" className="card-link">View Details</a>
                    <a href="#" className="card-link">Edit</a>
                </div>
            </div>

        </>
    );
}

export default ClinicInfo