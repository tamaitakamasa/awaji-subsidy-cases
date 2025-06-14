import json
import re
from typing import List, Dict, Optional

def parse_subsidy_cases(text: str) -> List[Dict]:
    """淡路島事業再構築補助金採択事例をパースしてJSON形式に変換"""
    cases = []
    lines = text.strip().split('\n')
    
    # 公募回情報を保持
    current_round = None
    current_date = None
    
    for line in lines:
        line = line.strip()
        if not line:
            continue
            
        # 公募回の検出パターン
        round_match = re.match(r'\*\*第(\d+)回公募（(\d{4})年(\d+)月.*）\*\*', line)
        if round_match:
            current_round = int(round_match.group(1))
            current_date = f"{round_match.group(2)}年{round_match.group(3)}月"
            continue
        
        # 企業情報の検出パターン
        company_match = re.match(r'•\s+(.+?)（(.+?)）\s+[–-]\s+(.+?)。(.+?)$', line)
        if company_match and current_round:
            company_name = company_match.group(1).strip()
            location = company_match.group(2).strip()
            industry = company_match.group(3).strip()
            description = company_match.group(4).strip()
            
            # 申請区分の抽出
            category = None
            if "通常枠" in description:
                category = "通常枠"
            elif "最低賃金枠" in description:
                category = "最低賃金枠"
            elif "卒業枠" in description:
                category = "卒業枠"
            elif "グローバルV字回復枠" in description:
                category = "グローバルV字回復枠"
            elif "大規模賃金引上枠" in description:
                category = "大規模賃金引上枠"
            elif "緊急事態宣言特別枠" in description:
                category = "緊急事態宣言特別枠"
                
            # 特記事項の抽出
            notes = []
            if "連携" in description:
                notes.append("連携採択案件")
            if "第" in description and "回採択" in description:
                notes.append("既出案件")
            if "環境" in description or "エコ" in description:
                notes.append("環境対応型")
            if "DX" in description or "ICT" in description or "IoT" in description:
                notes.append("DX・デジタル化")
            if "地域課題" in description:
                notes.append("地域課題解決型")
            if "インバウンド" in description:
                notes.append("インバウンド対応")
                
            # 地域の標準化
            if location in ["洲本市", "淡路市", "南あわじ市"]:
                city = location
            else:
                city = location  # その他の場合はそのまま
                
            case = {
                "round": current_round,
                "announcement_date": current_date,
                "company_name": company_name,
                "city": city,
                "industry": industry,
                "business_description": description.replace(" ￼", ""),
                "application_category": category if category else "不明",
                "notes": notes if notes else []
            }
            
            cases.append(case)
    
    return cases

def save_to_json(cases: List[Dict], output_path: str):
    """パースしたデータをJSONファイルに保存"""
    output_data = {
        "title": "淡路島事業再構築補助金採択事例一覧",
        "description": "淡路島（洲本市・淡路市・南あわじ市）における事業再構築補助金の採択事例データ",
        "source": "経済産業省 中小企業庁公式発表資料",
        "last_updated": "2024年11月（第12回公募まで）",
        "total_cases": len(cases),
        "cases": cases
    }
    
    with open(output_path, 'w', encoding='utf-8') as f:
        json.dump(output_data, f, ensure_ascii=False, indent=2)
    
    print(f"JSONファイルを作成しました: {output_path}")
    print(f"総採択件数: {len(cases)}件")
    
    # 統計情報の出力
    cities = {}
    industries = {}
    rounds = {}
    
    for case in cases:
        # 市別集計
        city = case['city']
        cities[city] = cities.get(city, 0) + 1
        
        # 業種別集計
        industry = case['industry']
        industries[industry] = industries.get(industry, 0) + 1
        
        # 公募回別集計
        round_num = case['round']
        rounds[round_num] = rounds.get(round_num, 0) + 1
    
    print("\n=== 市別採択件数 ===")
    for city, count in sorted(cities.items(), key=lambda x: x[1], reverse=True):
        print(f"{city}: {count}件")
    
    print("\n=== 業種別採択件数（上位10業種） ===")
    for industry, count in sorted(industries.items(), key=lambda x: x[1], reverse=True)[:10]:
        print(f"{industry}: {count}件")
    
    print("\n=== 公募回別採択件数 ===")
    for round_num, count in sorted(rounds.items()):
        print(f"第{round_num}回: {count}件")

if __name__ == "__main__":
    # テキストファイルを読み込む
    with open("/Users/tamai/dev/awaji-subsidy-cases/docs/awaji_subsidy_cases.txt", "r", encoding="utf-8") as f:
        text = f.read()
    
    # パース実行
    cases = parse_subsidy_cases(text)
    
    # JSONファイルに保存
    save_to_json(cases, "/Users/tamai/dev/awaji-subsidy-cases/awaji_subsidy_cases.json")