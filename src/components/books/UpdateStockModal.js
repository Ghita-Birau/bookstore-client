import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const UpdateStockModal = ({ show, handleClose, bookId, currentStock, onUpdate, onStockUpdated }) => {
    const [newStock, setNewStock] = useState(currentStock);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await onUpdate(bookId, { stock: newStock });
            alert('Stock updated successfully!');

            if (onStockUpdated) {
                onStockUpdated(newStock);
            }

            handleClose();
        } catch (error) {
            alert('Failed to update stock. Please try again.');
        }
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Update Stock</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>New Stock</Form.Label>
                        <Form.Control
                            type="number"
                            value={newStock}
                            onChange={(e) => setNewStock(parseInt(e.target.value, 10))}
                            min="0"
                            required
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Update Stock
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default UpdateStockModal;
