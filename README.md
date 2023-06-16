# 🕹️Game-ee (<a href = https://game-ee.vercel.app/ >게임하기</a>)
<div align="center">
 <img  width='25%' src='https://github.com/GAME-EE/client/assets/37887690/9975d907-55aa-4909-b09b-3505c4aa216e'/>
 <img  width='25%' src='https://github.com/GAME-EE/client/assets/37887690/8fda37da-da57-475e-af91-885810b7ef7c'/>
 <img  width='25%' src='https://github.com/GAME-EE/client/assets/37887690/c66102b1-44e8-49f2-be1b-ccbdd7f3df9b'/>
</div>

# 📍Intro
> 3종 미니 게임 게임 플랫폼 GAME-EE입니다. 대표적으로 치킨 게임, 뱀 게임, 기억력 게임을 할 수 있습니다. 
> 
> 현재는 프론트만 배포가 되어 있어 랭킹 및 로그인은 작동하지 않습니다.

<br>

# 📍Team

<div align="center">
 
|Front-end|Front-end|Front-end| Back-end| Back-end|
| :------: | :----: | :----: | :----: | :----: |
| <a href = 'https://github.com/junghyeonsu'><img src="https://avatars.githubusercontent.com/junghyeonsu" width="100" /> <br /> Hyeonsu Jung </a> | <a href = 'https://github.com/bae-sh'><img src="https://avatars.githubusercontent.com/bae-sh" width="100" /> <br /> Seonghyeon Bae </a> | <a href = 'https://github.com/sumi-0011'><img src="https://avatars.githubusercontent.com/sumi-0011" width="100" /> <br /> Sumi Byun </a> | <a href = 'https://github.com/can019'><img src="https://avatars.githubusercontent.com/can019" width="100" /> <br /> Yousung Jung </a> | <a href = 'https://github.com/hyunkoes'><img src="https://avatars.githubusercontent.com/hyunkoes" width="100" /> <br /> HyunSeok-C </a> |
</div>
<br>

# 🕹️게임 설명

## <a href = 'https://game-ee.vercel.app/game/chicken'> 치킨 게임 </a>
<img  width='25%' src='https://github.com/GAME-EE/client/assets/37887690/9975d907-55aa-4909-b09b-3505c4aa216e'/>
<br> 

> Space 바를 이용하여 병아리가 장애물을 피하는 게임 입니다. 
> 
> 3번 연속 점프가 가능하고 일정 점수를 넘기게 되면 Stage가 이동하게 됩니다.


made by : <a href = 'https://github.com/sumi-0011'>Sumi Byun </a>

<br> 

## <a href = 'https://game-ee.vercel.app/game/snake'> 뱀 게임 </a>
<img  width='25%' src='https://github.com/GAME-EE/client/assets/37887690/8fda37da-da57-475e-af91-885810b7ef7c'/>

<br> 

> 방향키를 이용하여 벽과 자신의 몸에 부딪히지 않고 사과를 먹으며 성장하는 게임 입니다.

made by : <a href = 'https://github.com/junghyeonsu'>Hyeonsu Jung</a>

<br> 

## <a href = 'https://game-ee.vercel.app/game/memory'> 기억력 게임 </a>
<img  width='25%' src='https://github.com/GAME-EE/client/assets/37887690/c66102b1-44e8-49f2-be1b-ccbdd7f3df9b'/>

<br> 

> 파란색 버튼 순서를 기억하며 클릭하는 게임 입니다.
> 
> Stage가 증가할 수록 버튼의 수가 늘어나 난이도가 상승합니다.

made by : <a href = 'https://github.com/bae-sh'>Seonghyeon Bae</a>

<br> 

# 🛠️Stack
<p align="center">
  <img src="https://img.shields.io/badge/React-v18.2.0-blue" />
  <img src="https://img.shields.io/badge/Next-v18.2.0-black" />
  <img src="https://img.shields.io/badge/ChakraUI-v2.0.0-brightgreen" />
  <img src="https://img.shields.io/badge/Recoil-v0.7.3-lightgrey" />
  <img src="https://img.shields.io/badge/VSCode-blue" />
 <img src="https://img.shields.io/badge/Vercel-black" />
</p>

<br>

## 📁 폴더 구조

```
📦src
 ┣ 📂api // API 관련 로직
 ┣ 📂components // 컴포넌트들
 ┃ ┣ 📂SnakeGame // 뱀 게임 관련 컴포넌트
 ┃ ┣ 📂ChickenGame // 치킨 게임 관련 컴포넌트
 ┃ ┗ 📂Memory //  게임 관련 컴포넌트
 ┣ 📂constants // 상수 관리
 ┣ 📂hooks // 커스텀 훅
 ┣ 📂pages // 페이지들
 ┃ ┣ 📂game // 게임 페이지
 ┣ 📂services // 서비스 로직
 ┣ 📂styles
 ┃ ┣ 📜colors.ts // 색 관련 상수
 ┃ ┗ 📜theme.ts // 테마
 ┣ 📂types // 타입
 ┗ 📂utils // 유틸 함수
```
