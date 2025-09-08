---
title: 配置Tomcat站点
---

# 配置Tomcat站点

## 1.安装

`yum -y install tomcat java`

## 2.使用Tomcat

```xml
<Connector port="80" protocol="HTTP/1.1"
           connectionTimeout="20000"
           redirectPort="443"
           maxParameterCount="1000"
           />
</Connector>
<Connector port="443" protocol="org.apache.coyote.http11.Http11NioProtocol"
           maxThreads="150" SSLEnabled="true"
           maxParameterCount="1000"
           >
    <SSLHostConfig>     <!-- 配置SSL加密 -->
        <Certificate certificateFile="/etc/ssl/skills.crt"
                     certificateKeyFile="/etc/ssl/skills.key"
                     type="RSA" />
    </SSLHostConfig>
</Connector>
<Engine name="Catalina" defaultHost="invalid">	<!-- 修改默认host为无效(设置仅域名访问) -->
    <Host name="www.skills.com"  appBase="webapps"
          unpackWARs="true" autoDeploy="true">	<!-- ‘ture’以开启自动部署功能（默认开启）-->
          <Context="/" appBase="/var/html" />	<!-- 设置默认目录 注意大小写必须匹配！！！ -->
    </Host>
```

??? + note
    可以通过`backgroundProcessorDelay`修改检查频率（默认10秒）

## 3.修改运行权限

```bash
vim /usr/lib/systemd/system/tomcat.service
Users=root
```

??? + note
    tomcat.conf的默认主页路径为：/var/lib/tomcats/

    不使用Context指定目录，默认会在./ROOT下


