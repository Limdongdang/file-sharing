# -file-sharing
파일 공유 로직

## 사용법
docker가 설치 되어있어야 합니다

#### 컨테이너 실행
```
docker-compose up -d --build
```

#### 주의점

port 중복으로 인해 오류가 나는 경우 docker-compose.yml 파일의 포트 설정을 수정하세요

```
📦FILE_SHARING
 ┣ 📜docker-compose.yml
 ┣ 📜Dockerfile
 ┣ 📜index.html
 ┣ 📜index.js -- minio 파일 입출력 관련 함수
 ┣ 📜init.sql -- DB 초기 설정
 ┣ 📜nginx.conf -- nginx 프록시 설정
 ┗ 📜wait-for-it.sh -- 컨테이너 실행 순서 보장
 ```