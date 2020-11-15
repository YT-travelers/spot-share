### ルートテーブル（route）

|カラム名|概要|
|---|---|
|routeId|ルートID（主キー）|
|routeName|ルート名称|

### ルート詳細テーブル（routeDetail）

|カラム名|概要|
|---|---|
|id|主キー|
|routeId|ルートID（外部キー）|
|spotId|スポットID（外部キー）|
|order|周る順番|
|scheduledDateTime|スケジュール日時|
|favoritePoint|行きたい度|
|memo|メモ|

### スポットテーブル（spot）

|カラム名|概要|
|---|---|
|spotId|スポットID（主キー）|
|spotName|スポット名称|
|countryCode|国コード（外部キー）|
|costExpectation|予想費用|
|requiredTimeExpectation|所要時間|
|summary|スポット概要|
|url|参考URL|

### スポット画像テーブル（spotImage)

|カラム名|概要|
|---|---|
|spotImageId|スポット画像ID（主キー）|
|spotId|スポットID（外部キー）|
|imagePath|画像パス|

### 国テーブル（country）

|カラム名|概要|
|---|---|
|countryCode|国コード(主キー)|
|countryName|名前|
|currency|通貨|
|timezone|タイムゾーン|
