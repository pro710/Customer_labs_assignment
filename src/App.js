import React, { useState } from "react";
import SegmentModal from "./SegmentModal"; // Modal component
import "./App.css"; // Styles

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="app-container">
      <h1>View Audience</h1>
      <button onClick={handleOpenModal} className="save-segment-btn">
        Save segment
      </button>
      {isModalOpen && <SegmentModal onClose={handleCloseModal} />}
    </div>
  );
}

export default App;
