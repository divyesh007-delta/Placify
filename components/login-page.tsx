import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { GraduationCap, Mail } from "lucide-react"
import Link from "next/link"

export function LoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="bg-blue-600 p-3 rounded-full">
              <GraduationCap className="h-8 w-8 text-white" />
            </div>
          </div>
          <div>
            <CardTitle className="text-2xl font-bold text-gray-900">Placement Guide</CardTitle>
            <CardDescription className="text-gray-600 mt-2">Your gateway to placement success</CardDescription>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center text-sm text-gray-600">
            Sign in with your college email to access placement experiences and resources
          </div>
          <Link href="/user-details" className="block">
            <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3" size="lg">
              <Mail className="mr-2 h-5 w-5" />
              Sign in with Google
            </Button>
          </Link>
          <div className="text-xs text-center text-gray-500">
            Only college emails (@bvmengineering.ac.in) are accepted
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
