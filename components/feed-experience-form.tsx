"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, ArrowRight, Star } from "lucide-react"
import Link from "next/link"

export function FeedExperienceForm() {
  const [currentStep, setCurrentStep] = useState(1)
  const [selectedRounds, setSelectedRounds] = useState<string[]>([])
  const totalSteps = 2 + selectedRounds.length

  const companies = ["Google", "Microsoft", "Amazon", "TCS", "Infosys", "Wipro"]
  const jobRoles = ["SDE", "SDE-2", "Product Manager", "Data Scientist", "DevOps Engineer"]
  const rounds = ["Online Assessment", "Group Discussion", "Technical Interview", "Coding Round", "HR Interview"]

  const handleRoundSelection = (round: string, checked: boolean) => {
    if (checked) {
      setSelectedRounds([...selectedRounds, round])
    } else {
      setSelectedRounds(selectedRounds.filter((r) => r !== round))
    }
  }

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const renderStep = () => {
    if (currentStep === 1) {
      return (
        <div className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Company</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select company" />
                </SelectTrigger>
                <SelectContent>
                  {companies.map((company) => (
                    <SelectItem key={company} value={company}>
                      {company}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Job Role</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select job role" />
                </SelectTrigger>
                <SelectContent>
                  {jobRoles.map((role) => (
                    <SelectItem key={role} value={role}>
                      {role}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <Label>Rounds You Faced (Select all that apply)</Label>
              <div className="space-y-2">
                {rounds.map((round) => (
                  <div key={round} className="flex items-center space-x-2">
                    <Checkbox
                      id={round}
                      onCheckedChange={(checked) => handleRoundSelection(round, checked as boolean)}
                    />
                    <Label htmlFor={round}>{round}</Label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )
    }

    if (currentStep <= 1 + selectedRounds.length) {
      const roundIndex = currentStep - 2
      const currentRound = selectedRounds[roundIndex]

      return (
        <div className="space-y-6">
          <div className="text-center">
            <h3 className="text-xl font-semibold mb-2">{currentRound}</h3>
            <p className="text-gray-600">Share your experience for this round</p>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Difficulty Level</Label>
              <div className="flex items-center space-x-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="h-6 w-6 text-yellow-400 cursor-pointer hover:fill-current" />
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label>Score/Result</Label>
              <Input placeholder="e.g., 85/100, Passed, Selected" />
            </div>

            <div className="space-y-4">
              <Label>Questions Asked (Up to 3)</Label>
              {[1, 2, 3].map((num) => (
                <div key={num} className="space-y-2 p-4 border rounded-lg">
                  <Label>Question {num}</Label>
                  <Textarea placeholder="Enter the question..." />
                  <Label>Your Answer/Approach</Label>
                  <Textarea placeholder="Describe your answer or approach..." />
                </div>
              ))}
            </div>

            <div className="space-y-2">
              <Label>Key Topics Focused</Label>
              <Input placeholder="e.g., Data Structures, Algorithms, System Design" />
            </div>

            <div className="space-y-2">
              <Label>Tips and Feedback</Label>
              <Textarea placeholder="Share your tips and advice for future candidates..." />
            </div>
          </div>
        </div>
      )
    }

    // Final Review Step
    return (
      <div className="space-y-6">
        <div className="text-center">
          <h3 className="text-xl font-semibold mb-2">Review Your Experience</h3>
          <p className="text-gray-600">Please review all the information before submitting</p>
        </div>

        <Card>
          <CardContent className="p-4">
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold">Company & Role</h4>
                <p className="text-gray-600">Google - SDE</p>
              </div>
              <div>
                <h4 className="font-semibold">Rounds Completed</h4>
                <div className="flex flex-wrap gap-2 mt-1">
                  {selectedRounds.map((round) => (
                    <span key={round} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
                      {round}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <p className="text-green-800 text-sm">
            Thank you for sharing your experience! This will help other students prepare better for their placements.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            <Link href="/dashboard" className="flex items-center space-x-2 text-gray-600 hover:text-blue-600">
              <ArrowLeft className="h-5 w-5" />
              <span>Back to Dashboard</span>
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium">
              Step {currentStep} of {totalSteps}
            </span>
            <span className="text-sm text-gray-500">{Math.round((currentStep / totalSteps) * 100)}% Complete</span>
          </div>
          <Progress value={(currentStep / totalSteps) * 100} className="h-2" />
        </div>

        {/* Form Card */}
        <Card>
          <CardHeader>
            <CardTitle>Share Your Placement Experience</CardTitle>
          </CardHeader>
          <CardContent>
            {renderStep()}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8">
              <Button variant="outline" onClick={prevStep} disabled={currentStep === 1}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Previous
              </Button>

              {currentStep === totalSteps ? (
                <Link href="/dashboard">
                  <Button className="bg-green-600 hover:bg-green-700">Submit Experience</Button>
                </Link>
              ) : (
                <Button onClick={nextStep}>
                  Next
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
