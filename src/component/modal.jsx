import React, { useState } from 'react';

const Modal = ({ onClose, tabInfo }) => {
  const [activeTabIndex, setActiveTabIndex] = useState(null);

  const handleClose = () => {
    setActiveTabIndex(null);
    onClose();
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close-button" onClick={handleClose}>&times;</span>
        {tabInfo.title}
        {tabInfo.content}
      </div>
    </div>
  );
};

export default Modal;
