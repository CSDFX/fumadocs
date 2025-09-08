---
title: Tomcat
---

## 介绍
Tomcat是由Apache软件基金会属下Jakarta项目开发的Servlet容器，按照Sun Microsystems提供的技术规范，实现了对Servlet和JavaServer Page（JSP）的支持，并提供了作为Web服务器的一些特有功能，如Tomcat管理和控制平台、安全局管理和Tomcat阀等。由于Tomcat本身也内含了HTTP服务器，因此也可以视作单独的Web服务器。但是，不能将Tomcat和Apache HTTP服务器混淆，Apache HTTP服务器是用C语言实现的HTTPWeb服务器；这两个HTTP web server不是捆绑在一起的。Apache Tomcat包含了配置管理工具，也可以通过编辑XML格式的配置文件来进行配置。
## server.xml的结构

  

```
<Server>
    <Service>
        <Connector />
        <Connector />
        <Engine>
            <Host>
                <Context />
            </Host>
        </Engine>
    </Service>
</Server>
```

- Server元素在最顶层，代表整个Tomcat容器；一个Server元素中可以有一个或多个Service元素。

- Service在Connector和Engine外面包了一层，把它们组装在一起，对外提供服务。  
  一个Service可以包含多个Connector，但是只能包含一个Engine；Connector接收请求，Engine处理请求。

- Engine、Host和Context都是容器，且 Engine包含Host，Host包含Context。  
  每个Host组件代表Engine中的一个虚拟主机；每个Context组件代表在特定Host上运行的一个Web应用。


## 核心组件

  

###     1.Server

  

Server在最顶层，代表整个Tomcat，是server.xml中**最外层**的元素。一个Server元素中可以有多个Services元素

  

- **作用：**管理整个Tomcat，监听控制端口（shutdown port）

  

###     2.Services

  

Service的作用，是在Connector和Engine外面包了一层，把它们组装在一起，对外提供服务。**一个Service**可以包含**多个Connector，但是只能包含一个Engine**；其中Connector的作用是从客户端接收请求，Engine的作用是处理接收进来的请求。

  

### 3.Connector（连接器）

  

- **作用：** 接受外部客户端（如浏览器）的请求，将其转换为 Tomcat 内部能处理的格式。

  

```

<Connector port="80" protocol="HTTP/1.1"

    connectionTimeout="20000"

    redirectPort="8443" />

```

  

通过上方的Connector，使客户端可以通过80端口使用http协议访问Tomcat。protocol属性规定了请求的协议为http，prot规定了请求的端口号，redirectPort表示当强制要求https而请求是http时，重定向至端口号为8443的Connector，connectionTimeout表示连接的超时时间。

  

???+ note
    实际上，在正式的生产环境中，Tomcat也常常监听8080端口，而不是80端口。这是因为在生产环境中，很少将Tomcat直接对外开放接收请求，而是在Tomcat和客户端之间加一层代理服务器(如nginx)，用于请求的转发、负载均衡、处理静态文件等；通过代理服务器访问Tomcat时，是在局域网中，因此一般仍使用8080端口。

  

### 4.Engine

  

Engine组件在Services中只存在一个，Engine可以处理多个Connector的请求并完成后进行相应

  

- 代表整个 Servlet 容器。

- 负责接收来自 Connector 的请求，并将请求分发到对应的虚拟主机（Host）。