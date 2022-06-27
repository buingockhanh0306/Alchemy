import styles from './Home.module.scss';
import lalogo from '../../img/loading-screen-logo.png';
import la2logo from '../../img/la2logo.svg';
import { Button, Modal } from 'react-bootstrap';
import { useState } from 'react';
function Home() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [modalShow, setModalShow] = useState(false);

    const MyVerticallyCenteredModal = (props) => {
        console.log('jjjj');
        return (
            <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h4>Centered Modal</h4>
                    <p>
                        Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in,
                        egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
                    </p>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={props.onHide}>Close</Button>
                </Modal.Footer>
            </Modal>
        );
    };

    return (
        <div className={styles.home}>
            {/* <img className={styles['img-logo']} src={lalogo} alt="log" />
            <div className={styles['button-play']}>
                <span>PLAY</span>
            </div>
            <span>
                If you have final elements the workspace you can tap the recycle button once to clear them leaving
                everything elseintact.
            </span>
            <div className={styles.alchemy2}>
                <a href="https://littlealchemy2.com/">
                    <img src={la2logo} alt="logo" />
                </a>
                <a href="https://littlealchemy2.com/">Little Alchemy2 is out! Play it now!</a>
            </div> */}
            <Button variant="primary" onClick={handleShow}>
                Launch demo modal
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>

            <Button variant="primary" onClick={() => setModalShow(true)}>
                Launch vertically centered modal
            </Button>

            <MyVerticallyCenteredModal show={modalShow} onHide={() => setModalShow(false)} />
        </div>
    );
}

export default Home;
