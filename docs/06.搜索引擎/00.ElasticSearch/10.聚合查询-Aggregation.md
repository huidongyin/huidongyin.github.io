---
title: Aggregation-聚合查询
date: 2021年9月11日22:50:43
permalink: /pages/ae72f4c9-1255-3606-9d2e-0e426f2a2d91/
tags:
  - 搜索引擎
  - ElasticSearch
author:
  name: huidong.yin
  link: https://huidongyin.github.io
categories:
  - ElasticSearch
---

某一天，你正在优哉悠哉的摸鱼，你的产品又来给你提需求：他想知道所有订单的平均价格，最大价格，，，等等各种指标，无奈的你只能再次开始了Google搜索。

订单数据如下：

```bash
DELETE order

PUT order
{
  "mappings": {
    "properties": {
      "id": {
        "type": "keyword"
      },
      "name": {
        "type": "keyword"
      },
      "price": {
        "type": "double"
      },
      "sales": {
        "type": "integer"
      },
      "type": {
        "type": "keyword"
      },
      "status": {
        "type": "keyword"
      },
      "createTime": {
        "type": "date"
      }
    }
  }
}
```

---

## 1. Aggregation Query

Elasticsearch除了致力于搜索以外，也提供了聚合实时分析数据的功能。如果把搜索比喻成大海捞针，那么聚合就是去分析大海中针的特性。因此，透过聚合，我们可以得到一个数据的概览，聚合能做到的是分析和总结全套的数据，而不是查找单个文档。

聚合查询允许我们向数据提出一些复杂的问题，虽然它的功能完全不同于搜索，但是他们其实使用了相同的数据结构，这表示聚合的执行速度很快，并且像是搜索一样，是近实时的。

> 1. 由于聚合和搜索使用的一样的数据结构，因此聚合和搜索是可以一起执行的。
> 2. 我们可以在一次json请求中，同时对相同的数据进行搜索/过滤+分析。


Elasticsearch中的聚合类型主要有三种：

| aggregation | 说明 |
| --- | --- |
| `Metric Aggs` | 提供求和，求平均值等数学运算，可以对字段进行统计分析。 |
| `Bucket Aggs` | 对满足特定条件的文档进行分组。例如人类可以按照性别分为男性，女性，中性。 |
| `Pipeline Aggs` | 对其他聚合输出的结果进行再次聚合。 |


聚合的两个重要概念分别是桶 `Bucket` 和指标 `Metric`。

1. 桶是满足特定条件的文档集合。

- 当聚合操作开始被执行，每个文档会决定符合哪一个桶的条件，如果匹配到，文档将放入相应的桶并接着进行聚合操作。就像一个员工属于男性桶/女性桶/中性桶。
- 桶可以被嵌套在其他桶里面，比如北京属于中国桶，中国属于亚洲桶。
- Elasticsearch提供了很多类型的桶，像是时间，最后欢迎的词，年龄区间，地理位置等等，不过本质上都是通过同样的原理进行操作，也就是基于条件来划分文档，一个文档只要符合条件，就可以加入那个桶，因此一个文档可以同时加入很多个桶。

2. 指标指的是对桶内的文档进行统计计算。

- 桶可以让我们划分文档到有意义的集合，但是最终我们需要的是对这些桶内的文档进行一些指标的运算。
- 指标通常是一些最简单的数学运算，而这些是通过当前桶内的文档的值来计算的，利用指标能让你计算类似平均薪资，最高出售价格，P95查询耗时这样的数据。

**Aggregation Template**

当Query和Aggs一起存在时，会先执行Query的主查询，主查询Query执行完后会搜出一批结果，而这些结果才会被Aggs拿去做聚合。

> 如果不在意查询结果是什么，只在意Aggs的结果，可以把size设置为0，这样可以让返回的hits结果集是0，加快返回速度。


一个Aggs查询里面可以有很多个聚合，每个聚合之间彼此都是独立的，因此可以一个聚合拿来统计数量，一个聚合拿来分析数据，一个聚合拿来分析计算标准差，，让一次搜索就可以把想要做的事情都做完。

另外，Aggs可以嵌套在其他的Aggs里面，而嵌套的桶能作用的文档集范围，是外层的桶所输出的结果集。

For Example:

1. 按照订单类型进行聚合，统计每种类型下有多少个订单。
2. 按照订单状态聚合，统计每种状态下，每种名字的订单有多少。

```bash
GET order/_search?size=0
{
  "aggs": {
    "type_aggs": {
      "terms": {
        "field": "type",
        "size": 100
      }
    },
    "status_aggs":{
      "terms": {
        "field": "status",
        "size": 100
      },
      "aggs": {
        "sales_aggs": {
          "terms": {
            "field": "name",
            "size": 100
          }
        }
      }
    }
  }
}
```

---

## 2. Metric Aggregation

### 2.1 avg aggregation

求所有订单的平均价格。

```bash
GET order/_search?size=0
{
  "aggs": {
    "avg_price": {
      "avg": {
        "field": "price"
      }
    }
  }
}
```

`missing`参数定义了如何处理缺少值的文档。默认情况下，它们将被忽略，但也可以将它们视为具有某个值。

```bash
GET order/_search?size=0
{
  "aggs": {
    "avg_price": {
      "avg": {
        "field": "price",
        "missing": 10   
      }
    }
  }
}
```

在"price"字段没有值的文档将与具有值为10的文档落入同一个桶中。换句话说，这些文档在聚合操作中被视为具有值为10的桶。

---

### 2.2 cardinality aggregation

当谈及 Elasticsearch 提供的首个近似聚合时，不得不提到 cardinality（基数）度量。这一度量专注于估算字段中不重复或唯一值的数量。其基础是 HyperLogLog（HLL）算法，一种用于实现近似估计的方法。在执行 cardinality 聚合时，HLL 算法对输入值进行哈希处理，然后基于哈希结果中的位数进行概率估算，从而得到近似的基数估计。

这一聚合的重要特点在于其可配置的精度。这使得你能够在内存使用和聚合精度之间进行灵活的权衡。较高的精度需要更多的内存支持，而对于规模较小的数据集，你可以获得非常高的估计精度。通过调整不同的参数，你可以设定固定的内存使用量，无论数据集的规模是数千还是数十亿唯一值，内存使用量都会与所配置的精度相关联。这样的设计允许你在满足精度要求的同时，高效地管理内存资源。

For Example:统计订单有多少种类型。

```bash
GET order/_search?size=0
{
  "aggs": {
    "type_count": {
      "cardinality": {
        "field": "type"
      }
    }
  }
}
```

### 2.3 max & min aggregation

max聚合是一种单值指标聚合，它返回从聚合文档中提取的数值中的最大值。
min聚合是一种单值指标聚合，它返回从聚合文档中提取的数值中的最小值。

> min和max聚合操作的是数据的双精度表示。因此，当在绝对值大于2^53的长整型数据上运行时，结果可能是近似的。


```bash
GET order/_search?size=0
{
  "aggs": {
    "max_sales":{
      "max": {
        "field": "sales"
      }
    }
  }
}
```

```bash
GET order/_search?size=0
{
  "aggs": {
    "min_sales":{
      "min": {
        "field": "sales"
      }
    }
  }
}
```

### 2.4 stats aggregation

`stats aggregation`是一个多值度量聚合，它计算从聚合文档中提取的数值的统计信息。

返回的统计信息包括：最小值（min）、最大值（max）、总和（sum）、计数（count）和平均值（avg）。

```bash
GET /order/_search?size=0
{
  "aggs": {
    "stats_price": {
      "stats": {
        "field": "price"
      }
    }
  }
}
```

返回结果：

```json
{
  "aggregations" : {
    "stats_price" : {
      "count" : 3,
      "min" : 66.6,
      "max" : 3000.0,
      "avg" : 1063.2,
      "sum" : 3189.6
    }
  }
}
```

### 2.5 sum aggregation

`sum aggregation`聚合是一个单值指标聚合，它对从聚合文档中提取的数值进行求和。

```bash
GET /order/_search?size=0
{
  "aggs": {
    "sum_price": {
      "sum": {
        "field": "price"
      }
    }
  }
}
```

### 2.6 value count aggregation

`value count aggregation`是一个单值指标聚合，用于计算从聚合文档中提取的数值的数量。这些数值可以从文档中的特定字段提取，也可以通过提供的脚本生成。通常情况下，该聚合器会与其他单值聚合器一起使用。例如，在计算平均值时，可能会对计算平均值的数值数量感兴趣。

> `value_count` 不会对值进行去重，因此即使一个字段存在重复值，每个值都将被单独计数。


```bash
GET /order/_search?size=0
{
  "query": {
    "term": {
      "type": {
        "value": "clothes"
      }
    }
  }, 
  "aggs" : {
    "types_count" : { "value_count" : { "field" : "type" } }
  }
}
```

### 2.7 top metric aggregation

`top metric aggregation`根据具有最大或最小的 "sort" 值的文档选择指标。

```bash
## 销量最大的订单的价格
GET /order/_search?size=0
{
  "aggs": {
    "tm": {
      "top_metrics": {
        "metrics": {"field": "price"},
        "sort": {"sales": "desc"}
      }
    }
  }
}
```

### 2.8 top hits aggregation

`top_hits aggregation`跟踪被聚合的最相关文档。该聚合器旨在作为子聚合器使用，以便可以按桶对顶部匹配的文档进行聚合。

`top_hits aggregation`可以通过桶聚合器有效地按照某些字段对结果集进行分组。

| 参数 | 说明 |
| --- | --- |
| from | 从第一个结果开始的偏移量。 |
| size | 每个桶返回的最大匹配结果数。默认情况下，返回前三个匹配结果。 |
| sort | 指定如何对顶部匹配结果进行排序。默认情况下，按照主查询的分数进行排序。 |


top_hits聚合返回常规的搜索结果，因此它支持许多针对每个结果的功能，包括：

| 功能 | 描述 |
| --- | --- |
| 高亮显示（Highlighting） | 突出显示匹配的关键词或片段。 |
| 解释（Explain） | 提供有关匹配度得分的详细信息。 |
| 命名查询（Named queries） | 使用命名查询来定义搜索条件。 |
| 搜索字段（Search fields） | 指定要在搜索结果中返回的特定字段。 |
| 源过滤（Source filtering） | 根据需要过滤返回结果中的源文档字段。 |
| 存储字段（Stored fields） | 在索引时将字段存储在磁盘上，可以在搜索结果中返回这些字段。 |
| 脚本字段（Script fields） | 通过执行脚本来生成结果中的自定义字段。 |
| Doc value字段 | 从存储的字段值中提取数据。 |
| 包含版本信息（Include versions） | 在搜索结果中包含每个文档的版本号。 |
| 包含序列号和主要项（Include Sequence Numbers and Primary Terms） | 在搜索结果中包含每个文档的序列号和主要项。 |


这些功能可以让你根据需要对搜索结果进行进一步处理和分析。

> 如果你只需要使用 `docvalue_fields`、`size`和 `sort`这些参数，那么Top Metrics可能是比Top Hits Aggregation更高效的选择。


For Example: 按状态对订单进行分组，并对每种状态显示最后一个订单。对于每个订单，只有日期，名字和价格字段被包含在源中。

```bash
GET /order/_search?size=0
{
  "aggs": {
    "top_tags": {
      "terms": {
        "field": "status",
        "size": 3
      },
      "aggs": {
        "top_sales_hits": {
          "top_hits": {
            "sort": [
              {
                "createTime": {
                  "order": "desc"
                }
              }
            ],
            "_source": {
              "includes": [ "createTime", "price","name"]
            },
            "size": 1
          }
        }
      }
    }
  }
}
```

响应结果：

```json
{
  "aggregations" : {
    "top_tags" : {
      "doc_count_error_upper_bound" : 0,
      "sum_other_doc_count" : 0,
      "buckets" : [
        {
          "key" : "已付款",
          "doc_count" : 1,
          "top_sales_hits" : {
            "hits" : {
              "total" : {
                "value" : 1,
                "relation" : "eq"
              },
              "max_score" : null,
              "hits" : [
                {
                  "_index" : "order",
                  "_type" : "_doc",
                  "_id" : "2",
                  "_score" : null,
                  "_source" : {
                    "createTime" : "2023-02-12",
                    "price" : 123,
                    "name" : "xiongzhao"
                  },
                  "sort" : [
                    1676160000000
                  ]
                }
              ]
            }
          }
        },
        {
          "key" : "已完成",
          "doc_count" : 1,
          "top_sales_hits" : {
            "hits" : {
              "total" : {
                "value" : 1,
                "relation" : "eq"
              },
              "max_score" : null,
              "hits" : [
                {
                  "_index" : "order",
                  "_type" : "_doc",
                  "_id" : "1",
                  "_score" : null,
                  "_source" : {
                    "createTime" : "2023-01-11",
                    "price" : 66.6,
                    "name" : "kuchazi"
                  },
                  "sort" : [
                    1673395200000
                  ]
                }
              ]
            }
          }
        },
        {
          "key" : "待收货",
          "doc_count" : 1,
          "top_sales_hits" : {
            "hits" : {
              "total" : {
                "value" : 1,
                "relation" : "eq"
              },
              "max_score" : null,
              "hits" : [
                {
                  "_index" : "order",
                  "_type" : "_doc",
                  "_id" : "3",
                  "_score" : null,
                  "_source" : {
                    "createTime" : "2023-03-16",
                    "price" : 3000,
                    "name" : "heisi"
                  },
                  "sort" : [
                    1678924800000
                  ]
                }
              ]
            }
          }
        }
      ]
    }
  }
}
```

### 2.9 string stats aggregation

字符串统计聚合是一种多值度量聚合，用于计算从聚合文档中提取的字符串值的统计信息。这些值可以从特定的关键字字段中检索。

字符串统计聚合返回以下结果:

| 度量指标 | 解释 |
| --- | --- |
| `count` | 非空字段的数量 |
| `min_length` | 最短词的长度 |
| `max_length` | 最长词的长度 |
| `avg_length` | 所有词长度的平均值 |
| `entropy` | 聚合收集的所有词的香农熵值 |


```bash
GET /order/_search?size=0
{
  "aggs": {
    "message_stats": {
      "string_stats": {
        "field": "type"
      }
    }
  }
}
```

响应结果：

```json
{
  "aggregations" : {
    "message_stats" : {
      "count" : 3,
      "min_length" : 7,
      "max_length" : 7,
      "avg_length" : 7.0,
      "entropy" : 2.8073549220576046
    }
  }
}
```

---

## 3. Bucket Aggregation

> `search.max_buckets` 集群设置限制了单个响应中允许的桶数量。这个设置的目的是为了防止聚合操作生成过多的桶，从而消耗过多的内存和计算资源。默认情况下，`search.max_buckets` 的值为10000。如果聚合操作生成的桶数量超过了这个限制，Elasticsearch将会返回一个异常，并提示超过了最大桶数限制。可以根据需要调整 `search.max_buckets` 的值来平衡聚合操作的需求和系统资源的消耗。


### 3.1 terms aggregation

`terms aggregation` 针对某一个fields的值进行分组，field有几种值就分成几组。

> 1. terms桶在进行分组时，会为此field中的每一种值创建一个新桶。
> 2. 这里的terms桶和用于主查询的query中的查找terms是不同的概念。


```bash
GET /order/_search?size=0
{
  "aggs": {
    "status_terms": {
      "terms": {
        "field": "status"
      }
    }
  }
}
```

默认情况下，terms聚合将按照文档数量（doc_count）的顺序返回前十个terms的桶。可以通过设置size参数来更改这种默认行为。

字段可以是关键字（Keyword）、数值（Numeric）、IP地址（ip）、布尔值（boolean）或二进制（binary）类型的字段。根据字段的类型，terms聚合将对其进行分桶和聚合计算。例如，对于keyword字段，terms聚合将根据每个唯一的关键字值创建一个桶，并计算每个桶中文档的数量等聚合指标。

> 默认情况下，无法在text类型的字段上运行terms聚合。可以使用keyword子字段（keyword sub-field）代替。或者可以在text类型字段上启用`fielddata`以创建该字段分析后的terms的桶。启用`fielddata`可能会显著增加内存使用量。


### 3.2 filter aggregation

`filter aggregation` 一个用来过滤的桶。

此处的filter桶和用在主查询的query的过滤桶用法是一模一样的，都是过滤。不过差别是filter桶会自己创建一个新桶，而不会像filter依附在query下。 因为filter桶毕竟还是一个聚合桶，因此他可以和别的桶进行嵌套，但是他不是依附在别的桶上。

For Example:
求所有订单的平均价格和"衣服类订单"的平均价格。

```bash
GET /order/_search?size=0&filter_path=aggregations
{
  "aggs": {
    "avg_price": { "avg": { "field": "price" } },
    "clothes_avg_price": {
      "filter": { "term": { "type": "clothes" } },
      "aggs": {
        "avg_price": { "avg": { "field": "price" } }
      }
    }
  }
}
```

响应结果：

```json
{
  "aggregations" : {
    "clothes_avg_price" : {
      "doc_count" : 3,
      "avg_price" : {
        "value" : 1063.2
      }
    },
    "avg_price" : {
      "value" : 1063.2
    }
  }
}
```

为了限制搜索中所有聚合扫描的文档数量，使用`Top level Query`，比使用包含子聚合的单个过滤聚合更快。

```bash
GET /order/_search?size=0&filter_path=aggregations
{
  "query": {
    "term": {
      "type": "clothes"
    }
  },
  "aggs": {
    "avg_price": {
      "avg": {
        "field": "price"
      }
    }
  }
}
```

### 3.3 filters aggregation

一个多桶聚合，其中每个桶包含与查询匹配的文档。

For Example：

```bash
PUT /logs/_bulk?refresh
{ "index" : { "_id" : 1 } }
{ "body" : "warning: page could not be rendered" }
{ "index" : { "_id" : 2 } }
{ "body" : "authentication error" }
{ "index" : { "_id" : 3 } }
{ "body" : "warning: connection timed out" }

GET logs/_search
{
  "size": 0,
  "aggs": {
    "messages": {
      "filters": {
        "filters": {
          "errors": {
            "match": {
              "body": "error"
            }
          },
          "warnings": {
            "match": {
              "body": "warning"
            }
          }
        }
      }
    }
  }
}
```

上面的SQL，我们分析日志消息。该聚合将构建两个日志消息的集合（桶），一个包含所有包含错误的消息，另一个包含所有包含警告的消息。

响应结果：

```json
{
  "aggregations": {
    "messages": {
      "buckets": {
        "errors": {
          "doc_count": 1
        },
        "warnings": {
          "doc_count": 2
        }
      }
    }
  }
}
```

filters字段也可以作为一个过滤器数组提供。

For Example：

```bash
GET logs/_search
{
  "size": 0,
  "aggs": {
    "messages": {
      "filters": {
        "filters": [
          {
            "match": {
              "body": "error"
            }
          },
          {
            "match": {
              "body": "warning"
            }
          }
        ]
      }
    }
  }
}
```

响应结果的桶排序和请求的条件排序是一一对应的。

```json
{
  "aggregations": {
    "messages": {
      "buckets": [
        {
          "doc_count": 1
        },
        {
          "doc_count": 2
        }
      ]
    }
  }
}
```

#### Other bucket

`other_bucket`参数可以设置为在响应中添加一个桶，该桶将包含所有不匹配给定过滤器的文档。该参数的值可以如下所示：

- true：将添加一个包含不匹配任何过滤器的文档的桶。
- false：不会添加其他桶。

`other_bucket_key`参数用于将其他桶的键设置为除默认值"other"以外的其他值。设置此参数将隐式将`other_bucket`参数设置为true。

```bash
PUT logs/_doc/4?refresh
{
  "body": "info: user Bob logged out"
}

GET logs/_search
{
  "size": 0,
  "aggs": {
    "messages": {
      "filters": {
        "other_bucket_key": "other_messages",
        "filters": {
          "errors": {
            "match": {
              "body": "error"
            }
          },
          "warnings": {
            "match": {
              "body": "warning"
            }
          }
        }
      }
    }
  }
}
```

响应结果：

```json
{
  "aggregations": {
    "messages": {
      "buckets": {
        "errors": {
          "doc_count": 1
        },
        "warnings": {
          "doc_count": 2
        },
        "other_messages": {
          "doc_count": 1
        }
      }
    }
  }
}
```

### 3.4 range aggregation

这是一个基于多桶值源的聚合，允许用户定义一组范围，每个范围代表一个桶。在聚合过程中，从每个文档中提取的值将与每个桶范围进行比较，并将相关/匹配的文档放入相应的桶中。

> 该聚合包括每个范围的from值但不包括to值。


For Example:

```bash
GET order/_search
{
  "size": 0,
  "aggs": {
    "price_ranges": {
      "range": {
        "field": "price",
        "ranges": [
          {
            "to": 100
          },
          {
            "from": 100,
            "to": 200
          },
          {
            "from": 200
          }
        ]
      }
    }
  }
}
```

响应结果：

```json
{
  "aggregations" : {
    "price_ranges" : {
      "buckets" : [
        {
          "key" : "*-100.0",
          "to" : 100.0,
          "doc_count" : 1
        },
        {
          "key" : "100.0-200.0",
          "from" : 100.0,
          "to" : 200.0,
          "doc_count" : 1
        },
        {
          "key" : "200.0-*",
          "from" : 200.0,
          "doc_count" : 1
        }
      ]
    }
  }
}
```

将keyed标志设置为true将为每个桶关联一个唯一的字符串键，并将范围作为哈希而不是数组返回。

```bash
GET order/_search
{
  "size": 0,
  "aggs": {
    "price_ranges": {
      "range": {
        "field": "price",
        "keyed": true, 
        "ranges": [
          {
            "to": 100
          },
          {
            "from": 100,
            "to": 200
          },
          {
            "from": 200
          }
        ]
      }
    }
  }
}
```

也可以自己给每一个范围指定key。

```bash
GET order/_search
{
  "size": 0, 
  "aggs": {
    "price_ranges": {
      "range": {
        "field": "price",
        "keyed": true,
        "ranges": [
          {
            "key": "cheap",
            "to": 100
          },
          {
            "key": "average",
            "from": 100,
            "to": 200
          },
          {
            "key": "expensive",
            "from": 200
          }
        ]
      }
    }
  }
}
```

### 3.5 date range aggregation

日期范围聚合是专门针对日期值的聚合方式。与普通的范围聚合的主要区别在于，from 和 to 值可以使用日期数学表达式表示，还可以指定日期格式，用于返回 from 和 to 的响应字段。

> 该聚合包含 from 值但不包含 to 值。


```bash
GET /order/_search?size=0
{
  "aggs": {
    "range": {
      "date_range": {
        "field": "createTime",
        "format": "yyyy-MM-dd",
        "ranges": [
          { "to": "now-10M/M" },  
          { "from": "now-10M/M" } 
        ]
      }
    }
  }
}
```

在上面的示例中，我们创建了两个范围桶。第一个桶将把所有早于10个月前的文档分为一组，第二个桶将把所有晚于10个月前的文档分为一组。

> 如果格式或日期值不完整，日期范围聚合会用默认值替换任何缺失的组成部分。


### 3.6 Histogram aggregation

`Histogram Aggregation` 可以对区间进行分组，但这个区间是固定间隔的。

```bash
GET /order/_search?size=0
{
  "aggs": {
    "prices": {
      "histogram": {
        "field": "price",
        "interval": 50
      }
    }
  }
}
```

### 3.7 Composite aggregation

> 使用composite聚合会带来一定的开销。在将composite聚合应用于生产环境之前，建议对应用程序进行负载测试，以评估性能和资源消耗情况。这样可以确保应用程序在使用composite聚合时具有足够的性能和可扩展性。


`Composite Aggregation`是一种多桶聚合，用于创建组合桶以支持分页和遍历聚合结果。它是一种有效的分页机制，适用于大型数据集和复杂的多级聚合情况。

Composite聚合可以从多个源（字段或脚本）提取或创建值，并将这些值的组合作为桶进行聚合。每个组合都被视为一个独立的桶，而且可以按照指定的排序顺序进行遍历和处理。

下面是一个示例，演示如何使用`Composite Aggregation`进行分页和遍历聚合结果。

```bash
GET /order/_search
{
  "size": 0,
  "aggs": {
    "composite_agg": {
      "composite": {
        "size": 2,
        "sources": [
          {
            "type_aggs": {
              "terms": {
                "field": "type"
              }
            }
          },
          {
            "sales_aggs": {
              "histogram": {
                "field": "sales",
                "interval": 10
              }
            }
          }
        ]
      },
      "aggregations": {
        "avg_price": {
          "avg": {
            "field": "price"
          }
        }
      }
    }
  }
}
```

在上面的SQL中，使用`Composite Aggregation`来分页并遍历数据。`Composite Aggregation`包含两个源：类型（terms桶）和销量（histogram桶）。我们设置了每页返回2个桶，并计算了每个桶中的平均价格（avg_price）。

通过这个聚合查询，可以按照类型和销量进行分页遍历结果。每次返回的结果集中会包含2个桶，每个桶都具有不同的类型和销量范围。同时还可以获取每个桶的平均售价。

在处理聚合结果时，可以使用`after_key`参数来指定下一页的起始位置。例如，如果想获取下一页的结果，可以将上一页结果中最后一个桶的`after_key`值作为新的请求参数。

使用`Composite Aggregation` 可以灵活地分页和遍历聚合结果，无需一次性加载所有数据，对于处理大型数据集和复杂聚合非常有用。

```bash
GET /order/_search
{
  "size": 0,
  "aggs": {
    "composite_agg": {
      "composite": {
        "after": {
          "type_aggs": "clothes",
          "sales_aggs": 80
        },
        "size": 2,
        "sources": [
          {
            "type_aggs": {
              "terms": {
                "field": "type"
              }
            }
          },
          {
            "sales_aggs": {
              "histogram": {
                "field": "sales",
                "interval": 10
              }
            }
          }
        ]
      },
      "aggregations": {
        "avg_price": {
          "avg": {
            "field": "price"
          }
        }
      }
    }
  }
}
```

---

## 4. Pipeline Aggregations

For Example：
现在有这样一个需求，在销售量最好的 2 个订单里，找出平均价格最低的订单。

```bash
GET /order/_search
{
  "aggs": {
    "best_order": {
      "terms": {
        "field": "id",
        "size": 2,
        "order": { "sales_total": "desc" }
      },
      "aggs": {
        "sales_total": {
          "sum": { "field": "sales" }
        },
        "avg_price": {
          "avg": { "field": "price" }
        }
      }
    },
    "min_avg_price": {
      "min_bucket": {
        "buckets_path": "best_order>avg_price"
      }
    }
  },
  "size": 0
}

## 结果
{
  "aggregations" : {
    "best_order" : {
      "doc_count_error_upper_bound" : 0,
      "sum_other_doc_count" : 1,
      "buckets" : [
        {
          "key" : "3",
          "doc_count" : 1,
          "sales_total" : {
            "value" : 10000.0
          },
          "avg_price" : {
            "value" : 3000.0
          }
        },
        {
          "key" : "1",
          "doc_count" : 1,
          "sales_total" : {
            "value" : 88.0
          },
          "avg_price" : {
            "value" : 66.6
          }
        }
      ]
    },
    "min_avg_price" : {
      "value" : 66.6,
      "keys" : [
        "1"
      ]
    }
  }
}
```

如上示例，在 "best_order" 中我们做了以下几件事：

1. 按订单进行分桶。
2. 执行子聚合，计算每个订单的销售总量和订单的平均价格。
3. 排序结果按 "sales_total"（销量）倒序排序，并且获取排序后的前两个结果。

最终在 "best_order" 中我们得出了销量最多的两个订单和它们书本的平均售价、销售总量。

最后使用 `Pipeline Aggregations` 找出平均售价最低的订单即可。上面的示例是一个简单的例子，"min_avg_price" 是我们指定的名字，使用 "min_bucket" 求出之前结果的最小值，并且通过 "buckets_path" 关键字来指定路径，例子中我们的路径为 "best_order" 下的 "avg_price"。

通过上面的例子可以看到 `Pipeline aggregations` 提供的功能了。`Pipeline` 分析的结果会输出到原查询的结果中，根据位置的不同可以分为两类：

-  `Sibling`: 结果和原结果同级， 如上面的列子就是 Sibling。Sibling 可以有 `Max Bucket、Min Bucket、Avg Bucket、Sum Bucket` 等 
-  `Parent`: 结果会内嵌到现有的聚合分析结果中。提供如 `Derivative （求导）、Moving Function （滑动窗口）` 等功能。 

---

> [更多内容->官方文档](https://www.elastic.co/guide/en/elasticsearch/reference/7.17/search-aggregations.html)


## 5. Terms Aggregation 结果不准？

### 5.1 为什么不准？

当设置了size参数时，结果列表可能不是完全准确的`Top size`个terms桶，而是一个近似的结果。这是由于在分片级别上计算和返回terms桶，然后在协调节点上进行汇总和处理的过程中可能会存在轻微的不准确性。

For Example:
![image.png](https://raw.githubusercontent.com/huidongyin/DrawingBed/main/elasticsearch/202311042117323.png)
上图，对于总量数据来说，数据排序为：A(20)、B(16)、D(8)、C(7)，top 3 为：A(20)、B(16)、**D(8)**  。而聚合得出的错误 top 3 为：A(20)、B(16)、**C(5)**  。因为在 P0 分片的 top 3 丢掉了 D(4), 而 P1 分片中返回 top 3 中丢掉了 C(2)，而丢掉的这部分数据恰好会影响最终的结果。

**协调节点会从每个分片的 top n 数据中最终排序出 top n，但每个分片的 top n 并不一定是全量数据的 top n**。

> 如果想检索所有terms或所有terms的组合，而不是在terms聚合中设置一个大于字段的基数的size值，应该使用`Composite aggregation`。`Composite aggregation`允许对所有可能的terms进行分页，而不仅仅返回顶部的terms。`terms aggregation`旨在返回`Top terms`，不支持分页功能。


请求的size参数越大，结果的准确性就越高，但计算最终结果的成本也越高（由于在分片级别管理更大的优先级队列和节点与客户端之间更大的数据传输）。

为了减少更大请求大小所带来的额外工作量，可以使用shard_size参数。当定义了shard_size参数时，它将确定协调节点从每个分片请求的terms数。一旦所有分片都响应，协调节点将它们缩减为最终结果，该结果基于size参数。通过这种方式，可以提高返回的terms的准确性，并避免将大量的bucket流式传输回客户端所带来的开销。

> shard_size参数不能小于size参数（因为这没有太多意义）。当shard_size小于size时，Elasticsearch会将其覆盖并重置为与size相等。
默认的shard_size = (size * 1.5 + 10)。


### 5.2 document count error

doc_count值对于terms聚合可能是近似值。因此，对于terms聚合的任何子聚合也可能是近似值。

为了计算doc_count值，每个分片提供其自己的`Top terms`和文档计数。聚合将这些分片级别的结果合并以计算其最终的doc_count值。为了衡量doc_count值的准确性，聚合结果包括以下属性：

| 字段 | 说明 |
| --- | --- |
| `sum_other_doc_count` | （整数）除了返回结果中的 terms 外，其他没有返回的 terms 的文档数量之和。 |
| `doc_count_error_upper_bound` | （整数）没有在本次聚合返回的分组中，包含文档数的可能最大值的和。如果是 0，说明聚合结果是准确的。 |


### 5.3 per bucket document count error

设置`show_term_doc_count_error`为true以获取每个terms的`doc_count_error_upper_bound`值。

```bash
GET /_search
{
  "aggs": {
    "products": {
      "terms": {
        "field": "product",
        "size": 5,
        "show_term_doc_count_error": true
      }
    }
  }
}
```

这将显示聚合返回的每个term的错误值，该值表示文档计数中的最坏情况错误，并在确定shard_size参数的值时可能会有用。计算方法是对所有未返回该term的分片的最后一个term的文档计数求和。

只有在按照文档计数的降序对term进行排序时，才能以这种方式计算这些错误。当聚合按term值本身（无论是升序还是降序）排序时，文档计数中没有错误，因为如果一个分片不返回另一个分片的结果中出现的特定term，那么它的索引中就不包含该term。当聚合按照子聚合进行排序或按升序文档计数顺序排序时，无法确定文档计数的错误，并将其赋予值-1以表示此情况。

### 5.4 order

可以通过设置order参数来自定义桶的顺序。默认情况下，桶按照doc_count降序排序。

> 不建议按升序排序_count或按子聚合排序，因为这会增加文档计数的误差。当查询单个分片或在索引时使用的字段作为路由键时，这是可以接受的：在这些情况下，结果将是准确的，因为分片具有不重叠的值。否则，错误是无限制的。一个特殊的情况仍然可能有用，即按最小或最大聚合排序：计数可能不准确，但至少可以正确选择顶部的桶。


---

> [更多内容->官方文档](https://www.elastic.co/guide/en/elasticsearch/reference/7.17/search-aggregations.html)

