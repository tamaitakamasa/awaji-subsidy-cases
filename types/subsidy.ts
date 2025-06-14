export interface SubsidyCase {
  round: number
  announcement_date: string
  company_name: string
  city: string
  industry: string
  business_description: string
  application_category: string
  notes: string[]
}

export interface SubsidyData {
  title: string
  description: string
  source: string
  last_updated: string
  total_cases: number
  cases: SubsidyCase[]
}