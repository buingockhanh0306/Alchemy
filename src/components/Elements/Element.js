import styles from './Element.module.scss'
function Element({ img, name, position, onMouseDown, zIndex, opacity }) {
  return (
    <div
      className= {styles['element'] }
      style={
        position != null
          ? { left: position.left - 32, top: position.top - 32, zIndex:zIndex, opacity: opacity }
          : { left: 1741, top: 85, display: "none" }
      }
    >
      <div>
        <img src={img} alt="photos" />
        <div className={styles['element_ovelay']} onMouseDown={onMouseDown}></div>
      </div>
      <p>{name}</p>
    </div>
  );
}

export default Element;
