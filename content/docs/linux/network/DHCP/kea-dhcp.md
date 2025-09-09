---
title: KEA-DHCP
---

# Kea DHCP
自RHEL10开始，isc-dhcp已被kea-dhcp所取代
## 配置文件
`kea-dhcp4.conf`
##### 将DHCPv6关闭
``` json
dhcp6=no
```
##### 监听网卡
``` json
"interfaces": [ 'ens160' ]
```
##### 地址池
``` json title="kea-dhcp4.conf"
{
            "subnet": "192.0.2.0/24",
            "pools": [ { "pool": "192.0.2.1 - 192.0.2.200" } ],
            "option-data": [
                {
                    "name": "routers",
                    "data": "192.0.2.1"
                },
                {
            		"name": "domain-name-servers",
            		"data": "8.8.8.8, 8.8.4.4"
          		}
            ],
            "reservations": [
                {
                    "hw-address": "1a:1b:1c:1d:1e:1f",
                    "ip-address": "192.0.2.201"
                }
            ]
        }
```

- **subnet**：定义一个子网网段

- **pools**：定义一个地址池，包含一个地址池范围

- **option-data**：DHCP选项
	- **"name": "routers"**：为客户端提供DHCP服务时，指示客户端使用此IP地址作为网关
	- **"name": "domain-name-servers"**：指示客户端使用此IP地址作为DNS

- **reservations**： 定义了一个预留（reservation），用于为特定的客户端设备分配特定的IP地址