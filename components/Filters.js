import styles from './Filters.module.scss'
import Label from './Label'
import Select from './Select'

const Filters = ({
    activeCategory, 
    setActiveCategory, 
    categories
}) => {
    const filteredOptions = categories.map((category) => {
        return category.node.name;
    });
    return <div className={styles.filterBar}>
        <Label>Filters: </Label>
        <Select 
            options={filteredOptions}
            changeHandler={setActiveCategory}
        />
    </div>
}
export default Filters