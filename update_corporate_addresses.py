import json

# 法人番号公表サイトで確認できた住所データ
corporate_verified_addresses = {
    '有限会社スリークラフト': '〒656-0025 兵庫県洲本市本町5丁目4番19号',
    '合同会社JOY CIRCUS': '〒656-2131 兵庫県淡路市志筑1147番地2',
    '株式会社長尾工業': '〒656-2131 兵庫県淡路市志筑581番地1',
    '株式会社淡味': '〒656-0025 兵庫県洲本市栄町2丁目1番24号',  # 注：淡路市から洲本市に移転済み
    '橋詰建設株式会社': '〒656-1301 兵庫県洲本市五色町都志543番地',
    'ダントーホールディングス株式会社': '〒656-0531 兵庫県南あわじ市北阿万伊賀野1290番地'
}

# JSONファイルを読み込み
with open('data/awaji_subsidy_cases.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

updated_count = 0

# 新しく確認した住所を更新
for case in data['cases']:
    company_name = case['company_name']
    if company_name in corporate_verified_addresses:
        case['address'] = corporate_verified_addresses[company_name]
        updated_count += 1
        print(f'更新: {company_name} -> {corporate_verified_addresses[company_name]}')

# 最終更新日を更新
data['last_updated'] = '2024年11月（第12回公募まで）- 法人番号公表サイト検索による住所追加調査済み'

# ファイルに保存
with open('data/awaji_subsidy_cases.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

print(f'\n法人番号公表サイト検索による住所更新完了: {updated_count}件')

# 現在の住所入力状況を確認
filled_count = sum(1 for case in data['cases'] if case['address'] != '')
empty_count = sum(1 for case in data['cases'] if case['address'] == '')

print(f'住所入力済み: {filled_count}件')
print(f'住所空欄: {empty_count}件')
print(f'総件数: {len(data["cases"])}件')
print(f'住所入力率: {filled_count/len(data["cases"])*100:.1f}%')

# 残りの法人格企業リスト
print('\n--- 残りの法人格企業（要継続調査） ---')
remaining_corporate = []
for case in data['cases']:
    if (case['address'] == '' and 
        any(keyword in case['company_name'] for keyword in ['株式会社', '有限会社', '合同会社', '合名会社', '合資会社', '一般社団法人', '一般財団法人'])):
        remaining_corporate.append(case['company_name'])

for i, company in enumerate(remaining_corporate, 1):
    print(f'{i:2d}. {company}')