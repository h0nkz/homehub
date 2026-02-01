import styles from "../css-modules/box.module.css"

function LabeledListBox({ listItems, label, className }: { listItems: string[], label: string, className: string }) {

    return (
    <div className={styles.className}>
            <p className={styles.listBoxLabel}>
                {label}
            </p>
            <ul className={styles.listBox}>
                {listItems.map((item, index) => 
                    (<li className={styles.listBoxItem} id={`listItem${index}`}>
                        {item}
                    </li>)
                )}
            </ul>
        </div>
    )
}

export default LabeledListBox