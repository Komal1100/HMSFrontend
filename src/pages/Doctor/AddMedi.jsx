import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const AddMedicine = () => {
    const navigate = useNavigate();
  const [medicines, setMedicines] = useState([
    { name: '', dosage: '', duration: '' }
  ]);
  const [notes, setNotes] = useState('');

  const {appointmentId} = useParams();

  const handleMedicineChange = (index, event) => {
    const values = [...medicines];
    values[index][event.target.name] = event.target.value;
    setMedicines(values);
  };

  const addMedicine = () => {
    setMedicines([...medicines, { name: '', dosage: '', duration: '' }]);
  };

  const removeMedicine = (index) => {
    const values = [...medicines];
    values.splice(index, 1);
    setMedicines(values);
  };

  const handleSubmit = async(event) => {
    event.preventDefault()
    const data = {
      medicines: medicines,
      notes: notes
    };

    const res = await addMedicine(appointmentId , data);
    console.log(res)
    navigate("/doctor/queue")
    
    
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Prescription Form</h2>
      <form onSubmit={handleSubmit}>
        {medicines.map((medicine, index) => (
          <div key={index} className="row mb-3 p-3 border rounded bg-light">
            <div className="col-md-4">
              <input
                type="text"
                className="form-control"
                name="name"
                placeholder="Medicine Name (e.g. Paracetamol)"
                value={medicine.name}
                onChange={(e) => handleMedicineChange(index, e)}
                required
              />
            </div>
            <div className="col-md-3">
              <input
                type="text"
                className="form-control"
                name="dosage"
                placeholder="Dosage (e.g. 500mg)"
                value={medicine.dosage}
                onChange={(e) => handleMedicineChange(index, e)}
                required
              />
            </div>
            <div className="col-md-3">
              <input
                type="text"
                className="form-control"
                name="duration"
                placeholder="Duration (e.g. 5 days)"
                value={medicine.duration}
                onChange={(e) => handleMedicineChange(index, e)}
                required
              />
            </div>
            <div className="col-md-2">
              {medicines.length > 1 && (
                <button
                  type="button"
                  className="btn btn-danger w-100"
                  onClick={() => removeMedicine(index)}
                >
                  Remove
                </button>
              )}
            </div>
          </div>
        ))}

        <button type="button" className="btn btn-secondary mb-3" onClick={addMedicine}>
          + Add Medicine
        </button>

        <div className="mb-3">
          <label htmlFor="notes" className="form-label">Notes</label>
          <textarea
            className="form-control"
            id="notes"
            rows="3"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="After food, etc."
          ></textarea>
        </div>

        <button type="submit" className="btn btn-primary w-100">Submit Prescription</button>
      </form>
    </div>
  );
};

export default AddMedicine;
