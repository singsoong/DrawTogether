import styles from "../css/Waiting.module.css";

function Waiting() {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.header}>
          <button className={styles.settingBtn}>설정</button>
        </div>
        <div className={styles.content}>
          <h1 className={styles.title}>같이 그릴까?</h1>
          <h4 className={styles.code}>입장 코드 : {Math.floor(Math.random() * 900000) + 100000}</h4>
        </div>
        <div className={styles.playerContainer}>
          <div className={styles.player}>
            <div className={styles.startBtn}>시작하기</div>
            <div className={styles.readyBtn}>준비하기</div>
          </div>
          <div className={styles.player}>1</div>
          <div className={styles.player}>2</div>
          <div className={styles.player}>3</div>
          <div className={styles.player}>4</div>
          <div className={styles.player}>5</div>
        </div>
      </div>
    </>
  );
}

export default Waiting;