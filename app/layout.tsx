import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "淡路島事業再構築補助金採択事例",
  description: "淡路島における事業再構築補助金の採択事例を検索・閲覧できるWebアプリケーション",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  )
}