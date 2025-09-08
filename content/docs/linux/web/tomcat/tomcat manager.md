---
title: tomcat manager
---

# Tomcat Manager

```
# 安装Tomcat
yum -y install tomcat tomcat-webapps.noarch tomcat-admin-webapps.noarch

# 修改xml文件
cd /etc/tomcat/
vim tomcat-users.xml
<user username="admin" password="Key-1122" roles="manager-gui"/>
<user username="robot" password="Key-1122" roles="manager-script"/>
<role rolename="admin"/>
<role rolename="admin-gui"/>
<role rolename="admin-script"/>
<role rolename="manager"/>
<role rolename="manager-gui"/>
<role rolename="manager-script"/>
<role rolename="manager-jmx"/>
<role rolename="manager-status"/>
<user name="admin" password="Key-1122" roles="admin,manager,admin-gui,admin-script,manager-gui,manager-script,manager-jmx,manager-status" />

# 修改Tomcat运行权限
vim /usr/lib/systemd/system/tomcat.service
Users=root

```

在非宿主机上访问Tomcat Manager会提示权限拒绝，修改`/var/lib/tomcat/webapps/host-manager`和`/var/lib/tomcat/webapps/manager`下`META-INF/context.xml`配置文件
```
# 注释Valve部分
<!--
  <Valve className="org.apache.catalina.valves.RemoteAddrValve"
         allow="127\.\d+\.\d+\.\d+|::1|0:0:0:0:0:0:0:1" />
-->
```

