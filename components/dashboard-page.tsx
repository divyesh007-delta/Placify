import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, Building2, Menu, Home, FileText, BarChart3, MessageSquare, LogOut } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import Link from "next/link"

export function DashboardPage() {
  const companies = [
    {
      id: 1,
      name: "Google",
      logo: "/placeholder.svg?height=60&width=60",
      roles: ["SDE", "SDE-2"],
      avgPackage: "₹45 LPA",
      years: ["2023", "2024"],
    },
    {
      id: 2,
      name: "Microsoft",
      logo: "/placeholder.svg?height=60&width=60",
      roles: ["SDE", "PM"],
      avgPackage: "₹42 LPA",
      years: ["2022", "2023", "2024"],
    },
    {
      id: 3,
      name: "Amazon",
      logo: "/placeholder.svg?height=60&width=60",
      roles: ["SDE-1", "SDE-2"],
      avgPackage: "₹38 LPA",
      years: ["2023", "2024"],
    },
    {
      id: 4,
      name: "TCS",
      logo: "/placeholder.svg?height=60&width=60",
      roles: ["Developer", "Analyst"],
      avgPackage: "₹7 LPA",
      years: ["2022", "2023", "2024"],
    },
    {
      id: 5,
      name: "Infosys",
      logo: "/placeholder.svg?height=60&width=60",
      roles: ["SE", "SSE"],
      avgPackage: "₹8 LPA",
      years: ["2023", "2024"],
    },
    {
      id: 6,
      name: "Wipro",
      logo: "/placeholder.svg?height=60&width=60",
      roles: ["Developer", "Consultant"],
      avgPackage: "₹6.5 LPA",
      years: ["2022", "2023"],
    },
  ]

  const NavItems = () => (
    <>
      <Link href="/dashboard" className="flex items-center space-x-2 text-blue-600 bg-blue-50 px-3 py-2 rounded-lg">
        <Home className="h-5 w-5" />
        <span>Home</span>
      </Link>
      <Link
        href="/applications"
        className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 px-3 py-2 rounded-lg hover:bg-blue-50"
      >
        <FileText className="h-5 w-5" />
        <span>Your Applications</span>
      </Link>
      <Link
        href="/track"
        className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 px-3 py-2 rounded-lg hover:bg-blue-50"
      >
        <BarChart3 className="h-5 w-5" />
        <span>Track</span>
      </Link>
      <Link
        href="/feed-experience"
        className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 px-3 py-2 rounded-lg hover:bg-blue-50"
      >
        <MessageSquare className="h-5 w-5" />
        <span>Feed Experience</span>
      </Link>
      <Link
        href="/"
        className="flex items-center space-x-2 text-gray-600 hover:text-red-600 px-3 py-2 rounded-lg hover:bg-red-50"
      >
        <LogOut className="h-5 w-5" />
        <span>Logout</span>
      </Link>
    </>
  )

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="md:hidden">
                    <Menu className="h-6 w-6" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-64">
                  <div className="flex flex-col space-y-4 mt-8">
                    <NavItems />
                  </div>
                </SheetContent>
              </Sheet>
              <h1 className="text-xl font-bold text-blue-600">Placement Guide</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Avatar>
                <AvatarImage src="/placeholder.svg?height=32&width=32" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div className="hidden sm:block">
                <p className="text-sm font-medium">John Doe</p>
                <p className="text-xs text-gray-500">CE, Semester 7</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Navigation - Desktop */}
          <aside className="hidden md:block w-64 space-y-2">
            <NavItems />
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            {/* Welcome Section */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg p-6 text-white mb-8">
              <h2 className="text-2xl font-bold mb-2">Welcome back, John! 👋</h2>
              <p className="text-blue-100">Ready to explore placement opportunities? Let's find your dream company.</p>
            </div>

            {/* Search Bar */}
            <div className="relative mb-8">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input placeholder="Search companies, roles, or packages..." className="pl-10 py-3 text-lg" />
            </div>

            {/* Companies Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {companies.map((company) => (
                <Link key={company.id} href={`/company/${company.id}`}>
                  <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4 mb-4">
                        <img
                          src={company.logo || "/placeholder.svg"}
                          alt={company.name}
                          className="w-12 h-12 rounded-lg object-cover"
                        />
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg">{company.name}</h3>
                          <div className="flex items-center space-x-2 text-sm text-gray-600 mt-1">
                            <Building2 className="h-4 w-4" />
                            <span>{company.roles.join(", ")}</span>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">Avg Package</span>
                          <span className="font-semibold text-green-600">{company.avgPackage}</span>
                        </div>

                        <div className="flex flex-wrap gap-1">
                          {company.years.map((year) => (
                            <Badge key={year} variant="secondary" className="text-xs">
                              {year}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}
