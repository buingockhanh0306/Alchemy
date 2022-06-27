import styles from './MainSection.module.scss';
import la2 from '../../img/la2button.png';
import clear from '../../img/clear.png';
import option from '../../img/option.png';
import fullscreen from '../../img/fullscreen.png';
import { useContext, useState } from 'react';
import elements from '../Elements/elements';
import { AppLogic } from '../events/AppLogic';
import { MouseContext } from '../events/MouseEvent';
import Element from '../Elements/Element';
import { Modal } from 'react-bootstrap';

function MainSection({ ref, onRequest, onExit }) {
    const valueHandleLogic = useContext(AppLogic);
    const valueMouseContext = useContext(MouseContext);
    const [isFullScreen, setIsFullScreen] = useState(false);
    const [boolState, setBoolState] = useState(false);

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleFullScreen = () => {
        onRequest();
        setIsFullScreen(true);
    };

    const handleExitFullScreen = () => {
        onExit();
        setIsFullScreen(false);
    };

    const handleClear = () => {
        valueHandleLogic.setDataMainSection([]);
    };
    setTimeout(() => {
        setBoolState(!boolState);
    }, 5000);

    const checkItemDuplicate = (idItemDuplicate, idItemInContent) => {
        if (valueMouseContext.isMouseMove) {
            if (valueHandleLogic.dataContent.length > 0 && valueHandleLogic.itemDuplicate) {
                if (idItemDuplicate === idItemInContent) {
                    return true;
                } else {
                    return false;
                }
            } else {
                return false;
            }
        } else return false;
    };
    return (
        <div ref={ref} className={styles.main}>
            {!isFullScreen ? (
                <div onClick={() => handleFullScreen()} className={styles['fullscreen']}>
                    <img src={fullscreen} alt="Anh" />
                </div>
            ) : (
                <div onClick={() => handleExitFullScreen()} className={styles['fullscreen']}>
                    <img
                        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB0AAAAdBAMAAACkvXo8AAAAGFBMVEUAAADp39Pq38/p3tHo3tDo3tDf39/o3tA1q3PCAAAAB3RSTlMALTBObtwIVaOPMwAAAGlJREFUGNN9yssJgDAQhOHRqGcXxTriaUuxDxPZ9jUgeQzif/uYAdB5NPWBbJ4cyPVBZDGLktqS1XJnsiNDyY4MJQ/k/stH62v829/YkWyeHMjmyaG4HCZJrc8qMiOndqLOkaFkR8YO4AaZ11fNtEe+jAAAAABJRU5ErkJggg=="
                        alt="Anh"
                    />
                </div>
            )}
            <div className={styles['count-item']}>
                <span>{valueHandleLogic.dataSideBar.length}</span>/<span>{elements.length}</span>
            </div>
            <div className={styles['signin']}>Gign in</div>

            <div className={styles['icon']}>
                <a href="https://littlealchemy2.com/" target="_blank" rel="noreferrer">
                    <img src={la2} alt="" />
                </a>
                <div onClick={() => handleClear()}>
                    <img src={clear} alt="" />
                </div>
                <div onClick={handleShow}>
                    <img src={option} alt="" />
                </div>

                <Modal show={show} onHide={handleClose} animation={true}>
                    <Modal.Header closeButton>
                        <Modal.Title>Modal heading</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
                    <Modal.Footer></Modal.Footer>
                </Modal>
            </div>
            {/* link goc tren  */}
            {boolState ? (
                <div className={styles['link']}>
                    <a href="https://littlealchemy.com/cheats/" target="_blank" rel="noreferrer">
                        Are you stuck? Need are him?
                    </a>
                </div>
            ) : (
                <div className={styles['link']}>
                    <a href="https://littlealchemy.com/cheats/" target="_blank" rel="noreferrer">
                        sfjhkssfkshfksjfdkj
                    </a>
                </div>
            )}

            {/* add elements */}
            {valueMouseContext.isMouseMove && Object.values(valueMouseContext.elementSelect).length > 0 && (
                <Element
                    img={valueMouseContext.elementSelect.url}
                    name={valueMouseContext.elementSelect.title}
                    position={
                        Object.values(valueMouseContext.elementSelect).length !== 0 ? valueMouseContext.position : null
                    }
                    hidden={valueMouseContext.isMouseMove ? true : false}
                    zIndex="101"
                />
            )}
            {valueHandleLogic.dataMainSection.map((element, index) => (
                <Element
                    key={index}
                    img={element.element.url}
                    name={element.element.title}
                    position={element.position}
                    onMouseDown={() =>
                        valueMouseContext.handleMouseDown(element.element, {
                            type: 'content',
                            ix: index,
                        })
                    }
                />
            ))}
        </div>
    );
}

export default MainSection;
