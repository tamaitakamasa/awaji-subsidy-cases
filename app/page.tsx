"use client"

import { useState, useMemo } from "react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, Building2, MapPin, Calendar } from "lucide-react"
import subsidyData from "@/data/awaji_subsidy_cases.json"
import type { SubsidyCase, SubsidyData } from "@/types/subsidy"

const data = subsidyData as SubsidyData

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCity, setSelectedCity] = useState("all")
  const [selectedIndustry, setSelectedIndustry] = useState("all")
  const [selectedRound, setSelectedRound] = useState("all")

  // 市、業種、公募回のリストを生成
  const cities = useMemo(() => {
    const uniqueCities = Array.from(new Set(data.cases.map(c => c.city))).sort()
    return uniqueCities
  }, [])

  const industries = useMemo(() => {
    const uniqueIndustries = Array.from(new Set(data.cases.map(c => c.industry))).sort()
    return uniqueIndustries
  }, [])

  const rounds = useMemo(() => {
    const uniqueRounds = Array.from(new Set(data.cases.map(c => c.round))).sort((a, b) => a - b)
    return uniqueRounds
  }, [])

  // フィルタリング処理
  const filteredCases = useMemo(() => {
    return data.cases.filter(caseItem => {
      const matchesSearch = searchTerm === "" || 
        caseItem.company_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        caseItem.business_description.toLowerCase().includes(searchTerm.toLowerCase())
      
      const matchesCity = selectedCity === "all" || caseItem.city === selectedCity
      const matchesIndustry = selectedIndustry === "all" || caseItem.industry === selectedIndustry
      const matchesRound = selectedRound === "all" || caseItem.round === Number(selectedRound)
      
      return matchesSearch && matchesCity && matchesIndustry && matchesRound
    })
  }, [searchTerm, selectedCity, selectedIndustry, selectedRound])

  // 統計情報
  const statistics = useMemo(() => {
    const stats = {
      byCity: {} as Record<string, number>,
      byIndustry: {} as Record<string, number>,
      byRound: {} as Record<number, number>
    }
    
    filteredCases.forEach(caseItem => {
      stats.byCity[caseItem.city] = (stats.byCity[caseItem.city] || 0) + 1
      stats.byIndustry[caseItem.industry] = (stats.byIndustry[caseItem.industry] || 0) + 1
      stats.byRound[caseItem.round] = (stats.byRound[caseItem.round] || 0) + 1
    })
    
    return stats
  }, [filteredCases])

  return (
    <div className="container mx-auto p-4 space-y-6 max-w-7xl">
      {/* ヘッダー */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">{data.title}</h1>
        <p className="text-muted-foreground">
          {data.description} | 最終更新: {data.last_updated}
        </p>
      </div>

      {/* 統計カード */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">総採択件数</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{filteredCases.length}件</p>
            <p className="text-sm text-muted-foreground">
              （全{data.total_cases}件中）
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">市別件数</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-1">
              {Object.entries(statistics.byCity)
                .sort(([,a], [,b]) => b - a)
                .slice(0, 3)
                .map(([city, count]) => (
                  <div key={city} className="flex justify-between text-sm">
                    <span>{city}</span>
                    <span className="font-semibold">{count}件</span>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">業種別TOP3</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-1">
              {Object.entries(statistics.byIndustry)
                .sort(([,a], [,b]) => b - a)
                .slice(0, 3)
                .map(([industry, count]) => (
                  <div key={industry} className="flex justify-between text-sm">
                    <span className="truncate max-w-[150px]">{industry}</span>
                    <span className="font-semibold">{count}件</span>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* フィルター */}
      <Card>
        <CardHeader>
          <CardTitle>検索・フィルター</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="企業名・事業内容で検索"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={selectedCity} onValueChange={setSelectedCity}>
              <SelectTrigger>
                <MapPin className="h-4 w-4 mr-2" />
                <SelectValue placeholder="市を選択" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">すべての市</SelectItem>
                {cities.map(city => (
                  <SelectItem key={city} value={city}>{city}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select value={selectedIndustry} onValueChange={setSelectedIndustry}>
              <SelectTrigger>
                <Building2 className="h-4 w-4 mr-2" />
                <SelectValue placeholder="業種を選択" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">すべての業種</SelectItem>
                {industries.map(industry => (
                  <SelectItem key={industry} value={industry}>{industry}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select value={selectedRound} onValueChange={setSelectedRound}>
              <SelectTrigger>
                <Calendar className="h-4 w-4 mr-2" />
                <SelectValue placeholder="公募回を選択" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">すべての公募回</SelectItem>
                {rounds.map(round => (
                  <SelectItem key={round} value={round.toString()}>
                    第{round}回公募
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* データテーブル */}
      <Card>
        <CardHeader>
          <CardTitle>採択事例一覧</CardTitle>
          <CardDescription>
            検索結果: {filteredCases.length}件
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="min-w-[50px]">公募回</TableHead>
                  <TableHead className="min-w-[150px]">企業名</TableHead>
                  <TableHead className="min-w-[80px]">所在市</TableHead>
                  <TableHead className="min-w-[120px]">業種</TableHead>
                  <TableHead className="min-w-[300px]">事業内容</TableHead>
                  <TableHead className="min-w-[100px]">申請区分</TableHead>
                  <TableHead className="min-w-[120px]">特記事項</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCases.map((caseItem, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <Badge variant="outline">第{caseItem.round}回</Badge>
                    </TableCell>
                    <TableCell className="font-medium">{caseItem.company_name}</TableCell>
                    <TableCell>{caseItem.city}</TableCell>
                    <TableCell>{caseItem.industry}</TableCell>
                    <TableCell className="max-w-md">
                      <p className="line-clamp-2">{caseItem.business_description}</p>
                    </TableCell>
                    <TableCell>
                      <Badge variant={caseItem.application_category === "不明" ? "secondary" : "default"}>
                        {caseItem.application_category}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {caseItem.notes.map((note, i) => (
                          <Badge key={i} variant="outline" className="text-xs">
                            {note}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}