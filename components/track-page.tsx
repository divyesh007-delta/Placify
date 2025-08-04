import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, Edit, GraduationCap, Target } from "lucide-react"
import Link from "next/link"

export function TrackPage() {
  const userProfile = {
    name: "John Doe",
    studentId: "21CE001",
    department: "CE",
    semester: 7,
    cpi: 8.5,
    email: "john.doe@bvmengineering.ac.in",
    interests: ["Web Development", "AI/ML", "Data Science"],
    goal: "Placement",
  }

  const appliedCompanies = [
    {
      name: "Google",
      logo: "/placeholder.svg?height=40&width=40",
      status: "Selected",
      round: "Final",
      package: "₹45 LPA",
    },
    {
      name: "Microsoft",
      logo: "/placeholder.svg?height=40&width=40",
      status: "In Progress",
      round: "Technical Round 2",
      package: "₹42 LPA",
    },
    {
      name: "Amazon",
      logo: "/placeholder.svg?height=40&width=40",
      status: "Rejected",
      round: "Technical Round 1",
      package: "₹38 LPA",
    },
    {
      name: "TCS",
      logo: "/placeholder.svg?height=40&width=40",
      status: "Applied",
      round: "Online Assessment",
      package: "₹7 LPA",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Selected":
        return "bg-green-100 text-green-800"
      case "In Progress":
        return "bg-blue-100 text-blue-800"
      case "Rejected":
        return "bg-red-100 text-red-800"
      case "Applied":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getProgressValue = (status: string) => {
    switch (status) {
      case "Selected":
        return 100
      case "In Progress":
        return 60
      case "Rejected":
        return 40
      case "Applied":
        return 20
      default:
        return 0
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/dashboard" className="flex items-center space-x-2 text-gray-600 hover:text-blue-600">
              <ArrowLeft className="h-5 w-5" />
              <span>Back to Dashboard</span>
            </Link>
            <Button variant="outline">
              <Edit className="h-4 w-4 mr-2" />
              Edit Profile
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Section */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Profile</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center">
                  <Avatar className="w-20 h-20 mx-auto mb-4">
                    <AvatarImage src="/placeholder.svg?height=80&width=80" />
                    <AvatarFallback className="text-lg">JD</AvatarFallback>
                  </Avatar>
                  <h3 className="text-xl font-semibold">{userProfile.name}</h3>
                  <p className="text-gray-600">{userProfile.studentId}</p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <GraduationCap className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="font-medium">{userProfile.department} Department</p>
                      <p className="text-sm text-gray-600">Semester {userProfile.semester}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Target className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="font-medium">CPI: {userProfile.cpi}</p>
                      <p className="text-sm text-gray-600">Goal: {userProfile.goal}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Interests</h4>
                  <div className="flex flex-wrap gap-2">
                    {userProfile.interests.map((interest) => (
                      <Badge key={interest} variant="secondary" className="text-xs">
                        {interest}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Applications Tracking */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Application Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {appliedCompanies.map((company, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <img
                            src={company.logo || "/placeholder.svg"}
                            alt={company.name}
                            className="w-12 h-12 rounded-lg object-cover"
                          />
                          <div>
                            <h4 className="font-semibold">{company.name}</h4>
                            <p className="text-sm text-gray-600">{company.package}</p>
                          </div>
                        </div>
                        <Badge className={getStatusColor(company.status)}>{company.status}</Badge>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Current Round: {company.round}</span>
                          <span>{getProgressValue(company.status)}%</span>
                        </div>
                        <Progress value={getProgressValue(company.status)} className="h-2" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-blue-600">4</div>
                  <div className="text-sm text-gray-600">Total Applications</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-green-600">1</div>
                  <div className="text-sm text-gray-600">Selected</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-yellow-600">1</div>
                  <div className="text-sm text-gray-600">In Progress</div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
