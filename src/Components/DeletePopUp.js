import React, {Component} from 'react';
import { Modal, Button } from 'react-bootstrap';

class DeletePopUp extends Component {

    constructor(props) {
        super(props)
    }

    render() {
            return (
                <Modal show={this.props.visible} onHide={()=>console.log('close')}>
                    <Modal.Header closeButton>
                        <Modal.Title>Modal heading</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <h4>Text in a modal</h4>
                        <p>
                            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                        </p>

                        <h4>Popover in a modal</h4>
                            here
                        <hr />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.handleClose}>Close</Button>
                    </Modal.Footer>
                </Modal>
        )
    }
}

export default DeletePopUp;