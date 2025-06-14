import json

# 新たに確認できた住所データ
new_verified_addresses = {
    '株式会社山椒': '〒656-0513 兵庫県南あわじ市八木養宜上1013番地6',
    '株式会社淡路島ほっこりファーム': '〒656-2162 兵庫県淡路市王子599番地',
    '株式会社ライフコア': '〒656-0462 兵庫県南あわじ市市青木96番地1',
    '菊川建材株式会社': '〒656-0442 兵庫県南あわじ市湊1334番地',
    '株式会社カタドル': '〒656-0121 兵庫県南あわじ市山添624番地5'
}

# JSONファイルを読み込み
with open('data/awaji_subsidy_cases.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

updated_count = 0

# 新しく確認した住所を更新
for case in data['cases']:
    company_name = case['company_name']
    if company_name in new_verified_addresses:
        case['address'] = new_verified_addresses[company_name]
        updated_count += 1
        print(f'更新: {company_name} -> {new_verified_addresses[company_name]}')

# 最終更新日を更新
data['last_updated'] = '2024年11月（第12回公募まで）- Googleマップ検索による住所追加調査済み'

# ファイルに保存
with open('data/awaji_subsidy_cases.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

print(f'\nGoogleマップ検索による住所更新完了: {updated_count}件')

# 現在の住所入力状況を確認
filled_count = sum(1 for case in data['cases'] if case['address'] != '')
empty_count = sum(1 for case in data['cases'] if case['address'] == '')

print(f'住所入力済み: {filled_count}件')
print(f'住所空欄: {empty_count}件')
print(f'総件数: {len(data["cases"])}件')
print(f'住所入力率: {filled_count/len(data["cases"])*100:.1f}%')