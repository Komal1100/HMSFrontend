import React, { useState } from 'react';
import { addReport } from '../../api/services/reportService';
import { useNavigate, useParams } from 'react-router-dom';

const AddReport = () => {
    const [formData, setFormData] = useState({
        diagnosis: '',
        testRecommended: '',
        remarks: '',
    });
    const navigate = useNavigate()
    const { appointmentId } = useParams()
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            console.log(formData)
            const response = await addReport(appointmentId, formData)


            if (response.ok) {

                navigate("/doctor/queue")

            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="container mt-5">
            <div className="card shadow">
                <div className="card-header bg-primary text-white">
                    <h4>Patient Diagnosis Report</h4>
                </div>
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="diagnosis" className="form-label">Diagnosis</label>
                            <input
                                type="text"
                                className="form-control"
                                id="diagnosis"
                                name="diagnosis"
                                value={formData.diagnosis}
                                onChange={handleChange}
                                placeholder="e.g. Viral Fever"
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="testRecommended" className="form-label">Test Recommended</label>
                            <input
                                type="text"
                                className="form-control"
                                id="testRecommended"
                                name="testRecommended"
                                value={formData.testRecommended}
                                onChange={handleChange}
                                placeholder="e.g. Blood Test"
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="remarks" className="form-label">Remarks</label>
                            <textarea
                                className="form-control"
                                id="remarks"
                                name="remarks"
                                rows="3"
                                value={formData.remarks}
                                onChange={handleChange}
                                placeholder="e.g. Rest for 3 days"
                            ></textarea>
                        </div>

                        <button type="submit" className="btn btn-success w-100">
                            Submit Report
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );

};

export default AddReport;
