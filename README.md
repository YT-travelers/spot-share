## Spot Share

### Ver1

- 観光スポットが作成、編集、参照できる
- 旅のルートが作成、編集、参照できる
- 登録したデータがVer2以降にも移行(sql）できる

---

### Ver2

- 共有のAWSに一般公開し、広告収入が共有の銀行口座に振り込まれる
  - 旅行サイトと連携してアフィリエイト収入を得る
- 以下の機能が実装されている
  - GoogleMap（位置情報）
  - スカイスキャナー連携機能
  - マイページ
  - タイムライン
  - 思い出の投稿

### パイプライン更新
infrastructureディレクトリにparameters.jsonを作成して以下のコマンドを実行  
※parameters.jsonについては管理者に確認

```
aws cloudformation update-stack --stack-name deploy-spot-share \
--template-body file://`pwd`/infrastructure/deploy-pipeline.yml \
--parameters file://`pwd`/infrastructure/parameters.json \
--capabilities CAPABILITY_NAMED_IAM
```