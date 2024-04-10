(window.webpackJsonp=window.webpackJsonp||[]).push([[195],{576:function(e,o,r){"use strict";r.r(o);var _=r(4),v=Object(_.a)({},(function(){var e=this,o=e._self._c;return o("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[o("p",[e._v("本篇会分析 Leader 选举的几种时机以及每一种时机的详细流程和原理。")]),e._v(" "),o("hr"),e._v(" "),o("h2",{attrs:{id:"_1-集群启动时候选举的流程"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#_1-集群启动时候选举的流程"}},[e._v("#")]),e._v(" 1.集群启动时候选举的流程")]),e._v(" "),o("p",[e._v("先来看第一种 Leader 选举时机：ZooKeeper 服务启动的时候。")]),e._v(" "),o("p",[e._v("为什么集群启动时候会进行选举？因为刚启动的时候，节点状态都是 LOOKING，寻主状态，而且是刚启动，肯定是无主的，需要选举的，所以肯定需要投票进行 Leader 选举。")]),e._v(" "),o("p",[e._v("假设我们要搭建一个 ZooKeeper 集群，集群内有三个 ZooKeeper 服务，分别为：Zookeeper1、Zookeeper2 和 Zookeeper3。按顺序启动，那么哪台机器最有可能被选举为 Leader 呢？为什么？我们先分析下集群启动时候的选举流程，然后我们再反过来看这个问题。")]),e._v(" "),o("p",[e._v("我们知道在选举的时候， "),o("strong",[e._v("首轮投票都会投给自己")]),e._v(" ，因为集群内彼此不知道各自的 "),o("code",[e._v("zxid")]),e._v(" 和 "),o("code",[e._v("myid")]),e._v(" 等参数，所以 Zookeeper1、Zookeeper2 和 Zookeeper3 的票箱如下图所示：")]),e._v(" "),o("p",[o("img",{attrs:{src:"https://raw.githubusercontent.com/huidongyin/DrawingBed/main/Zookeeper/202312142308407.png",alt:""}})]),e._v(" "),o("p",[e._v("由于第一轮，大家都自己投了自己，这时候票箱如下：")]),e._v(" "),o("table",[o("thead",[o("tr",[o("th",[e._v("服务")]),e._v(" "),o("th",[e._v("票箱")])])]),e._v(" "),o("tbody",[o("tr",[o("td",[e._v("Zookeeper1")]),e._v(" "),o("td",[e._v("(1,1)、(2,2)、(3,3)，相当于每人都只有1票，持平")])]),e._v(" "),o("tr",[o("td",[e._v("Zookeeper2")]),e._v(" "),o("td",[e._v("(1,1)、(2,2)、(3,3)，相当于每人都只有1票，持平")])]),e._v(" "),o("tr",[o("td",[e._v("Zookeeper3")]),e._v(" "),o("td",[e._v("(1,1)、(2,2)、(3,3)，相当于每人都只有1票，持平")])])])]),e._v(" "),o("p",[e._v("现在每个节点的票数都一样，都是 1 票，所以不分胜负，那只能进行下一轮投票了。那下一轮投给谁呢？我们先把上一篇画的图拿出来重新回忆一下选举流程：")]),e._v(" "),o("p",[o("img",{attrs:{src:"https://raw.githubusercontent.com/huidongyin/DrawingBed/main/Zookeeper/202312132239275.jpg",alt:""}})]),e._v(" "),o("p",[e._v("按照我们在上一篇中的设计来分析的话，先对比 "),o("code",[e._v("logicClock")]),e._v("，优先投给 "),o("code",[e._v("logicClock")]),e._v(" 大的；但是现在发现 "),o("code",[e._v("logicClock")]),e._v(" 都一样大，也就是走到了上图中的第 ⑥ 步骤，开始对比 "),o("code",[e._v("vote_zxid")]),e._v("。")]),e._v(" "),o("blockquote",[o("p",[o("code",[e._v("vote_zxid")]),e._v(" 就是被推荐服务器上所保存数据的最大 "),o("code",[e._v("zxid")]),e._v("。")])]),e._v(" "),o("p",[e._v("但是，现在三个 ZooKeeper 服务都把票投递给了自己，并且因为都是刚启动的，还没处理请求，也是首轮选举，所以它们的 "),o("code",[e._v("epoch")]),e._v(" 和事物写次数都是 0，也就是说这三个 ZooKeeper 服务的 "),o("code",[e._v("zxid")]),e._v(" 也都一样，都是 0。于是就走到了我们上图中的第 ⑦ 步骤，开始对比 "),o("code",[e._v("vote_id")]),e._v("。")]),e._v(" "),o("blockquote",[o("p",[o("code",[e._v("vote_id")]),e._v(" 就是被推荐服务器的 "),o("code",[e._v("myid")]),e._v("。")])]),e._v(" "),o("p",[e._v("那很明显，Zookeeper3 的 myid 是最大的，所以事情变得简单了，终于有结论了。Zookeeper1 和 Zookeeper2 会将票投给 Zookeeper3，而 Zookeeper3 仍然会投给自己。详细核心流程如下。")]),e._v(" "),o("ol",[o("li",[e._v("Zookeeper1 收到 Zookeeper2 和 Zookeeper3 的投票后，发现三者的 "),o("code",[e._v("logicClock")]),e._v(" 和 "),o("code",[e._v("vote_zxid")]),e._v(" 都一样，所以只能找最大的 "),o("code",[e._v("myid")]),e._v(" 进行选举，发现 Zookeeper3 的 "),o("code",[e._v("myid")]),e._v(" 是3，而 Zookeeper2 的 "),o("code",[e._v("myid")]),e._v(" 是 2，因此 Zookeeper1 将宝贵的一票投给 Zookeeper3。")]),e._v(" "),o("li",[e._v("Zookeeper2 收到 Zookeeper1 和 Zookeeper3 的投票后，发现三者的 "),o("code",[e._v("logicClock")]),e._v(" 和 "),o("code",[e._v("vote_zxid")]),e._v(" 都一样，所以只能找最大的 "),o("code",[e._v("myid")]),e._v(" 进行选举，发现 Zookeeper3 的 "),o("code",[e._v("myid")]),e._v(" 是 3，而Zookeeper1 的 "),o("code",[e._v("myid")]),e._v(" 是 1，因此 Zookeeper2 将宝贵的一票也投给 Zookeeper3。")]),e._v(" "),o("li",[e._v("Zookeeper3 同理，将票留给自己。")])]),e._v(" "),o("p",[o("img",{attrs:{src:"https://raw.githubusercontent.com/huidongyin/DrawingBed/main/Zookeeper/202312142310578.png",alt:""}})]),e._v(" "),o("p",[e._v("第二轮投完了，这时候我们看下票箱情况：")]),e._v(" "),o("table",[o("thead",[o("tr",[o("th",[e._v("服务")]),e._v(" "),o("th",[e._v("票箱")])])]),e._v(" "),o("tbody",[o("tr",[o("td",[e._v("Zookeeper1")]),e._v(" "),o("td",[e._v("(1,3)、(2,3)、(3,3)，三个节点都投递给了Zookeeper3")])]),e._v(" "),o("tr",[o("td",[e._v("Zookeeper2")]),e._v(" "),o("td",[e._v("(1,3)、(2,3)、(3,3)，三个节点都投递给了Zookeeper3")])]),e._v(" "),o("tr",[o("td",[e._v("Zookeeper3")]),e._v(" "),o("td",[e._v("(1,3)、(2,3)、(3,3)，三个节点都投递给了Zookeeper3")])])])]),e._v(" "),o("p",[e._v("所以毫无争议，大家都认为 Zookeeper3 最适合当 Leader，其实本来是过半就行，但是目前大家都同意，那自然最好不过了。Leader 选完了，接下来需要干什么？"),o("code",[e._v("改状态！")]),e._v("现在状态还是 LOOKING ，我们需要给 Zookeeper3 改为 "),o("code",[e._v("LEADING")]),e._v("，而 Zookeeper1 和 Zookeeper2 改为 "),o("code",[e._v("FOLLOWING")]),e._v(" 状态，然后 Leader 发起与各个 Follower 之间的心跳。")]),e._v(" "),o("p",[o("img",{attrs:{src:"https://raw.githubusercontent.com/huidongyin/DrawingBed/main/Zookeeper/202312142311660.png",alt:""}})]),e._v(" "),o("p",[e._v("目前我们已经讲解完第一个选举时机的全流程了，接下来回归到我们最初的问题：集群内有三个 ZooKeeper 服务，分别为 Zookeeper1、Zookeeper2 和 Zookeeper3，"),o("code",[e._v("按顺序启动")]),e._v("，那么哪台机器最有可能被选举为 Leader 呢？为什么？")]),e._v(" "),o("p",[e._v("按照我们上面的分析，好像最后选出来的是 Zookeeper3 这个服务，但最后选出来的 Leader 真的是 Zookeeper3 吗？因为按顺序启动，也就是先启动 Zookeeper1，然后 Zookeeper1 开始寻主，发现只有自己，不能构成集群，所以不能升级为 Leader；这时候 Zookeeper2 启动了，也开始寻主、投票。开始都会投给自己，但是第二轮的时候 Zookeeper1 发现 Zookeeper2 的 "),o("code",[e._v("myid")]),e._v(" 最大，会把票投给 Zookeeper2，那这时候的结果就是 Zookeeper1 零票、Zookeeper2 两票。按照过半原则，已经符合升级为 Leader 的条件，所以这时候 Zookeeper2 就已经被选为 Leader 了。")]),e._v(" "),o("p",[e._v("那 Zookeeper3 呢？选主是毫秒级别的，而服务启动是秒级别的，在 Zookeeper3 启动完成之前，Zookeeper2 早就被选为 Leader 了！因此，这个问题的答案大概率是 Zookeeper2 被选为 Leader！")]),e._v(" "),o("p",[e._v("Zookeeper3 启动完成后咋办呢？它当然也会进行投票，但是投完后发现 Zookeeper1 和 Zookeeper2 都回应已经有Leader了且 Leader 是 Zookeeper2，那么 Zookeeper3 发现过半的人都回复 Leader 是 Zookeeper2，那就直接作为 Follower 追随 Zookeeper2 这个 Leader。")]),e._v(" "),o("hr"),e._v(" "),o("h2",{attrs:{id:"_2-follower-重启投票流程"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#_2-follower-重启投票流程"}},[e._v("#")]),e._v(" 2.Follower 重启投票流程")]),e._v(" "),o("p",[e._v("我们接着看第二个投票时机：Follower 宕机重启了，这时候该怎么办？")]),e._v(" "),o("p",[e._v("Follower 宕机有啥问题？啥问题也没有，只是少了一台节点对外提供读能力而已，因为只有 Leader 能处理写请求，所以我们先可以明确一点就是 Follower 意外宕机，其实影响范围不是很大。")]),e._v(" "),o("p",[e._v("回归正题：Follower 重启投票流程。")]),e._v(" "),o("p",[e._v("假设 Zookeeper1 重启了，首先 Follower 重启后的状态是 LOOKING，所以会发起投票，且首轮会把票投给自己然后通过网络广播出去，如下图所示：")]),e._v(" "),o("p",[o("img",{attrs:{src:"https://raw.githubusercontent.com/huidongyin/DrawingBed/main/Zookeeper/202312142312089.png",alt:""}})]),e._v(" "),o("p",[e._v("这时候 Zookeeper2 和 Zookeeper3 收到了 Zookeeper1 的投票，会响应给 Zookeeper1 什么呢？")]),e._v(" "),o("ul",[o("li",[e._v("首先，假设 Zookeeper3 是 Leader，那么 Zookeeper3 会给它回复一个：我就是 Leader。")]),e._v(" "),o("li",[e._v("其次，Zookeeper2 收到 Zookeeper1 的投票后，也会回复一个：Zookeeper3 是 Leader，我是 Follower。")]),e._v(" "),o("li",[e._v("最后，Zookeeper1 收到其他两台机器的回复后，发现 Zookeeper3 就是 Leader 的票数超过一半了，所以 Zookeeper1 改为 Follower 。")])]),e._v(" "),o("p",[e._v("具体过程如下图：")]),e._v(" "),o("p",[o("img",{attrs:{src:"https://raw.githubusercontent.com/huidongyin/DrawingBed/main/Zookeeper/202312142313287.png",alt:""}})]),e._v(" "),o("p",[e._v("当然不能忘了改状态，给 Zookeeper1 修改状态为 Follower，且 Zookeeper3 会维持 Follower 的心跳。")]),e._v(" "),o("p",[o("img",{attrs:{src:"https://raw.githubusercontent.com/huidongyin/DrawingBed/main/Zookeeper/202312142314199.png",alt:""}})]),e._v(" "),o("p",[e._v("上面讲解了 Follower 挂了的投票流程，那么如果是 Leader 挂了，该怎么办？")]),e._v(" "),o("hr"),e._v(" "),o("h2",{attrs:{id:"_3-leader-重启投票流程"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#_3-leader-重启投票流程"}},[e._v("#")]),e._v(" 3.Leader 重启投票流程")]),e._v(" "),o("p",[e._v("Leader 挂了所有的写请求都无法得到处理，那就是属于亚健康状态了，所以需要进行 "),o("code",[e._v("选主")]),e._v("。那怎么选主呢？")]),e._v(" "),o("p",[e._v("首先，假设 Zookeeper3 是 Leader，然后它挂了，所以 Follower1 和 Follower2 发现 Leader 挂了（没心跳了），就会进入 LOOKING 状态，重新进行选举。我们先来看下图（Leader 挂了，Follower 进入 LOOKING 状态）：")]),e._v(" "),o("p",[o("img",{attrs:{src:"https://raw.githubusercontent.com/huidongyin/DrawingBed/main/Zookeeper/202312142314807.png",alt:""}})]),e._v(" "),o("p",[e._v("然后，两个 LOOKING 状态的 Zookeeper 要重新发起选举，老规矩，还是先投自己，然后通过网络广播出去。如下图：")]),e._v(" "),o("p",[o("img",{attrs:{src:"https://raw.githubusercontent.com/huidongyin/DrawingBed/main/Zookeeper/202312142315197.png",alt:""}})]),e._v(" "),o("p",[e._v("接下来又是重复的流程。")]),e._v(" "),o("ul",[o("li",[e._v("Zookeeper2 收到 Zookeeper1 的投票，发现二者的 "),o("code",[e._v("logicClock")]),e._v("和 "),o("code",[e._v("zxid")]),e._v(" 都一样，那就对比 "),o("code",[e._v("myid")]),e._v("，结果发现 Zookeeper2 自己的 "),o("code",[e._v("myid")]),e._v(" 是大于接收到外部 Zookeeper1 发起的投票的 "),o("code",[e._v("myid")]),e._v("，所以 Zookeeper2 仍然投自己一票并通过网络发给 Zookeeper1。")]),e._v(" "),o("li",[e._v("Zookeeper1 同样收到 Zookeeper2 的投票，结果发现二者的 "),o("code",[e._v("logicClock")]),e._v(" 和 "),o("code",[e._v("zxid")]),e._v(" 都一样，"),o("code",[e._v("myid")]),e._v(" 还小于 Zookeeper2 的，那就也将宝贵的一票投给 Zookeeper2。")])]),e._v(" "),o("p",[e._v("如下图：")]),e._v(" "),o("p",[o("img",{attrs:{src:"https://raw.githubusercontent.com/huidongyin/DrawingBed/main/Zookeeper/202312142316359.png",alt:""}})]),e._v(" "),o("p",[e._v("这时候我们看下票箱情况：")]),e._v(" "),o("table",[o("thead",[o("tr",[o("th",[e._v("服务")]),e._v(" "),o("th",[e._v("票箱")])])]),e._v(" "),o("tbody",[o("tr",[o("td",[e._v("Zookeeper1")]),e._v(" "),o("td",[e._v("(1,2)、(2,2)，Zookeeper2两票，Zookeeper1零票")])]),e._v(" "),o("tr",[o("td",[e._v("Zookeeper2")]),e._v(" "),o("td",[e._v("(1,2)、(2,2)，Zookeeper2两票，Zookeeper1零票")])])])]),e._v(" "),o("p",[e._v("符合过半原则，所以 Zookeeper2 被选举为 Leader，而 Zookeeper1 成为 Zookeeper2 的 Follower，最后修改各自的状态且在二者之间建立心跳。")]),e._v(" "),o("p",[o("img",{attrs:{src:"https://raw.githubusercontent.com/huidongyin/DrawingBed/main/Zookeeper/202312142317216.png",alt:""}})]),e._v(" "),o("p",[e._v("看起来好像一切恢复正常了，那如果 Zookeeper3 重新启动了呢？这时候会怎样？")]),e._v(" "),o("p",[e._v("首先 Zookeeper3 重新启动它的状态会变为 LOOKING，所以它会再次投给自己一票，并通过网络广播给其他人，如下：")]),e._v(" "),o("p",[o("img",{attrs:{src:"https://raw.githubusercontent.com/huidongyin/DrawingBed/main/Zookeeper/202312142318199.png",alt:""}})]),e._v(" "),o("p",[e._v("这时候当 Zookeeper1 和 Zookeeper2 收到 Zookeeper3 的广播后，会给予相应的回应。")]),e._v(" "),o("ul",[o("li",[e._v("Zookeeper1 会回复：Zookeeper2 就是Leader，我是Follower。")]),e._v(" "),o("li",[e._v("Zookeeper2 会回复：我就是 Leader。")])]),e._v(" "),o("p",[o("img",{attrs:{src:"https://raw.githubusercontent.com/huidongyin/DrawingBed/main/Zookeeper/202312142319302.png",alt:""}})]),e._v(" "),o("p",[e._v("Zookeeper3 收到各个节点的回复后，发现 Zookeeper1 和 Zookeeper2 都说 Zookeeper2 是 Leader，且集群算上自己就三台机器，符合过半原则了，那就直接修改自己的状态为 FOLLOWING 去追随 Zookeeper2，然后 Zookeeper2 维护 Zookeeper3 这个 Follower 的心跳。")]),e._v(" "),o("p",[o("img",{attrs:{src:"https://raw.githubusercontent.com/huidongyin/DrawingBed/main/Zookeeper/202312142319714.png",alt:""}})]),e._v(" "),o("p",[e._v("假设写请求刚写到 Leader，尚未同步到各个 Follower ，然后 Leader 宕机了，接下来其他 Follower 肯定会选出一个新的 Leader。但这时候恰巧新 Leader 刚选出来，还没接收写请求呢，旧 Leader 就恢复了，所以旧 Leader 的 "),o("code",[e._v("zxid")]),e._v(" 肯定大于新 Leader 的，也就是说旧 Leader 的消息更全、更新，那么旧 Leader 恢复后，会顶替新 Leader 吗？")]),e._v(" "),o("p",[e._v("不会，不管 "),o("code",[e._v("zxid")]),e._v(" 是不是大，启动回来后就是 LOOKING 寻主状态，但是集群内已经有新的 Leader 了，旧 Leader 只能抹掉数据同步新 Leader 的。")]),e._v(" "),o("hr")])}),[],!1,null,null,null);o.default=v.exports}}]);