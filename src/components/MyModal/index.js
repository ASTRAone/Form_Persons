import React from 'react'
import './style.scss';

import { Modal } from 'semantic-ui-react';

const MyModal = (props) => {
    return (
        <Modal
            open={props.open}>
                {props.children}
        </Modal>
    );
};

export default MyModal;