import ListBox from './LabeledListBox';
import ThemeContext from '../contexts/ThemeContext';
import { useContext } from 'react';
import styles from '../css-modules/box.module.css';

function MainFrame() {
    const theme = useContext(ThemeContext);
    const mainListItems = [
        "[25/4 12:15] 1 ToDo due today: Pet cats",
        "[25/4 07:00] Scouted for Allotment",
        "[24/4 15:00] Yoga Class @ 18.00 today",]

    return (
        <div className={styles.mainGrid}>
            <div className={styles.gridItem1}>
                <div>
                    <p>:D</p>
                </div>
            </div>
            <div className={styles.gridItem2}>
                <ListBox listItems={mainListItems} label="FEED"/>
            </div>
        </div>
    )
}

export default MainFrame