import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Edit, Trash2, Plus } from "lucide-react"
import Link from "next/link"

export function ApplicationsPage() {
  const applications = [
    {
      id: 1,
      company: "Google",
      role: "SDE",
      status: "submitted",
      date: "2024-01-15",
      logo: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 2,
      company: "Microsoft",
      role: "SDE-2",
      status: "in-progress",
      date: "2024-01-20",
      logo: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 3,
      company: "Amazon",
      role: "SDE",
      status: "submitted",
      date: "2024-01-18",
      logo: "/placeholder.svg?height=40&width=40",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "submitted":
        return "bg-green-100 text-green-800"
      case "in-progress":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "submitted":
        return "Submitted"
      case "in-progress":
        return "In Progress"
      default:
        return "Draft"
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
            <Link href="/feed-experience">
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="h-4 w-4 mr-2" />
                Add New Experience
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Your Applications</h1>
          <p className="text-gray-600">Track and manage your placement experiences</p>
        </div>

        {applications.length === 0 ? (
          <Card>
            <CardContent className="text-center py-12">
              <div className="text-gray-500 mb-4">
                <Plus className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <h3 className="text-lg font-medium mb-2">No applications yet</h3>
                <p>Start sharing your placement experiences to help other students</p>
              </div>
              <Link href="/feed-experience">
                <Button className="bg-blue-600 hover:bg-blue-700">Share Your First Experience</Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {applications.map((app) => (
              <Card key={app.id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <img
                        src={app.logo || "/placeholder.svg"}
                        alt={app.company}
                        className="w-10 h-10 rounded-lg object-cover"
                      />
                      <div>
                        <CardTitle className="text-lg">{app.company}</CardTitle>
                        <p className="text-sm text-gray-600">{app.role}</p>
                      </div>
                    </div>
                    <Badge className={getStatusColor(app.status)}>{getStatusText(app.status)}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-sm text-gray-600">Submitted on {new Date(app.date).toLocaleDateString()}</div>

                  <div className="flex space-x-2">
                    {app.status === "in-progress" && (
                      <Button variant="outline" size="sm" className="flex-1">
                        <Edit className="h-4 w-4 mr-1" />
                        Edit
                      </Button>
                    )}
                    <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                      <Trash2 className="h-4 w-4 mr-1" />
                      Delete
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
