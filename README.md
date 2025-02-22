# Hide On Stash

파일을 업로드, 다운로드, 공유할 수 있는 파일 관리와 공유를 간편하게 할 수 있도록 설계되었습니다.

## 주요 기능

- **파일 업로드 및 다운로드**: 사용자는 파일을 업로드하고 다운로드할 수 있습니다.
- **파일 삭제**: 불필요한 파일을 삭제할 수 있습니다.
- **파일 공유**: 공유 기간을 설정하여 파일을 공유할 수 있습니다. (개발 중)
- **파일 목록 보기**: 업로드된 파일 목록을 확인할 수 있습니다.
- **사용자 인증 및 권한 관리**: 사용자 인증 및 권한 관리를 통해 보안을 강화합니다.


## 개발 환경

- Node.js (v20 이상)
- Docker

## 설치 및 실행

### 요구 사항

- Node.js (v20 이상)
- npm 또는 yarn
- Docker

### 실행
1. 의존성을 설치합니다
```
npm install
```
2. 개발용 Docker 이미지를 빌드합니다.
```
npm run dev:docker:build
```
3. 개발 서버를 실행합니다.
```
npm run dev
```
