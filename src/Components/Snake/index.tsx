import { Axis } from "../../App";
import "./style.css"

interface SnakeProps {
    positions: Axis[]
}

const Snake = ({positions}: SnakeProps) => {

    return (
        <div>
            {positions.map((dot, index) => {
                
                const style = {
                    left:`${dot[0]}%`,
                    top:`${dot[1]}%`
                }

                return (
                    <div className="snake-dot" key={index} style={style}></div>
                )
            })}
        </div>
    )
}

export default Snake;