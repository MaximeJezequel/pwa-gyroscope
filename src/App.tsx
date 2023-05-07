import { useEffect, useState } from "react"

function App() {
  const flippingMessages: { [key: string]: string } = {
    top: "Flipped to the top - Circle",
    bottom: "Flipped to the bottom - Triangle / Waves",
    left: "Flipped to the left - Square",
    right: "Flipped to the right - Cross / Heart",
  }

  const [flippingDirection, setFlippingDirection] = useState<string | null>(
    null
  )

  const [supportedFlippingDirection, setSupportedFlippingDirection] =
    useState<string>("yes")

  const [gamma, setGamma] = useState<number | null>(null)
  const [beta, setBeta] = useState<number | null>(null)

  useEffect(() => {
    if (window.DeviceOrientationEvent) {
      window.addEventListener("deviceorientation", handleOrientation)
      return () =>
        window.removeEventListener("deviceorientation", handleOrientation)
    } else {
      console.log("Device orientation not supported")
      setSupportedFlippingDirection("no")
    }
  }, [])

  function handleOrientation(event: DeviceOrientationEvent) {
    setGamma(event.gamma)
    setBeta(event.beta)

    // Determine flipping direction

    if (event.gamma! < -45) {
      setFlippingDirection(flippingMessages.left)
    } else if (event.gamma! > 45) {
      setFlippingDirection(flippingMessages.right)
    } else if (event.beta! < -45) {
      setFlippingDirection(flippingMessages.top)
    } else if (event.beta! > 45) {
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
        <>
          <h2>{flippingDirection}</h2>
          <h2>Gamma : {gamma!.toFixed(2)}</h2>
          <h2>Beta : {beta!.toFixed(2)}</h2>
        </>
      )}
    </div>
  )
}

export default App
