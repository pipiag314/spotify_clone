"use client";

import Modal from "./Modal";

const AuthModal = () => {
    return (
        <Modal
            title="Welcome back"
            description="Login to your accout"
            isOpen
            onChange={() => {}}
        >
            auth modal children
        </Modal>
    )
}

export default AuthModal;