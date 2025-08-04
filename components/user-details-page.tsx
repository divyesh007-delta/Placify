import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { GraduationCap } from "lucide-react"
import Link from "next/link"

export function UserDetailsPage() {
  const departments = ["CE", "IT", "EC", "ME", "EE", "CH", "CL"]
  const semesters = ["1", "2", "3", "4", "5", "6", "7", "8"]
  const interests = [
    "Web Development",
    "AI/ML",
    "Data Science",
    "Cybersecurity",
    "Mobile Development",
    "DevOps",
    "Cloud Computing",
    "Blockchain",
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="bg-blue-600 p-3 rounded-full">
              <GraduationCap className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Complete Your Profile</h1>
          <p className="text-gray-600 mt-2">Help us personalize your placement journey</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input id="fullName" placeholder="John Doe" defaultValue="John Doe" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="studentId">Student ID</Label>
                <Input id="studentId" placeholder="21CE001" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Department</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
                    {departments.map((dept) => (
                      <SelectItem key={dept} value={dept}>
                        {dept}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Current Semester</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select semester" />
                  </SelectTrigger>
                  <SelectContent>
                    {semesters.map((sem) => (
                      <SelectItem key={sem} value={sem}>
                        Semester {sem}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="cpi">CPI (GPA)</Label>
              <Input id="cpi" type="number" step="0.01" min="0" max="10" placeholder="8.5" />
            </div>

            <div className="space-y-3">
              <Label>Niche Interests (Select all that apply)</Label>
              <div className="grid grid-cols-2 gap-3">
                {interests.map((interest) => (
                  <div key={interest} className="flex items-center space-x-2">
                    <Checkbox id={interest} />
                    <Label htmlFor={interest} className="text-sm">
                      {interest}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <Label>Primary Goal</Label>
              <RadioGroup defaultValue="placement">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="placement" id="placement" />
                  <Label htmlFor="placement">Placement</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="higher-studies" id="higher-studies" />
                  <Label htmlFor="higher-studies">Higher Studies</Label>
                </div>
              </RadioGroup>
            </div>

            <Link href="/dashboard" className="block">
              <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white" size="lg">
                Complete Profile & Continue
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
