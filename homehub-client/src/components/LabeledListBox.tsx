import styles from "../css-modules/box.module.css"

function LabeledListBox({ listItems, label }: { listItems: string[], label: string }) {

    return (
        <div className={styles.divContainer}>
            <p className={styles.listBoxLabel}>
                {label}
            </p>
            <ul className={styles.listBox}>
                {listItems.map((item, index) => 
                    (<li className={styles.listBoxItem}>
                        {item}
                    </li>)
                )}
            </ul>
        </div>
    )
}

export default LabeledListBox