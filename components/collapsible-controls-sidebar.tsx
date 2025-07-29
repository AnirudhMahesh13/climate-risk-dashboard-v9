"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { ChevronLeft, ChevronRight, HelpCircle } from "lucide-react"
import { ScenarioModal, type CustomScenario } from "./scenario-modal"

interface CollapsibleControlsSidebarProps {
  onScenarioChange: (scenario: string, customData?: CustomScenario) => void
  onPaymentChange: (method: "upfront" | "loan", loanCoverage?: number, loanTerm?: number, interestRate?: number) => void
}

export function CollapsibleControlsSidebar({ onScenarioChange, onPaymentChange }: CollapsibleControlsSidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [scenario, setScenario] = useState("baseline")
  const [locationAdjustment, setLocationAdjustment] = useState("moderate")
  const [paymentMethod, setPaymentMethod] = useState<"upfront" | "loan">("upfront")
  const [loanCoverage, setLoanCoverage] = useState([75])
  const [loanTerm, setLoanTerm] = useState([25])
  const [interestRate, setInterestRate] = useState([5.5])
  const [showScenarioModal, setShowScenarioModal] = useState(false)
  const [retrofitChoices, setRetrofitChoices] = useState({
    windows: false,
    cooling: false,
    lighting: false,
    solar: false,
  })

  const handleScenarioChange = (newScenario: string) => {
    setScenario(newScenario)
    if (newScenario === "custom") {
      setShowScenarioModal(true)
    } else {
      onScenarioChange(newScenario)
    }
  }

  const handleCustomScenario = (customData: CustomScenario) => {
    onScenarioChange(`custom-${Date.now()}`, customData)
    setShowScenarioModal(false)
  }

  const handlePaymentMethodChange = (method: "upfront" | "loan") => {
    setPaymentMethod(method)
    if (method === "loan") {
      onPaymentChange(method, loanCoverage[0], loanTerm[0], interestRate[0])
    } else {
      onPaymentChange(method)
    }
  }

  const handleLoanParameterChange = () => {
    if (paymentMethod === "loan") {
      onPaymentChange(paymentMethod, loanCoverage[0], loanTerm[0], interestRate[0])
    }
  }

  const handleRetrofitChoice = (choice: keyof typeof retrofitChoices) => {
    setRetrofitChoices((prev) => ({
      ...prev,
      [choice]: !prev[choice],
    }))
  }

  return (
    <>
      <div
        className={`fixed top-0 left-0 h-full bg-white shadow-lg transition-all duration-300 z-50 ${
          isCollapsed ? "w-12" : "w-80"
        }`}
      >
        {/* Toggle Button */}
        <Button
          variant="ghost"
          size="sm"
          className="absolute -right-10 top-4 bg-white shadow-md rounded-r-lg"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </Button>

        {!isCollapsed && (
          <div className="p-6 space-y-6 h-full overflow-y-auto">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-2" style={{ color: "#112A43" }}>
                Analysis Controls
              </h2>
              <p className="text-sm text-gray-600">Adjust scenario and payment parameters</p>
            </div>

            {/* Climate Scenario */}
            <Card className="rounded-2xl shadow-md">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg" style={{ color: "#112A43" }}>
                  Transition Scenario
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Scenario</label>
                  <Select value={scenario} onValueChange={handleScenarioChange}>
                    <SelectTrigger className="rounded-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="baseline">Baseline</SelectItem>
                      <SelectItem value="2-degree-delayed">2 Degree Delayed</SelectItem>
                      <SelectItem value="2-degree-immediate">2 Degree Immediate</SelectItem>
                      <SelectItem value="custom">Custom Scenario</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <label className="text-sm font-medium">Location Adjustment</label>
                    <Popover>
                      <PopoverTrigger>
                        <HelpCircle className="w-4 h-4 text-gray-400 hover:text-gray-600" />
                      </PopoverTrigger>
                      <PopoverContent className="w-80">
                        <p className="text-sm">
                          Adjusts climate risk projections based on local geographic factors and regional climate
                          patterns. Mild: Conservative regional adjustments. Moderate: Standard regional factors.
                          Aggressive: Enhanced regional climate sensitivity.
                        </p>
                      </PopoverContent>
                    </Popover>
                  </div>
                  <Select value={locationAdjustment} onValueChange={setLocationAdjustment}>
                    <SelectTrigger className="rounded-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mild">Mild</SelectItem>
                      <SelectItem value="moderate">Moderate</SelectItem>
                      <SelectItem value="aggressive">Aggressive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Payment Structure */}
            <Card className="rounded-2xl shadow-md">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg" style={{ color: "#112A43" }}>
                  Payment Structure
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Payment Method</label>
                  <Select value={paymentMethod} onValueChange={handlePaymentMethodChange}>
                    <SelectTrigger className="rounded-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="upfront">Pay Upfront</SelectItem>
                      <SelectItem value="loan">Finance with Loan</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {paymentMethod === "loan" && (
                  <div className="space-y-4 pt-2 border-t">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Loan Coverage: {loanCoverage[0]}%</label>
                      <Slider
                        value={loanCoverage}
                        onValueChange={(value) => {
                          setLoanCoverage(value)
                          handleLoanParameterChange()
                        }}
                        max={100}
                        min={50}
                        step={5}
                        className="w-full"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Loan Term: {loanTerm[0]} years</label>
                      <Slider
                        value={loanTerm}
                        onValueChange={(value) => {
                          setLoanTerm(value)
                          handleLoanParameterChange()
                        }}
                        max={30}
                        min={10}
                        step={5}
                        className="w-full"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Interest Rate: {interestRate[0]}%</label>
                      <Slider
                        value={interestRate}
                        onValueChange={(value) => {
                          setInterestRate(value)
                          handleLoanParameterChange()
                        }}
                        max={8}
                        min={3}
                        step={0.1}
                        className="w-full"
                      />
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Retrofit Choices */}
            <Card className="rounded-2xl shadow-md">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg" style={{ color: "#112A43" }}>
                  Retrofit Choices
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="windows"
                    checked={retrofitChoices.windows}
                    onCheckedChange={() => handleRetrofitChoice("windows")}
                  />
                  <label htmlFor="windows" className="text-sm cursor-pointer">
                    Upgrade windows & insulation
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="cooling"
                    checked={retrofitChoices.cooling}
                    onCheckedChange={() => handleRetrofitChoice("cooling")}
                  />
                  <label htmlFor="cooling" className="text-sm cursor-pointer">
                    Upgrade cooling & heating
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="lighting"
                    checked={retrofitChoices.lighting}
                    onCheckedChange={() => handleRetrofitChoice("lighting")}
                  />
                  <label htmlFor="lighting" className="text-sm cursor-pointer">
                    Upgrade lighting & energy management
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="solar"
                    checked={retrofitChoices.solar}
                    onCheckedChange={() => handleRetrofitChoice("solar")}
                  />
                  <label htmlFor="solar" className="text-sm cursor-pointer">
                    Install solar panels
                  </label>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      <ScenarioModal
        isOpen={showScenarioModal}
        onClose={() => setShowScenarioModal(false)}
        onSave={handleCustomScenario}
      />
    </>
  )
}
