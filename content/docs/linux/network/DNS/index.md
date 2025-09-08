---
title: DNS
---

## 介绍
### 1. DNS
域名系统（英语：Domain Name System，缩写：DNS）是互联网的一项服务。它作为将域名和IP地址相互映射的一个分布式数据库，能够使人更方便地访问互联网。DNS使用TCP和UDP端口53。DNS 是互联网的“电话簿”，它将人类易于记忆的域名（如 `www.google.com`）转换为 IP 地址。

#### 1.2 BIND
**BIND**（Berkeley Internet Name Domain）作为一款目前市面是最主流的开源DNS软件，占据了市面上DNS服务器软件的九成，目前由 互联网系统协会 (Internet Systems Consortium) 负责开发和维护。目前，最新的稳定版BIND已经更新到了 BIND 9 版本。

### 1.3 FQDN
完全合格域名（英语：Fully qualified domain name），缩写为FQDN，又译为完全资格域名、完整域名，也称为绝对域名（英语：absolute domain name）、 绝对域名，是域名的一种，能指定其在域名系统（DNS）树状图下的一个确实位置。一个完全资格域名会包含所有域名级别，包括顶级域名和根域名。完整域名这个名称的由来，是因为它没有模糊空间，只能用一种方式来解析。
```
FQDN = HostName + Domain
```
#### 1.4 DNS Zone
DNS Zone ，DNS域，包含了这个区域内所有域名及其相关 DNS 记录（如 IP 地址）的信息。
#### 区域类型
根据其在 DNS 架构中的角色，DNS Zone 通常分为几种类型：

- **主区域（Primary Zone）：** 包含了区域的原始数据，管理员可以直接在此区域内创建、修改或删除 DNS 记录。
    
- **辅助区域（Secondary Zone）：** 是主区域的只读副本。它通过“区域传输（Zone Transfer）”从主区域同步数据。辅助区域的主要作用是提供冗余和负载均衡，以确保即使主服务器出现故障，域名解析服务也能继续。
    
- **反向查找区域（Reverse Lookup Zone）：** 与常规区域相反，它将 IP 地址映射回域名。这主要用于故障排除、垃圾邮件过滤和安全日志记录。
#### 资源记录
1. **SOA (Start of Authority)：** 每个区域文件都以 SOA 记录开头，它包含了该区域的重要信息，比如主要 DNS 服务器的名称、管理员的联系方式以及区域数据的刷新间隔等。
	
2. **A 记录：** 将域名映射到 IPv4 地址。
    - **工作原理：** 当你在浏览器中输入 `www.example.com` 时，DNS 解析器会查找 `www.example.com` 对应的 A 记录，然后返回一个类似于 `93.184.216.34` 的 IPv4 地址。你的浏览器随后就会使用这个 IP 地址去连接网站服务器。
    
	- **示例：**
    
    ```
    www.example.com.    IN    A    93.184.216.34
    ```
    
    - `www.example.com`：要解析的域名。
        
    - `IN`：表示互联网（Internet）类型。
        
    - `A`：记录类型。
        
    - `93.184.216.34`：对应的 IPv4 地址。
    
3. **AAAA 记录：** 将域名映射到 IPv6 地址。
    与 A 记录类似，但它用于将**域名**映射到**IPv6 地址**。随着 IPv6 的普及，AAAA 记录变得越来越重要。

	- **工作原理：** 如果你的设备支持 IPv6，它会优先尝试解析 AAAA 记录。
    
	- **示例：**
    
    ```
    www.example.com.    IN    AAAA    2606:2800:220:1:248:1893:25c8:1946
    ```
    
    - `AAAA`：记录类型。
        
    - `2606:2800:...`：对应的 IPv6 地址。
    
4. **NS 记录：** 指定负责管理子域名的权威 DNS 服务器。
    NS 记录用于**委派**子域名的管理权限，它指明了负责某个特定域名的**权威 DNS 服务器**。

	- **工作原理：** 当一个 DNS 解析器需要查找 `blog.example.com` 的记录时，它会先查询 `example.com` 的 NS 记录。NS 记录会告诉它：“去问 `ns1.blog-dns.com` 和 `ns2.blog-dns.com` 这两台服务器，它们知道 `blog.example.com` 的详细信息。” 这种机制是 DNS 树状结构和分层管理的基础。
    
	- **示例：**
    
    ```
    example.com.    IN    NS    ns1.example-dns.com.
    example.com.    IN    NS    ns2.example-dns.com.
    ```
    
    - 这条记录声明，`ns1.example-dns.com` 和 `ns2.example-dns.com` 这两台服务器是 `example.com` 的权威名称服务器。
    
5. **MX 记录：** 指定负责接收邮件的邮件服务器。

	- **工作原理：** 当有人向 `user@example.com` 发送邮件时，发送方服务器会查询 `example.com` 的 MX 记录，找到对应的邮件服务器（如 `mail.example.com`），然后将邮件发送到该服务器。
    
	- **优先级：** MX 记录还有一个“优先级（Preference）”值，数字越小，优先级越高。这允许管理员设置多个邮件服务器，当主服务器不可用时，邮件可以发送到备用服务器。
    
	- **示例：**
    
    ```
    example.com.    IN    MX    10    mail.example.com.
    example.com.    IN    MX    20    backup-mail.example.com.
    ```
    
    - 这条记录告诉邮件服务器，首先尝试将邮件发送到优先级为 10 的 `mail.example.com`。如果该服务器无响应，则尝试优先级为 20 的 `backup-mail.example.com`。

6. **CNAME 记录：** 创建一个域名的别名。

	- **工作原理：** 假设你有一个网站，同时想让 `www.example.com` 和 `blog.example.com` 都指向同一个服务器。你可以创建一个 `blog.example.com` 的 CNAME 记录，让它指向 `www.example.com`。这样，当有人访问 `blog.example.com` 时，DNS 解析器会先找到 `www.example.com`，然后再去查找 `www.example.com` 的 A 记录。
    
	- **重要限制：** CNAME 记录不能与同一域名下的其他记录（除了少数例外）共存。例如，你不能为 `example.com` 创建一个 CNAME 记录，因为它通常还需要有 SOA、NS 和 MX 记录。
    
	- **示例：**
    
    ```
    blog.example.com.    IN    CNAME    www.example.com.
    ```
    
    - 这表示 `blog.example.com` 是 `www.example.com` 的别名。

7. **TXT 记录 (Text Record)：TXT 记录用于存储**任意的文本信息**，通常用于验证域名所有权和配置一些服务。

	- **工作原理：** TXT 记录最初用于存储简单的文本，但现在被广泛用于各种高级用途：
    
    	- **SPF (Sender Policy Framework)：** 帮助防止垃圾邮件，指定哪些服务器有权发送该域名的邮件。
        
    	- **DKIM (DomainKeys Identified Mail)：** 提供了数字签名，确保邮件在传输过程中没有被篡改。
        
    	- **域名验证：** 许多云服务（如 Google Workspace、Microsoft 365）要求你添加一个特定的 TXT 记录来证明你拥有该域名。
        
	- **示例：**
    
    ```
    example.com.    IN    TXT    "v=spf1 include:_spf.google.com ~all"
    ```
    
    - 这条记录是一个典型的 SPF 记录，它声明只有 Google 的邮件服务器有权代表 `example.com` 发送邮件。

!!! tip
 	在专用网络上，可以使用`/etc/hosts`文件将名称映射到 IP 地址。