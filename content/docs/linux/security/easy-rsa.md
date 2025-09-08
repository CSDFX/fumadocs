---
title: Easy-RSA
---

# Easy-RSA
### 相关链接
- [Linux easy-rsa制作证书](https://www.cnblogs.com/ranke110/p/14851548.html)
- [Easy-RSA 3快速入门教程](https://huang12zheng.github.io/openvpn_cn/easy-rsa3/README.quickstart.html)
### Install & Copy
```
apt -y install easy-rsa
mkdir /etc/ca
cp -rp /usr/share/easy-rsa/* /etc/ca
```
### Base
###### vars
```
set_var EASYRSA_DN      "org"
```
`EASYRSA_DN`  指定使用哪种 Distinguished Name 格式，常见值：  
- `"cn_only"`：仅使用 Common Name  
- `"org"`：使用组织单位等完整信息（适用于更复杂的 X.509 结构）  
### Using
###### 初始化：
```bash
./easyrsa init-pki
```
###### 构建 CA 密钥和证书：
```bash
./easyrsa build-ca <nopass>
```
###### 生成服务器证书请求：
```bash
./easyrsa gen-req www nopass
```
###### 签署服务器证书请求：
```bash
./easyrsa sign-req server www
```