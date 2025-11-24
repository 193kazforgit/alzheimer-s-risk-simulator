"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Brain, TrendingUp, TrendingDown, Activity } from "lucide-react"

// リスク要因データ
const riskFactors = [
  { id: "education", label: "低教育（教育年数12年未満・中卒）", risk: 1.6 },
  { id: "headInjury", label: "頭部外傷", risk: 1.7 },
  { id: "exercise", label: "運動不足（高負荷の運動75分未満）", risk: 1.2 },
  { id: "smoking", label: "喫煙", risk: 1.3 },
  { id: "alcohol", label: "飲酒（1日缶ビール2缶以上）", risk: 1.2 },
  { id: "hypertension", label: "高血圧（収縮期血圧130以上）", risk: 1.2 },
  { id: "obesity", label: "肥満（BMI 30以上）", risk: 1.3 },
  { id: "diabetes", label: "糖尿病", risk: 1.7 },
  { id: "hearingLoss", label: "聴力低下（良音聴力が35dB以上）", risk: 1.4 },
  { id: "depression", label: "うつ病", risk: 2.2 },
  { id: "socialIsolation", label: "社会的孤立（2項目以上該当）", risk: 1.6 },
  { id: "airPollution", label: "大気汚染（PM2.5年平均>5 μg/m³、NO2年平均>10 μg/m³）", risk: 1.1 },
  { id: "vision", label: "視力（良眼視力が0.5未満）", risk: 1.5 },
  { id: "highLDL", label: "高LDL（LDL120以上）", risk: 1.3 },
]

// 予防効果データ
const preventionFactors = [
  { id: "intellectual", label: "知的活動（読書・チェス等）", effect: 0.56 },
  { id: "elderlyObesity", label: "後期高齢者の肥満是正", effect: 0.8 },
  { id: "homocysteine", label: "高ホモシステイン血症の改善（葉酸/ビタミンB12/ビタミンB6の補充）", effect: 0.78 },
  { id: "depressionTreatment", label: "うつ病の治療", effect: 0.62 },
  { id: "stressReduction", label: "ストレス軽減", effect: 0.78 },
  { id: "diabetesTreatment", label: "糖尿病治療", effect: 0.7 },
  { id: "headInjuryPrevention", label: "頭部外傷防止", effect: 0.6 },
  { id: "midlifeHypertension", label: "中年期の高血圧治療", effect: 0.75 },
  { id: "hypotension", label: "起立性低血圧の改善", effect: 0.74 },
  { id: "midlifeObesity", label: "中年期の肥満改善", effect: 0.85 },
  { id: "elderlyWeightLoss", label: "後期高齢者の軽度減量（5%の体重減少）", effect: 0.9 },
  { id: "exercise", label: "運動", effect: 0.72 },
  { id: "smokingCessation", label: "禁煙（禁煙は数年）", effect: 0.88 },
  { id: "sleepImprovement", label: "睡眠障害の改善（6時間以上10時間未満）", effect: 0.85 },
  { id: "cerebrovascular", label: "脳血管疾患の防止（抗血小板薬・血圧・脂質管理など）", effect: 0.75 },
  { id: "frailtyPrevention", label: "フレイル防止（栄養+運動+社会参加）", effect: 0.7 },
  { id: "atrialFib", label: "心房細動の治療（抗凝固療法）", effect: 0.8 },
  { id: "vitaminC", label: "ビタミンC（抗酸化作用）", effect: 0.9 },
  { id: "shinglesVaccine", label: "帯状疱疹ワクチン", effect: 0.8 },
  { id: "alcoholReduction", label: "飲酒量の低下（缶ビール1日1缶まで）", effect: 0.8 },
  { id: "pm25Reduction", label: "PM2.5高曝露の回避（10 μg/m³低下）", effect: 0.83 },
  { id: "statinCorrection", label: "スタチンでの是正", effect: 0.64 },
  { id: "hearingAid", label: "補聴器", effect: 0.8 },
  { id: "visionCorrection", label: "視力矯正（特に白内障手術）", effect: 0.8 },
]

export default function AlzheimerSimulator() {
  const [selectedRisks, setSelectedRisks] = useState<string[]>([])
  const [selectedPreventions, setSelectedPreventions] = useState<string[]>([])

  const riskScore = selectedRisks.reduce((acc, id) => {
    const factor = riskFactors.find((f) => f.id === id)
    return acc * (factor?.risk || 1)
  }, 1)

  const preventionScore = selectedPreventions.reduce((acc, id) => {
    const factor = preventionFactors.find((f) => f.id === id)
    return acc * (factor?.effect || 1)
  }, 1)

  const combinedScore = riskScore * preventionScore

  const handleRiskToggle = (id: string) => {
    setSelectedRisks((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]))
  }

  const handlePreventionToggle = (id: string) => {
    setSelectedPreventions((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]))
  }

  const getRiskLevel = (score: number) => {
    if (score >= 3) return { label: "高リスク", color: "bg-destructive text-destructive-foreground" }
    if (score >= 2) return { label: "中リスク", color: "bg-accent text-accent-foreground" }
    if (score >= 1.5) return { label: "やや高リスク", color: "bg-secondary text-secondary-foreground" }
    return { label: "標準リスク", color: "bg-primary text-primary-foreground" }
  }

  const riskLevel = getRiskLevel(riskScore)
  const riskReduction = ((1 - preventionScore) * 100).toFixed(1)

  return (
    <div className="container mx-auto p-4 md:p-8 max-w-7xl">
      <div className="mb-8 text-center">
        <div className="inline-flex items-center justify-center gap-3 mb-4">
          <div className="p-3 bg-primary/10 rounded-xl">
            <Brain className="w-8 h-8 text-primary" />
          </div>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-3 text-balance">
          アルツハイマー型認知症
          <br />
          リスクシミュレーター
        </h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto text-pretty">
          リスク要因と予防対策を選択して、認知症リスクを評価します
        </p>
      </div>

      {/* 総合評価カード */}
      <Card className="mb-8 border-2">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Activity className="w-5 h-5" />
            <CardTitle>総合評価</CardTitle>
          </div>
          <CardDescription>選択された要因に基づく総合的なリスク評価</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <TrendingUp className="w-4 h-4" />
                <span>リスク要因</span>
              </div>
              <div className="text-3xl font-bold">{riskScore.toFixed(2)}倍</div>
              <Badge className={riskLevel.color}>{riskLevel.label}</Badge>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <TrendingDown className="w-4 h-4" />
                <span>予防効果</span>
              </div>
              <div className="text-3xl font-bold">{preventionScore.toFixed(2)}倍</div>
              <Badge className="bg-accent text-accent-foreground">{riskReduction}% 低減</Badge>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Brain className="w-4 h-4" />
                <span>総合リスク</span>
              </div>
              <div className="text-3xl font-bold">{combinedScore.toFixed(2)}倍</div>
              <Badge className={getRiskLevel(combinedScore).color}>{getRiskLevel(combinedScore).label}</Badge>
            </div>
          </div>

          {selectedRisks.length === 0 && selectedPreventions.length === 0 && (
            <Alert className="mt-6">
              <AlertDescription>リスク要因または予防対策を選択してシミュレーションを開始してください</AlertDescription>
            </Alert>
          )}

          {combinedScore > 1 && selectedPreventions.length === 0 && (
            <Alert className="mt-6">
              <AlertDescription>リスクが高まっています。予防対策タブから対策を検討してください</AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      <Tabs defaultValue="risk" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="risk" className="text-base">
            リスク評価
          </TabsTrigger>
          <TabsTrigger value="prevention" className="text-base">
            予防効果
          </TabsTrigger>
        </TabsList>

        <TabsContent value="risk" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>リスク要因</CardTitle>
              <CardDescription>該当する項目を選択してください。リスクがない場合を1として評価します</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {riskFactors.map((factor) => (
                  <div
                    key={factor.id}
                    className="flex items-start space-x-3 p-4 rounded-lg border hover:bg-muted/50 transition-colors"
                  >
                    <Checkbox
                      id={factor.id}
                      checked={selectedRisks.includes(factor.id)}
                      onCheckedChange={() => handleRiskToggle(factor.id)}
                    />
                    <div className="flex-1 space-y-1">
                      <Label htmlFor={factor.id} className="text-base font-medium leading-relaxed cursor-pointer">
                        {factor.label}
                      </Label>
                    </div>
                    <Badge variant="outline" className="ml-auto">
                      {factor.risk.toFixed(1)}倍
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="prevention" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>予防効果</CardTitle>
              <CardDescription>実施している対策を選択してください。是正しない場合を1として評価します</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {preventionFactors.map((factor) => (
                  <div
                    key={factor.id}
                    className="flex items-start space-x-3 p-4 rounded-lg border hover:bg-muted/50 transition-colors"
                  >
                    <Checkbox
                      id={factor.id}
                      checked={selectedPreventions.includes(factor.id)}
                      onCheckedChange={() => handlePreventionToggle(factor.id)}
                    />
                    <div className="flex-1 space-y-1">
                      <Label htmlFor={factor.id} className="text-base font-medium leading-relaxed cursor-pointer">
                        {factor.label}
                      </Label>
                    </div>
                    <Badge variant="outline" className="ml-auto bg-accent/10">
                      {((1 - factor.effect) * 100).toFixed(0)}% 低減
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="mt-8 text-center text-sm text-muted-foreground">
        <p className="text-pretty">
          ※ このシミュレーターは研究データに基づいていますが、医療的判断の代わりにはなりません。
          <br />
          詳細な評価や相談は医療機関にご相談ください。
        </p>
      </div>
    </div>
  )
}
