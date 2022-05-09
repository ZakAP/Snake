import { useEffect, useState, useCallback } from "react"
import SnakeDots from "./Components/Snake"
import Food from "./Components/Food"
import "./App.css"

export type Axis = [number, number]

export type Moviments = "RIGHT" | "LEFT" | "UP" | "DOWN"

const getRandomCoordinates = (): Axis => {
  let min = 1
  let max = 98
  let x = Math.floor((Math.random() * (max - min + 1) + min) / 2) * 2
  let y = Math.floor((Math.random() * (max - min + 1) + min) / 2) * 2
  return [x, y]
}

function App() {
  const [snakeDots, setSnakeDots] = useState<Axis[]>([
    [0, 0],
    [2, 0],
  ])
  const [speed, setSpeed] = useState(100)
  const [foods, setFoods] = useState<Axis>(getRandomCoordinates())
  const [movimentDirection, setMovimentDirection] = useState<Moviments>("RIGHT")

  const gameOverMessage = `Game over! You made ${snakeDots.length - 2} points and your sanke lenght is ${snakeDots.length}`

  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      e = e || window.event
      switch (e.keyCode) {
        case 38:
          if (movimentDirection !== "DOWN") {
            setMovimentDirection("UP")
          }
          break
        case 40:
          if (movimentDirection !== "UP") {
            setMovimentDirection("DOWN")
          }
          break
        case 37:
          if (movimentDirection !== "RIGHT") {
            setMovimentDirection("LEFT")
          }
          break
        case 39:
          if (movimentDirection !== "LEFT") {
            setMovimentDirection("RIGHT")
          }
          break
      }
    },
    [movimentDirection]
  )

  const onGameOver = useCallback(() => {
    setMovimentDirection("RIGHT")
    setSnakeDots([
      [0, 0],
      [2, 0],
    ])
    setSpeed(200)
    setFoods(getRandomCoordinates())
    alert(gameOverMessage)
  }, [gameOverMessage])

  const checkIfCollapsed = useCallback(() => {
    let snake = snakeDots
    let head = snake[snake.length - 1]
    snake.pop()
    snake.forEach((dot) => {
      if (head[0] === dot[0] && head[1] === dot[1]) {
        onGameOver()
      }
    })
  }, [onGameOver, snakeDots])

  const enlargeSnake = useCallback(() => {
    let newSnake = [...snakeDots]
    newSnake.unshift([101, 101])
    setSnakeDots(newSnake)
  }, [snakeDots])

  const checkIfEat = useCallback(() => {
    let head = snakeDots[snakeDots.length - 1]
    let food = foods
    if (head[0] === food[0] && head[1] === food[1]) {
      setFoods(getRandomCoordinates())
      enlargeSnake()
    }
  }, [enlargeSnake, foods, snakeDots])

  const moveSnake = useCallback(() => {
    let dots = [...snakeDots]
    let head = dots[dots.length - 1]

    switch (movimentDirection) {
      case "UP":
        head = [head[0], head[1] - 2]
        break
      case "DOWN":
        head = [head[0], head[1] + 2]
        break
      case "LEFT":
        head = [head[0] - 2, head[1]]
        break
      case "RIGHT":
        head = [head[0] + 2, head[1]]
        break
    }
    if (head[0] >= 100 || head[1] >= 100 || head[0] < 0 || head[1] < 0) {
      onGameOver()
    }
    checkIfCollapsed()
    dots.push(head)
    dots.shift()
    setSnakeDots(dots)
  }, [snakeDots, movimentDirection, onGameOver, checkIfCollapsed])

  useEffect(() => {
    document.onkeydown = onKeyDown
    const intervalId = setInterval(moveSnake, speed)
    checkIfEat()
    return () => {
      clearInterval(intervalId)
    }
  }, [moveSnake, speed, onKeyDown, checkIfEat])

  return (
    <div className="screen">
      <div className="game-area">
        <b className="title"><h1>SNAKE</h1></b>
        <SnakeDots positions={snakeDots} />
        <Food positions={foods} />
      </div>

      <div>
        <div className="counterContainer">
          <h1>
            <b>COUNTER</b>
          </h1>
          <h1 className="counterNumber">
            <b>{snakeDots.length - 2}</b>
          </h1>
        </div>
      </div>
    </div>
  )
}

export default App
