import { useNavigate } from "react-router-dom";
import { addAppointment } from "../../api/services/appointmentService";
import { useState } from "react";

const AddAppointment = () => {
    const [formData, setFormData] = useState({
        appointmentDate: '',
        timeSlot: ''
    });


    const navigate = useNavigate()
    const generateTimeSlots = () => {
        const slots = [];
        const interval = 15; 

        const formatTime = (date) => {
            return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
        };

        const createSlotRange = (startHour, startMin, endHour, endMin) => {
            let startTime = new Date();
            startTime.setHours(startHour, startMin, 0, 0);

            let endTime = new Date();
            endTime.setHours(endHour, endMin, 0, 0);

            let currentTime = new Date(startTime);

            while (currentTime < endTime) {
                let nextTime = new Date(currentTime.getTime() + interval * 60000);

                // Only push if the end time doesn't exceed the boundary
                if (nextTime <= endTime) {
                    slots.push(`${formatTime(currentTime)}-${formatTime(nextTime)}`);
                }
                currentTime = nextTime;
            }
        };

        createSlotRange(10, 0, 14, 0);

        createSlotRange(17, 0, 19, 0);

        return slots;
    };

   



    const timeSlots = generateTimeSlots();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await addAppointment(formData);
            console.log("Success:", res);

            navigate("/patient/my-appointments");
        } catch (error) {
            console.error("Failed to add Appointment:", error);
        }
    };
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <form className="p-4" onSubmit={handleSubmit}>
            <div className="mb-3">
                <label className="form-label">Appointment Date</label>
                <input
                    type="date"
                    name="appointmentDate"
                    className="form-control"
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="mb-3">
                <label className="form-label">Time Slot</label>
                <select
                    name="timeSlot"
                    className="form-control"
                    onChange={handleChange}
                    value={formData.timeSlot}
                    required
                >
                    <option value="">Select a time slot</option>
                    {timeSlots.map((slot) => (
                        <option key={slot} value={slot}>
                            {slot}
                        </option>
                    ))}
                </select>
            </div>




            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    )
}

export default AddAppointment