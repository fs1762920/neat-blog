### 前端部署
修改/neat-blog/client/.env.prod
```language
// 后端api接口的ip:port
VITE_BASE_URL=http(s)://ip:port
// 文件服务器（nginx）的ip:port
VITE_REMOTE_FILE_URL=http(s)://ip:port
```
构建项目
```language
npm run build
```
![](http://47.108.237.122:8082/upload/1d5a8369b74242dcb60d27b87f2a8254.png)
将打包好的dist目录放到服务器nginx映射的目录下

### 后端部署
#### 创建库表
执行/neat-blog/server/sql/scheme.sql
#### 预设网站信息
修改application-prod.yml
```yaml
upload:
  target-path: *****文件上传服务器上的绝对路径*****
  path-prefix: /upload

sa-token:
  token-name: satoken
  timeout: 14400
  activity-timeout: -1
  is-concurrent: false
  is-share: true
  is-log: true
  token-style: random-128
  tokenPrefix: Bearer
  private-key: ******rsa私钥******
  public-key: ******rsa公钥******
  init-mail: ******站长邮箱******
  init-username: ******登录账户******
  init-password: ******登录密码******
```
构建项目
```language
mvn -DskipTests=true package
```
将打包好的.jar放到服务器上，并启动

**访问http://服务器ip:nginx上映射的前端端口/**
