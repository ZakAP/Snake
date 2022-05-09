import { Axis } from "../../App"

interface FoodProps {
    positions: Axis
}

const Food = ({positions} : FoodProps) => {

    const style = {
        left:`${positions[0]}%`,
        top:`${positions[1]}%`
    }

    return (
        <div className="snake-food" style={style}></div>
    )
}

export default Food;