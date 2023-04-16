import { useEffect, useState } from "react"

function App() {
  const [flippingDirection, setFlippingDirection] = useState<string | null>(
    null
  )
  const [flippingSpeed, setFlippingSpeed] = useState<string | null>(null)
  const flippingMessages: { [key: string]: string } = {
    top: "Flipped to the top",
    bottom: "Flipped to the bottom",
    left: "Flipped to the left",
    right: "Flipped to the right",
  }
  const speedMessages: { [key: string]: string } = {
    slow: "slowly",
    fast: "quickly",
  }

  useEffect(() => {
    if (window.DeviceOrientationEvent) {
      window.addEventListener("deviceorientation", handleOrientation)
    } else {
      console.log("Device orientation not supported")
    }
  }, [])

  function handleOrientation(event: DeviceOrientationEvent) {
    const { alpha, beta, gamma } = event
    let newFlippingDirection: string | null = null
    let newFlippingSpeed: string | null = null

    // Determine flipping direction
    if (gamma < -45) {
      newFlippingDirection = "top"
    } else if (gamma > 45) {
      newFlippingDirection = "bottom"
    } else if (beta < -45) {
      newFlippingDirection = "right"
    } else if (beta > 45) {
      newFlippingDirection = "left"
    }

    // Determine flipping speed
    if (newFlippingDirection && flippingDirection === newFlippingDirection) {
      const newSpeed =
        Math.abs(gamma - event.gamma) + Math.abs(beta - event.beta)
      if (newSpeed > 50) {
        newFlippingSpeed = "fast"
      } else {
        newFlippingSpeed = "slow"
      }
    }

    setFlippingDirection(newFlippingDirection)
    setFlippingSpeed(newFlippingSpeed)
  }

  const outputMessages: { [key: string]: string } = {
    top_slow: "Slowly flipped to the top",
    top_fast: "Quickly flipped to the top",
    bottom_slow: "Slowly flipped to the bottom",
    bottom_fast: "Quickly flipped to the bottom",
    left_slow: "Slowly flipped to the left",
    left_fast: "Quickly flipped to the left",
    right_slow: "Slowly flipped to the right",
    right_fast: "Quickly flipped to the right",
  }

  const outputKey =
    flippingDirection && flippingSpeed
      ? `${flippingDirection}_${flippingSpeed}`
      : null
  const message = outputKey
    ? outputMessages[outputKey]
    : "Flip your phone to see a message"

  return (
    <div className="App">
      <h1>{message}</h1>
    </div>
  )
}

export default App
