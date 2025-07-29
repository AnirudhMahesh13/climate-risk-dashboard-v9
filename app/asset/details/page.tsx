"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowRight, MapPin, Calendar, Ruler, Zap, Award, DollarSign, TrendingUp, Building } from "lucide-react"
import { Stepper } from "@/components/stepper"
import {
  mockProperties,
  formatCurrency,
  formatSquareFootage,
  getRiskColor,
  getCertificationLabel,
} from "@/lib/mock-data"

export default function AssetDetailsPage() {
  const [selectedAsset, setSelectedAsset] = useState(mockProperties[0])

  const handleAssetChange = (assetId: string) => {
    const asset = mockProperties.find((p) => p.id === Number.parseInt(assetId))
    if (asset) {
      setSelectedAsset(asset)
    }
  }

  const riskColor = getRiskColor(selectedAsset.riskLevel)

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-6 py-8">
        <Stepper steps={["Search", "Details", "Analysis"]} currentStep={1} type="asset" />

        <div className="max-w-7xl mx-auto">
          {/* Asset Selector */}
          <Card className="mb-8 rounded-2xl shadow-lg">
            <CardHeader>
              <CardTitle style={{ color: "#112A43" }}>Select Asset for Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <Select value={selectedAsset.id.toString()} onValueChange={handleAssetChange}>
                <SelectTrigger className="w-full rounded-full h-12">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {mockProperties.map((property) => (
                    <SelectItem key={property.id} value={property.id.toString()}>
                      {property.address}, {property.city} - {formatCurrency(property.value)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          <div className="grid grid-cols-3 gap-8">
            {/* Left Column - Asset Details */}
            <div className="col-span-2 space-y-6">
              {/* Property Overview */}
              <Card className="rounded-2xl shadow-lg">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle style={{ color: "#112A43" }}>Property Overview</CardTitle>
                    <Badge
                      className="px-4 py-2 text-sm font-bold rounded-full"
                      style={{ backgroundColor: riskColor.bg, color: riskColor.text }}
                    >
                      {selectedAsset.riskLevel.toUpperCase()} RISK
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <MapPin className="w-5 h-5 text-gray-500" />
                        <div>
                          <p className="font-semibold">{selectedAsset.address}</p>
                          <p className="text-gray-600">
                            {selectedAsset.city}, {selectedAsset.state}, {selectedAsset.country}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <Building className="w-5 h-5 text-gray-500" />
                        <div>
                          <p className="font-semibold">Property Type</p>
                          <p className="text-gray-600">{selectedAsset.type}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <Calendar className="w-5 h-5 text-gray-500" />
                        <div>
                          <p className="font-semibold">Year Built</p>
                          <p className="text-gray-600">{selectedAsset.yearBuilt}</p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <DollarSign className="w-5 h-5 text-gray-500" />
                        <div>
                          <p className="font-semibold">Property Value</p>
                          <p className="text-gray-600">{formatCurrency(selectedAsset.value)}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <Ruler className="w-5 h-5 text-gray-500" />
                        <div>
                          <p className="font-semibold">Size</p>
                          <p className="text-gray-600">{formatSquareFootage(selectedAsset.size)}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <TrendingUp className="w-5 h-5 text-gray-500" />
                        <div>
                          <p className="font-semibold">Risk Score</p>
                          <p className="text-gray-600">{selectedAsset.riskScore}/10</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Energy & Sustainability */}
              <Card className="rounded-2xl shadow-lg">
                <CardHeader>
                  <CardTitle style={{ color: "#112A43" }}>Energy & Sustainability</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="flex items-center gap-3">
                      <Zap className="w-5 h-5 text-gray-500" />
                      <div>
                        <p className="font-semibold">Heat Source</p>
                        <p className="text-gray-600">{selectedAsset.heatSource}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <Award className="w-5 h-5 text-gray-500" />
                      <div>
                        <p className="font-semibold">Green Certifications</p>
                        <p className="text-gray-600">{getCertificationLabel(selectedAsset.greenCertifications)}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Financial Metrics */}
              <Card className="rounded-2xl shadow-lg">
                <CardHeader>
                  <CardTitle style={{ color: "#112A43" }}>Financial Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <p className="font-semibold text-gray-700">TTM Revenue</p>
                        <p className="text-2xl font-bold text-green-600">{formatCurrency(selectedAsset.ttmRevenue)}</p>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-700">Net Operating Income</p>
                        <p className="text-2xl font-bold text-blue-600">
                          {formatCurrency(selectedAsset.netOperatingIncome)}
                        </p>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <p className="font-semibold text-gray-700">Operating Expenses</p>
                        <p className="text-2xl font-bold text-red-600">
                          {formatCurrency(selectedAsset.operatingExpenses)}
                        </p>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-700">Annual Debt Payment</p>
                        <p className="text-2xl font-bold text-orange-600">
                          {formatCurrency(selectedAsset.annualDebtPayment)}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Risk Summary & Actions */}
            <div className="space-y-6">
              {/* Risk Summary */}
              <Card className="rounded-2xl shadow-lg">
                <CardHeader>
                  <CardTitle style={{ color: "#112A43" }}>Risk Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <div
                      className="w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center text-2xl font-bold"
                      style={{ backgroundColor: riskColor.bg, color: riskColor.text }}
                    >
                      {selectedAsset.riskScore}
                    </div>
                    <p className="text-lg font-semibold" style={{ color: "#112A43" }}>
                      {selectedAsset.riskLevel.charAt(0).toUpperCase() + selectedAsset.riskLevel.slice(1)} Risk
                    </p>
                    <p className="text-sm text-gray-600">Climate Transition Risk Score</p>
                  </div>

                  <div className="space-y-3 pt-4 border-t border-gray-200">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium text-gray-700">LTV Ratio</span>
                      <span className="text-sm font-bold">{selectedAsset.ltv.toFixed(1)}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm font-medium text-gray-700">DSCR</span>
                      <span className="text-sm font-bold">{selectedAsset.dscr.toFixed(2)}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Client Information */}
              <Card className="rounded-2xl shadow-lg">
                <CardHeader>
                  <CardTitle style={{ color: "#112A43" }}>Client Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="font-semibold text-lg">{selectedAsset.clientName}</p>
                  <p className="text-sm text-gray-600 mt-1">Property Owner</p>
                </CardContent>
              </Card>

              {/* Action Button */}
              <Link href="/asset/analysis" className="block">
                <Button
                  className="w-full rounded-full py-4 text-lg font-bold text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                  style={{ backgroundColor: "#2B6CA9" }}
                >
                  Proceed to Risk Analysis
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
