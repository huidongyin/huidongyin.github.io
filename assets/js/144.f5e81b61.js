(window.webpackJsonp=window.webpackJsonp||[]).push([[144],{525:function(a,_,v){"use strict";v.r(_);var e=v(4),t=Object(e.a)({},(function(){var a=this,_=a._self._c;return _("ContentSlotsDistributor",{attrs:{"slot-key":a.$parent.slotKey}},[_("p",[a._v("队列是存储消息的载体，延时队列存储的对象是延时消息。所谓的"),_("strong",[a._v("延时消息")]),a._v("是指消息被发送以后，并不想让消费者立刻获取，而是等待特定的时间后，消费者才能获取这个消息进行消费， 延时队列一般也被称为"),_("strong",[a._v("延迟队列")]),a._v("。")]),a._v(" "),_("blockquote",[_("p",[a._v("延时的消息达到目标延时时间后才能被消费， 而TTL的消息达到目标超时时间后会被丢弃。")])]),a._v(" "),_("p",[a._v("延时队列的使用场景有很多，比如：")]),a._v(" "),_("ul",[_("li",[a._v("在订单系统中，一个用户下单之后通常有30分钟的时间进行支付，如果30分钟之内没有支付成功，那么这个订单将进行异常处理，这时就可以使用延时队列来处理这些订单了。")]),a._v(" "),_("li",[a._v("订单完成1小时后通知用户进行评价。")]),a._v(" "),_("li",[a._v("用户希望通过手机远程遥控家里的智能设备在指定时间进行工作。这时就可以将用户指令发送到延时队列，当指令设定的时间到了之后再将它推送到智能设备。")])]),a._v(" "),_("p",[a._v("在Kafka的原生概念中并没有“队列”的影子， Kafka中存储消息的载体是主题(更加确切地说是分区)，我们可以把存储延时消息的主题称为“延时主题”，不过这种称谓太过于生僻。在其他消息中间件(比如Rabbit MQ) 中大多采用“延时队列”的称谓， 为了不让Kafka过于生分， 我们这里还是习惯性地沿用“延时队列”的称谓来表示Kafka中用于存储延时消息的载体。")]),a._v(" "),_("p",[a._v("原生的Kafka并不具备延时队列的功能， 不过我们可以对其进行改造来实现。Kafka实现延时队列的方式也有很多种， 我们可以通过消费者客户端拦截器来实现延时队列。")]),a._v(" "),_("p",[a._v("不过使用拦截器的方式来实现延时的功能具有很大的局限性，某一批拉取到的消息集中有一条消息的延时时间很长，其他的消息延时时间很短而很快被消费，那么这时该如何处理呢?")]),a._v(" "),_("p",[a._v("下面考虑以下这几种情况：")]),a._v(" "),_("ol",[_("li",[a._v("如果这时提交消费位点，那么延时时间很长的那条消息会丢失。")]),a._v(" "),_("li",[a._v("如果这时不继续拉取消息而等待这条延时时间很长的消息到达延时时间，这样又会导致消费滞后很多，而且如果位于这条消息后面的很多消息的延时时间很短，那么也会被这条消息无端地拉长延时时间，从而大大地降低了延时的精度。")]),a._v(" "),_("li",[a._v("如果这个时候不提交消费位点而继续拉取消息，等待这条延时时间很长的消息满足条件之后再提交消费位点，那么在此期间这条消息需要驻留在内存中，而且需要一个定时机制来定时检测是否满足被消费的条件，当这类消息很多时必定会引起内存的暴涨，另一方面当消费很大一部分消息之后这条消息还是没有能够被消费，此时如果发生异常，则会由于长时间的未提交消费位点而引起大量的重复消费。")])]),a._v(" "),_("p",[a._v("有一种改进方案，如图所示，消费者在拉取一批消息之后，如果这批消息中有未到达延时时间的消息，那么就将这条消息重新写入主题等待后续再次消费。这个改进方案看起来很不错，但是当消费滞后很多(消息大量堆积)的时候，原本这条消息只要再等待5秒就能够被消费，但这里却将其再次存入主题，等到再次读取到这条消息的时候有可能已经过了半小时。由此可见，这种改进方案无法保证延时精度，故而也很难真正地投入现实应用之中。")]),a._v(" "),_("p",[_("img",{attrs:{src:"https://raw.githubusercontent.com/huidongyin/DrawingBed/main/Kafka/202312192100560.png",alt:"11-1"}})]),a._v(" "),_("p",[a._v("在了解了拦截器的实现方式之后，我们再来看另一种可行性方案：在发送延时消息的时候并不是先投递到要发送的真实主题(real topic) 中， 而是先投递到一些Kafka内部的主题(delay_topic) 中， 这些内部主题对用户不可见， 然后通过一个自定义的服务拉取这些内部主题中的消息，并将满足条件的消息再投递到要发送的真实的主题中，消费者所订阅的还是真实的主题。")]),a._v(" "),_("p",[a._v("延时时间一般以秒来计，若要支持2小时(也就是2×60×60=7200)之内的延时时间的消息，那么显然不能按照延时时间来分类这些内部主题。试想一个集群中需要额外的7200个主题，每个主题再分成多个分区，每个分区又有多个副本，每个副本又可以分多个日志段，每个日志段中也包含多个文件，这样不仅会造成资源的极度浪费，也会造成系统吞吐的大幅下降。如果采用这种方案， 那么一般是按照不同的延时等级来划分的， 比如设定5s、10s、30s、1min、2min、5min、10min、20min、30min、45min、1hour、2hour这些按延时时间递增的延时等级， 延时的消息按照延时时间投递到不同等级的主题中，投递到同一主题中的消息的延时时间会被强转为与此主题延时等级一致的延时时间，这样延时误差控制在两个延时等级的时间差范围之内(比如延时时间为17s的消息投递到30s的延时主题中，之后按照延时时间为30s进行计算，延时误差为13s)。虽然有一定的延时误差，但是误差可控，并且这样只需增加少许的主题就能实现延时队列的功能。")]),a._v(" "),_("p",[a._v("如图所示， 生产者Producer发送若干延时时间不同的消息到主题"),_("code",[a._v("real_topic_A")]),a._v("和"),_("code",[a._v("real_topic_B")]),a._v("中， 消费者Consumer订阅并消费主题"),_("code",[a._v("real_topic_A")]),a._v("和"),_("code",[a._v("real_topic_B")]),a._v("中的消息， 对用户而言， 他看到的就是这样一个流程。但是在内部， Producer会根据不同的延时时间将消息划分为不同的延时等级，然后根据所划分的延时等级再将消息发送到对应的内部主题中，比如5s内的消息发送到"),_("code",[a._v("delay_topic_1")]),a._v("， 6s至10s的消息划分到"),_("code",[a._v("delay_topic_2")]),a._v("中。这段内部的转发逻辑需要开发人员对生产者客户端做一些改造封装 ， 可以根据消息的"),_("code",[a._v("timestamp")]),a._v("字段、"),_("code",[a._v("headers")]),a._v("字段(设置延时时间) ， 以及生产者拦截器来实现具体的代码。")]),a._v(" "),_("p",[_("img",{attrs:{src:"https://raw.githubusercontent.com/huidongyin/DrawingBed/main/Kafka/202312192112342.png",alt:"11-2"}})]),a._v(" "),_("p",[a._v("发送到内部主题("),_("code",[a._v("delay_topic_*")]),a._v(") 中的消息会被一个独立的DelayService进程消费， 这个DelayService进程和Kafka broker进程以一对一的配比进行同机部署 ， 以保证服务的可用性。")]),a._v(" "),_("p",[a._v("针对不同延时级别的主题， 在DelayService的内部都会有单独的线程来进行消息的拉取，以及单独的DelayQueue(这里用的是JUC中DelayQueue) 进行消息的暂存。与此同时， 在DelayService内部还会有专门的消息发送线程来获取DelayQueue的消息并转发到真实的主题中。从消费、暂存再到转发， 线程之间都是一一对应的关系。如图所示， DelayService的设计应当尽量保持简单，避免锁机制产生的隐患。")]),a._v(" "),_("p",[_("img",{attrs:{src:"https://raw.githubusercontent.com/huidongyin/DrawingBed/main/Kafka/202312192122172.png",alt:"11-4"}})]),a._v(" "),_("p",[a._v("为了保障内部DelayQueue不会因为未处理的消息过多而导致内存的占用过大，DelayService会对主题中的每个分区进行计数， 当达到一定的阈值之后， 就会暂停拉取该分区中的消息。")]),a._v(" "),_("p",[a._v("DelayQueue的作用是将消息按照再次投递时间进行有序排序，这样下游的消息发送线程就能够按照先后顺序获取最先满足投递条件的消息。再次投递时间是指消息的时间戳与延时时间的数值之和，因为延时消息从创建开始起需要经过延时时间之后才能被真正投递到真实主题中。")]),a._v(" "),_("p",[a._v("同一分区中的消息的延时级别一样，也就意味着延时时间一样，那么对同一个分区中的消息而言， 也就自然而然地按照投递时间进行有序排列， 那么为何还需要DelayQueue的存在呢?因为一个主题中一般不止一个分区，分区之间的消息并不会按照投递时间进行排序，那么可否将这些主题都设置为一个分区呢?这样虽然可以简化设计，但同时却丢弃了动态扩展性，原本针对某个主题的发送或消费性能不足时，可以通过增加分区数进行一定程度上的性能提升。")]),a._v(" "),_("p",[a._v("前面提到了，这种延时队列的实现方案会有一定的延时误差，无法做到秒级别的精确延时，不过一般应用对于延时的精度要求不会那么高，只要延时等级设定得合理，这个实现方案还是能够具备很大的应用价值。")]),a._v(" "),_("p",[a._v("那么有没有延时精度较高的实现方案?我们先来回顾一下前面的延时分级的实现方案，它首先将生产者生产的消息暂存到一个地方，然后通过一个服务去拉取符合再次投递条件的消息并转发到真实的主题。如图所示，一般的延时队列的实现架构也大多类似。")]),a._v(" "),_("p",[_("img",{attrs:{src:"https://raw.githubusercontent.com/huidongyin/DrawingBed/main/Kafka/202312192135411.png",alt:"11-5"}})]),a._v(" "),_("p",[a._v("后台服务获取消息之后马上会转发到真实的主题中，而订阅此主题的消费者也就可以及时地消费消息，在这一阶段中并无太大的优化空间。反观消息从生产者到缓存再到后台服务的过程中需要一个等待延时时间的行为，在这个过程中有很大的空间来做进一步的优化。")]),a._v(" "),_("p",[a._v("我们是否可以借鉴一下Kafka的延时操作来实现延迟队列的功能呢?毕竟在Kafka中有现成的延时处理模块， 复用一下也未尝不可。第一种思路，在生产者这一层面我们采取延时操作来发送消息，这样原本立刻发送出去的消息被缓存在了客户端中以等待延时条件的满足。这种思路有明显的弊端：如果生产者中缓存的消息过多，则必然引起内存的暴涨；消息可靠性也很差，如果生产者发生了异常，那么这部分消息也就丢失了，除非配套相应的重发机制。")]),a._v(" "),_("p",[a._v("第二种思路， 在Kafka服务中增加一个前置缓存， 生产者还是正常将消息发往Kafka中，Kafka在判定消息是延时消息时(可以增加一个自定义协议， 与发送普通消息的PRODUCE协议分开， 比如DELAY_PRODUCE， 作为发送延时消息的专用协议) 就将消息封装成延时操作并暂存至缓存中，待延时操作触发时就会将消息发送到真实的主题中，整体架构上与上图中所描述的类似。这种思路也有消息可靠性的问题，如果缓存延时操作的那台服务器宕机，那么消息也会随之丢失，为此我们可以引入缓存多副本的机制，如图所示。")]),a._v(" "),_("p",[_("img",{attrs:{src:"https://raw.githubusercontent.com/huidongyin/DrawingBed/main/Kafka/202312192143052.png",alt:"11-6"}})]),a._v(" "),_("p",[a._v("生产者发送的消息不单单发往一个缓存中，而是发往多个缓存，待所有缓存都收到消息之后才算发送成功， 这一点和Kafka生产者客户端参数"),_("code",[a._v("acks=-1")]),a._v("的机理相通。每个broker中都会有一个延时操作的清理服务，彼此之间有主从的关系，任意时刻只有一个清理服务在工作，其余的清理服务都处于冷备状态。当某个延迟操作触发时会通知清理服务去清理其他延时操作缓存中对应的延时操作。这种架构虽然可以弥补消息可靠性的缺陷，但对于分布式架构中一些老生常谈的问题(比如缓存一致性、主备切换等)需要格外注意。")]),a._v(" "),_("p",[a._v("第二种思路还需要修改Kafka内核的代码， 对开发人员源码的掌握能力及编程能力也是一个不小的挑战， 后期系统的维护成本及Kafka社区的福利也是不得不考虑的问题。与此同时，这种思路和第一种思路一样会有内存暴涨的问题，单凭这个问题也可以判断出此种思路并不适合实际应用。")]),a._v(" "),_("p",[a._v("退一步思考， 我们并不需要复用Kafka中的延时操作的模块， 而是可以选择自己开发一个精度较高的延时模块，这里就用到了时间轮的概念，所不同的是，这里需要的是单层时间轮。而且延时消息也不再是缓存在内存中，而是暂存至文件中。时间轮中每个时间格代表一个延时时间，并且每个时间格也对应一个文件，整体上可以看作单层文件时间轮，如图所示。")]),a._v(" "),_("p",[_("img",{attrs:{src:"https://raw.githubusercontent.com/huidongyin/DrawingBed/main/Kafka/202312192150209.png",alt:"11-7"}})]),a._v(" "),_("p",[a._v("每个时间格代表1秒，若要支持2小时(也就是2x60x60=7200)之内的延时时间的消息，那么整个单层时间轮的时间格数就需要7200个，与此对应的也就需要7200个文件，听上去似乎需要庞大的系统开销，就单单文件句柄的使用也会耗费很多的系统资源。其实不然，我们并不需要维持所有文件的文件句柄， 只需要加载距离时间轮表盘指针(currentTime) 相近位置的部分文件即可，其余都可以用类似“懒加载”的机制来维持：若与时间格对应的文件不存在则可以新建，若与时间格对应的文件未加载则可以重新加载，整体上造成的时延相比于延时等级方案而言微乎其微。随着表盘指针的转动，其相邻的文件也会变得不同，整体上在内存中只需要维持少量的文件句柄就可以让系统运转起来。")]),a._v(" "),_("p",[a._v("这里为什么强调的是单层时间轮。试想一下，如果这里采用的是多层时间轮，那么必然会有时间轮降级的动作，那就需要将高层时间轮中时间格对应文件中的内容写入低层时间轮，高层时间格中伴随的是读取文件内容、写入低层时间轮、删除已写入的内容的操作，与此同时，高层时间格中也会有新的内容写入。如果要用多层时间轮来实现，不得不增加繁重的元数据控制信息和繁杂的锁机制。对单层时间轮中的时间格而言，其对应的要么是追加文件内容，要么是删除整个文件(到达延时时间，就可以读取整个文件中的内容做转发，并删除整个文件)。采用单层时间轮可以简化工程实践，减少出错的可能，性能上也并不会比多层时间轮差。")]),a._v(" "),_("p",[a._v("采用时间轮可以解决延时精度的问题，采用文件可以解决内存暴涨的问题，那么剩下的还有一个可靠性的问题，这里就借鉴了多副本机制，如图所示。生产者同样将消息写入多个备份(单层文件时间轮)，待时间轮转动而触发某些时间格过期时就可以将时间格对应的文件内容(也就是延时消息)转发到真实主题中，并且删除相应的文件。与此同时，还会有一个后台服务专门用来清理其他时间轮中相应的时间格。")]),a._v(" "),_("p",[a._v("单层文件时间轮的方案不需要修改Kafka内核的源码， 与前面第二种思路相比实现较为简单。单层文件时间轮的方案与延时级别的实现方案一样可以将延时服务(下图中单层时间轮与后台服务的整合体) 与Kafka进程进行一对一配比的同机部署， 以保证整体服务的可用性。")]),a._v(" "),_("p",[_("img",{attrs:{src:"https://raw.githubusercontent.com/huidongyin/DrawingBed/main/Kafka/202312192210074.png",alt:"11-8"}})]),a._v(" "),_("p",[a._v("总体上而言，对于延时队列的封装实现，如果要求延时精度不是那么高，则建议使用延时等级的实现方案，毕竟实现起来简单明了。反之，如果要求高精度或自定义延时时间，那么可以选择单层文件时间轮的方案。")]),a._v(" "),_("hr")])}),[],!1,null,null,null);_.default=t.exports}}]);