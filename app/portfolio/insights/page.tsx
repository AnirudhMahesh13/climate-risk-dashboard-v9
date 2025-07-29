"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChevronDown, ChevronUp, Building, DollarSign, TrendingDown, AlertTriangle } from "lucide-react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

export default function PortfolioInsightsPage() {
  const [isExpanded, setIsExpanded] = useState(false)

  // Mock data for the main chart
  const canadaRiskData = [
    {
      name: "Canada",
      high: 450,
      medium: 320,
      low: 180,
    },
  ]

  // Mock data for regional breakdown
  const regionalData = [
    {
      region: "Ontario",
      high: 180,
      medium: 140,
      low: 80,
      avgNOILoss: "12.5%",
      highRiskValue: "$180M",
      lendingOpportunity: "$45M",
    },
    {
      region: "British Columbia",
      high: 150,
      medium: 110,
      low: 60,
      avgNOILoss: "10.8%",
      highRiskValue: "$150M",
      lendingOpportunity: "$38M",
    },
    {
      region: "Quebec",
      high: 120,
      medium: 70,
      low: 40,
      avgNOILoss: "8.2%",
      highRiskValue: "$120M",
      lendingOpportunity: "$30M",
    },
  ]

  const keyInsights = [
    "Fossil fuel heating systems drive 68% of high-risk properties",
    "Properties built before 2010 show 3x higher transition risk",
    "Office buildings in Toronto represent largest exposure concentration",
    "Energy retrofits could reduce portfolio risk by 35%",
  ]

  const colors = {
    high: "#ef4444",
    medium: "#f59e0b",
    low: "#10b981",
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2" style={{ color: "#112A43" }}>
            Portfolio Key Insights
          </h1>
          <p className="text-gray-600">
            Comprehensive climate risk analysis across your Canadian commercial real estate portfolio
          </p>
        </div>

        {/* Top Statistics Cards */}
        <div className="grid grid-cols-4 gap-6 mb-8">
          <Card className="rounded-2xl shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Properties</p>
                  <p className="text-3xl font-bold" style={{ color: "#2B6CA9" }}>
                    1,247
                  </p>
                </div>
                <Building className="w-8 h-8" style={{ color: "#66DCCC" }} />
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-2xl shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Loan Value</p>
                  <p className="text-3xl font-bold text-green-600">$2.8B</p>
                </div>
                <DollarSign className="w-8 h-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-2xl shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">NOI Loss</p>
                  <p className="text-3xl font-bold text-red-600">-8.7%</p>
                </div>
                <TrendingDown className="w-8 h-8 text-red-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-2xl shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Change to PD</p>
                  <p className="text-3xl font-bold text-orange-600">+2.3%</p>
                </div>
                <AlertTriangle className="w-8 h-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Analysis Card */}
        <Card className="rounded-2xl shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle style={{ color: "#112A43" }}>Climate Risk Analysis - Canada</CardTitle>
            <Button variant="outline" onClick={() => setIsExpanded(!isExpanded)} className="rounded-full">
              {isExpanded ? (
                <>
                  <ChevronUp className="w-4 h-4 mr-2" />
                  Collapse
                </>
              ) : (
                <>
                  <ChevronDown className="w-4 h-4 mr-2" />
                  Expand Regional View
                </>
              )}
            </Button>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-3 gap-6">
              {/* Main Chart */}
              <div className="col-span-2">
                <Card className="rounded-xl shadow-md">
                  <CardHeader>
                    <CardTitle className="text-lg">Risk Distribution by Loan Value ($M)</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={canadaRiskData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip
                          formatter={(value, name) => [
                            `$${value}M`,
                            name.charAt(0).toUpperCase() + name.slice(1) + " Risk",
                          ]}
                        />
                        <Bar dataKey="high" stackId="a" fill={colors.high} />
                        <Bar dataKey="medium" stackId="a" fill={colors.medium} />
                        <Bar dataKey="low" stackId="a" fill={colors.low} />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>

              {/* Key Insights */}
              <div>
                <Card className="rounded-xl shadow-md h-full">
                  <CardHeader>
                    <CardTitle className="text-lg">Key Risk Drivers</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {keyInsights.map((insight, index) => (
                        <div key={index} className="flex items-start gap-3">
                          <div
                            className="w-2 h-2 rounded-full mt-2 flex-shrink-0"
                            style={{ backgroundColor: "#66DCCC" }}
                          />
                          <p className="text-sm text-gray-700">{insight}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Bottom Cards */}
            <div className="grid grid-cols-2 gap-6 mt-6">
              <Card className="rounded-xl shadow-md" style={{ backgroundColor: "#fef2f2", borderColor: "#fecaca" }}>
                <CardContent className="p-6 text-center">
                  <h3 className="text-lg font-semibold text-red-700 mb-2">High Risk Loans</h3>
                  <p className="text-3xl font-bold text-red-600">$450M</p>
                  <p className="text-sm text-red-600 mt-1">36% of total portfolio value</p>
                </CardContent>
              </Card>

              <Card className="rounded-xl shadow-md" style={{ backgroundColor: "#f0fdf4", borderColor: "#bbf7d0" }}>
                <CardContent className="p-6 text-center">
                  <h3 className="text-lg font-semibold text-green-700 mb-2">Lending Opportunities</h3>
                  <p className="text-3xl font-bold text-green-600">$113M</p>
                  <p className="text-sm text-green-600 mt-1">Green retrofit financing potential</p>
                </CardContent>
              </Card>
            </div>

            {/* Expanded Regional View */}
            {isExpanded && (
              <div className="mt-8 pt-6 border-t border-gray-200">
                <h3 className="text-xl font-bold mb-6" style={{ color: "#112A43" }}>
                  Regional Risk Breakdown
                </h3>
                <div className="grid grid-cols-3 gap-6">
                  {regionalData.map((region, index) => (
                    <div key={index} className="space-y-4">
                      <Card className="rounded-xl shadow-md">
                        <CardHeader>
                          <CardTitle className="text-lg">{region.region}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <ResponsiveContainer width="100%" height={200}>
                            <BarChart data={[region]} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                              <CartesianGrid strokeDasharray="3 3" />
                              <XAxis dataKey="region" />
                              <YAxis />
                              <Tooltip
                                formatter={(value, name) => [
                                  `$${value}M`,
                                  name.charAt(0).toUpperCase() + name.slice(1) + " Risk",
                                ]}
                              />
                              <Bar dataKey="high" stackId="a" fill={colors.high} />
                              <Bar dataKey="medium" stackId="a" fill={colors.medium} />
                              <Bar dataKey="low" stackId="a" fill={colors.low} />
                            </BarChart>
                          </ResponsiveContainer>
                        </CardContent>
                      </Card>

                      {/* Regional Metrics */}
                      <div className="grid grid-cols-1 gap-3">
                        <Card className="rounded-lg shadow-sm">
                          <CardContent className="p-4 text-center">
                            <p className="text-sm text-gray-600">Avg NOI Loss</p>
                            <p className="text-xl font-bold text-red-600">{region.avgNOILoss}</p>
                          </CardContent>
                        </Card>

                        <Card className="rounded-lg shadow-sm">
                          <CardContent className="p-4 text-center">
                            <p className="text-sm text-gray-600">High Risk Value</p>
                            <p className="text-xl font-bold text-red-600">{region.highRiskValue}</p>
                          </CardContent>
                        </Card>

                        <Card className="rounded-lg shadow-sm">
                          <CardContent className="p-4 text-center">
                            <p className="text-sm text-gray-600">Lending Opportunity</p>
                            <p className="text-xl font-bold text-green-600">{region.lendingOpportunity}</p>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
