"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Download, FileText, TrendingUp, AlertTriangle, DollarSign, Zap } from "lucide-react"
import { Stepper } from "@/components/stepper"
import { ScenarioModal } from "@/components/scenario-modal"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts"

export default function AssetAnalysisPage() {
  const [selectedScenario, setSelectedScenario] = useState("current")
  const [showScenarioModal, setShowScenarioModal] = useState(false)

  // Mock data for charts
  const riskProjectionData = [
    { year: 2024, current: 6.8, optimistic: 6.8, pessimistic: 6.8 },
    { year: 2025, current: 7.2, optimistic: 6.9, pessimistic: 7.8 },
    { year: 2026, current: 7.6, optimistic: 7.1, pessimistic: 8.4 },
    { year: 2027, current: 8.0, optimistic: 7.3, pessimistic: 8.9 },
    { year: 2028, current: 8.4, optimistic: 7.5, pessimistic: 9.3 },
    { year: 2029, current: 8.8, optimistic: 7.7, pessimistic: 9.6 },
    { year: 2030, current: 9.1, optimistic: 7.9, pessimistic: 9.8 },
  ]

  const financialImpactData = [
    { metric: "NOI", current: 12800, projected: 11520 },
    { metric: "Property Value", current: 125000, projected: 118750 },
    { metric: "DSCR", current: 1.85, projected: 1.67 },
    { metric: "LTV", current: 72.5, projected: 76.2 },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-6 py-8">
        <Stepper steps={["Search", "Details", "Analysis"]} currentStep={2} type="asset" />

        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-2" style={{ color: "#112A43" }}>
                Asset View
              </h1>
              <p className="text-gray-600">432 Park Avenue, New York, NY - Climate Risk Analysis</p>
            </div>
            <div className="flex gap-4">
              <Button
                variant="outline"
                className="rounded-full px-6 py-3 font-semibold shadow-md hover:shadow-lg bg-white"
              >
                <Download className="w-4 h-4 mr-2" />
                Export CSV Data
              </Button>
              <Button
                variant="outline"
                className="rounded-full px-6 py-3 font-semibold shadow-md hover:shadow-lg bg-white"
              >
                <FileText className="w-4 h-4 mr-2" />
                Export PDF Report
              </Button>
            </div>
          </div>

          {/* Key Metrics Cards */}
          <div className="grid grid-cols-4 gap-6 mb-8">
            <Card className="rounded-2xl shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Current Risk Score</p>
                    <p className="text-3xl font-bold text-orange-600">6.8/10</p>
                  </div>
                  <AlertTriangle className="w-8 h-8 text-orange-500" />
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-2xl shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Property Value</p>
                    <p className="text-3xl font-bold text-green-600">$125M</p>
                  </div>
                  <DollarSign className="w-8 h-8 text-green-500" />
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-2xl shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Projected Risk (2030)</p>
                    <p className="text-3xl font-bold text-red-600">9.1/10</p>
                  </div>
                  <TrendingUp className="w-8 h-8 text-red-500" />
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-2xl shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Energy Source</p>
                    <p className="text-3xl font-bold" style={{ color: "#2B6CA9" }}>
                      Fossil Fuel
                    </p>
                  </div>
                  <Zap className="w-8 h-8" style={{ color: "#66DCCC" }} />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Scenario Selector */}
          <Card className="mb-8 rounded-2xl shadow-lg">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle style={{ color: "#112A43" }}>Climate Scenario Analysis</CardTitle>
                <Button
                  onClick={() => setShowScenarioModal(true)}
                  className="rounded-full"
                  style={{ backgroundColor: "#66DCCC", color: "#112A43" }}
                >
                  Customize Scenarios
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Select value={selectedScenario} onValueChange={setSelectedScenario}>
                <SelectTrigger className="w-full rounded-full h-12">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="current">Current Policy Scenario</SelectItem>
                  <SelectItem value="optimistic">Net Zero by 2050 (Optimistic)</SelectItem>
                  <SelectItem value="pessimistic">Delayed Transition (Pessimistic)</SelectItem>
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          {/* Analysis Tabs */}
          <Tabs defaultValue="risk-projection" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3 rounded-full p-1 bg-gray-100">
              <TabsTrigger value="risk-projection" className="rounded-full">
                Risk Projection
              </TabsTrigger>
              <TabsTrigger value="financial-impact" className="rounded-full">
                Financial Impact
              </TabsTrigger>
              <TabsTrigger value="recommendations" className="rounded-full">
                Recommendations
              </TabsTrigger>
            </TabsList>

            <TabsContent value="risk-projection">
              <Card className="rounded-2xl shadow-lg">
                <CardHeader>
                  <CardTitle style={{ color: "#112A43" }}>Climate Risk Projection (2024-2030)</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={400}>
                    <LineChart data={riskProjectionData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="year" />
                      <YAxis domain={[0, 10]} />
                      <Tooltip />
                      <Line type="monotone" dataKey="current" stroke="#f59e0b" strokeWidth={3} name="Current Policy" />
                      <Line
                        type="monotone"
                        dataKey="optimistic"
                        stroke="#10b981"
                        strokeWidth={2}
                        strokeDasharray="5 5"
                        name="Net Zero 2050"
                      />
                      <Line
                        type="monotone"
                        dataKey="pessimistic"
                        stroke="#ef4444"
                        strokeWidth={2}
                        strokeDasharray="5 5"
                        name="Delayed Transition"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="financial-impact">
              <Card className="rounded-2xl shadow-lg">
                <CardHeader>
                  <CardTitle style={{ color: "#112A43" }}>Financial Impact Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={400}>
                    <BarChart data={financialImpactData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="metric" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="current" fill="#2B6CA9" name="Current" />
                      <Bar dataKey="projected" fill="#66DCCC" name="2030 Projection" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="recommendations">
              <div className="grid grid-cols-2 gap-6">
                <Card className="rounded-2xl shadow-lg">
                  <CardHeader>
                    <CardTitle style={{ color: "#112A43" }}>Risk Mitigation Strategies</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="p-4 rounded-lg bg-green-50 border border-green-200">
                      <h4 className="font-semibold text-green-800 mb-2">Energy System Upgrade</h4>
                      <p className="text-sm text-green-700">
                        Convert from fossil fuel to electric heating system. Estimated cost: $2.1M, Risk reduction: 35%
                      </p>
                    </div>
                    <div className="p-4 rounded-lg bg-blue-50 border border-blue-200">
                      <h4 className="font-semibold text-blue-800 mb-2">Building Envelope Improvements</h4>
                      <p className="text-sm text-blue-700">
                        Upgrade insulation and windows to improve energy efficiency. Estimated cost: $850K, Risk
                        reduction: 20%
                      </p>
                    </div>
                    <div className="p-4 rounded-lg bg-purple-50 border border-purple-200">
                      <h4 className="font-semibold text-purple-800 mb-2">Green Certification</h4>
                      <p className="text-sm text-purple-700">
                        Pursue LEED Platinum certification to enhance market positioning. Estimated cost: $150K, Risk
                        reduction: 15%
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="rounded-2xl shadow-lg">
                  <CardHeader>
                    <CardTitle style={{ color: "#112A43" }}>Investment Opportunities</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="p-4 rounded-lg bg-yellow-50 border border-yellow-200">
                      <h4 className="font-semibold text-yellow-800 mb-2">Solar Panel Installation</h4>
                      <p className="text-sm text-yellow-700">
                        Install rooftop solar panels for renewable energy generation. ROI: 12%, Payback: 8 years
                      </p>
                    </div>
                    <div className="p-4 rounded-lg bg-indigo-50 border border-indigo-200">
                      <h4 className="font-semibold text-indigo-800 mb-2">Smart Building Technology</h4>
                      <p className="text-sm text-indigo-700">
                        Implement IoT sensors and automated systems for energy optimization. ROI: 18%, Payback: 5 years
                      </p>
                    </div>
                    <div className="p-4 rounded-lg bg-teal-50 border border-teal-200">
                      <h4 className="font-semibold text-teal-800 mb-2">Water Conservation Systems</h4>
                      <p className="text-sm text-teal-700">
                        Install rainwater harvesting and greywater recycling systems. ROI: 8%, Payback: 12 years
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <ScenarioModal isOpen={showScenarioModal} onClose={() => setShowScenarioModal(false)} />
      </div>
    </div>
  )
}
