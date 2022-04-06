import styles from "../css/Waiting.module.css";

function Waiting() {
  return (
    <>
      <div>
        <div className={styles.header}>
          <button className={styles.settingBtn}>설정</button>
        </div>
      </div>
    </>
  );
}

export default Waiting;
