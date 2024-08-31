import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { WalletIcon, Power, Droplet } from "lucide-react"

export default function Component() {
  const [isConnected, setIsConnected] = useState(false)
  const [amount, setAmount] = useState("")

  const handleConnect = () => {
    // Implement wallet connection logic here
    setIsConnected(true)
  }

  const handleDisconnect = () => {
    // Implement wallet disconnection logic here
    setIsConnected(false)
    setAmount("")
  }

  const handleRequestFaucet = () => {
    // Implement faucet request logic here
    console.log(`Requesting ${amount} tokens from faucet`)
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">Crypto Faucet</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {!isConnected ? (
          <Button className="w-full" onClick={handleConnect}>
            <WalletIcon className="mr-2 h-4 w-4" />
            Connect Wallet
          </Button>
        ) : (
          <>
            <Button variant="outline" className="w-full" onClick={handleDisconnect}>
              <Power className="mr-2 h-4 w-4" />
              Disconnect Wallet
            </Button>
            <div className="flex space-x-2">
              <Input
                type="number"
                placeholder="Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="flex-grow"
              />
              <Button onClick={handleRequestFaucet} disabled={!amount}>
                <Droplet className="mr-2 h-4 w-4" />
                Request
              </Button>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  )
}