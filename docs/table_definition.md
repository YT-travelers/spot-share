### routesテーブル

|カラム名|概要|
|---|---|
|id|主キー|
|name|タイトル|

### routeDetailsテーブル

|カラム名|概要|
|---|---|
|id|主キー|
|routeId|routesテーブルへの外部キー|
|spotId|spotsテーブルへの外部キー|
|order|周る順番|
|scheduledDateTime|スケジュールした日時|
|favoritePoint|行きたい度|
|memo|メモ|

### spotsテーブル

|カラム名|概要|
|---|---|
|id|主キー|
|name|名前|
|countryCode|countriesテーブルへの外部キー|
|costExpectation|予想費用|
|requiredTimeExpectation|必要な時間|
|memo|メモ|

### spot_imagesテーブル

|カラム名|概要|
|---|---|
|id|主キー|
|spotId|spotsテーブルへの外部キー|
|imagePath|画像へのパス|

### countriesテーブル

|カラム名|概要|
|---|---|
|code|国コード(主キー)|
|name|名前|
|currency|通貨|
|timezone|タイムゾーン|
