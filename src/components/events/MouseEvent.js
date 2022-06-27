import { createContext, useContext, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { AppLogic } from './AppLogic';

const MouseContext = createContext();
function MouseEvent({ children }) {
    const valueHandleLogic = useContext(AppLogic);
    const [isMouseDown, setIsMouseDown] = useState(false);
    const [elementSelect, setElementSelect] = useState({});
    const [isMouseMove, setIsMouseMove] = useState(false);
    const [typeElement, setTypeElement] = useState('');
    const [isChangePosition, setIsChangePosition] = useState(true);
    const [position, setPosition] = useState({});

    const [width, setWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => {
            setWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.addEventListener('resize', handleResize);
        };
    }, []);

    const handleMouseDown = (item, value) => {
        setTypeElement(value);
        setIsMouseDown(true);
        setElementSelect(item);
        setIsMouseMove(false);
        setIsChangePosition(false);
    };

    const handleMouseMove = (ev) => {
        if (isMouseDown) {
            console.log('move');
            setIsMouseMove(true);
            setPosition({
                left: ev.clientX,
                top: ev.clientY,
            });

            if (typeElement.type === 'content') {
                const newData = valueHandleLogic.dataMainSection.filter((item, index) => index !== typeElement.ix);
                valueHandleLogic.setDataMainSection(newData);
                setTypeElement({});
            }
            setIsChangePosition(false);

            if (valueHandleLogic.dataMainSection.length >= 1) {
                const newData = valueHandleLogic.dataMainSection.filter(
                    (elememt) =>
                        elememt.position.left - 32 <= position.left &&
                        position.left <= elememt.position.left + 32 &&
                        elememt.position.top - 32 <= position.top &&
                        position.top <= elememt.position.top + 32,
                );
                let formData = {
                    elememt: elementSelect,
                    position: position,
                };
                valueHandleLogic.setElementIsSelect(formData);
                valueHandleLogic.setElementDuplicate(
                    newData[newData.length - 1] !== undefined ? newData[newData.length - 1] : [],
                );
            }
        }
    };

    const handleMouseUp = () => {
        // add elememt
        let newData = {
            idElement: uuidv4(),
            element: elementSelect,
            position: position,
        };
        if (Object.values(elementSelect).length > 0 && position.left < width - 300 && isMouseMove === true) {
            valueHandleLogic.setDataMainSection([...valueHandleLogic.dataMainSection, newData]);
        }
        // delete
        if (typeElement.type === 'content' && Object.values(elementSelect).length > 0 && position.left > width - 300) {
            const newData = valueHandleLogic.dataMainSection;
            valueHandleLogic.setDataMainSection(newData.filter((item, index) => index !== typeElement.ix));
        }

        // change element

        if (typeElement.type === 'content') {
            valueHandleLogic.setDataMainSection.map((data, index) => {
                if (index === typeElement.ix) {
                    data.position = position;
                }
            });
        }
        // valueHandleLogic.checkRecipes();

        setIsMouseDown(false);
        setElementSelect({});
        setPosition({});
        setIsMouseMove(false);
    };

    const value = {
        isMouseDown,
        setIsMouseDown,
        elementSelect,
        setElementSelect,
        isMouseMove,
        setIsMouseMove,
        typeElement,
        setTypeElement,
        isChangePosition,
        setIsChangePosition,
        position,
        setPosition,
        handleMouseMove,
        handleMouseDown,
        handleMouseUp,
    };
    return <MouseContext.Provider value={value}>{children}</MouseContext.Provider>;
}

export { MouseContext, MouseEvent };
