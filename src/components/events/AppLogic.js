import { createContext, useEffect, useState } from 'react';
import DataElement from '../Elements/elements';
import { v4 as uuidv4 } from 'uuid';
import dataCombine from './dataCombine';

const AppLogic = createContext();

function HandleLogic({ children }) {
    const [dataMainSection, setDataMainSection] = useState(
        JSON.parse(localStorage.getItem('listElementsMainSection'))
            ? JSON.parse(localStorage.getItem('listElementsMainSection'))
            : [],
    );

    const [elememtDuplicate, setElementDuplicate] = useState([]);
    const [elementIsSelect, setElementIsSelect] = useState({});

    const dataStart = DataElement;

    const [dataSideBar, setDataSideBar] = useState(
        JSON.parse(localStorage.getItem('listElementsSideBar'))
            ? JSON.parse(localStorage.getItem('listElementsSideBar'))
            : dataStart.filter((elements) => elements.id < 9),
    );
    useEffect(() => {
        localStorage.setItem('listElementsSideBar', JSON.stringify(dataSideBar));
    }, [dataSideBar]);

    useEffect(() => {
        localStorage.setItem('listElementsMainSection', JSON.stringify(dataMainSection));
    }, [dataMainSection]);

    function checkRecipes() {
        if (Object.values(elememtDuplicate).length > 0 && Object.values(elementIsSelect).length > 0) {
            console.log(dataCombine);
            console.log('aa', elememtDuplicate.element.id);
            console.log('bb', elementIsSelect.elememt.id);
            const listNewItem = dataCombine.filter(
                (item) =>
                    (item[0] === elememtDuplicate.element.id && item[1] === elementIsSelect.elememt.id) ||
                    (item[1] === elememtDuplicate.element.id && item[0] === elementIsSelect.elememt.id),
            );
            console.log('dddddddddddd');
            if (listNewItem.length > 0) {
                let newDataContent = [];
                newDataContent = dataMainSection.filter((item) => item.idElement !== elememtDuplicate.idElement);
                listNewItem.map((item) => {
                    console.log('sidebar', dataSideBar);
                    const createNewItem = dataStart.filter((it) => it.id === item[2]);
                    const indexOf = dataSideBar.findIndex((item) => item.id === createNewItem[0].id);
                    if (indexOf === -1) {
                        console.log('ddd');

                        setDataSideBar([...dataSideBar, createNewItem[0]]);
                    }

                    console.log('ddd');

                    const formData = {
                        idItemRemove: elememtDuplicate.idElement,
                        newCreateItem: {
                            idElement: uuidv4(),
                            element: createNewItem[0],
                            position: elememtDuplicate.position,
                        },
                    };
                    console.log('ddd', formData);
                    newDataContent.push(formData.newCreateItem);
                });
                setDataMainSection(newDataContent);
                setElementDuplicate([]);
                setElementIsSelect({});
                return true;
            }
        }
        return null;
    }

    const value = {
        dataMainSection,
        setDataMainSection,
        elememtDuplicate,
        setElementDuplicate,
        elementIsSelect,
        setElementIsSelect,
        dataSideBar,
        setDataSideBar,
        checkRecipes,
        DataElement,
    };
    return <AppLogic.Provider value={value}> {children}</AppLogic.Provider>;
}

export { AppLogic, HandleLogic };
