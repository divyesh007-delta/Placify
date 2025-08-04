import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, MapPin, Users, Star, ThumbsUp, ThumbsDown, Flag } from "lucide-react"
import Link from "next/link"

export function CompanyDetailPage() {
  const placedStudents = [
    { name: "Rahul Sharma", role: "SDE", package: "₹45 LPA", image: "/placeholder.svg?height=40&width=40" },
    { name: "Priya Patel", role: "SDE-2", package: "₹52 LPA", image: "/placeholder.svg?height=40&width=40" },
    { name: "Amit Kumar", role: "SDE", package: "₹43 LPA", image: "/placeholder.svg?height=40&width=40" },
  ]

  const interviewQuestions = [
    {
      round: "Technical",
      question: "Implement a function to reverse a linked list",
      answer: "Use iterative approach with three pointers: prev, current, and next...",
      difficulty: 4,
      upvotes: 15,
      downvotes: 2,
    },
    {
      round: "Technical",
      question: "Explain the difference between React hooks and class components",
      answer: "Hooks allow you to use state and lifecycle methods in functional components...",
      difficulty: 3,
      upvotes: 12,
      downvotes: 1,
    },
    {
      round: "HR",
      question: "Why do you want to work at Google?",
      answer: "Focus on innovation, learning opportunities, and impact on billions of users...",
      difficulty: 2,
      upvotes: 8,
      downvotes: 0,
    },
  ]

  const focusTags = [
    "Data Structures",
    "Algorithms",
    "System Design",
    "React",
    "Node.js",
    "Database Design",
    "OOPs",
    "Operating Systems",
    "Computer Networks",
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            <Link href="/dashboard" className="flex items-center space-x-2 text-gray-600 hover:text-blue-600">
              <ArrowLeft className="h-5 w-5" />
              <span>Back to Dashboard</span>
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Company Header */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
              <img
                src="/placeholder.svg?height=80&width=80"
                alt="Google"
                className="w-20 h-20 rounded-lg object-cover"
              />
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Google</h1>
                <div className="flex items-center space-x-4 text-gray-600 mb-4">
                  <div className="flex items-center space-x-1">
                    <MapPin className="h-4 w-4" />
                    <span>Mountain View, CA</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Users className="h-4 w-4" />
                    <span>156,000+ employees</span>
                  </div>
                </div>
                <p className="text-gray-700 mb-4">
                  Google is a multinational technology company that specializes in Internet-related services and
                  products, including online advertising technologies, search engine, cloud computing, software, and
                  hardware.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge className="bg-green-100 text-green-800">₹35-55 LPA</Badge>
                  <Badge variant="secondary">SDE Roles</Badge>
                  <Badge variant="secondary">Product Manager</Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="questions">Questions</TabsTrigger>
            <TabsTrigger value="students">Placed Students</TabsTrigger>
            <TabsTrigger value="trends">Trends</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Hiring Process */}
              <Card>
                <CardHeader>
                  <CardTitle>Hiring Process</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>Online Assessment</span>
                    <Badge variant="outline">Round 1</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Technical Interview 1</span>
                    <Badge variant="outline">Round 2</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Technical Interview 2</span>
                    <Badge variant="outline">Round 3</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Behavioral Interview</span>
                    <Badge variant="outline">Round 4</Badge>
                  </div>
                </CardContent>
              </Card>

              {/* Round Difficulty */}
              <Card>
                <CardHeader>
                  <CardTitle>Round Difficulty Analysis</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm">Online Assessment</span>
                        <span className="text-sm">Hard</span>
                      </div>
                      <Progress value={80} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm">Technical Round 1</span>
                        <span className="text-sm">Very Hard</span>
                      </div>
                      <Progress value={90} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm">Technical Round 2</span>
                        <span className="text-sm">Hard</span>
                      </div>
                      <Progress value={75} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm">Behavioral</span>
                        <span className="text-sm">Medium</span>
                      </div>
                      <Progress value={50} className="h-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Focus Topics */}
            <Card>
              <CardHeader>
                <CardTitle>Key Focus Areas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {focusTags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-sm">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="questions" className="space-y-6">
            {interviewQuestions.map((item, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline">{item.round}</Badge>
                      <div className="flex items-center space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${i < item.difficulty ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                          />
                        ))}
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      <Flag className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Question:</h4>
                    <p className="text-gray-700">{item.question}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Answer:</h4>
                    <p className="text-gray-700">{item.answer}</p>
                  </div>
                  <div className="flex items-center space-x-4 pt-2 border-t">
                    <Button variant="ghost" size="sm" className="text-green-600">
                      <ThumbsUp className="h-4 w-4 mr-1" />
                      {item.upvotes}
                    </Button>
                    <Button variant="ghost" size="sm" className="text-red-600">
                      <ThumbsDown className="h-4 w-4 mr-1" />
                      {item.downvotes}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="students" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {placedStudents.map((student, index) => (
                <Card key={index}>
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3">
                      <Avatar>
                        <AvatarImage src={student.image || "/placeholder.svg"} />
                        <AvatarFallback>
                          {student.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h4 className="font-semibold">{student.name}</h4>
                        <p className="text-sm text-gray-600">{student.role}</p>
                        <p className="text-sm font-semibold text-green-600">{student.package}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="trends" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Package Trends (Last 3 Years)</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span>2022</span>
                      <span className="font-semibold">₹38 LPA</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>2023</span>
                      <span className="font-semibold">₹42 LPA</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>2024</span>
                      <span className="font-semibold">₹45 LPA</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Hiring Statistics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span>Total Rounds</span>
                      <span className="font-semibold">4</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Success Rate</span>
                      <span className="font-semibold">12%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Students Hired (2024)</span>
                      <span className="font-semibold">8</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
