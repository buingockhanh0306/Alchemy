// import Home from './components/Home';
import MainSection from './components/main section';
import SideBar from './components/sidebar';
import ReactFullscreeen from 'react-easyfullscreen';
import { MouseContext } from './components/events/MouseEvent';
import { useContext } from 'react';
function App() {
    const valueMouseContext = useContext(MouseContext);
    return (
        <ReactFullscreeen>
            {({ refMain, onRequest, onExit }) => (
                <div
                    className="App"
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        color: '#938671',
                        backgroundImage: 'url(https://littlealchemy.com/img/workspace-background.png)',
                    }}
                    onMouseUp={valueMouseContext.handleMouseUp}
                    onMouseMove={valueMouseContext.handleMouseMove}
                >
                    {/* <Home/> */}
                    <MainSection ref={refMain} onRequest={onRequest} onExit={onExit} />
                    <SideBar />
                </div>
            )}
        </ReactFullscreeen>
    );
}

export default App;
