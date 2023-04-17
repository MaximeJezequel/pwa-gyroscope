import { useEffect, useState } from "react"

function App() {
  const flippingMessages: { [key: string]: string } = {
    top: "Flipped to the top",
    bottom: "Flipped to the bottom",
    left: "Flipped to the left",
    right: "Flipped to the right",
  }

  const [flippingDirection, setFlippingDirection] = useState<string | null>(
    null
  )

  const [supportedFlippingDirection, setSupportedFlippingDirection] =
    useState<string>("yes")

  useEffect(() => {
    if (window.DeviceOrientationEvent) {
      window.addEventListener("deviceorientation", handleOrientation)
    } else {
      console.log("Device orientation not supported")
      setSupportedFlippingDirection("no")
    }
  }, [])

  function handleOrientation(event: DeviceOrientationEvent) {
    const { alpha, beta, gamma } = event

    // Determine flipping direction

    if (gamma! < -45) {
      setFlippingDirection(flippingMessages.left)
    } else if (gamma! > 45) {
      setFlippingDirection(flippingMessages.right)
    } else if (beta! < -45) {
      setFlippingDirection(flippingMessages.top)
    } else if (beta! > 45) {
      setFlippingDirection(flippingMessages.bottom)
    }
  }

  return (
    <div className="App">
      {supportedFlippingDirection === "no" && (
        <h1>Flip your phone to see a message</h1>
      )}
      {supportedFlippingDirection === "yes" && flippingDirection == null && (
        <h1>Flip your phone to see a message</h1>
      )}
      {supportedFlippingDirection === "yes" && flippingDirection !== null && (
        <h2>{flippingDirection}</h2>
      )}
    </div>
  )
}

export default App
