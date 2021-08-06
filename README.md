# [Assignment 3] 자란다 #1, #2

## 🧡Basic requirements

1. 회원가입 페이지를 구현하고, 로그인/로그아웃 기능을 구현
   - 아이디(이메일), 비밀번호, 이름, 나이, 주소, 신용카드 정보 입력<br>
     주소와 신용카드 정보는 팝업을 통해 입력
   - 로그인 된 계정은 자신에게 허용된 메뉴만 접근 가능
   - 메뉴는 임의대로 정의해도 되며, 메뉴를 선택했을 때 메뉴명이 화면에 출력
2. 관리자 로그인 시 등록한 계정 정보 확인 가능
   - 테이블 component 페이지 생성, Data Table, 페이지네이션, 검색기능 구현
   - 관리자는 계정을 임의로 생성할 수 있고, 계정별로 볼 수 있는 메뉴를 설정 가능

<br>

## 💛Built With

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Styled Components](https://img.shields.io/badge/styled--components-DB7093?style=for-the-badge&logo=styled-components&logoColor=white)
![Visual Studio Code](https://img.shields.io/badge/VisualStudioCode-0078d7.svg?style=for-the-badge&logo=visual-studio-code&logoColor=white)

![NPM](https://img.shields.io/badge/NPM-%23000000.svg?style=for-the-badge&logo=npm&logoColor=white)
![Markdown](https://img.shields.io/badge/markdown-%23000000.svg?style=for-the-badge&logo=markdown&logoColor=white)
![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)
![Slack](https://img.shields.io/badge/Slack-4A154B?style=for-the-badge&logo=slack&logoColor=white)

<br>

## 💚Implementation List

- 회원가입
  - 입력된 정보의 유효성 검사
  - 모든 항목이 입력 되었는지 확인
  - 모든 항목이 올바르게 입력되었으면 로컬스토리지에 저장
- 로그인
  - 모든 항목이 올바르게 입력 되었는지 확인
  - 로그인 시 해당 계정의 로그인 정보를 저장
  - 로그인 이후 일정 시간(3시간)이 지나면 자동 로그아웃 처리
- 마이페이지
  - 내 정보 탭에서 현재 로그인한 계정의 정보(이메일, 비밀번호, 주소, 결제 수단) 수정 가능
  - 선생님 계정으로 로그인 시 학생 정보 확인 가능
- 접근 제한
  - 계정의 접근 가능 정보를 토대로 Global NavBar의 Tap 접근 제한
- 관리자 페이지
  - 가입된 사용자의 정보를 조회, 검색, 수정 가능
  - 사용자 계정 생성
  - 관리자 페이지 테스트 계정 (email: admin<span></span>@jaranda.com, password: admin1234)

<br>

## 💙Who Did What

- 🐥 민유지 : 로그인 - 계정에 따른 접근 제어 및 Login Expiration 관련 logic구현, Mypage '내 정보 수정' 기능 구현
- 🐷 정태웅 : 로그인 - 로그인/로그아웃 구현, 레이아웃, 토스트팝업
- 🐺 석정도 : 마이페이지 - 라우팅, 학생정보
- 🐭 윤맑은이슬 : 회원가입 - Daum 주소검색 API 연동, 이메일 및 비밀번호 유효성 검사, "가입하기" 최종 유효성 검사
- 🐧 최혜린 : 회원가입 - 카드 정보 입력 폼, 비밀번호 확인, 이름 및 나이 유효성 검사, 회원 정보 저장
- 😺 백진수 : 관리자 - 데이터 테이블, 사용자 계정 생성 기능, 데이터 테이블 수정 기능
- 🐔 강용구 : 관리자 - 검색 기능, 페이지네이션

<br>

## 💜Build Installation

```bash
# install dependencies
$ npm install
# serve with hot reload at localhost:3000
$ npm run start
```

<br>


## 🤍Project Link

<https://epic-jepsen-a6fdee.netlify.app/>

- 관리자 계정
```
email: admin@jaranda.com
password: admin1234
```
- 테스트 계정
```
email: kimteacher@jaranda.com
password: kimteacher1234

email: leestudent@jaranda.com
password: leestudent1234

email: parkparent@jaranda.com
password : parkparent1234
```

<br>

## 💗Preview

<div style={display: flex;}>
   
<img src="https://user-images.githubusercontent.com/76525368/128481763-8237d41d-3626-47e3-a366-12c8123ec9bd.jpg" alt="drawing" width="400"/>
<img src="https://user-images.githubusercontent.com/76525368/128483520-9eb2b914-c4e8-4885-b8c1-0f0e90283c98.jpg" alt="drawing" width="400"/>
<img src="https://user-images.githubusercontent.com/76525368/128483730-354b77e7-7e6b-4644-92f1-05789f7cfed3.jpg" alt="drawing" width="400"/>
<img src="https://user-images.githubusercontent.com/76525368/128483548-6a4897df-2c99-4708-a0ce-05508b36dccb.jpg" alt="drawing" width="400" height="300"/>
<img src="https://user-images.githubusercontent.com/76525368/128483538-37b59198-96ea-40ec-871a-871148ce548e.jpg" alt="drawing" width="400"/>
<img src="https://user-images.githubusercontent.com/76525368/128483544-0b7f4b90-4877-431f-82fe-bb1e58a53b6d.jpg" alt="drawing" width="400"/>

</div>


