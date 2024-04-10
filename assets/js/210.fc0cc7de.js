(window.webpackJsonp=window.webpackJsonp||[]).push([[210],{487:function(a,s,e){"use strict";e.r(s);var t=e(4),n=Object(t.a)({},(function(){var a=this,s=a._self._c;return s("ContentSlotsDistributor",{attrs:{"slot-key":a.$parent.slotKey}},[s("p",[a._v("我们知道，在 Docker 里，容器运行的文件系统处于沙盒环境中，与外界其实是隔离的，那么我们又要如何在 Docker 中合理的通过文件与外界进行数据交换呢？在这一小节中，我们就来介绍 Docker 中与文件数据有关的内容。")]),a._v(" "),s("hr"),a._v(" "),s("h2",{attrs:{id:"_1-数据管理实现方式"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_1-数据管理实现方式"}},[a._v("#")]),a._v(" 1.数据管理实现方式")]),a._v(" "),s("p",[a._v("Docker 容器中的文件系统于我们这些开发使用者来说，虽然有很多优势，但也有很多弊端，其中显著的两点就是：")]),a._v(" "),s("ul",[s("li",[a._v("沙盒文件系统是跟随容器生命周期所创建和移除的，数据无法直接被持久化存储。")]),a._v(" "),s("li",[a._v("由于容器隔离，我们很难从容器外部获得或操作容器内部文件中的数据。")])]),a._v(" "),s("p",[a._v("当然，Docker 很好的解决了这些问题，这主要还是归功于 Docker 容器文件系统是基于 UnionFS。由于 UnionFS 支持挂载不同类型的文件系统到统一的目录结构中，所以我们只需要将宿主操作系统中，文件系统里的文件或目录挂载到容器中，便能够让容器内外共享这个文件。")]),a._v(" "),s("p",[a._v("由于通过这种方式可以互通容器内外的文件，那么文件数据持久化和操作容器内文件的问题就自然而然的解决了。")]),a._v(" "),s("p",[a._v("同时，UnionFS 带来的读写性能损失是可以忽略不计的，所以这种实现可以说是相当优秀的。")]),a._v(" "),s("hr"),a._v(" "),s("h3",{attrs:{id:"_1-1-挂载方式"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_1-1-挂载方式"}},[a._v("#")]),a._v(" 1.1 挂载方式")]),a._v(" "),s("p",[a._v("基于底层存储实现，Docker 提供了三种适用于不同场景的文件系统挂载方式："),s("strong",[a._v("Bind Mount")]),a._v("、"),s("strong",[a._v("Volume")]),a._v(" 和 "),s("strong",[a._v("Tmpfs Mount")]),a._v("。")]),a._v(" "),s("p",[s("img",{attrs:{src:"https://raw.githubusercontent.com/huidongyin/DrawingBed/main/Docker/202401092118802.webp",alt:""}})]),a._v(" "),s("ul",[s("li",[s("p",[s("strong",[a._v("Bind Mount")]),a._v(" 能够直接将宿主操作系统中的目录和文件挂载到容器内的文件系统中，通过指定容器外的路径和容器内的路径，就可以形成挂载映射关系，在容器内外对文件的读写，都是相互可见的。")])]),a._v(" "),s("li",[s("p",[s("strong",[a._v("Volume")]),a._v(" 也是从宿主操作系统中挂载目录到容器内，只不过这个挂载的目录由 Docker 进行管理，我们只需要指定容器内的目录，不需要关心具体挂载到了宿主操作系统中的哪里。")])]),a._v(" "),s("li",[s("p",[s("strong",[a._v("Tmpfs Mount")]),a._v(" 支持挂载系统内存中的一部分到容器的文件系统里，不过由于内存和容器的特征，它的存储并不是持久的，其中的内容会随着容器的停止而消失。")])])]),a._v(" "),s("hr"),a._v(" "),s("h2",{attrs:{id:"_2-挂载文件到容器"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_2-挂载文件到容器"}},[a._v("#")]),a._v(" 2.挂载文件到容器")]),a._v(" "),s("p",[a._v("要将宿主操作系统中的目录挂载到容器之后，我们可以在容器创建的时候通过传递 "),s("code",[a._v("-v")]),a._v(" 或 "),s("code",[a._v("--volume")]),a._v(" 选项来指定内外挂载的对应目录或文件。")]),a._v(" "),s("div",{staticClass:"language-bash line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[a._v(" $ "),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("docker")]),a._v(" run "),s("span",{pre:!0,attrs:{class:"token parameter variable"}},[a._v("-d")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token parameter variable"}},[a._v("--name")]),a._v(" nginx "),s("span",{pre:!0,attrs:{class:"token parameter variable"}},[a._v("-v")]),a._v(" /webapp/html:/usr/share/nginx/html nginx:1.12\n")])]),a._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[a._v("1")]),s("br")])]),s("p",[a._v("使用 "),s("code",[a._v("-v")]),a._v(" 或 "),s("code",[a._v("--volume")]),a._v(" 来挂载宿主操作系统目录的形式是 "),s("code",[a._v("-v <host-path>:<container-path>")]),a._v(" 或 "),s("code",[a._v("--volume <host-path>:<container-path>")]),a._v("，其中 "),s("code",[a._v("host-path")]),a._v(" 和 "),s("code",[a._v("container-path")]),a._v(" 分别代表宿主操作系统中的目录和容器中的目录。")]),a._v(" "),s("blockquote",[s("p",[a._v("为了避免混淆，Docker 这里强制定义目录时必须使用绝对路径，不能使用相对路径。")])]),a._v(" "),s("p",[a._v("我们能够指定目录进行挂载，也能够指定具体的文件来挂载，具体选择何种形式来挂载，大家可以根据具体的情况来选择。")]),a._v(" "),s("p",[a._v("当挂载了目录的容器启动后，我们可以看到我们在宿主操作系统中的文件已经出现在容器中了。")]),a._v(" "),s("div",{staticClass:"language-bash line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[a._v(" $ "),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("docker")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token builtin class-name"}},[a._v("exec")]),a._v(" nginx "),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("ls")]),a._v(" /usr/share/nginx/html\nindex.html\n")])]),a._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[a._v("1")]),s("br"),s("span",{staticClass:"line-number"},[a._v("2")]),s("br")])]),s("p",[a._v("在 "),s("code",[a._v("docker inspect")]),a._v(" 的结果里，我们可以看到有关容器数据挂载相关的信息。")]),a._v(" "),s("div",{staticClass:"language-bash line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[a._v(" $ "),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("docker")]),a._v(" inspect nginx\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("[")]),a._v("\n    "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("{")]),a._v("\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[a._v("## ......")]),a._v("\n        "),s("span",{pre:!0,attrs:{class:"token string"}},[a._v('"Mounts"')]),s("span",{pre:!0,attrs:{class:"token builtin class-name"}},[a._v(":")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("[")]),a._v("\n            "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("{")]),a._v("\n                "),s("span",{pre:!0,attrs:{class:"token string"}},[a._v('"Type"')]),s("span",{pre:!0,attrs:{class:"token builtin class-name"}},[a._v(":")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[a._v('"bind"')]),a._v(",\n                "),s("span",{pre:!0,attrs:{class:"token string"}},[a._v('"Source"')]),s("span",{pre:!0,attrs:{class:"token builtin class-name"}},[a._v(":")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[a._v('"/webapp/html"')]),a._v(",\n                "),s("span",{pre:!0,attrs:{class:"token string"}},[a._v('"Destination"')]),s("span",{pre:!0,attrs:{class:"token builtin class-name"}},[a._v(":")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[a._v('"/usr/share/nginx/html"')]),a._v(",\n                "),s("span",{pre:!0,attrs:{class:"token string"}},[a._v('"Mode"')]),s("span",{pre:!0,attrs:{class:"token builtin class-name"}},[a._v(":")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[a._v('""')]),a._v(",\n                "),s("span",{pre:!0,attrs:{class:"token string"}},[a._v('"RW"')]),s("span",{pre:!0,attrs:{class:"token builtin class-name"}},[a._v(":")]),a._v(" true,\n                "),s("span",{pre:!0,attrs:{class:"token string"}},[a._v('"Propagation"')]),s("span",{pre:!0,attrs:{class:"token builtin class-name"}},[a._v(":")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[a._v('"rprivate"')]),a._v("\n            "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("}")]),a._v("\n        "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("]")]),a._v(",\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[a._v("## ......")]),a._v("\n    "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("}")]),a._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("]")]),a._v("\n")])]),a._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[a._v("1")]),s("br"),s("span",{staticClass:"line-number"},[a._v("2")]),s("br"),s("span",{staticClass:"line-number"},[a._v("3")]),s("br"),s("span",{staticClass:"line-number"},[a._v("4")]),s("br"),s("span",{staticClass:"line-number"},[a._v("5")]),s("br"),s("span",{staticClass:"line-number"},[a._v("6")]),s("br"),s("span",{staticClass:"line-number"},[a._v("7")]),s("br"),s("span",{staticClass:"line-number"},[a._v("8")]),s("br"),s("span",{staticClass:"line-number"},[a._v("9")]),s("br"),s("span",{staticClass:"line-number"},[a._v("10")]),s("br"),s("span",{staticClass:"line-number"},[a._v("11")]),s("br"),s("span",{staticClass:"line-number"},[a._v("12")]),s("br"),s("span",{staticClass:"line-number"},[a._v("13")]),s("br"),s("span",{staticClass:"line-number"},[a._v("14")]),s("br"),s("span",{staticClass:"line-number"},[a._v("15")]),s("br"),s("span",{staticClass:"line-number"},[a._v("16")]),s("br"),s("span",{staticClass:"line-number"},[a._v("17")]),s("br")])]),s("p",[a._v("在关于挂载的信息中我们可以看到一个 "),s("strong",[a._v("RW")]),a._v(" 字段，这表示挂载目录或文件的读写性 ( Read and Write )。实际操作中，Docker 还支持以只读的方式挂载，通过只读方式挂载的目录和文件，只能被容器中的程序读取，但不接受容器中程序修改它们的请求。在挂载选项 "),s("code",[a._v("-v")]),a._v(" 后再接上 "),s("code",[a._v(":ro")]),a._v(" 就可以只读挂载了。")]),a._v(" "),s("div",{staticClass:"language-bash line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[a._v(" $ "),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("docker")]),a._v(" run "),s("span",{pre:!0,attrs:{class:"token parameter variable"}},[a._v("-d")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token parameter variable"}},[a._v("--name")]),a._v(" nginx "),s("span",{pre:!0,attrs:{class:"token parameter variable"}},[a._v("-v")]),a._v(" /webapp/html:/usr/share/nginx/html:ro nginx:1.12\n")])]),a._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[a._v("1")]),s("br")])]),s("p",[a._v("由于宿主操作系统文件挂载在权限允许的情况下能够挂载任何目录或文件，这给系统的安全性造成了一定的隐患，所以我们在使用 "),s("strong",[a._v("Bind Mount")]),a._v(" 的时候，一定要特别注意挂载的外部目录选择。当然，在保证安全性的前提下，有几种常见场景非常适合使用这种挂载方式。")]),a._v(" "),s("ul",[s("li",[s("p",[a._v("当我们需要从宿主操作系统共享配置的时候。对于一些配置项，我们可以直接从容器外部挂载到容器中，这利于保证容器中的配置为我们所确认的值，也方便我们对配置进行监控。例如，遇到容器中时区不正确的时候，我们可以直接将操作系统的时区配置，也就是 "),s("code",[a._v("/etc/timezone")]),a._v(" 这个文件挂载并覆盖容器中的时区配置。")])]),a._v(" "),s("li",[s("p",[a._v("当我们需要借助 Docker 进行开发的时候。虽然在 Docker 中，推崇直接将代码和配置打包进镜像，以便快速部署和快速重建。但这在开发过程中显然非常不方便，因为每次构建镜像需要耗费一定的时间，这些时间积少成多，就是对开发工作效率的严重浪费了。如果我们直接把代码挂载进入容器，那么我们每次对代码的修改都可以直接在容器外部进行。")])])]),a._v(" "),s("hr"),a._v(" "),s("h3",{attrs:{id:"_2-1-挂载临时文件目录"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_2-1-挂载临时文件目录"}},[a._v("#")]),a._v(" 2.1 挂载临时文件目录")]),a._v(" "),s("p",[s("strong",[a._v("Tmpfs Mount")]),a._v(" 是一种特殊的挂载方式，它主要利用内存来存储数据。由于内存不是持久性存储设备，所以其带给 "),s("strong",[a._v("Tmpfs Mount")]),a._v(" 的特征就是临时性挂载。")]),a._v(" "),s("p",[a._v("与挂载宿主操作系统目录或文件不同，挂载临时文件目录要通过 "),s("code",[a._v("--tmpfs")]),a._v(" 这个选项来完成。由于内存的具体位置不需要我们来指定，这个选项里我们只需要传递挂载到容器内的目录即可。")]),a._v(" "),s("div",{staticClass:"language-bash line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[a._v(" $ "),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("docker")]),a._v(" run "),s("span",{pre:!0,attrs:{class:"token parameter variable"}},[a._v("-d")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token parameter variable"}},[a._v("--name")]),a._v(" webapp "),s("span",{pre:!0,attrs:{class:"token parameter variable"}},[a._v("--tmpfs")]),a._v(" /webapp/cache webapp:latest\n")])]),a._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[a._v("1")]),s("br")])]),s("p",[a._v("容器已挂载的临时文件目录我们也可以通过 "),s("code",[a._v("docker inspect")]),a._v(" 命令查看。")]),a._v(" "),s("div",{staticClass:"language-bash line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[a._v(" $ "),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("docker")]),a._v(" inspect webapp\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("[")]),a._v("\n    "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("{")]),a._v("\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[a._v("## ......")]),a._v("\n         "),s("span",{pre:!0,attrs:{class:"token string"}},[a._v('"Tmpfs"')]),s("span",{pre:!0,attrs:{class:"token builtin class-name"}},[a._v(":")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("{")]),a._v("\n            "),s("span",{pre:!0,attrs:{class:"token string"}},[a._v('"/webapp/cache"')]),s("span",{pre:!0,attrs:{class:"token builtin class-name"}},[a._v(":")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[a._v('""')]),a._v("\n        "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("}")]),a._v(",\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[a._v("## ......")]),a._v("\n    "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("}")]),a._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("]")]),a._v("\n")])]),a._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[a._v("1")]),s("br"),s("span",{staticClass:"line-number"},[a._v("2")]),s("br"),s("span",{staticClass:"line-number"},[a._v("3")]),s("br"),s("span",{staticClass:"line-number"},[a._v("4")]),s("br"),s("span",{staticClass:"line-number"},[a._v("5")]),s("br"),s("span",{staticClass:"line-number"},[a._v("6")]),s("br"),s("span",{staticClass:"line-number"},[a._v("7")]),s("br"),s("span",{staticClass:"line-number"},[a._v("8")]),s("br"),s("span",{staticClass:"line-number"},[a._v("9")]),s("br"),s("span",{staticClass:"line-number"},[a._v("10")]),s("br")])]),s("p",[a._v("挂载临时文件首先要注意它不是持久存储这一特性，在此基础上，它有几种常见的适应场景。")]),a._v(" "),s("ul",[s("li",[s("p",[a._v("应用中使用到，但不需要进行持久保存的敏感数据，可以借助内存的非持久性和程序隔离性进行一定的安全保障。")])]),a._v(" "),s("li",[s("p",[a._v("读写速度要求较高，数据变化量大，但不需要持久保存的数据，可以借助内存的高读写速度减少操作的时间。")])])]),a._v(" "),s("hr"),a._v(" "),s("h2",{attrs:{id:"_3-使用数据卷"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_3-使用数据卷"}},[a._v("#")]),a._v(" 3.使用数据卷")]),a._v(" "),s("p",[a._v("除了与其他虚拟机工具近似的宿主操作系统目录挂载的功能外，Docker 还创造了数据卷 ( Volume ) 这个概念。数据卷的本质其实依然是宿主操作系统上的一个目录，只不过这个目录存放在 Docker 内部，接受 Docker 的管理。")]),a._v(" "),s("p",[a._v("在使用数据卷进行挂载时，我们不需要知道数据具体存储在了宿主操作系统的何处，只需要给定容器中的哪个目录会被挂载即可。")]),a._v(" "),s("p",[a._v("我们依然可以使用 "),s("code",[a._v("-v")]),a._v(" 或 "),s("code",[a._v("--volume")]),a._v(" 选项来定义数据卷的挂载。")]),a._v(" "),s("div",{staticClass:"language-bash line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[a._v(" $ "),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("docker")]),a._v(" run "),s("span",{pre:!0,attrs:{class:"token parameter variable"}},[a._v("-d")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token parameter variable"}},[a._v("--name")]),a._v(" webapp "),s("span",{pre:!0,attrs:{class:"token parameter variable"}},[a._v("-v")]),a._v(" /webapp/storage webapp:latest\n")])]),a._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[a._v("1")]),s("br")])]),s("p",[a._v("数据卷挂载到容器后，我们可以通过 "),s("code",[a._v("docker inspect")]),a._v(" 看到容器中数据卷挂载的信息。")]),a._v(" "),s("div",{staticClass:"language-bash line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[a._v(" $ "),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("docker")]),a._v(" inspect webapp\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("[")]),a._v("\n    "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("{")]),a._v("\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[a._v("## ......")]),a._v("\n        "),s("span",{pre:!0,attrs:{class:"token string"}},[a._v('"Mounts"')]),s("span",{pre:!0,attrs:{class:"token builtin class-name"}},[a._v(":")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("[")]),a._v("\n            "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("{")]),a._v("\n                "),s("span",{pre:!0,attrs:{class:"token string"}},[a._v('"Type"')]),s("span",{pre:!0,attrs:{class:"token builtin class-name"}},[a._v(":")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[a._v('"volume"')]),a._v(",\n                "),s("span",{pre:!0,attrs:{class:"token string"}},[a._v('"Name"')]),s("span",{pre:!0,attrs:{class:"token builtin class-name"}},[a._v(":")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[a._v('"2bbd2719b81fbe030e6f446243386d763ef25879ec82bb60c9be7ef7f3a25336"')]),a._v(",\n                "),s("span",{pre:!0,attrs:{class:"token string"}},[a._v('"Source"')]),s("span",{pre:!0,attrs:{class:"token builtin class-name"}},[a._v(":")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[a._v('"/var/lib/docker/volumes/2bbd2719b81fbe030e6f446243386d763ef25879ec82bb60c9be7ef7f3a25336/_data"')]),a._v(",\n                "),s("span",{pre:!0,attrs:{class:"token string"}},[a._v('"Destination"')]),s("span",{pre:!0,attrs:{class:"token builtin class-name"}},[a._v(":")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[a._v('"/webapp/storage"')]),a._v(",\n                "),s("span",{pre:!0,attrs:{class:"token string"}},[a._v('"Driver"')]),s("span",{pre:!0,attrs:{class:"token builtin class-name"}},[a._v(":")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[a._v('"local"')]),a._v(",\n                "),s("span",{pre:!0,attrs:{class:"token string"}},[a._v('"Mode"')]),s("span",{pre:!0,attrs:{class:"token builtin class-name"}},[a._v(":")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[a._v('""')]),a._v(",\n                "),s("span",{pre:!0,attrs:{class:"token string"}},[a._v('"RW"')]),s("span",{pre:!0,attrs:{class:"token builtin class-name"}},[a._v(":")]),a._v(" true,\n                "),s("span",{pre:!0,attrs:{class:"token string"}},[a._v('"Propagation"')]),s("span",{pre:!0,attrs:{class:"token builtin class-name"}},[a._v(":")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[a._v('""')]),a._v("\n            "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("}")]),a._v("\n        "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("]")]),a._v(",\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[a._v("## ......")]),a._v("\n    "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("}")]),a._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("]")]),a._v("\n")])]),a._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[a._v("1")]),s("br"),s("span",{staticClass:"line-number"},[a._v("2")]),s("br"),s("span",{staticClass:"line-number"},[a._v("3")]),s("br"),s("span",{staticClass:"line-number"},[a._v("4")]),s("br"),s("span",{staticClass:"line-number"},[a._v("5")]),s("br"),s("span",{staticClass:"line-number"},[a._v("6")]),s("br"),s("span",{staticClass:"line-number"},[a._v("7")]),s("br"),s("span",{staticClass:"line-number"},[a._v("8")]),s("br"),s("span",{staticClass:"line-number"},[a._v("9")]),s("br"),s("span",{staticClass:"line-number"},[a._v("10")]),s("br"),s("span",{staticClass:"line-number"},[a._v("11")]),s("br"),s("span",{staticClass:"line-number"},[a._v("12")]),s("br"),s("span",{staticClass:"line-number"},[a._v("13")]),s("br"),s("span",{staticClass:"line-number"},[a._v("14")]),s("br"),s("span",{staticClass:"line-number"},[a._v("15")]),s("br"),s("span",{staticClass:"line-number"},[a._v("16")]),s("br"),s("span",{staticClass:"line-number"},[a._v("17")]),s("br"),s("span",{staticClass:"line-number"},[a._v("18")]),s("br"),s("span",{staticClass:"line-number"},[a._v("19")]),s("br")])]),s("p",[a._v("这里我们所得到的信息与绑定挂载有所区别，除了 Type 中的类型不一样之外，在数据卷挂载中，我们还要关注一下 Name 和 Source 这两个信息。")]),a._v(" "),s("p",[a._v("其中 Source 是 Docker 为我们分配用于挂载的宿主机目录，其位于 Docker 的资源区域 ( 这里是默认的 "),s("code",[a._v("/var/lib/docker")]),a._v(" ) 内。当然，我们并不需要关心这个目录，一切对它的管理都已经在 Docker 内实现了。")]),a._v(" "),s("p",[a._v("为了方便识别数据卷，我们可以像命名容器一样为数据卷命名，这里的 Name 就是数据卷的命名。在我们未给出数据卷命名的时候，Docker 会采用数据卷的 ID 命名数据卷。我们也可以通过 "),s("code",[a._v("-v <name>:<container-path>")]),a._v(" 这种形式来命名数据卷。")]),a._v(" "),s("div",{staticClass:"language-bash line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[a._v(" $ "),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("docker")]),a._v(" run "),s("span",{pre:!0,attrs:{class:"token parameter variable"}},[a._v("-d")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token parameter variable"}},[a._v("--name")]),a._v(" webapp "),s("span",{pre:!0,attrs:{class:"token parameter variable"}},[a._v("-v")]),a._v(" appdata:/webapp/storage webapp:latest\n")])]),a._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[a._v("1")]),s("br")])]),s("p",[a._v("由于 "),s("code",[a._v("-v")]),a._v(" 选项既承载了 "),s("strong",[a._v("Bind Mount")]),a._v(" 的定义，又参与了 "),s("strong",[a._v("Volume")]),a._v(" 的定义，所以其传参方式需要特别留意。前面提到了，"),s("code",[a._v("-v")]),a._v(" 在定义绑定挂载时必须使用绝对路径，其目的主要是为了避免与数据卷挂载中命名这种形式的冲突。")]),a._v(" "),s("p",[a._v("虽然与绑定挂载的原理差别不大，但数据卷在许多实际场景下你会发现它很有用。")]),a._v(" "),s("ul",[s("li",[s("p",[a._v("当希望将数据在多个容器间共享时，利用数据卷可以在保证数据持久性和完整性的前提下，完成更多自动化操作。")])]),a._v(" "),s("li",[s("p",[a._v("当我们希望对容器中挂载的内容进行管理时，可以直接利用数据卷自身的管理方法实现。")])]),a._v(" "),s("li",[s("p",[a._v("当使用远程服务器或云服务作为存储介质的时候，数据卷能够隐藏更多的细节，让整个过程变得更加简单。")])])]),a._v(" "),s("hr"),a._v(" "),s("h3",{attrs:{id:"_3-1-共用数据卷"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_3-1-共用数据卷"}},[a._v("#")]),a._v(" 3.1 共用数据卷")]),a._v(" "),s("p",[a._v("数据卷的另一大作用是实现容器间的目录共享，也就是通过挂载相同的数据卷，让容器之间能够同时看到并操作数据卷中的内容。这个功能虽然也可以通过绑定挂载来实现，但通过数据卷来操作会更加的舒适、简单。")]),a._v(" "),s("p",[a._v("由于数据卷的命名在 Docker 中是唯一的，所以我们很容易通过数据卷的名称确定数据卷，这就让我们很方便的让多个容器挂载同一个数据卷了。")]),a._v(" "),s("div",{staticClass:"language-bash line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[a._v(" $ "),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("docker")]),a._v(" run "),s("span",{pre:!0,attrs:{class:"token parameter variable"}},[a._v("-d")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token parameter variable"}},[a._v("--name")]),a._v(" webapp "),s("span",{pre:!0,attrs:{class:"token parameter variable"}},[a._v("-v")]),a._v(" html:/webapp/html webapp:latest\n $ "),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("docker")]),a._v(" run "),s("span",{pre:!0,attrs:{class:"token parameter variable"}},[a._v("-d")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token parameter variable"}},[a._v("--name")]),a._v(" nginx "),s("span",{pre:!0,attrs:{class:"token parameter variable"}},[a._v("-v")]),a._v(" html:/usr/share/nginx/html:ro nginx:1.12\n")])]),a._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[a._v("1")]),s("br"),s("span",{staticClass:"line-number"},[a._v("2")]),s("br")])]),s("p",[a._v("我们使用 "),s("code",[a._v("-v")]),a._v(" 选项挂载数据卷时，如果数据卷不存在，Docker 会为我们自动创建和分配宿主操作系统的目录，而如果同名数据卷已经存在，则会直接引用。")]),a._v(" "),s("p",[a._v("如果觉得这样对数据卷的操作方式还不够直接和准确，我们还可以通过 "),s("code",[a._v("docker volume")]),a._v(" 下的几个命令专门操作数据卷。")]),a._v(" "),s("p",[a._v("通过 "),s("code",[a._v("docker volume create")]),a._v(" 我们可以不依赖于容器独立创建数据卷。")]),a._v(" "),s("div",{staticClass:"language-bash line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[a._v(" $ "),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("docker")]),a._v(" volume create appdata\n")])]),a._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[a._v("1")]),s("br")])]),s("p",[a._v("通过 "),s("code",[a._v("docker volume ls")]),a._v(" 可以列出当前已创建的数据卷。")]),a._v(" "),s("div",{staticClass:"language-bash line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[a._v(" $ "),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("docker")]),a._v(" volume "),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("ls")]),a._v("\nDRIVER              VOLUME NAME\n"),s("span",{pre:!0,attrs:{class:"token builtin class-name"}},[a._v("local")]),a._v("               html\n"),s("span",{pre:!0,attrs:{class:"token builtin class-name"}},[a._v("local")]),a._v("               appdata\n")])]),a._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[a._v("1")]),s("br"),s("span",{staticClass:"line-number"},[a._v("2")]),s("br"),s("span",{staticClass:"line-number"},[a._v("3")]),s("br"),s("span",{staticClass:"line-number"},[a._v("4")]),s("br")])]),s("hr"),a._v(" "),s("h3",{attrs:{id:"_3-2-删除数据卷"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_3-2-删除数据卷"}},[a._v("#")]),a._v(" 3.2 删除数据卷")]),a._v(" "),s("p",[a._v("虽然数据卷的目的是用来持久化存储数据的，但有时候我们也难免有删除它们以释放空间的需求。直接去 Docker 的目录下删除显然不是好的选择，我们应该通过 Docker 对数据卷的管理命令来删除它们。")]),a._v(" "),s("p",[a._v("我们可以直接通过 "),s("code",[a._v("docker volume rm")]),a._v(" 来删除指定的数据卷。")]),a._v(" "),s("div",{staticClass:"language-bash line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[a._v(" $ "),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("docker")]),a._v(" volume "),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("rm")]),a._v(" appdata\n")])]),a._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[a._v("1")]),s("br")])]),s("p",[a._v("在删除数据卷之前，我们必须保证数据卷没有被任何容器所使用 ( 也就是之前引用过这个数据卷的容器都已经删除 )，否则 Docker 不会允许我们删除这个数据卷。")]),a._v(" "),s("p",[a._v("对于我们没有直接命名的数据卷，因为要反复核对数据卷 ID，这样的方式并不算特别友好。这种没有命名的数据卷，通常我们可以看成它们与对应的容器产生了绑定，因为其他容器很难使用到它们。而这种绑定关系的产生，也让我们可以在容器删除时将它们一并删除。")]),a._v(" "),s("p",[a._v("在 "),s("code",[a._v("docker rm")]),a._v(" 删除容器的命令中，我们可以通过增加 "),s("code",[a._v("-v")]),a._v(" 选项来删除容器关联的数据卷。")]),a._v(" "),s("div",{staticClass:"language-bash line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[a._v(" $ "),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("docker")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("rm")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token parameter variable"}},[a._v("-v")]),a._v(" webapp\n")])]),a._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[a._v("1")]),s("br")])]),s("p",[a._v("如果我们没有随容器删除这些数据卷，Docker 在创建新的容器时也不会启用它们，即使它们与新创建容器所定义的数据卷有完全一致的特征。也就是说，此时它们已经变成了孤魂野鬼，纯粹的占用着硬盘空间而又不受管理。")]),a._v(" "),s("p",[a._v("此时我们可以通过 "),s("code",[a._v("docker volume rm")]),a._v(" 来删除它们，但前提时你能在一堆乱码般的数据卷 ID 中找出哪个是没有被容器引用的数据卷。")]),a._v(" "),s("p",[a._v("为此，Docker 向我们提供了 "),s("code",[a._v("docker volume prune")]),a._v(" 这个命令，它可以删除那些没有被容器引用的数据卷。")]),a._v(" "),s("div",{staticClass:"language-bash line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[a._v("👨 huidong 📌  ~ ⌚ "),s("span",{pre:!0,attrs:{class:"token number"}},[a._v("24")]),a._v("-01-08 "),s("span",{pre:!0,attrs:{class:"token number"}},[a._v("22")]),a._v(":44:49\n$ "),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("docker")]),a._v(" volume prune "),s("span",{pre:!0,attrs:{class:"token parameter variable"}},[a._v("-f")]),a._v("\nTotal reclaimed space: 0B\n👨 huidong 📌  ~ ⌚ "),s("span",{pre:!0,attrs:{class:"token number"}},[a._v("24")]),a._v("-01-09 "),s("span",{pre:!0,attrs:{class:"token number"}},[a._v("21")]),a._v(":34:50\n")])]),a._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[a._v("1")]),s("br"),s("span",{staticClass:"line-number"},[a._v("2")]),s("br"),s("span",{staticClass:"line-number"},[a._v("3")]),s("br"),s("span",{staticClass:"line-number"},[a._v("4")]),s("br")])]),s("h2",{attrs:{id:"_4-数据卷容器"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_4-数据卷容器"}},[a._v("#")]),a._v(" 4.数据卷容器")]),a._v(" "),s("p",[a._v("在数据卷的基础上，我们有一种相对新颖的用法，也就是数据卷容器。所谓数据卷容器，就是一个没有具体指定的应用，甚至不需要运行的容器，我们使用它的目的，是为了定义一个或多个数据卷并持有它们的引用。")]),a._v(" "),s("p",[s("img",{attrs:{src:"https://raw.githubusercontent.com/huidongyin/DrawingBed/main/Docker/202401092136464.webp",alt:""}})]),a._v(" "),s("p",[a._v("创建数据卷容器的方式很简单，由于不需要容器本身运行，因而我们找个简单的系统镜像都可以完成创建。")]),a._v(" "),s("div",{staticClass:"language-bash line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[a._v("$ "),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("docker")]),a._v(" create "),s("span",{pre:!0,attrs:{class:"token parameter variable"}},[a._v("--name")]),a._v(" appdata "),s("span",{pre:!0,attrs:{class:"token parameter variable"}},[a._v("-v")]),a._v(" /webapp/storage ubuntu\n")])]),a._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[a._v("1")]),s("br")])]),s("p",[a._v("在使用数据卷容器时，不建议再定义数据卷的名称，因为我们可以通过对数据卷容器的引用来完成数据卷的引用。而不设置数据卷的名称，也避免了在同一 Docker 中数据卷重名的尴尬。")]),a._v(" "),s("p",[a._v("之前我们提到，Docker 的 Network 是容器间的网络桥梁，如果做类比，数据卷容器就可以算是容器间的文件系统桥梁。我们可以像加入网络一样引用数据卷容器，只需要在创建新容器时使用专门的 "),s("code",[a._v("--volumes-from")]),a._v(" 选项即可。")]),a._v(" "),s("div",{staticClass:"language-bash line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[a._v("$ "),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("docker")]),a._v(" run "),s("span",{pre:!0,attrs:{class:"token parameter variable"}},[a._v("-d")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token parameter variable"}},[a._v("--name")]),a._v(" webapp --volumes-from appdata webapp:latest\n")])]),a._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[a._v("1")]),s("br")])]),s("p",[a._v("引用数据卷容器时，不需要再定义数据卷挂载到容器中的位置，Docker 会以数据卷容器中的挂载定义将数据卷挂载到引用的容器中。")]),a._v(" "),s("p",[a._v("虽然看上去数据卷容器与数据卷的使用方法变化不大，但最关键的就在于其真正隐藏了数据卷的配置和定义，我们只需要通过数据卷容器的名称来使用它。这些细节的隐藏，意味着我们能够更轻松的实现容器的迁移。")]),a._v(" "),s("hr"),a._v(" "),s("h3",{attrs:{id:"_4-1-备份和迁移数据卷"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_4-1-备份和迁移数据卷"}},[a._v("#")]),a._v(" 4.1 备份和迁移数据卷")]),a._v(" "),s("p",[a._v("由于数据卷本身就是宿主操作系统中的一个目录，我们只需要在 Docker 资源目录里找到它就可以很轻松的打包、迁移、恢复了。虽然这么做相对其他虚拟化方案来说已经很简单了，但在 Docker 里还不是最优雅的解决方式。")]),a._v(" "),s("p",[a._v("利用数据卷容器，我们还能够更方便的对数据卷中的数据进行迁移。")]),a._v(" "),s("p",[a._v("数据备份、迁移、恢复的过程可以理解为对数据进行打包，移动到其他位置，在需要的地方解压的过程。在数据打包之前，我们先建立一个用来存放打包文件的目录，这里我们使用 "),s("code",[a._v("/backup")]),a._v(" 作为例子。")]),a._v(" "),s("p",[a._v("要备份数据，我们先建立一个临时的容器，将用于备份的目录和要备份的数据卷都挂载到这个容器上。")]),a._v(" "),s("div",{staticClass:"language-bash line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[a._v("$ "),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("docker")]),a._v(" run "),s("span",{pre:!0,attrs:{class:"token parameter variable"}},[a._v("--rm")]),a._v(" --volumes-from appdata "),s("span",{pre:!0,attrs:{class:"token parameter variable"}},[a._v("-v")]),a._v(" /backup:/backup ubuntu "),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("tar")]),a._v(" cvf /backup/backup.tar /webapp/storage\n")])]),a._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[a._v("1")]),s("br")])]),s("p",[a._v("在这条命令中，除了挂载的配置外，我们再注意几个选项。通过 "),s("code",[a._v("--rm")]),a._v(" 选项，我们可以让容器在停止后自动删除，而不需要我们再使用容器删除命令来删除它，这对于我们使用一些临时容器很有帮助。在容器所基于的镜像之后，我们还看到了一串命令，也就是 "),s("code",[a._v("tar cvf /backup/backup.tar /webapp/storage")]),a._v("，其实如果我们在镜像定义之后接上命令，可以直接替换掉镜像所定义的主程序启动命令，而去执行这一条命令。在很多场合下，我们还能通过这个方法干很多不同的事情。")]),a._v(" "),s("p",[a._v("在备份后，我们就可以在 "),s("code",[a._v("/backup")]),a._v(" 下找到数据卷的备份文件，也就是 "),s("code",[a._v("backup.tar")]),a._v(" 了。")]),a._v(" "),s("p",[a._v("如果要恢复数据卷中的数据，我们也可以借助临时容器完成。")]),a._v(" "),s("div",{staticClass:"language-bash line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[a._v("$ "),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("docker")]),a._v(" run "),s("span",{pre:!0,attrs:{class:"token parameter variable"}},[a._v("--rm")]),a._v(" --volumes-from appdata "),s("span",{pre:!0,attrs:{class:"token parameter variable"}},[a._v("-v")]),a._v(" /backup:/backup ubuntu "),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("tar")]),a._v(" xvf /backup/backup.tar "),s("span",{pre:!0,attrs:{class:"token parameter variable"}},[a._v("-C")]),a._v(" /webapp/storage "),s("span",{pre:!0,attrs:{class:"token parameter variable"}},[a._v("--strip")]),a._v("\n")])]),a._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[a._v("1")]),s("br")])]),s("p",[a._v("恢复的过程与备份的过程类似，只不过把打包的命令转换为解包的命令而已。")]),a._v(" "),s("hr"),a._v(" "),s("h2",{attrs:{id:"_5-另一个挂载选项"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_5-另一个挂载选项"}},[a._v("#")]),a._v(" 5.另一个挂载选项")]),a._v(" "),s("p",[a._v("上面我们讲到了使用 "),s("code",[a._v("-v")]),a._v(" 选项来挂载存在容易混淆的问题，其主要原因是挂载的方式和配置随着 Docker 的不断发展日渐丰富，而 "),s("code",[a._v("-v")]),a._v(" 选项的传参方式限制了它能使用的场景。")]),a._v(" "),s("p",[a._v("其实在 Docker 里为我们提供了一个相对支持丰富的挂载方式，也就是通过 "),s("code",[a._v("--mount")]),a._v(" 这个选项配置挂载。")]),a._v(" "),s("div",{staticClass:"language-bash line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[a._v("$ "),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("docker")]),a._v(" run "),s("span",{pre:!0,attrs:{class:"token parameter variable"}},[a._v("-d")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token parameter variable"}},[a._v("--name")]),a._v(" webapp webapp:latest "),s("span",{pre:!0,attrs:{class:"token parameter variable"}},[a._v("--mount")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[a._v("'type=volume,src=appdata,dst=/webapp/storage,volume-driver=local,volume-opt=type=nfs,volume-opt=device=<nfs-server>:<nfs-path>'")]),a._v(" webapp:latest\n")])]),a._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[a._v("1")]),s("br")])]),s("p",[a._v("在 "),s("code",[a._v("--mount")]),a._v(" 中，我们可以通过逗号分隔这种 CSV 格式来定义多个参数。其中，通过 type 我们可以定义挂载类型，其值可以是："),s("code",[a._v("bind")]),a._v("，"),s("code",[a._v("volume")]),a._v(" 或 "),s("code",[a._v("tmpfs")]),a._v("。另外，"),s("code",[a._v("--mount")]),a._v(" 选项能够帮助我们实现集群挂载的定义，例如在这个例子中，我们挂载的来源是一个 NFS 目录。")]),a._v(" "),s("p",[a._v("由于在实际开发中，"),s("code",[a._v("-v")]),a._v(" 基本上足够满足我们的需求，所以我们不常使用相对复杂的 "),s("code",[a._v("--mount")]),a._v(" 选项来定义挂载。")]),a._v(" "),s("hr")])}),[],!1,null,null,null);s.default=n.exports}}]);