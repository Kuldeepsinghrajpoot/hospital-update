"use client"

import { FC, useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"

interface SymptomCheckerDialogProps {
  triggerLabel?: string
}

export const SymptomCheckerDialog: FC<SymptomCheckerDialogProps> = ({
  triggerLabel = "✨ AI Symptom Checker",
}) => {
  const [symptoms, setSymptoms] = useState<string>("")
  const [result, setResult] = useState<string>("")
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [open, setOpen] = useState<boolean>(false)

  async function callGemini(symptoms: string) {
  const response = await fetch("/api/gemini", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt: symptoms }),
  });

  const data = await response.json();

  if (data.candidates && data.candidates[0].content.parts[0].text) {
    setResult(data.candidates[0].content.parts[0].text.replace(/\n/g, "<br />"));
  } else {
    setResult("Sorry, I couldn't process that. Please try again.");
    console.log("AI Response:", data);
  }
}


  // ✅ Hooked up button handler
  async function handleCheckSymptoms() {
    if (!symptoms.trim()) {
      setResult("⚠️ Please enter your symptoms first.")
      return
    }

    setIsLoading(true)
    setResult("")

    try {
      await callGemini(symptoms)
    } catch (error) {
      setResult("An error occurred. Please try again later.")
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        setOpen(isOpen)
        if (!isOpen) {
          // Reset everything when the dialog closes
          setSymptoms("")
          setResult("")
          setIsLoading(false)
        }
      }}
    >
      <DialogTrigger asChild>
        <Button variant="outline" className="h-12 px-8 text-base w-full sm:w-auto">
          {triggerLabel}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>✨ AI Symptom Checker</DialogTitle>
          <DialogDescription>
            Describe your symptoms below, and our AI assistant will provide a preliminary suggestion.
          </DialogDescription>
        </DialogHeader>

        <Textarea
          placeholder="e.g., 'I have a fever, a sore throat, and a headache.'"
          rows={4}
          value={symptoms}
          onChange={(e) => setSymptoms(e.target.value)}
          disabled={isLoading}
        />

        <Button onClick={handleCheckSymptoms} className="w-full mt-4" disabled={isLoading}>
          {isLoading ? "Analyzing..." : "Check Symptoms"}
        </Button>

        {result && (
          <div
            className="mt-4 p-4 bg-secondary rounded-lg border text-sm"
            dangerouslySetInnerHTML={{ __html: result }}
          />
        )}

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
