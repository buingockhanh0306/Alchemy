import styles from './SideBar.module.scss';
import { MouseContext } from '../events/MouseEvent';
import { useContext } from 'react';
import { AppLogic } from '../events/AppLogic';
// import elements from '../Elements/elements';

function SideBar() {
    const valueHandleLogic = useContext(AppLogic);

    const valueMouseContext = useContext(MouseContext);
    let alphabet = [];
    for (var i = 65; i <= 90; i++) {
        alphabet.push(String.fromCharCode(i));
    }

    const data = valueHandleLogic.dataSideBar;
    data.sort((a, b) => (a.title > b.title ? 1 : a.title === b.title ? (a.title > b.title ? 1 : -1) : -1));

    return (
        <div className={styles['sidebar']}>
            <div className={styles['sidebar-abc']}>
                <ul>
                    {alphabet.map((alph, index) => (
                        <li key={index} style={{ margin: '4px 0', cursor: 'pointer' }}>
                            {alph}
                        </li>
                    ))}
                </ul>
            </div>
            <div className={styles['sidebar-container']}>
                {data.map((element, index) => (
                    <div className={styles['elemen']} key={element.id}>
                        <div style={{ position: 'relative' }}>
                            <img src={element.url} alt="" />
                            <div
                                className={styles['overlay']}
                                onMouseDown={() => {
                                    valueMouseContext.handleMouseDown(element, {
                                        type: 'sidebar',
                                        ix: index,
                                    });
                                }}
                            ></div>
                        </div>
                        <div>{element.title}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default SideBar;
