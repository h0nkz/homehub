import styles from "../css-modules/HubAppBar.module.css";

function HubAppBar({appName}: {appName: string}) {
    
    const currentTime = '13:37'
    const currentTemp = '17°C'

    return (
        <header className={styles.appBar}>
            <p className={styles.appBarText} id={styles.title}>
                {appName}
            </p>
            <p className={styles.appBarText} id={styles.time}>
                {currentTime}
            </p>
            <p className={styles.appBarText} id={styles.icon}>
                ☼
            </p>
            <p className={styles.appBarText} id={styles.temp}>
                {currentTemp}
            </p>
        </header>
    )
}

export default HubAppBar