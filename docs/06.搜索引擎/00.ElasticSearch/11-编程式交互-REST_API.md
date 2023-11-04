---
title: 编程式交互-REST_API
date: 2021年9月11日22:50:43
permalink: /pages/210630a9-2064-3f55-83c1-13996f8d7cce/
tags:
  - 搜索引擎
  - ElasticSearch
author:
  name: huidong.yin
  link: https://huidongyin.github.io
categories:
  - ElasticSearch
---

Elasticsearch提供了REST API，这些API可供UI组件使用，并可以直接调用这些API来配置和访问Elasticsearch的功能。通过这些API，可以以编程方式与Elasticsearch进行交互，执行索引、搜索、聚合等操作。REST API提供了一种灵活和通用的方式来与Elasticsearch进行集成和交互。下面来看一下常用的`_cat API` 和 `cluster/node API`。

---

## 1.cat API

`CAT API`主要用于人类使用，因为输出格式化为易于阅读和理解的方式。这些API对于管理员、开发人员以及任何需要以简洁易读的格式检索集群、索引或节点信息的人员非常有用。

通过使用`CAT API`，可以快速获取有关Elasticsearch集群的重要信息，无需复杂的查询或解析JSON响应。

`CAT API`提供了各种端点来从Elasticsearch中检索不同类型的数据，For Example：

1.  `cat indices`：该API提供了Elasticsearch集群中所有索引的紧凑摘要，包括索引名称、文档计数、大小和其他元数据等信息。 
2.  `cat shards`：该API显示集群中分片的信息，包括它们的状态、分配情况和其他详细信息。 
3.  `cat nodes`：该API返回集群中节点的信息，包括它们的角色、IP地址和其他相关数据。 
4.  `cat health`：该API显示集群的整体健康状况，包括节点数量、活动分片数和其他健康相关信息。 
5.  `cat aliases`：该API列出集群中定义的所有别名及其关联的索引。 

> `CAT API`仅用于通过Kibana控制台或命令行进行人工查看。它们不适用于应用程序使用。对于应用程序使用，建议使用相应的`JSON API`。


**verbose**

`v`参数可以打印详细信息。For Example:

```bash
GET _cat/master?v=true

### response

id                     host       ip         node
YWfAPAonTteQ9GO__aOjQw 172.17.0.2 172.17.0.2 ece13c2201ae
```

**h参数**

`h`参数可以强制只展示某些列。

> [更多参数->官方文档](https://www.elastic.co/guide/en/elasticsearch/reference/7.17/cat.html)


---

### cat aliases

该API用于获取集群的索引别名，包括过滤器和路由信息。

查看所有的索引别名。

```bash
## 查看所有的索引别名
GET _cat/aliases?v=true

## response
alias                index                  filter routing.index routing.search is_write_index
.kibana_task_manager .kibana_task_manager_1 -      -             -              -
.kibana              .kibana_1              -      -             -              -
```

查看某一个指定的索引别名。

```bash
## 查看某一个索引别名
GET _cat/aliases/.kibana_task_manager?v

## response
alias                index                  filter routing.index routing.search is_write_index
.kibana_task_manager .kibana_task_manager_1 -      -             -              -
```

---

### cat health

该API返回集群的健康状态，类似于集群健康API。

```bash
GET /_cat/health?v

## response
epoch      timestamp cluster        status node.total node.data shards pri relo init unassign pending_tasks max_task_wait_time active_shards_percent
1688996657 13:44:17  docker-cluster yellow          1         1      9   9    0    0        5             0                  -                 64.3%
```

### cat indices

该API返回集群中索引的高级信息，包括数据流的后备索引。

返回所有索引的信息。

```bash
GET /_cat/indices?v

## response
health status index                    uuid                   pri rep docs.count docs.deleted store.size pri.store.size
yellow open   test                     7gJSMomWTgmZTrCC-nj4Pg   1   1          2            0     11.3kb         11.3kb
yellow open   sale_store_day           szfu4GDTR96EmTTSLmWVlg   1   1          2            0      7.1kb          7.1kb
green  open   .apm-custom-link         pO5XDGzkTo27JY2j3qYykw   1   0          0            0       208b           208b
green  open   .kibana_task_manager_1   h0ck6yAXTrCcuBImgrHpbg   1   0          5            2       24kb           24kb
green  open   .apm-agent-configuration MNfKD_6RTd6Trtw96sWH3w   1   0          0            0       208b           208b
yellow open   topic                    DjF8rPKPStK7w-2NaFSMiw   1   1          2            0      5.9kb          5.9kb
green  open   .kibana_1                fLZb8cfXQjeQ48NwoG2r6w   1   0        251            5    142.3kb        142.3kb
yellow open   logs                     pvSDlwZ8RRGHJfWPU448gg   1   1          3            0      3.9kb          3.9kb
yellow open   order                    X2l5ZcXoSUuiYN6CbznduA   1   1       1000            0    114.2kb        114.2kb
```

返回某个指定索引的信息。

```bash
GET /_cat/indices/order?v

#response
health status index uuid                   pri rep docs.count docs.deleted store.size pri.store.size
yellow open   order X2l5ZcXoSUuiYN6CbznduA   1   1       1000            0    114.2kb        114.2kb
```

### cat master

该API返回有关主节点的信息，包括ID、绑定的IP地址和名称。

```bash
GET /_cat/master?v

## response
id                     host       ip         node
YWfAPAonTteQ9GO__aOjQw 172.17.0.2 172.17.0.2 ece13c2201ae
```

### cat nodes

返回集群相关的信息。

```bash
GET /_cat/nodes?v=true

## response
ip         heap.percent ram.percent cpu load_1m load_5m load_15m node.role master name
172.17.0.2           52          97   1    0.00    0.01     0.05 dilmrt    *      ece13c2201ae
```

> 这里返回的是默认的列，如果需要返回指定的列，可以参考[官方文档](https://www.elastic.co/guide/en/elasticsearch/reference/7.17/cat-nodes.html)。


### cat pending tasks

该API返回尚未执行的集群级别的更改，类似于待处理的集群任务API。

查看所有未执行的任务。

```bash
GET /_cat/pending_tasks?v
```

### cat plugins

该API返回集群中每个节点上正在运行的插件列表。

```bash
GET /_cat/plugins?v=true&s=component&h=name,component,version,description

## response
name         component   version description
ece13c2201ae analysis-ik 7.17.0   IK Analyzer for Elasticsearch
```

### cat shards

shards命令提供了节点包含哪些分片的详细视图。它会告诉你分片是主分片还是副本分片，文档数量，占用磁盘空间的字节数，以及所在的节点。

查看所有的分片信息。

```bash
GET _cat/shards?v

## response
index                    shard prirep state      docs   store ip         node
logs                     0     p      STARTED       3   3.9kb 172.17.0.2 ece13c2201ae
logs                     0     r      UNASSIGNED                         
topic                    0     p      STARTED       2   5.9kb 172.17.0.2 ece13c2201ae
topic                    0     r      UNASSIGNED                         
.apm-agent-configuration 0     p      STARTED       0    208b 172.17.0.2 ece13c2201ae
.apm-custom-link         0     p      STARTED       0    208b 172.17.0.2 ece13c2201ae
.kibana_1                0     p      STARTED     272 127.5kb 172.17.0.2 ece13c2201ae
order                    0     p      STARTED    1000 114.2kb 172.17.0.2 ece13c2201ae
order                    0     r      UNASSIGNED                         
sale_store_day           0     p      STARTED       2   7.1kb 172.17.0.2 ece13c2201ae
sale_store_day           0     r      UNASSIGNED                         
.kibana_task_manager_1   0     p      STARTED       5    24kb 172.17.0.2 ece13c2201ae
test                     0     p      STARTED       2  11.3kb 172.17.0.2 ece13c2201ae
test                     0     r      UNASSIGNED
```

查看指定别名/索引的分片信息，支持模糊搜索。

```bash
GET _cat/shards/order?v

## response
index shard prirep state      docs   store ip         node
order 0     p      STARTED    1000 114.2kb 172.17.0.2 ece13c2201ae
order 0     r      UNASSIGNED
```

### cat tasks management task

返回当前在集群中执行的任务的信息，类似于任务管理API。

```bash
GET _cat/tasks?v=true

## response
action                         task_id                        parent_task_id                 type      start_time    timestamp running_time ip         node
cluster:monitor/tasks/lists    YWfAPAonTteQ9GO__aOjQw:3028372 -                              transport 1688998957964 14:22:37  20.5ms       172.17.0.2 ece13c2201ae
cluster:monitor/tasks/lists[n] YWfAPAonTteQ9GO__aOjQw:3028373 YWfAPAonTteQ9GO__aOjQw:3028372 direct    1688998957964 14:22:37  20.4ms       172.17.0.2 ece13c2201ae
```

### cat template

返回索引模板相关的信息。

查看所有的模板。

```bash
GET /_cat/templates

## response
.monitoring-es                  [.monitoring-es-7-*]         0          7000199
.logstash-management            [.logstash]                  0          
.management-beats               [.management-beats]          0          70000
.monitoring-logstash            [.monitoring-logstash-7-*]   0          7000199
.watches                        [.watches*]                  2147483647 11
.monitoring-alerts-7            [.monitoring-alerts-7]       0          7000199
...
```

查看某一个指定的模板。

```bash
GET /_cat/templates/.logstash-management?v

## response
name                 index_patterns order version
.logstash-management [.logstash]    0
```

### cat allocation

提供每个数据节点分配的分片数量及其磁盘空间的快照信息。

```bash
GET /_cat/allocation?v

## response
shards disk.indices disk.used disk.avail disk.total disk.percent host       ip         node
     9      282.7kb    12.2gb     66.3gb     78.6gb           15 172.17.0.2 172.17.0.2 ece13c2201ae
     5                                                                                 UNASSIGNED
```

查看指定的某一个节点。

```bash
GET /_cat/allocation/ece13c2201ae?v
```

### cat count

```bash
GET /_cat/count/<target>

GET /_cat/count
```

`target` 是一个逗号分隔的数据流、索引和别名列表，用于限制请求的范围。支持使用通配符（_）进行匹配。如果要针对所有数据流和索引进行操作，可以省略该参数，或使用 _ 或 _all。

---

> [更多内容->官方文档](https://www.elastic.co/guide/en/elasticsearch/reference/7.17/cat.html)


## 2. cluster api

集群管理的 API 提供了获取或者更改集群信息的功能，例如集群节点过滤、查看集群信息、查看节点信息、更新集群设置、重置路由等。

### 2.1 节点过滤

```bash
## 获取所有节点
GET /_nodes/_all
```

除了 `_all` 以外，还支持以下参数。

| 参数 | 描述 |
| --- | --- |
| _all | 列出所有节点 |
| _local | 列出本地节点 |
| _master | 列出主节点 |
| IP 或者主机名字 | 列出指定 IP 或者主机名字的节点 |
| 节点 ID 或者名称 | 列出指定 ID 或者名称的节点 |
| * | IP、主机名字、节点 ID、名称都可以包括通配符 |
| master:true/false | 列出主节点 / 不列出主节点 |
| data:true/false | 列出数据节点 / 不列出数据节点 |
| ingest:true/false | 列出索引预处理节点 / 不列出索引预处理节点 |
| coordinating_only:true/false | 列出协调节点 / 不列出协调节点 |


### 2.2 查看集群信息

可以使用集群信息查看的接口查看集群健康状态、集群状态、集群统计信息、集群的设置等，For Example:

```bash
## 查看集群健康状态
GET /_cluster/health

## 查看集群状态
GET /_cluster/state

## 查看集群统计信息
GET /_cluster/stats?human&pretty

## 查看集群的设置
GET /_cluster/settings?include_defaults=true
```

### 2.3 查看节点信息

```bash
## 获取节点信息的请求格式
GET /_nodes
GET /_nodes/<node_id>
GET /_nodes/<metric>
GET /_nodes/<node_id>/<metric>

## 获取节点信息
GET /_nodes
GET /_nodes/node_id1,node_id2 ## 获取 node_id1 和 node_id2 的信息
GET /_nodes/stats 
GET /_nodes/node_id1,node_id2/stats ## 获取 node_id1 和 node_id2 的统计信息
```

> `metric` 可以指定获取结果中的每个部分。


### 2.4 更新集群设置

For Example：设置集群恢复时的吞吐量，其默认值为 0 的时候为无限制。

```bash
PUT /_cluster/settings
{
  "persistent": {
    "indices.recovery.max_bytes_per_sec": "100m"
  }
}
```

### 2.5 路由重置

`reroute API` 可以允许用户手动修改集群中分片的分配情况。使用 `reroute API` 可以将一个分片从某个节点移到另一个节点，也可以将未分配的分片指定分配到某个节点。

```bash
POST /_cluster/reroute
{
  "commands": [
    {
      "move": {
        "index": "test", "shard": 0,
        "from_node": "node1", "to_node": "node2"
      }
    },
    {
      "allocate_replica": {
        "index": "test", "shard": 1,
        "node": "node3"
      }
    }
  ]
}
```

如上，使用 "move" 指令，将索引 "test" 的分片 0 从节点 "node1" 移动到了 "node2"。使用 "allocate_replica" 指令将 "test" 索引未分配的分片 1 的副本分配到节点 "node3"。

> 在执行了任何路由重置指令后， ES 将会执行重新平衡数据的操作来保持平衡状态，但是这个操作受 `cluster.routing.rebalance.enable`（是否允许重新平衡） 设置值的影响。


> [更多内容->官方文档](https://www.elastic.co/guide/en/elasticsearch/reference/7.17/cluster.html)

