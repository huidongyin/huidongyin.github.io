(window.webpackJsonp=window.webpackJsonp||[]).push([[191],{572:function(e,o,r){"use strict";r.r(o);var n=r(4),a=Object(n.a)({},(function(){var e=this,o=e._self._c;return o("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[o("h2",{attrs:{id:"_1-为什么要有zookeeper"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#_1-为什么要有zookeeper"}},[e._v("#")]),e._v(" 1.为什么要有Zookeeper")]),e._v(" "),o("p",[e._v("对于单体应用，一次用户下单的流程可能如下："),o("code",[e._v("用户->服务->MySQL")]),e._v("。")]),e._v(" "),o("p",[e._v("对于微服务架构，一次用户下单的流程可能如下："),o("code",[e._v("用户->服务1->服务2->MySQL")]),e._v("。")]),e._v(" "),o("p",[e._v("服务与服务之间一定不是相互隔离的，而是必须要相互联系进行数据通信才能实现完整功能。服务之间远程通信可以使用RPC或者HTTP。有了远程通信以后，我们势必会考虑几个问题：")]),e._v(" "),o("ol",[o("li",[e._v("目标服务扩容缩容，客户端会带来一些变化。")]),e._v(" "),o("li",[e._v("客户端对于目标服务如何负载均衡。")]),e._v(" "),o("li",[e._v("客户端如何维护目标服务的地址信息。")]),e._v(" "),o("li",[e._v("服务端的服务状态发现，如何让客户端尽心感知。")])]),e._v(" "),o("p",[e._v("此时最好的办法就是有一个服务专门用来服务的注册和发现，也就是注册中心，在微服务架构中，他起到了非常大的做用。Dubbo体系中的Zookeeper，SpringCloud体系中的Eureka，Nacos都是注册中心的具体实现。")]),e._v(" "),o("hr"),e._v(" "),o("h2",{attrs:{id:"_2-什么是zookeeper"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#_2-什么是zookeeper"}},[e._v("#")]),e._v(" 2.什么是Zookeeper")]),e._v(" "),o("p",[e._v("Apache ZooKeeper 是一个高可靠的分布式协调中间件。它是 Google Chubby 的一个开源实现，那么它主要是解决什么问题的呢？那就得先了解 Google Chubby。Google Chubby 是谷歌的一个用来解决分布式一致性问题的组件，同时，也是粗粒度的分布式锁服务。")]),e._v(" "),o("h3",{attrs:{id:"_2-1-分布式一致性问题"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#_2-1-分布式一致性问题"}},[e._v("#")]),e._v(" 2.1 分布式一致性问题")]),e._v(" "),o("p",[e._v("什么是分布式一致性问题呢？简单来说，就是在一个分布式系统中，有多个节点，每个节点都会提出一个请求，但是在所有节点中只能确定一个请求被通过。而这个通过是需要所有节点达成一致的结果，所以所谓的一致性就是在提出的所有请求中能够选出最终一个确定请求。并且这个请求选出来以后，所有的节点都要知道。")]),e._v(" "),o("p",[o("strong",[e._v("分布式一致性的本质，就是在分布式系统中，多个节点就某一个提议如何达成一致。")])]),e._v(" "),o("p",[e._v("在 Google 有一个 GFS(google file system)，他们有一个需求就是要从多个 gfs server 中选出一个 master server。这个就是典型的一致性问题，5 个分布在不同节点的 server，需要确定一个 master server，而他们要达成的一致性目标是：确定某一个节点为 master，并且所有节点要同意。而 GFS 就是使用 chubby 来解决这个问题的。")]),e._v(" "),o("p",[e._v("实现原理是：所有的 server 通过 Chubby 提供的通信协议到 Chubby server 上创建同一个文件，当然，最终只有一个 server 能够获准创建这个文件，这个 server 就成为了 master，它会在这个文件中写入自己 的地址，这样其它的 server 通过读取这个文件就能知道被选出的master 的地址。")]),e._v(" "),o("hr"),e._v(" "),o("h3",{attrs:{id:"_2-2-分布式锁服务"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#_2-2-分布式锁服务"}},[e._v("#")]),e._v(" 2.2 分布式锁服务")]),e._v(" "),o("p",[e._v("从另外一个层面来看，Chubby 提供了一种粗粒度的分布式锁服务，chubby 是通过创建文件的形式来提供锁的功能，server 向 chubby 中创建文件其实就表示加锁操作，创建文件成功表示抢占到了锁。")]),e._v(" "),o("p",[e._v("由于 Chubby 没有开源，所以雅虎公司基于 chubby 的思想，开发了一个类似的分布式协调组件 Zookeeper，后来捐赠给了 Apache。Zookeeper并不是作为注册中心而设计，它是作为分布式锁的一种设计。而注册中心只是它能够实现的一种功能而已。")]),e._v(" "),o("hr"),e._v(" "),o("h3",{attrs:{id:"_2-3-zookeeper管理元数据的优势"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#_2-3-zookeeper管理元数据的优势"}},[e._v("#")]),e._v(" 2.3 Zookeeper管理元数据的优势")]),e._v(" "),o("p",[e._v("首先它可以很好地支持集群部署；其次它具有很好的分布式协调能力，假设对 ZooKeeper 中的数据做了变更（比如新增了一台 Kafka 或者挂掉了一个 Kafka 节点），这时候 ZooKeeper 会"),o("strong",[e._v("主动通知")]),e._v("其他监听这个数据的客户端，立即告诉其他客户端说这份元数据有变更。")]),e._v(" "),o("p",[e._v("ZooKeeper 的设计十分巧妙，它的主动通知机制采取的是 "),o("code",[e._v("Watcher 机制")]),e._v("，至于什么是 Watcher 机制，后面文章会详细地剖析其思想和源码。")]),e._v(" "),o("p",[e._v("知道了 ZooKeeper 的应用场景后，再来想想 "),o("strong",[e._v("目前哪些流行框架使用了 ZooKeeper")]),e._v(" 。")]),e._v(" "),o("ul",[o("li",[o("code",[e._v("Dubbo")]),e._v("：非常流行的 RPC 框架，它就采取了 ZooKeeper 作为注册中心，来管理分布式集群的元数据存储。当然也可以采取 Nacos 作为注册中心。")]),e._v(" "),o("li",[o("code",[e._v("Kafka")]),e._v("：消息中间件，它采取了 ZooKeeper 做分布式集群的元数据存储以及分布式协调功能。")]),e._v(" "),o("li",[o("code",[e._v("HBase")]),e._v("：大数据领域的技术，它也采取了 ZooKeeper 做分布式集群的元数据存储。")]),e._v(" "),o("li",[o("code",[e._v("HDFS")]),e._v("：大数据领域的技术，它采取了 ZooKeeper 做 Master 选举实现 HA 高可用的架构。")]),e._v(" "),o("li",[o("code",[e._v("Canal")]),e._v("：ETL 工具，监控 binlog 做数据同步，它采取了 ZooKeeper 做分布式集群的元数据存储，也用 ZooKeeper 做 Master 选举实现 HA 高可用的架构。")]),e._v(" "),o("li",[e._v("……")])]),e._v(" "),o("p",[e._v("其实不管是 RPC 也好，消息中间件也罢，它们都需要注册中心，只是技术选型到底该用哪个的事情。比如，Kafka 用了 ZooKeeper，但是 RocketMQ 就用了自研的 Nameserver；再比如，SpringCloud 的 Feign 就采取了 Eureka 和 Nacos。")]),e._v(" "),o("hr"),e._v(" "),o("h3",{attrs:{id:"_2-4-zookeeper-和-eureka-nacos的区别"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#_2-4-zookeeper-和-eureka-nacos的区别"}},[e._v("#")]),e._v(" 2.4 ZooKeeper 和 Eureka/Nacos的区别")]),e._v(" "),o("p",[e._v("区别有很多，这里只介绍一点：ZooKeeper 是 CP，而 Eureka 是 AP，Nacos 既可以是 AP 又可以是 CP。那什么是 CP？什么又是 AP？")]),e._v(" "),o("p",[e._v("ZooKeeper 集群是 Leader 负责写，写成功后是同步到各个 Follower 从节点。那么问题来了，如果这时候 Leader 挂了，Follower 会进行选举，但是选举也需要时间的，选举过程中如果进来了读写请求，那么是无法进行的。所以会有部分流量的丢失，这就是所谓的 "),o("code",[e._v("CP 模型")]),e._v("，"),o("strong",[e._v("用服务的可用性来换取数据的相对强一致性。")])]),e._v(" "),o("p",[e._v("再比如：一个集群 5 个节点，按照过半原则来讲，那么 3 个节点是半数以上，假设集群内挂了 3 台，只保留了 2 台存活节点，那么这时候集群也是无法提供读写请求的，因为不符合过半原则了，这也是 CP 的特征之一。")]),e._v(" "),o("p",[e._v("这样有什么问题？很明显，整个集群的可用性相对较低，因为假设我就 3 个节点，那么挂了 2 个后其实还有 1 个存活，这个存活的节点却不能提供服务。")]),e._v(" "),o("p",[e._v("那 ZooKeeper 的选主机制效率高吗？官方给了个压测的结果，不会超过 200ms。")]),e._v(" "),o("p",[o("img",{attrs:{src:"https://raw.githubusercontent.com/huidongyin/DrawingBed/main/Zookeeper/202312122109096.png",alt:""}})]),e._v(" "),o("p",[e._v("上面介绍的就是分布式系统 CAP 理论中的 CP 模型，本质就是："),o("strong",[e._v("用服务的可用性来换取数据的相对强一致性。")])]),e._v(" "),o("hr"),e._v(" "),o("h2",{attrs:{id:"_3-zookeeper安装"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#_3-zookeeper安装"}},[e._v("#")]),e._v(" 3.Zookeeper安装")]),e._v(" "),o("p",[e._v("这里介绍使用Docker安装Zookeeper集群。")]),e._v(" "),o("p",[e._v("首先创建每一个节点对应的容器映射目录 "),o("code",[e._v("conf,data,logs")]),e._v("。")]),e._v(" "),o("p",[e._v("接下来在每一个 "),o("code",[e._v("data")]),e._v("目录下创建一个 "),o("code",[e._v("myid")]),e._v("文件，并指定节点的id（id不能重复）。")]),e._v(" "),o("p",[o("img",{attrs:{src:"https://raw.githubusercontent.com/huidongyin/DrawingBed/main/Zookeeper/202312122110028.png",alt:""}})]),e._v(" "),o("p",[e._v("接下来在 "),o("code",[e._v("conf")]),e._v("目录下创建 "),o("code",[e._v("zoo.cfg")]),e._v("配置文件，加入以下内容：")]),e._v(" "),o("div",{staticClass:"language-plaintext line-numbers-mode"},[o("pre",{pre:!0,attrs:{class:"language-plaintext"}},[o("code",[e._v("tickTime=2000\ninitLimit=5\nsyncLimit=2\ndataDir=/data\ndataLogDir=/datalog\nautopurge.snapRetainCount=3\nautopurge.purgeInterval=0\nmaxClientCnxns=60\nadmin.enableServer=true\n\nserver.1=zk1:2888:3888;2181\nserver.2=zk2:2888:3888;2181\nserver.3=zk3:2888:3888;2181\n")])]),e._v(" "),o("div",{staticClass:"line-numbers-wrapper"},[o("span",{staticClass:"line-number"},[e._v("1")]),o("br"),o("span",{staticClass:"line-number"},[e._v("2")]),o("br"),o("span",{staticClass:"line-number"},[e._v("3")]),o("br"),o("span",{staticClass:"line-number"},[e._v("4")]),o("br"),o("span",{staticClass:"line-number"},[e._v("5")]),o("br"),o("span",{staticClass:"line-number"},[e._v("6")]),o("br"),o("span",{staticClass:"line-number"},[e._v("7")]),o("br"),o("span",{staticClass:"line-number"},[e._v("8")]),o("br"),o("span",{staticClass:"line-number"},[e._v("9")]),o("br"),o("span",{staticClass:"line-number"},[e._v("10")]),o("br"),o("span",{staticClass:"line-number"},[e._v("11")]),o("br"),o("span",{staticClass:"line-number"},[e._v("12")]),o("br"),o("span",{staticClass:"line-number"},[e._v("13")]),o("br")])]),o("p",[e._v("这些配置项在 ZooKeeper 的配置文件 "),o("code",[e._v("zoo.cfg")]),e._v(" 中定义了 ZooKeeper 的运行参数和集群配置。下面是这些配置项的意义和作用：")]),e._v(" "),o("ul",[o("li",[o("strong",[e._v("tickTime")]),e._v(": 这是 ZooKeeper 用于计算时间的基本单位，以毫秒为单位。ZooKeeper 使用 tickTime 来进行心跳、超时等时间相关的操作。在 ZooKeeper 集群中，所有节点必须使用相同的 tickTime 值。")]),e._v(" "),o("li",[o("strong",[e._v("initLimit")]),e._v(": 这个配置项规定了 ZooKeeper 集群中的跟随者（follower）和领导者（leader）之间初始连接建立时最大允许的时间间隔数。这个时间间隔以 tickTime 的倍数来表示，用于保证 ZooKeeper 集群中的初始化同步速度。")]),e._v(" "),o("li",[o("strong",[e._v("syncLimit")]),e._v(": 这个配置项规定了 ZooKeeper 集群中的跟随者和领导者之间发送消息的最大时间间隔数。和 "),o("code",[e._v("initLimit")]),e._v(" 类似，也是以 tickTime 的倍数来表示，用于保证 ZooKeeper 集群中的消息同步速度。")]),e._v(" "),o("li",[o("strong",[e._v("dataDir")]),e._v(": 这是 ZooKeeper 存储数据快照（snapshot）的目录。ZooKeeper 会在这个目录下存储数据文件。")]),e._v(" "),o("li",[o("strong",[e._v("dataLogDir")]),e._v(": 这是 ZooKeeper 存储事务日志文件的目录。ZooKeeper 将在这个目录下存储事务日志。")]),e._v(" "),o("li",[o("strong",[e._v("autopurge.snapRetainCount")]),e._v(": 当启用自动清理（autopurge）时，这个配置项指定保留的快照文件数量。默认为 3。")]),e._v(" "),o("li",[o("strong",[e._v("autopurge.purgeInterval")]),e._v(": 当启用自动清理时，这个配置项指定自动清理事务日志和快照的时间间隔。设置为 0 表示禁用自动清理。")]),e._v(" "),o("li",[o("strong",[e._v("maxClientCnxns")]),e._v(": 这个配置项规定了单个客户端（连接到 ZooKeeper 的应用程序）与 ZooKeeper 服务器的最大连接数。")]),e._v(" "),o("li",[o("strong",[e._v("admin.enableServer")]),e._v(": 这个配置项用于启用或禁用四字命令（"),o("code",[e._v("mntr")]),e._v("、"),o("code",[e._v("conf")]),e._v(" 等）。当设置为 true 时，允许使用四字命令。")]),e._v(" "),o("li",[o("strong",[e._v("server.X")]),e._v(": 这是配置 ZooKeeper 集群中的每个节点。"),o("code",[e._v("X")]),e._v(" 是节点的 ID，后面是节点的通信地址和端口号。格式为 "),o("code",[e._v("server.X=hostname:peerPort:leaderPort;clientPort")]),e._v("。其中 "),o("code",[e._v("peerPort")]),e._v(" 是用于节点之间通信的端口，"),o("code",[e._v("leaderPort")]),e._v(" 是用于选举 Leader 的端口，"),o("code",[e._v("clientPort")]),e._v(" 是 ZooKeeper 客户端连接的端口。")])]),e._v(" "),o("p",[e._v("举例来说，"),o("code",[e._v("server.1=zk1:2888:3888;2181")]),e._v(" 表示节点1，通信地址为 "),o("code",[e._v("zk1")]),e._v("，节点之间通信端口为 "),o("code",[e._v("2888")]),e._v("，选举 Leader 的端口为 "),o("code",[e._v("3888")]),e._v("，客户端连接端口为 "),o("code",[e._v("2181")]),e._v("。")]),e._v(" "),o("p",[e._v("最后在命令行执行docker命令启动三个Zookeeper节点。")]),e._v(" "),o("div",{staticClass:"language-plaintext line-numbers-mode"},[o("pre",{pre:!0,attrs:{class:"language-plaintext"}},[o("code",[e._v("docker network create zookeeper-net\n\n\ndocker run -d   -p 2181:2181  --network zookeeper-net  --name zk1  -v /Users/HuidongYin/docker/zk/zk1/data:/data  -v /Users/HuidongYin/docker/zk/zk1/conf:/conf  -v /Users/HuidongYin/docker/zk/zk1/logs:/datalog  zookeeper:3.7.1\n\ndocker run -d   -p 2182:2181  --network zookeeper-net  --name zk2  -v /Users/HuidongYin/docker/zk/zk2/data:/data  -v /Users/HuidongYin/docker/zk/zk2/conf:/conf  -v /Users/HuidongYin/docker/zk/zk2/logs:/datalog  zookeeper:3.7.1\n\ndocker run -d   -p 2183:2181  --network zookeeper-net  --name zk3  -v /Users/HuidongYin/docker/zk/zk3/data:/data  -v /Users/HuidongYin/docker/zk/zk3/conf:/conf  -v /Users/HuidongYin/docker/zk/zk3/logs:/datalog  zookeeper:3.7.1\n")])]),e._v(" "),o("div",{staticClass:"line-numbers-wrapper"},[o("span",{staticClass:"line-number"},[e._v("1")]),o("br"),o("span",{staticClass:"line-number"},[e._v("2")]),o("br"),o("span",{staticClass:"line-number"},[e._v("3")]),o("br"),o("span",{staticClass:"line-number"},[e._v("4")]),o("br"),o("span",{staticClass:"line-number"},[e._v("5")]),o("br"),o("span",{staticClass:"line-number"},[e._v("6")]),o("br"),o("span",{staticClass:"line-number"},[e._v("7")]),o("br"),o("span",{staticClass:"line-number"},[e._v("8")]),o("br")])]),o("p",[o("code",[e._v("docker network create zookeeper-net")]),e._v("命令创建了一个名为 "),o("code",[e._v("zookeeper-net")]),e._v(" 的 Docker 网络。这个网络用于连接多个容器，使它们可以相互通信。")]),e._v(" "),o("p",[o("code",[e._v("docker run -d -p 2181:2181 --network zookeeper-net --name zk1 -v /Users/HuidongYin/docker/zk/zk1/data:/data -v /Users/HuidongYin/docker/zk/zk1/conf:/conf -v /Users/HuidongYin/docker/zk/zk1/logs:/datalog zookeeper:3.7.1")]),e._v("命令启动了一个名为 "),o("code",[e._v("zk1")]),e._v(" 的 ZooKeeper 容器。解释如下：")]),e._v(" "),o("ul",[o("li",[o("code",[e._v("-d")]),e._v(": 表示在后台运行容器。")]),e._v(" "),o("li",[o("code",[e._v("-p 2181:2181")]),e._v(": 将主机的端口 "),o("code",[e._v("2181")]),e._v(" 映射到容器的 "),o("code",[e._v("2181")]),e._v(" 端口，用于 ZooKeeper 的客户端连接。")]),e._v(" "),o("li",[o("code",[e._v("--network zookeeper-net")]),e._v(": 将容器连接到名为 "),o("code",[e._v("zookeeper-net")]),e._v(" 的 Docker 网络。")]),e._v(" "),o("li",[o("code",[e._v("--name zk1")]),e._v(": 指定容器的名称为 "),o("code",[e._v("zk1")]),e._v("。")]),e._v(" "),o("li",[o("code",[e._v("-v /Users/HuidongYin/docker/zk/zk1/data:/data")]),e._v(": 将本地机器上的 "),o("code",[e._v("/Users/HuidongYin/docker/zk/zk1/data")]),e._v(" 目录挂载到容器中的 "),o("code",[e._v("/data")]),e._v(" 目录，用于存储 ZooKeeper 数据。")]),e._v(" "),o("li",[o("code",[e._v("-v /Users/HuidongYin/docker/zk/zk1/conf:/conf")]),e._v(": 将本地机器上的 "),o("code",[e._v("/Users/HuidongYin/docker/zk/zk1/conf")]),e._v(" 目录挂载到容器中的 "),o("code",[e._v("/conf")]),e._v(" 目录，用于存储 ZooKeeper 的配置文件。")]),e._v(" "),o("li",[o("code",[e._v("-v /Users/HuidongYin/docker/zk/zk1/logs:/datalog")]),e._v(": 将本地机器上的 "),o("code",[e._v("/Users/HuidongYin/docker/zk/zk1/logs")]),e._v(" 目录挂载到容器中的 "),o("code",[e._v("/datalog")]),e._v(" 目录，用于存储 ZooKeeper 的日志文件。")]),e._v(" "),o("li",[o("code",[e._v("zookeeper:3.7.1")]),e._v(": 使用 Docker Hub 上的 "),o("code",[e._v("zookeeper:3.7.1")]),e._v(" 镜像来创建容器。")])]),e._v(" "),o("p",[e._v("其余两个命令和上面的命令类似，区别在于将分别创建名为 "),o("code",[e._v("zk2")]),e._v(" 和 "),o("code",[e._v("zk3")]),e._v(" 的 ZooKeeper 容器，并使用不同的本地目录作为数据目录、配置文件目录和日志目录，同时映射不同的主机端口到容器的 "),o("code",[e._v("2181")]),e._v(" 端口。这样可以在同一网络中启动多个 ZooKeeper 节点，组成一个 ZooKeeper 集群。")]),e._v(" "),o("p",[e._v("如何验证Zookeeper集群创建成功呢？")]),e._v(" "),o("p",[e._v("使用 "),o("code",[e._v("docker exec 容器id /bin/bash")]),e._v("命令进入docker容器，接下来执行下面的命令：")]),e._v(" "),o("div",{staticClass:"language-plaintext line-numbers-mode"},[o("pre",{pre:!0,attrs:{class:"language-plaintext"}},[o("code",[e._v("# cd bin\n# ./zkCli.sh\nConnecting to localhost:2181\nlog4j:WARN No appenders could be found for logger (org.apache.zookeeper.ZooKeeper).\nlog4j:WARN Please initialize the log4j system properly.\nlog4j:WARN See http://logging.apache.org/log4j/1.2/faq.html#noconfig for more info.\nWelcome to ZooKeeper!\nJLine support is enabled\n\nWATCHER::\n\nWatchedEvent state:SyncConnected type:None path:null\n[zk: localhost:2181(CONNECTING) 0] ls /\n[zookeeper]\n[zk: localhost:2181(CONNECTED) 1] get /zookeeper/config\nserver.1=zk1:2888:3888:participant;0.0.0.0:2181\nserver.2=zk2:2888:3888:participant;0.0.0.0:2181\nserver.3=zk3:2888:3888:participant;0.0.0.0:2181\nversion=0\n[zk: localhost:2181(CONNECTED) 2] \n")])]),e._v(" "),o("div",{staticClass:"line-numbers-wrapper"},[o("span",{staticClass:"line-number"},[e._v("1")]),o("br"),o("span",{staticClass:"line-number"},[e._v("2")]),o("br"),o("span",{staticClass:"line-number"},[e._v("3")]),o("br"),o("span",{staticClass:"line-number"},[e._v("4")]),o("br"),o("span",{staticClass:"line-number"},[e._v("5")]),o("br"),o("span",{staticClass:"line-number"},[e._v("6")]),o("br"),o("span",{staticClass:"line-number"},[e._v("7")]),o("br"),o("span",{staticClass:"line-number"},[e._v("8")]),o("br"),o("span",{staticClass:"line-number"},[e._v("9")]),o("br"),o("span",{staticClass:"line-number"},[e._v("10")]),o("br"),o("span",{staticClass:"line-number"},[e._v("11")]),o("br"),o("span",{staticClass:"line-number"},[e._v("12")]),o("br"),o("span",{staticClass:"line-number"},[e._v("13")]),o("br"),o("span",{staticClass:"line-number"},[e._v("14")]),o("br"),o("span",{staticClass:"line-number"},[e._v("15")]),o("br"),o("span",{staticClass:"line-number"},[e._v("16")]),o("br"),o("span",{staticClass:"line-number"},[e._v("17")]),o("br"),o("span",{staticClass:"line-number"},[e._v("18")]),o("br"),o("span",{staticClass:"line-number"},[e._v("19")]),o("br"),o("span",{staticClass:"line-number"},[e._v("20")]),o("br")])]),o("p",[e._v("当启动一个 ZooKeeper 实例时，它会在预设的数据目录中（通常是 "),o("code",[e._v("dataDir")]),e._v(" 参数指定的目录）创建一些预设的路径和节点。这些路径和节点包括：")]),e._v(" "),o("ol",[o("li",[o("strong",[o("code",[e._v("/zookeeper")])]),e._v(": 这是 ZooKeeper 内部用于存储元数据的根节点。它包含了一些 ZooKeeper 服务器的状态信息。")]),e._v(" "),o("li",[o("strong",[o("code",[e._v("/zookeeper/quota")])]),e._v(": 这个节点用于存储配额信息。ZooKeeper 支持配额管理，允许设置每个节点的最大限制。")]),e._v(" "),o("li",[o("strong",[o("code",[e._v("/zookeeper/config")])]),e._v(": 包含 ZooKeeper 服务器的配置信息。")]),e._v(" "),o("li",[o("strong",[o("code",[e._v("/zookeeper/available")])]),e._v(": 这个节点是用来通知客户端的，表示 ZooKeeper 服务器是可用的。")])]),e._v(" "),o("p",[e._v("当启动一个全新的 ZooKeeper 实例时，它会在这些路径下创建这些节点，以确保 ZooKeeper 服务器正常运行并提供必要的服务。这些节点对于 ZooKeeper 服务器的正常运行是必需的，并且一般情况下不需要手动创建或干预这些节点。")]),e._v(" "),o("hr")])}),[],!1,null,null,null);o.default=a.exports}}]);