import React, { useState } from "react";

const schemaOptions = [
  { label: "First Name", value: "first_name" },
  { label: "Last Name", value: "last_name" },
  { label: "Gender", value: "gender" },
  { label: "Age", value: "age" },
  { label: "Account Name", value: "account_name" },
  { label: "City", value: "city" },
  { label: "State", value: "state" },
];

function SegmentModal({ onClose }) {
  const [segmentName, setSegmentName] = useState("");
  const [availableSchemas, setAvailableSchemas] = useState(schemaOptions);
  const [selectedSchemas, setSelectedSchemas] = useState([]);
  const [currentSchema, setCurrentSchema] = useState("");

  const handleAddSchema = () => {
    if (currentSchema) {
      setSelectedSchemas([...selectedSchemas, currentSchema]);
      setAvailableSchemas(
        availableSchemas.filter((schema) => schema.value !== currentSchema)
      );
      setCurrentSchema("");
    }
  };

  const handleSaveSegment = async () => {
    const data = {
      segment_name: segmentName,
      schema: selectedSchemas.map((schemaValue) => {
        const schema = schemaOptions.find(
          (option) => option.value === schemaValue
        );
        return { [schema.value]: schema.label };
      }),
    };

    try {
      await fetch("https://webhook.site/your-unique-url", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      alert("Segment saved successfully!");
      onClose();
    } catch (error) {
      console.error("Error saving segment:", error);
      alert("Failed to save segment.");
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Saving Segment</h2>
        <label>
          Enter the Name of the Segment:
          <input
            type="text"
            value={segmentName}
            onChange={(e) => setSegmentName(e.target.value)}
            placeholder="Name of the segment"
          />
        </label>

        <div className="schema-section">
          {selectedSchemas.map((schema, index) => (
            <div key={index}>
              <span>
                {schemaOptions.find((option) => option.value === schema)?.label}
              </span>
            </div>
          ))}

          <select
            value={currentSchema}
            onChange={(e) => setCurrentSchema(e.target.value)}
          >
            <option value="">Add schema to segment</option>
            {availableSchemas.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <button onClick={handleAddSchema}>+ Add new schema</button>
        </div>

        <div className="modal-actions">
          <button onClick={handleSaveSegment}>Save the segment</button>
          <button onClick={onClose} className="cancel-btn">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default SegmentModal;
