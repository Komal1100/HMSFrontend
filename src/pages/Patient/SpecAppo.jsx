import { useEffect, useState } from "react";
import { getClinicInfor } from "../../api/services/adminService";
import { useParams } from "react-router-dom";
import { getAppoById } from "../../api/services/appointmentService";

const AppointmentDetails = () => {
    const [data, setData] = useState({});
    const { id } = useParams();

    useEffect(() => {
        const fetchAppo = async () => {
            const data = await getAppoById(id);
            setData(data);
        };

        fetchAppo();
    }, [])

    console.log("Appp" , data)
    return (
        <div className="card" style={{ width: "24rem" }}>
            <div className="card-body">
                <div className="d-flex justify-content-between">
                    <h5 className="card-title">Token #{data.queueEntry?.tokenNumber}</h5>
                    <span className="badge bg-primary">{data.status}</span>
                </div>
                <h6 className="card-subtitle mb-3 text-body-secondary">
                    Patient ID: {data.patientId}
                </h6>

                <div className="mb-3">
                    <p className="card-text mb-1"><strong>Date:</strong> {new Date(data.appointmentDate).toLocaleDateString()}</p>
                    <p className="card-text mb-1"><strong>Time:</strong> {data.timeSlot}</p>
                    <p className="card-text"><strong>Clinic ID:</strong> {data.clinicId}</p>
                </div>

                <hr />

                <h6 className="fw-bold">Medication</h6>
                {data.prescription ? (
                    <p className="card-text text-success">{data.prescription}</p>
                ) : (
                    <p className="card-text text-muted small italic">No medications prescribed yet.</p>
                )}

                <hr />

                <h6 className="fw-bold">Reports</h6>
                {data.report ? (
                    <a href={data.report} className="card-link" target="_blank" rel="noreferrer">
                        View Report
                    </a>
                ) : (
                    <p className="card-text text-muted small">No reports available.</p>
                )}
            </div>
        </div>
    );
}

export default AppointmentDetails