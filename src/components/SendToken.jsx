"use client"

import { useEffect, useState } from "react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "./ui/dialog"
import { DollarSign } from "lucide-react"
import { sendToken } from "../lib/payment"
import { usePrivy } from "@privy-io/react-auth"

export default function SendToken({ address }) {
  const [open, setOpen] = useState(false)
  const [toAddress, setToAddress] = useState("")
  const [amount, setAmount] = useState("")
  const [loading, setLoading] = useState(false)
  const { authenticated } = usePrivy()

  useEffect(() => {
    if (address) {
      setToAddress(address)
    }
  }, [address])

  const handleSend = async () => {
    if (!toAddress || !amount) {
      alert("Please enter address and amount")
      return
    }

    try {
      setLoading(true)
      await sendToken(toAddress, parseFloat(amount))
      setOpen(false)
      setToAddress("")
      setAmount("")
    } catch (err) {
      console.error(err)
      alert("❌ Error sending token")
    } finally {
      setLoading(false)
    }
  }

  if (!authenticated) return null

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2">
          <DollarSign className="h-4 w-4" />
          Send
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Send Token</DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div>
            <label className="text-sm font-medium">To Address</label>
            <Input
              placeholder="0xRecipientAddress"
              value={toAddress}
              onChange={(e) => setToAddress(e.target.value)}
            />
          </div>
          <div>
            <label className="text-sm font-medium">Amount</label>
            <Input
              placeholder="10"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
        </div>

        <DialogFooter>
          <Button onClick={handleSend} disabled={loading || !toAddress || !amount}>
            {loading ? "Sending..." : "Send Token"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
