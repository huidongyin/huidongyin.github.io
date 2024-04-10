(window.webpackJsonp=window.webpackJsonp||[]).push([[194],{575:function(v,_,e){"use strict";e.r(_);var o=e(4),d=Object(o.a)({},(function(){var v=this,_=v._self._c;return _("ContentSlotsDistributor",{attrs:{"slot-key":v.$parent.slotKey}},[_("p",[v._v("本篇不会单独讲解 Zab，而是从 0 开始剖析 Leader 的选举核心流程以及原理，至于 Zab 是什么我会后面单独讲解。因为 Zab 只是一个协议，或者说只是一个概念，ZooKeeper 是这个协议的具体实现，并不是只有选举用到了 Zab 协议，而是其他地方也用到了，所以先剖析 ZooKeeper 的核心设计原理，到最后再单独拿出来一篇分析 Zab。")]),v._v(" "),_("p",[v._v("在分析 ZooKeeper 是如何做 Leader 选举之前，先思考一个问题："),_("code",[v._v("如果产品给你提了一个需求，让你设计一个 ZooKeeper 的 Leader 选举，你该如何设计？或者说你该考虑哪些东西才能完成需求？")])]),v._v(" "),_("hr"),v._v(" "),_("h2",{attrs:{id:"_1-什么是leader选举"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#_1-什么是leader选举"}},[v._v("#")]),v._v(" 1.什么是Leader选举")]),v._v(" "),_("p",[v._v("在开始设计之前，我们肯定要先搞懂需求，产品一句话：实现一个 Leader 自动选举的功能。那这句话啥意思呢？")]),v._v(" "),_("p",[v._v("我们先简单回顾一下我们之前所学的 ZooKeeper 知识。")]),v._v(" "),_("p",[v._v("首先 ZooKeeper 是支持集群的，而且它有三个角色：Leader、Follower、Observer。我们也知道这三者之间的区别：只有 Leader 能写操作，Follower 和 Observer 只读，且 Follower 可以参与选主，而 Observer 没权利参与选主。")]),v._v(" "),_("p",[v._v("接下来，我们想一个问题：前面说了，只有 Leader 能写操作，那如果 Leader 宕机了，怎么办？这时候整个集群处于亚健康状态，完全不可写了，只能读操作。总不能一直等着 Leader 重新起来之后再继续提供写能力吧？所以产品提了一个需求："),_("code",[v._v("当 Leader 宕机后，Follower 要立即开始进行选主，选主的意思就是从 Follower 当中选择一个“最优秀”的出来，让它升级为 Leader")]),v._v("。")]),v._v(" "),_("p",[v._v("现在需求算是彻底搞懂了，但是我们仍然有很多疑问，比如：我选择哪个 Follower 升级为 Leader 呢？选举流程是咋样的呢？宕机的 Leader 重启来后该何去何从呢？等等一系列问题，接下来就开始逐个分析。")]),v._v(" "),_("p",[v._v("我们先来看第一个问题：选择哪个 Follower 升级为 Leader 呢？")]),v._v(" "),_("hr"),v._v(" "),_("h2",{attrs:{id:"_2-选择哪个-follower-升级为-leader"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#_2-选择哪个-follower-升级为-leader"}},[v._v("#")]),v._v(" 2.选择哪个 Follower 升级为 Leader")]),v._v(" "),_("p",[v._v("这个问题，当然是哪个 Follower 上的数据最新就哪个 Follower 当 Leader！没错，这是必然的，那如果多台 Follower 上的数据都一样新，这时候该让谁来当 Leader 呢？")]),v._v(" "),_("p",[v._v("现在我们知道了一个条件，那就是："),_("strong",[v._v("哪个 Follower 上的消息最新就让哪个 Follower 优先被升级为 Leader。")]),v._v(" 那我们就用 "),_("code",[v._v("zxid")]),v._v(" 来标记，"),_("code",[v._v("zxid")]),v._v(" 的值越大就代表数据越新。每一次写请求，就更新一次 "),_("code",[v._v("zxid")]),v._v("，让 "),_("code",[v._v("zxid")]),v._v(" 自增 1。")]),v._v(" "),_("p",[v._v("如果 zxid 一样的话，该怎么选择？我们在搭建集群的时候都会写一个如下的配置：")]),v._v(" "),_("div",{staticClass:"language-plaintext line-numbers-mode"},[_("pre",{pre:!0,attrs:{class:"language-plaintext"}},[_("code",[v._v("server.1= ZooKeeper 1:2888:3888\nserver.2= ZooKeeper 2:2888:3888\nserver.3= ZooKeeper 3:2888:3888\n")])]),v._v(" "),_("div",{staticClass:"line-numbers-wrapper"},[_("span",{staticClass:"line-number"},[v._v("1")]),_("br"),_("span",{staticClass:"line-number"},[v._v("2")]),_("br"),_("span",{staticClass:"line-number"},[v._v("3")]),_("br")])]),_("p",[v._v("我们可以发现server后面有个数字："),_("code",[v._v(".1 .2 .3")]),v._v("。这是什么呢？这个其实就是一个编号，这个的意义就在于 Leader 选举会用到。如果 "),_("code",[v._v("zxid")]),v._v(" 相同的话，那就代表数据都一样，选谁都行，那索性选择一个 "),_("code",[v._v("serverId")]),v._v(" 最大的，也就是选择 "),_("code",[v._v("server.")]),v._v("后面数字最大的那个服务，我们也给它起个名字，叫 "),_("code",[v._v("myid")]),v._v(" 。")]),v._v(" "),_("p",[v._v("总结一下："),_("strong",[v._v("先对比 zxid，zxid 最大的优先被选举，若 zxid 一致，那么就选择一个 myid 最大的。")])]),v._v(" "),_("p",[_("img",{attrs:{src:"https://raw.githubusercontent.com/huidongyin/DrawingBed/main/Zookeeper/202312132216525.png",alt:""}})]),v._v(" "),_("p",[v._v("有了 "),_("code",[v._v("zxid")]),v._v(" 和 "),_("code",[v._v("myid")]),v._v(" 就够了吗？其实是不完美的，需求想要知道目前一共选举多少次了，且当前这次的 "),_("code",[v._v("zxid")]),v._v(" 是多少，比如 Leader 宕机了，其他节点进行了重新选主，选完后我希望 "),_("code",[v._v("zxid")]),v._v(" 从 0 开始，就好比古代更朝换代，都更朝换代了，我不可能留着上一波的东西，所以我要 "),_("code",[v._v("初始化 zxid")]),v._v("。那这里也简单了，加一个字段标记朝代次数不就好了？每次重新选主成功后就给朝代次数加 1 且初始化 "),_("code",[v._v("zxid")]),v._v("。")]),v._v(" "),_("p",[v._v("我们可以把这两个字段合二为一，统称为 "),_("code",[v._v("zxid")]),v._v("。我们 "),_("code",[v._v("zxid")]),v._v(" 本身设计是一个自增的 long 类型字段，long 类型是 64 位的，我们可以把前 32 位作为朝代次数，后 32 位作为事务日志id（也就是我们前面一直说的 zxid ），然后这前 32 位结合后 32 位统称为 zxid。")]),v._v(" "),_("p",[v._v("比如，"),_("code",[v._v("zxid")]),v._v(" 初始化的时候肯定是 0，因为朝代没换过，也没写请求进来过。所以是如下的样子：")]),v._v(" "),_("p",[_("code",[v._v("00000000000000000000000000000000 00000000000000000000000000000000")])]),v._v(" "),_("p",[v._v("比如，这时候客户端发起了 3 次写请求，相当于后 32 位的结果为 3，3 的二进制是 11，所以如下：")]),v._v(" "),_("p",[_("code",[v._v("00000000000000000000000000000000 00000000000000000000000000000011")])]),v._v(" "),_("p",[v._v("再比如这时候 Leader 宕机了，需要重新选举，选举完新 Leader 后，前 32 位要加 1，后 32 位初始化，也就是后 32 位归 0，如下：")]),v._v(" "),_("p",[_("code",[v._v("00000000000000000000000000000001 00000000000000000000000000000000")])]),v._v(" "),_("p",[v._v("总结一下："),_("strong",[v._v("zxid 是一个 long 类型的字段，前 32 位代表朝代，我们这里称为 epoch，后 32 位称为事务次数，也就是写请求次数。")])]),v._v(" "),_("p",[v._v("后 32 位是事务次数，那如果 Leader 很坚挺，一直不宕机，写请求又很频繁，把后 32 位都写满了，如下效果：")]),v._v(" "),_("p",[_("code",[v._v("00000000000000000000000000000001 11111111111111111111111111111111")])]),v._v(" "),_("p",[v._v("这时候再有新的写请求进来后会报错吗？不会！会给 "),_("code",[v._v("epoch")]),v._v(" 加 1，然后后 32 位归 0。如下：")]),v._v(" "),_("p",[_("code",[v._v("0000000000000000000000000000010 00000000000000000000000000000000")])]),v._v(" "),_("p",[_("strong",[v._v("zxid 是由两部分组成：epoch（朝代/纪元）和事务日志次数。")]),v._v(" 现在单纯靠事务日志次数和 "),_("code",[v._v("myid")]),v._v(" 来对比肯定是不行的，因为事务日志次数会随着每次选主后而归 0。")]),v._v(" "),_("p",[v._v("那该如何选主呢？"),_("code",[v._v("epoch")]),v._v(" 越大的就代表越新，因为每次选主都会自增 "),_("code",[v._v("epoch")]),v._v("，先判断 "),_("code",[v._v("epoch")]),v._v(" ，"),_("code",[v._v("epoch")]),v._v(" 越大的优先被选举；"),_("code",[v._v("epoch")]),v._v(" 相同的，再对比 "),_("code",[v._v("zxid")]),v._v(" 的后 32 位，也就是事务日志次数，值越大代表写的数据越多，肯定数据越新；假设事务日志次数也一样，那就对比 "),_("code",[v._v("myid")]),v._v("，找到 "),_("code",[v._v("myid")]),v._v(" 最大的那个 Server 即可。")]),v._v(" "),_("p",[v._v("画个简易图如下：")]),v._v(" "),_("p",[_("img",{attrs:{src:"https://raw.githubusercontent.com/huidongyin/DrawingBed/main/Zookeeper/202312132217946.png",alt:""}})]),v._v(" "),_("p",[v._v("在进入选举流程之前先思考一个问题：选举是很复杂的流程，那么选举肯定要有状态的吧？比如，谁成为了 Leader，谁成为了 Follower，谁成为了 Observer 等，都需要一个字段来标记当前 Server 是什么状态，我们先称这个字段为： "),_("strong",[v._v("选举状态")]),v._v(" 。它包含如下值：")]),v._v(" "),_("ul",[_("li",[_("code",[v._v("LOOKING")]),v._v("：竞选状态，也就是说此状态下还没有 Leader 诞生，需要进行 Leader 选举。")]),v._v(" "),_("li",[_("code",[v._v("FOLLOWING")]),v._v("：Follower 状态，对应我们之前介绍的 Follower 角色对应的状态，并且它自身是知道 Leader 是谁的。")]),v._v(" "),_("li",[_("code",[v._v("OBSERVING")]),v._v("：Observer 状态，对应我们之前介绍的 Observer 角色对应的状态，并且它自身是知道 Leader 是谁的。")]),v._v(" "),_("li",[_("code",[v._v("LEADING")]),v._v("：Leader 状态，对应我们之前介绍的 Leader 角色对应的状态。")])]),v._v(" "),_("p",[v._v("再看第一个问题："),_("strong",[v._v("Leader 选举流程到底是咋样的")]),v._v("之前，我们需要先搞懂选举的时候都传递哪些参数。")]),v._v(" "),_("hr"),v._v(" "),_("h2",{attrs:{id:"_3-投票参数"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#_3-投票参数"}},[v._v("#")]),v._v(" 3.投票参数")]),v._v(" "),_("p",[v._v("要实现一个 Leader 选举功能，服务器那么多，且服务器都是自己知道自己的数据，不知道其他服务器的数据（ "),_("code",[v._v("zxid / myid")]),v._v(" ），那我们该怎么对比 "),_("code",[v._v("zxid + myid")]),v._v(" 呢？通过网络给发出去，就好比提供一个接口一样，然后把自己服务器的数据带上。")]),v._v(" "),_("p",[v._v("既然是通过网络广播的，那么收到广播的消息后肯定要和自身对比，对比完怎么通知其他机器结果呢？还是网络广播给其他机器。就这样如此反复，这个过程叫 "),_("strong",[v._v("投票")]),v._v(" 。")]),v._v(" "),_("p",[v._v("还有一个问题：通过网络传输，然后进行投票。那传输哪些数据呢？")]),v._v(" "),_("p",[v._v("首先会有 "),_("code",[v._v("zxid")]),v._v(",也就是 epoch+写次数。其次会有 "),_("code",[v._v("myid")]),v._v("。")]),v._v(" "),_("ul",[_("li",[_("code",[v._v("zxid")]),v._v("：当前服务器上所保存的数据的最大 "),_("code",[v._v("zxid")]),v._v("。")]),v._v(" "),_("li",[_("code",[v._v("myid")]),v._v("：当前服务器的 "),_("code",[v._v("myid")]),v._v("。")])]),v._v(" "),_("p",[v._v("这两个参数之外还需要发送被推荐服务器的 "),_("code",[v._v("zxid")]),v._v(" 和 "),_("code",[v._v("myid")]),v._v("，所以到目前为止一共四个参数。")]),v._v(" "),_("ul",[_("li",[_("code",[v._v("self_ zxid")]),v._v("：当前服务器上所保存的数据的最大 "),_("code",[v._v("zxid")]),v._v("。")]),v._v(" "),_("li",[_("code",[v._v("self_ myid")]),v._v("：当前服务器的 "),_("code",[v._v("myid")]),v._v("。")]),v._v(" "),_("li",[_("code",[v._v("vote_id")]),v._v("：被推荐服务器的 "),_("code",[v._v("myid")]),v._v("。")]),v._v(" "),_("li",[_("code",[v._v("vote_ zxid")]),v._v("：被推荐服务器上所保存数据的最大 "),_("code",[v._v("zxid")]),v._v("。")])]),v._v(" "),_("p",[v._v("现在好像是可以满足需求了，但是假设根据这四个参数选举出来 Leader 了，那这时候会更新服务器状态，从 LOOKING 变为 Leader，也要把这个状态广播给其他服务器，这样其他服务器发现已经有人是 Leader 了，那就把自身改为 Follower。所以我们还需要一个字段：状态。")]),v._v(" "),_("ul",[_("li",[_("code",[v._v("state")]),v._v("：当前服务器的状态，包括 LOOKING、FOLLOWING、LEADING、OBSERVING。")])]),v._v(" "),_("p",[v._v("我们再想一个问题：比如 N 个节点进行投票，投了 2 轮后某个节点突然宕机了，只是宕机了一个节点，并不影响其他节点继续投票。但是当这个宕机的节点重启回来后再次发起自己的投票，那这个节点的票据还可信吗？肯定是不可信的，因为它落后了几轮投票，它的数据不能保证是准确的。那怎么办？")]),v._v(" "),_("p",[v._v("我们多加一个参数：投票次数，每一轮投票后，这个次数就加 1，这样每次投票选举的时候就先判断这个投票次数，如果发现别的节点的次数小，那这个节点肯定很不幸发生了意外，导致落后了，那就弃掉这个节点。")]),v._v(" "),_("p",[v._v("还是说刚才的例子：N 个节点投票，投了 2 轮后某个节点突然宕机了，当这个节点重启回来后有两种可能。")]),v._v(" "),_("ul",[_("li",[v._v("第一种可能性：重启回来，状态是 LOOKING，重新发起投票，但是其他节点收到它的投票后发现它的投票次数是 0（因为自己是刚重启回来的，次数肯定是 0，次数是保存在内存中的），比自己的小，直接就舍弃不管了。")]),v._v(" "),_("li",[v._v("第二种可能性：重启回来，收到别人的投票，这时候发现别人的投票次数都比自己的大，那就直接加入到其他节点中，没权利选举为 Leader。")])]),v._v(" "),_("p",[v._v("这个投票次数我们也给它起个名，称为逻辑时钟，"),_("code",[v._v("logicClock")]),v._v("。")]),v._v(" "),_("p",[v._v("到这里我们的参数就完全定义好了，一共如下六个字段。")]),v._v(" "),_("ul",[_("li",[_("strong",[v._v("self_zxid")]),v._v(" ：当前服务器上所保存的数据的最大 "),_("code",[v._v("zxid")]),v._v("。")]),v._v(" "),_("li",[_("strong",[v._v("self_myid")]),v._v(" ：当前服务器的 "),_("code",[v._v("myid")]),v._v("。")]),v._v(" "),_("li",[_("strong",[v._v("vote_id")]),v._v(" ：被推荐服务器的 "),_("code",[v._v("myid")]),v._v("。")]),v._v(" "),_("li",[_("strong",[v._v("vote_zxid")]),v._v(" ：被推荐服务器上所保存数据的最大 "),_("code",[v._v("zxid")]),v._v("。")]),v._v(" "),_("li",[_("strong",[v._v("state")]),v._v(" ：当前服务器的状态，包括 LOOKING、FOLLOWING、LEADING、OBSERVING。")]),v._v(" "),_("li",[_("strong",[v._v("logicClock")]),v._v(" ：逻辑时钟，保存在内存中，每轮投票后就自增 1，它表示这是该服务器发起的第多少轮投票。")])]),v._v(" "),_("p",[_("code",[v._v("epoch 和 logicClock 什么区别？")])]),v._v(" "),_("ul",[_("li",[v._v("首先，"),_("code",[v._v("epoch")]),v._v(" 是全生命周期的，"),_("code",[v._v("logicClock")]),v._v(" 是选主时候的生命周期，也就是说 "),_("code",[v._v("epoch")]),v._v(" 是全局变量，"),_("code",[v._v("logicClock")]),v._v(" 是局部变量。")]),v._v(" "),_("li",[v._v("其次，"),_("code",[v._v("epoch")]),v._v(" 是朝代，是纪元，也就是当前 Leader 是第几代，"),_("code",[v._v("logicClock")]),v._v(" 是投票次数。举个例子：假设皇帝都是选票选出来的，有可能第一轮选举没出结果，那就得多选几轮，这里的几轮就是 "),_("code",[v._v("logicClock")]),v._v("，选出来皇帝后 "),_("code",[v._v("epoch")]),v._v(" 才加 1。"),_("code",[v._v("epoch")]),v._v(" 是朝代，"),_("code",[v._v("logicClock")]),v._v(" 是大臣投票的次数。可能投了 5 次才选出皇帝来，那 "),_("code",[v._v("logicClock")]),v._v(" 就是 5，而 "),_("code",[v._v("epoch")]),v._v(" 只加 1。")]),v._v(" "),_("li",[v._v("最后，"),_("code",[v._v("epoch")]),v._v(" 是 "),_("code",[v._v("zxid")]),v._v(" 的前 32 位，是持久化的。而 "),_("code",[v._v("logicClock")]),v._v(" 是局部变量，存到内存里的，选出来主后就归 0 了，相当于方法结束后生命周期就结束了，就是一个局部变量，用于选主，用于给 "),_("code",[v._v("epoch")]),v._v(" 加 1。")])]),v._v(" "),_("p",[v._v("接下来就正式步入正轨：Leader 选举流程到底是咋样的？")]),v._v(" "),_("hr"),v._v(" "),_("h2",{attrs:{id:"_4-leader-选举流程"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#_4-leader-选举流程"}},[v._v("#")]),v._v(" 4.Leader 选举流程")]),v._v(" "),_("p",[v._v("每个服务器都单独维护自己的 "),_("code",[v._v("zxid")]),v._v("、 "),_("code",[v._v("myid")]),v._v(" 以及 "),_("code",[v._v("logicClock")]),v._v("。并且选举流程的核心比较，就是每次投票的时候 "),_("code",[v._v("logicClock")]),v._v(" 都加 1，然后先对比 "),_("code",[v._v("zxid")]),v._v("，"),_("code",[v._v("zxid")]),v._v(" 大的就选 "),_("code",[v._v("zxid")]),v._v("，"),_("code",[v._v("zxid")]),v._v(" 一样的话就对比 "),_("code",[v._v("myid")]),v._v("，找到 "),_("code",[v._v("myid")]),v._v(" 最大的那个节点。")]),v._v(" "),_("p",[v._v("我们目前只知道这种粗粒度的，一些细节我们并不清楚，相当于我们前面所说的内容只是代表这个需求可以实现，但是具体的实现方案还没有梳理，那到底该如何设计呢？")]),v._v(" "),_("p",[v._v("我们可以让每个服务器维护一个票箱，该票箱记录了所收到的选票。比如：服务器 2 投票给了服务器 3，而服务器 3 投给了服务器 1，服务器 1 把票投给了自己，那么这时候服务器 1 的投票箱是这样的： "),_("strong",[v._v("(2,3)、(3,1)、(1,1)")]),v._v(" 。如下图所示：")]),v._v(" "),_("p",[_("img",{attrs:{src:"https://raw.githubusercontent.com/huidongyin/DrawingBed/main/Zookeeper/202312132218189.png",alt:""}})]),v._v(" "),_("p",[v._v("假设这时候服务器 3 反悔了，又重新把票投给了自己，不投给 1 了。那这时候服务器的票箱就是： "),_("strong",[v._v("(2,3)、(3,3)、(1,1)")]),v._v(" 。也就是说服务器保存的票箱里记录的是每一投票者的最后一票。")]),v._v(" "),_("p",[v._v("怎么把票发出去的呢？通过网络发送，广播出去。比如，服务器 3 将票投给自己，那么 "),_("strong",[v._v("(3,3)")]),v._v(" 这个票据会发给每一个服务器，目标服务器收到后会把票据存到票箱。")]),v._v(" "),_("p",[v._v("我们前面说投给 "),_("code",[v._v("zxid")]),v._v(" 最大的、投给 "),_("code",[v._v("myid")]),v._v(" 最大的，怎么知道哪个服务器的 "),_("code",[v._v("zxid")]),v._v(" 最大、哪个服务器的 "),_("code",[v._v("myid")]),v._v(" 最大呢？也就是说怎么知道把票投给谁呢？所以，第一轮投票就先投给自己，也就是服务器 1 投给自己、服务器 2 投给自己、服务器 3 也投给自己，以此类推，如下图：")]),v._v(" "),_("p",[_("img",{attrs:{src:"https://raw.githubusercontent.com/huidongyin/DrawingBed/main/Zookeeper/202312132218771.png",alt:""}})]),v._v(" "),_("p",[v._v("其他服务器收到各自的投票后该如何处理？我们上面说过参数了，共 6 个：  "),_("strong",[v._v("self_ zxid 、self_ myid 、vote_id、vote_ zxid 、state、logicClock")]),v._v(" 。所以，其实就是 "),_("code",[v._v("(self_id,self_ zxid)")]),v._v("和 "),_("code",[v._v("(vote_id,vote_ zxid)")]),v._v("的对比，也就是我们之前说的 "),_("code",[v._v("zxid")]),v._v(" 和 "),_("code",[v._v("myid")]),v._v(" 的对比。")]),v._v(" "),_("p",[v._v("具体细节如下。")]),v._v(" "),_("ol",[_("li",[v._v("如果接收到的 "),_("code",[v._v("logicClock")]),v._v(" 大于自己的 "),_("code",[v._v("logicClock")]),v._v("，说明该服务器的选举轮次落后于其他服务器的选举轮次，那么先把自己的 "),_("code",[v._v("logicalclock")]),v._v(" 更新为收到的，然后立即清空自己维护的票箱，接着对比 "),_("code",[v._v("myid")]),v._v("、"),_("code",[v._v("zxid")]),v._v("、"),_("code",[v._v("epoch")]),v._v("，看看收到的票据和自己的票据哪个更适合作为 Leader，最终再次将自己的投票通过网络广播出去。\n"),_("blockquote",[_("p",[_("em",[v._v("我们来举个例子：")])]),v._v(" "),_("p",[v._v("比如服务器 A 和服务器 B 两个节点，服务器 A 的 "),_("code",[v._v("logicClock")]),v._v(" 为 2，服务器 B 的 "),_("code",[v._v("logicClock")]),v._v(" 为 3，那么服务器 A 收到了服务器 B 的投票信息，这时候服务器 A 发现服务器 B 的轮次（"),_("code",[v._v("logicClock")]),v._v("）更大，那就代表服务器 A 是落后的，则会立即清空自己维护的票箱并把自己的 logicClock 改为服务器 B 的 "),_("code",[v._v("logicClock")]),v._v("，然后对比 "),_("code",[v._v("myid")]),v._v("、 "),_("code",[v._v("zxid")]),v._v(" 和 "),_("code",[v._v("epoch")]),v._v("，看看哪个更适合成为 Leader，最后通过网络广播给其他机器。")])])]),v._v(" "),_("li",[v._v("如果接收到的 "),_("code",[v._v("logicClock")]),v._v(" 等于自己维护的 "),_("code",[v._v("logicClock")]),v._v("，那就对比二者的 "),_("code",[v._v("vote_zxid")]),v._v("，也就是对比被推荐服务器上所保存数据的最大 "),_("code",[v._v("zxid")]),v._v("。若收到的 "),_("code",[v._v("vote_zxid")]),v._v(" 大于自己 "),_("code",[v._v("vote_zxid")]),v._v("，那就将自己票中的 "),_("code",[v._v("vote_zxid")]),v._v(" 和 "),_("code",[v._v("vote_id")]),v._v("（被推荐服务器的 myid ）改为收到的票中的 "),_("code",[v._v("vote_zxid")]),v._v(" 和 "),_("code",[v._v("vote_id")]),v._v(" 并通过网络广播出去。另外将收到的票据和自己刚改后的 "),_("code",[v._v("vote_id")]),v._v(" 放入自己的票箱。\n"),_("blockquote",[_("p",[_("em",[v._v("我们来举个例子：")])]),v._v(" "),_("p",[v._v("比如服务器 A 和服务器 B 两个节点，服务器 A 和服务器 B 的 "),_("code",[v._v("logicClock")]),v._v(" 都为 2，但是服务器 A 的 "),_("code",[v._v("vote_zxid")]),v._v(" 是 16，服务器 B 的 "),_("code",[v._v("vote_zxid")]),v._v(" 是 20，那么服务器 A 收到了服务器 B 的投票信息，这时候服务器 A 发现服务器 B 的 "),_("code",[v._v("vote_zxid")]),v._v(" 比自己的大，那就代表服务器 B 推荐的节点上的数据是最新的，则会将服务器 A 的 "),_("code",[v._v("vote_zxid")]),v._v(" 从 16 改为 20，且修改服务器 A 的 "),_("code",[v._v("vote_id")]),v._v(" 为服务器 B 的 "),_("code",[v._v("vote_id")]),v._v("，并通过网络广播给其他机器。")])])]),v._v(" "),_("li",[v._v("如果接收到的 "),_("code",[v._v("logicClock")]),v._v(" 等于自己维护的 "),_("code",[v._v("logicClock")]),v._v(" 且二者的 "),_("code",[v._v("vote_zxid")]),v._v(" 也一致，那就比较二者的 "),_("code",[v._v("vote_id")]),v._v("，也就是被推荐服务器的 "),_("code",[v._v("myid")]),v._v("。若接收到的投票的 "),_("code",[v._v("vote_id")]),v._v(" 大于自己所选的 "),_("code",[v._v("vote_id")]),v._v("，那就将自己票中的 "),_("code",[v._v("vote_id")]),v._v(" 改为接收到的票中的 "),_("code",[v._v("vote_id")]),v._v(" 并通过网络广播出去。另外，将收到的票据和自己刚改后的 "),_("code",[v._v("vote_id")]),v._v(" 放入自己的票箱。")]),v._v(" "),_("li",[v._v("如果接收到的 "),_("code",[v._v("logicClock")]),v._v(" 小于自己的 "),_("code",[v._v("logicClock")]),v._v("，那么当前服务器直接忽略该投票，继续处理下一个投票。")])]),v._v(" "),_("p",[v._v("这个选举投票流程已经很清晰了，唯一有一点瑕疵就是："),_("code",[v._v("logicClock")]),v._v(" 啥时候自增呢？"),_("strong",[v._v("每一轮投票就给 logicClock 加 1。")])]),v._v(" "),_("p",[v._v("现在我们设计的 6 个参数已经用上了 5 个了，还差 "),_("code",[v._v("state")]),v._v(" 没有用上，"),_("code",[v._v("state")]),v._v(" 是什么意思？服务器状态，只有 LOOKING 状态才会选举，也就是上述过程都是基于 LOOKING 状态的，选举完了要更改状态，所以 "),_("code",[v._v("state")]),v._v(" 参数很简单，就是服务器状态，选举完后会看自身服务器是不是 Leader，如果不是的话就改为 FOLLOWING；如果自身服务器是 Leader，那就将 state 改为 LEADING。")]),v._v(" "),_("p",[v._v("要几个服务器同意才能被真正选举呢？假如：服务器 1、服务器 2、服务器 3 参与投票竞选 Leader，这时候服务器 1 投票给了服务器 2，服务器 2 投票给了自己，服务器 3 也投票给了自己，这时候票箱的数据是这样的： "),_("strong",[v._v("(1,2)、(2,2)、(3,3)")]),v._v(" ，目前很明显的是服务器 1 有零票，服务器 2 有两票，服务器 3 有一票。相当于没得到全部服务器的认可，因为服务器 3 投给了自己，没有投给服务器 2，那是不是还要继续发起投票重新选举呢？")]),v._v(" "),_("p",[v._v("所以不是的！ "),_("strong",[v._v("过半即可，也就是过半原则 "),_("code",[v._v("(n+1/2)")]),v._v("，也就是超过半数以上的节点同意即可被选举为 Leader")]),v._v(" 。举个例子：上面的票箱是  "),_("strong",[v._v("(1,2)、(2,2)、(3,3)")]),v._v(" ，一共 3 个服务器，两个服务器都选择了 2 号，3 个服务器的半数以上是 "),_("code",[v._v("3/2 =1")]),v._v("，半数以上是 "),_("code",[v._v("1+1=2")]),v._v("，这里正好有两个服务器同意 2 号当选，所以符合过半原则。")]),v._v(" "),_("blockquote",[_("p",[v._v("为啥过半原则，后面讲解 Zab 的时候细说。")])]),v._v(" "),_("p",[_("img",{attrs:{src:"https://raw.githubusercontent.com/huidongyin/DrawingBed/main/Zookeeper/202312132239275.jpg",alt:""}})]),v._v(" "),_("hr")])}),[],!1,null,null,null);_.default=d.exports}}]);