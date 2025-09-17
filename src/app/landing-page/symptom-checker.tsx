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

  const handleCheckSymptoms = async () => {
    if (!symptoms.trim()) {
      setResult("Please describe your symptoms.")
      return
    }
    setIsLoading(true)
    setResult("")

    const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`

    const systemPrompt = `You are a helpful AI medical assistant for Uday Clinic. Your goal is to provide a preliminary analysis of a user's symptoms. You MUST follow these rules strictly:
1. Analyze the user's symptoms and suggest a potential course of action:
   - Go to the hospital immediately.
   - Book a non-urgent appointment.
   - Rest and manage at home.
2. Provide a brief, simple explanation for your suggestion.
3. ALWAYS, without exception, end your response with the following disclaimer, formatted exactly like this:
"---
**Disclaimer:** This is an AI-powered analysis and not a substitute for professional medical advice. Please consult a doctor for an accurate diagnosis and treatment plan. This tool is for informational purposes only."
4. Do not provide a diagnosis. Do not suggest specific medications.
5. Keep your entire response concise and easy to understand for a non-medical person.`

    const payload = {
      contents: [{ parts: [{ text: `User symptoms: ${symptoms}` }] }],
      systemInstruction: { parts: [{ text: systemPrompt }] },
    }

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
      const data = await response.json()
      if (data.candidates && data.candidates[0].content.parts[0].text) {
        setResult(data.candidates[0].content.parts[0].text.replace(/\n/g, "<br />"))
      } else {
        setResult("Sorry, I couldn't process that. Please try again.")
      }
    } catch (error) {
      setResult("An error occurred. Please check your connection and try again.")
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
