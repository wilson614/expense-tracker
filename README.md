# 記帳本 Expense Tracker
以 Express 所建立的記帳本。

## 功能 Features
- 使用者可以註冊帳號
- 使用者可以透過 Facebook Login 直接登入
- 使用者必須登入才能使用記帳本
- 使用者可以建立並管理專屬他的記帳本
- 使用者登出、註冊失敗、或登入失敗時，使用者都會在畫面上看到正確而清楚的系統訊息
- 使用者可以在首頁一次瀏覽所有支出的清單
- 使用者可以在首頁看到所有支出清單的總金額
- 使用者可以新增一筆支出
- 使用者可以編輯支出的所有屬性 (一次只能編輯一筆)
- 使用者可以刪除任何一筆支出 (一次只能刪除一筆)
- 使用者可以同時根據「類別」與「月份」來篩選支出；總金額的計算只會包括被篩選出來的支出總和。

## 環境 Environment
- Node.js
- Nodemon
- mongodb

## 安裝 Installation

1. 取得專案至本地
```
git clone https://github.com/wilson614/expense-tracker
```
2. 進入專案目錄
```
cd expense-tracker
```
3. 安裝套件
```
npm install
```
4. 建立 .env 檔案
```
參照 .env.example 在專案根目錄建立 .env 檔案
```
5. 產生種子資料
```
npm run seed
```
預設使用者
>* name: user
>* email: user@example.com
>* password: 12345678

6. 啟動專案
```
npm run dev
```
7. 出現以下訊息後，即可在 http://localhost:3000 開始使用
```
App is running on http://localhost:3000
```
