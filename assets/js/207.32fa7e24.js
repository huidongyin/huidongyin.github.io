(window.webpackJsonp=window.webpackJsonp||[]).push([[207],{484:function(s,a,n){"use strict";n.r(a);var e=n(4),t=Object(e.a)({},(function(){var s=this,a=s._self._c;return a("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[a("p",[s._v("Docker 与其他虚拟化软件的一处不同就是将镜像管理纳入到了功能之中。实现虚拟化只是程序能够无缝移植的一部分，而有了镜像管理，就真正取代了我们在移植过程中的繁琐操作。利用 Docker 的镜像管理功能，我们可以很方便的通过网络传输和分享镜像，并保障镜像内容的一致性。所以，了解 Docker 的镜像管理方法可以算是掌握 Docker 的第一步。")]),s._v(" "),a("hr"),s._v(" "),a("h2",{attrs:{id:"_1-镜像仓库"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_1-镜像仓库"}},[s._v("#")]),s._v(" 1.镜像仓库")]),s._v(" "),a("p",[s._v("在之前的小节里，我们已经提到过 Docker 里集中存放镜像的一个概念，也就是镜像仓库。")]),s._v(" "),a("p",[s._v("如果说我们把镜像的结构用 Git 项目的结构做类比，那么镜像仓库就可以看似 GitLab、GitHub 等的托管平台，只不过 Docker 的镜像仓库托管的不是代码项目，而是镜像。")]),s._v(" "),a("p",[s._v("当然，存储镜像并不是镜像仓库最值得炫耀的功能，其最大的作用是实现了 Docker 镜像的分发。借助镜像仓库，我们得到了一个镜像的中转站，我们可以将开发环境上所使用的镜像推送至镜像仓库，并在测试或生产环境上拉取到它们，而这个过程仅需要几个命令，甚至自动化完成。")]),s._v(" "),a("p",[a("img",{attrs:{src:"https://raw.githubusercontent.com/huidongyin/DrawingBed/main/Docker/202401082137288.webp",alt:""}})]),s._v(" "),a("hr"),s._v(" "),a("h3",{attrs:{id:"_1-1-获取镜像"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_1-1-获取镜像"}},[s._v("#")]),s._v(" 1.1 获取镜像")]),s._v(" "),a("p",[s._v("虽然有很多种方式将镜像引入到 Docker 之中，但我们最为常用的获取现有镜像的方式还是直接从镜像仓库中拉取，因为这种方式简单、快速、有保障。")]),s._v(" "),a("p",[s._v("要拉取镜像，我们可以使用 "),a("code",[s._v("docker pull")]),s._v(" 命令，命令的参数就是我们之前所提到的镜像仓库名。")]),s._v(" "),a("div",{staticClass:"language-bash line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[s._v("👨 huidong 📌  ~ ⌚ "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("24")]),s._v("-01-08 "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("21")]),s._v(":38:45\n$ "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("docker")]),s._v(" pull ubuntu\nUsing default tag: latest\nlatest: Pulling from library/ubuntu\n005e2837585d: Pull complete \nDigest: sha256:6042500cf4b44023ea1894effe7890666b0c5c7871ed83a97c36c76ae560bb9b\nStatus: Downloaded newer image "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("for")]),s._v(" ubuntu:latest\ndocker.io/library/ubuntu:latest\n\nWhat's Next?\n  View summary of image vulnerabilities and recommendations → "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("docker")]),s._v(" scout quickview ubuntu\n👨 huidong 📌  ~ ⌚ "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("24")]),s._v("-01-08 "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("21")]),s._v(":39:03\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br"),a("span",{staticClass:"line-number"},[s._v("7")]),a("br"),a("span",{staticClass:"line-number"},[s._v("8")]),a("br"),a("span",{staticClass:"line-number"},[s._v("9")]),a("br"),a("span",{staticClass:"line-number"},[s._v("10")]),a("br"),a("span",{staticClass:"line-number"},[s._v("11")]),a("br"),a("span",{staticClass:"line-number"},[s._v("12")]),a("br")])]),a("p",[s._v("当我们运行这个命令后，Docker 就会开始从镜像仓库中拉取我们所指定的镜像了，在控制台中，我们可以看到镜像拉取的进度。下载进度会分为几行，其实每一行代表的就是一个镜像层。Docker 首先会拉取镜像所基于的所有镜像层，之后再单独拉取每一个镜像层并组合成这个镜像。当然，如果在本地已经存在相同的镜像层 ( 共享于其他的镜像 )，那么 Docker 就直接略过这个镜像层的拉取而直接采用本地的内容。")]),s._v(" "),a("p",[s._v("上面是一个拉取官方镜像并且没有给出镜像标签的例子，当我们没有提供镜像标签时，Docker 会默认使用 "),a("code",[s._v("latest")]),s._v(" 这个标签。")]),s._v(" "),a("p",[s._v("当然，我们也能够使用完整的镜像命名来拉取镜像。")]),s._v(" "),a("div",{staticClass:"language-bash line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[s._v("👨 huidong 📌  ~ ⌚ "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("24")]),s._v("-01-08 "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("21")]),s._v(":39:03\n$ "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("docker")]),s._v(" pull openresty/openresty:1.13.6.2-alpine\n"),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("1.13")]),s._v(".6.2-alpine: Pulling from openresty/openresty\nc87736221ed0: Pull complete \n53f6b013a811: Pull complete \n68015775fa7e: Pull complete \nf7390fbe72b7: Pull complete \nDigest: sha256:5b154033344cde8928b969c64206620fa5b296d2cb94cdd00e1ddb5781007c26\nStatus: Downloaded newer image "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("for")]),s._v(" openresty/openresty:1.13.6.2-alpine\ndocker.io/openresty/openresty:1.13.6.2-alpine\n\n👨 huidong 📌  ~ ⌚ "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("24")]),s._v("-01-08 "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("21")]),s._v(":42:06\n$ \n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br"),a("span",{staticClass:"line-number"},[s._v("7")]),a("br"),a("span",{staticClass:"line-number"},[s._v("8")]),a("br"),a("span",{staticClass:"line-number"},[s._v("9")]),a("br"),a("span",{staticClass:"line-number"},[s._v("10")]),a("br"),a("span",{staticClass:"line-number"},[s._v("11")]),a("br"),a("span",{staticClass:"line-number"},[s._v("12")]),a("br"),a("span",{staticClass:"line-number"},[s._v("13")]),a("br")])]),a("p",[s._v("镜像在被拉取之后，就存放到了本地，接受当前这个 Docker 实例管理了，我们可以通过 "),a("code",[s._v("docker images")]),s._v(" 命令看到它们。")]),s._v(" "),a("div",{staticClass:"language-bash line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[s._v("👨 huidong 📌  ~/chenhuizhi ⌚ "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("24")]),s._v("-01-08 "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("21")]),s._v(":42:06\n$ "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("docker")]),s._v(" images                                  \nREPOSITORY            TAG               IMAGE ID       CREATED         SIZE\nubuntu                latest            da935f064913   "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("3")]),s._v(" weeks ago     "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("69")]),s._v(".3MB\nredis                 "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("6")]),s._v("                 f4c42847bb1a   "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("5")]),s._v(" months ago    146MB\nmysql/mysql-server    "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("5.7")]),s._v("               a4ad24fe52cd   "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("11")]),s._v(" months ago   432MB\nzookeeper             "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("3.7")]),s._v(".1             3df55730d9e2   "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("14")]),s._v(" months ago   266MB\nzookeeper             "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("3.5")]),s._v(".9             5b252279904a   "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("14")]),s._v(" months ago   257MB\nwurstmeister/kafka    latest            db97697f6e28   "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("19")]),s._v(" months ago   457MB\nelasticsearch         "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("7.16")]),s._v(".2            e082d8ac7e5e   "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("2")]),s._v(" years ago     634MB\nkibana                "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("7.16")]),s._v(".2            8bcb4cae919c   "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("2")]),s._v(" years ago     "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("1")]),s._v(".45GB\nopenresty/openresty   "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("1.13")]),s._v(".6.2-alpine   ef57f6ca4202   "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("4")]),s._v(" years ago     "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("49")]),s._v(".1MB\n👨 huidong 📌  ~/chenhuizhi ⌚ "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("24")]),s._v("-01-08 "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("21")]),s._v(":43:10\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br"),a("span",{staticClass:"line-number"},[s._v("7")]),a("br"),a("span",{staticClass:"line-number"},[s._v("8")]),a("br"),a("span",{staticClass:"line-number"},[s._v("9")]),a("br"),a("span",{staticClass:"line-number"},[s._v("10")]),a("br"),a("span",{staticClass:"line-number"},[s._v("11")]),a("br"),a("span",{staticClass:"line-number"},[s._v("12")]),a("br"),a("span",{staticClass:"line-number"},[s._v("13")]),a("br")])]),a("p",[s._v("对于 "),a("code",[s._v("docker images")]),s._v(" 命令，存在以下可选参数：")]),s._v(" "),a("ul",[a("li",[a("code",[s._v("-a")]),s._v("：列出本地所有镜像（镜像分层概念）")]),s._v(" "),a("li",[a("code",[s._v("-q")]),s._v("：只显示镜像ID")]),s._v(" "),a("li",[a("code",[s._v("--digests")]),s._v("：显示镜像的摘要信息")]),s._v(" "),a("li",[a("code",[s._v("--no-trunc")]),s._v("：显示完整的镜像信息")])]),s._v(" "),a("hr"),s._v(" "),a("h2",{attrs:{id:"_2-docker-hub"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_2-docker-hub"}},[s._v("#")]),s._v(" 2.Docker Hub")]),s._v(" "),a("p",[s._v("既然说到镜像仓库，就不得不提 "),a("strong",[s._v("Docker Hub")]),s._v(" 了。Docker Hub 是 Docker 官方建立的中央镜像仓库，除了普通镜像仓库的功能外，它内部还有更加细致的权限管理，支持构建钩子和自动构建，并且有一套精致的 Web 操作页面。")]),s._v(" "),a("blockquote",[a("p",[a("a",{attrs:{href:"https://hub.docker.com",target:"_blank",rel:"noopener noreferrer"}},[s._v("Docker Hub 的地址是：https://hub.docker.com"),a("OutboundLink")],1)])]),s._v(" "),a("p",[a("img",{attrs:{src:"https://raw.githubusercontent.com/huidongyin/DrawingBed/main/Docker/202401082145041.png",alt:""}})]),s._v(" "),a("p",[s._v("由于定位是 Docker 的中央镜像仓库系统，同时也是 Docker Engine 的默认镜像仓库，所以 Docker Hub 是开发者共享镜像的首选，那么也就意味着其中的镜像足够丰富。")]),s._v(" "),a("p",[s._v("常用服务软件的镜像，我们都能在 Docker Hub 中找到，甚至能找到针对它们不同用法的不同镜像。")]),s._v(" "),a("p",[s._v("同时，Docker Hub 也允许我们将我们制作好的镜像上传到其中，与广大 Docker 用户共享你的成果。")]),s._v(" "),a("hr"),s._v(" "),a("h3",{attrs:{id:"_2-1-搜索镜像"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_2-1-搜索镜像"}},[s._v("#")]),s._v(" 2.1 搜索镜像")]),s._v(" "),a("p",[s._v("由于 Docker Hub 提供了一套完整的 Web 操作界面，所以我们搜索其中的镜像会非常方便。")]),s._v(" "),a("p",[s._v("在上方的搜索条中输入镜像的关键词，回车搜索我们就可以看到镜像搜索的结果了。")]),s._v(" "),a("p",[a("img",{attrs:{src:"https://raw.githubusercontent.com/huidongyin/DrawingBed/main/Docker/202401082148606.png",alt:""}})]),s._v(" "),a("p",[s._v("在 Docker Hub 的搜索结果中，有几项关键的信息有助于我们选择合适的镜像：")]),s._v(" "),a("ul",[a("li",[a("strong",[s._v("OFFICIAL")]),s._v(" 代表镜像为 Docker 官方提供和维护，相对来说稳定性和安全性较高")]),s._v(" "),a("li",[a("strong",[s._v("STARS")]),s._v(" 代表镜像的关注人数，这类似 GitHub 的 Stars，可以理解为热度")]),s._v(" "),a("li",[a("strong",[s._v("PULLS")]),s._v(" 代表镜像被拉取的次数，基本上能够表示镜像被使用的频度\n当然，关于镜像更多的信息我们可以在 "),a("strong",[s._v("DETAILS")]),s._v(" 中看到，这其中通常还包括了每个镜像不同的使用方法。具体如何阅读这些使用说明，我们会在之后的小节里专门介绍。")])]),s._v(" "),a("p",[a("img",{attrs:{src:"https://raw.githubusercontent.com/huidongyin/DrawingBed/main/Docker/202401082150708.webp",alt:""}})]),s._v(" "),a("p",[s._v("除了直接通过 Docker Hub 网站搜索镜像这种方式外，我们还可以用 docker CLI 中的 "),a("code",[s._v("docker search")]),s._v(" 这个命令搜索 Docker Hub 中的镜像。")]),s._v(" "),a("div",{staticClass:"language-bash line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[s._v("👨 huidong 📌  ~ ⌚ "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("24")]),s._v("-01-08 "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("21")]),s._v(":51:07\n$ "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("docker")]),s._v(" search redis\nNAME                                DESCRIPTION                                      STARS     OFFICIAL   AUTOMATED\nredis                               Redis is an "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("open")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("source")]),s._v(" key-value store that…   "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("12591")]),s._v("     "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),s._v("OK"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),s._v("       \nredislabs/redisearch                Redis With the RedisSearch module pre-loaded…   "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("61")]),s._v("                   \nredislabs/redisinsight              RedisInsight - The GUI "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("for")]),s._v(" Redis                 "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("95")]),s._v("                   \nredis/redis-stack-server            redis-stack-server installs a Redis server w…   "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("64")]),s._v("                   \nredis/redis-stack                   redis-stack installs a Redis server with add…   "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("88")]),s._v("                   \n👨 huidong 📌  ~ ⌚ "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("24")]),s._v("-01-08 "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("21")]),s._v(":51:14\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br"),a("span",{staticClass:"line-number"},[s._v("7")]),a("br"),a("span",{staticClass:"line-number"},[s._v("8")]),a("br"),a("span",{staticClass:"line-number"},[s._v("9")]),a("br")])]),a("p",[s._v("使用 "),a("code",[s._v("docker search")]),s._v(" 命令，我们可以得到一个类似于 Docker Hub 网页版搜索的镜像列表结果，其中的信息与网页版也是类似的。通过这种方式我们可以在不方便访问 Web 的环境下搜索镜像，对于控制台爱好者来说也是一种不错的选择。")]),s._v(" "),a("hr"),s._v(" "),a("h2",{attrs:{id:"_3-管理镜像"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_3-管理镜像"}},[s._v("#")]),s._v(" 3.管理镜像")]),s._v(" "),a("p",[s._v("对镜像的管理要比搜索和获取镜像更常用，所以了解镜像管理相关的操作以及知识是非常有必要的。")]),s._v(" "),a("p",[s._v("除了之前我们所提到的 "),a("code",[s._v("docker images")]),s._v(" 可以列出本地 Docker 中的所有镜像外，如果我们要获得镜像更详细的信息，我们可以通过 "),a("code",[s._v("docker inspect")]),s._v(" 这个命令。")]),s._v(" "),a("div",{staticClass:"language-bash line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[s._v("👨 huidong 📌  ~ ⌚ "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("24")]),s._v("-01-08 "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("21")]),s._v(":54:02\n$ "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("docker")]),s._v(" inspect f4c42847bb1a            \n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n        "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"Id"')]),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"sha256:f4c42847bb1a752dfc6f34b18fe5afb548e086abf6ec7bdd819b765b608f7923"')]),s._v(",\n        "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"RepoTags"')]),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),s._v("\n            "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"redis:6"')]),s._v("\n        "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),s._v(",\n        "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"RepoDigests"')]),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),s._v("\n            "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"redis@sha256:2d0d9fa843b2021e785d459d3cf88855eac0d5351680f011fbd76bdb2d7bd02b"')]),s._v("\n        "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),s._v(",\n        "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"Parent"')]),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('""')]),s._v(",\n        "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"Comment"')]),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('""')]),s._v(",\n        "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"Created"')]),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"2023-07-28T10:51:26.884026748Z"')]),s._v(",\n        "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"Container"')]),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"092b1180941ecc2c4d5f4ca3fa12c14a4ee0f77cc0c6d9e061eb82aca7605e47"')]),s._v(",\n        "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"ContainerConfig"')]),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n            //"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("..")]),s._v(".\n        "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v(",\n        "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"DockerVersion"')]),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"20.10.23"')]),s._v(",\n        "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"Author"')]),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('""')]),s._v(",\n        "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"Config"')]),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n            //"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("..")]),s._v(".\n        "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v(",\n        "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"Architecture"')]),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"arm64"')]),s._v(",\n        "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"Variant"')]),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"v8"')]),s._v(",\n        "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"Os"')]),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"linux"')]),s._v(",\n        "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"Size"')]),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("146430349")]),s._v(",\n        "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"VirtualSize"')]),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("146430349")]),s._v(",\n        "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"GraphDriver"')]),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n            "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"Data"')]),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n                //"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("..")]),s._v(".\n            "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v(",\n            "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"Name"')]),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"overlay2"')]),s._v("\n        "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v(",\n        "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"RootFS"')]),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n            "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"Type"')]),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"layers"')]),s._v(",\n            "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"Layers"')]),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),s._v("\n               //"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("..")]),s._v(".\n            "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),s._v("\n        "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v(",\n        "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"Metadata"')]),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n            "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"LastTagTime"')]),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"0001-01-01T00:00:00Z"')]),s._v("\n        "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),s._v("\n👨 huidong 📌  ~ ⌚ "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("24")]),s._v("-01-08 "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("21")]),s._v(":54:18\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br"),a("span",{staticClass:"line-number"},[s._v("7")]),a("br"),a("span",{staticClass:"line-number"},[s._v("8")]),a("br"),a("span",{staticClass:"line-number"},[s._v("9")]),a("br"),a("span",{staticClass:"line-number"},[s._v("10")]),a("br"),a("span",{staticClass:"line-number"},[s._v("11")]),a("br"),a("span",{staticClass:"line-number"},[s._v("12")]),a("br"),a("span",{staticClass:"line-number"},[s._v("13")]),a("br"),a("span",{staticClass:"line-number"},[s._v("14")]),a("br"),a("span",{staticClass:"line-number"},[s._v("15")]),a("br"),a("span",{staticClass:"line-number"},[s._v("16")]),a("br"),a("span",{staticClass:"line-number"},[s._v("17")]),a("br"),a("span",{staticClass:"line-number"},[s._v("18")]),a("br"),a("span",{staticClass:"line-number"},[s._v("19")]),a("br"),a("span",{staticClass:"line-number"},[s._v("20")]),a("br"),a("span",{staticClass:"line-number"},[s._v("21")]),a("br"),a("span",{staticClass:"line-number"},[s._v("22")]),a("br"),a("span",{staticClass:"line-number"},[s._v("23")]),a("br"),a("span",{staticClass:"line-number"},[s._v("24")]),a("br"),a("span",{staticClass:"line-number"},[s._v("25")]),a("br"),a("span",{staticClass:"line-number"},[s._v("26")]),a("br"),a("span",{staticClass:"line-number"},[s._v("27")]),a("br"),a("span",{staticClass:"line-number"},[s._v("28")]),a("br"),a("span",{staticClass:"line-number"},[s._v("29")]),a("br"),a("span",{staticClass:"line-number"},[s._v("30")]),a("br"),a("span",{staticClass:"line-number"},[s._v("31")]),a("br"),a("span",{staticClass:"line-number"},[s._v("32")]),a("br"),a("span",{staticClass:"line-number"},[s._v("33")]),a("br"),a("span",{staticClass:"line-number"},[s._v("34")]),a("br"),a("span",{staticClass:"line-number"},[s._v("35")]),a("br"),a("span",{staticClass:"line-number"},[s._v("36")]),a("br"),a("span",{staticClass:"line-number"},[s._v("37")]),a("br"),a("span",{staticClass:"line-number"},[s._v("38")]),a("br"),a("span",{staticClass:"line-number"},[s._v("39")]),a("br"),a("span",{staticClass:"line-number"},[s._v("40")]),a("br"),a("span",{staticClass:"line-number"},[s._v("41")]),a("br"),a("span",{staticClass:"line-number"},[s._v("42")]),a("br"),a("span",{staticClass:"line-number"},[s._v("43")]),a("br"),a("span",{staticClass:"line-number"},[s._v("44")]),a("br"),a("span",{staticClass:"line-number"},[s._v("45")]),a("br"),a("span",{staticClass:"line-number"},[s._v("46")]),a("br")])]),a("p",[s._v("除了能够查看镜像的信息外，"),a("code",[s._v("docker inspect")]),s._v(" 还能查看容器等之前我们所提到的 Docker 对象的信息，而传参的方式除了传递镜像或容器的名称外，还可以传入镜像 ID 或容器 ID。")]),s._v(" "),a("div",{staticClass:"language-bash line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[s._v("$ "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("sudo")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("docker")]),s._v(" inspect redis:4.0\n$ "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("sudo")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("docker")]),s._v(" inspect 2fef532e\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br")])]),a("hr"),s._v(" "),a("h3",{attrs:{id:"_3-1-参数识别"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_3-1-参数识别"}},[s._v("#")]),s._v(" 3.1 参数识别")]),s._v(" "),a("p",[s._v("之前我们所谈到镜像 ID 是 64 个字符，而 "),a("code",[s._v("docker images")]),s._v(" 命令里的缩写也有 12 个字符，为什么这里展示的操作命令里只填写了 8 个字符呢？")]),s._v(" "),a("p",[s._v("这就有必要专门说说 Docker 所支持的这种传参方式了。")]),s._v(" "),a("p",[s._v("不论我们是通过镜像名还是镜像 ID 传递到 "),a("code",[s._v("docker inspect")]),s._v(" 或者其他类似的命令 ( 需要指定 Docker 对象的命令 ) 里，Docker 都会根据我们传入的内容去寻找与之匹配的内容，只要我们所给出的内容能够找出唯一的镜像，那么 Docker 就会对这个镜像执行给定的操作。反之，如果找不到唯一的镜像，那么操作不会进行，Docker 也会显示错误。")]),s._v(" "),a("p",[s._v("也就是说，只要我们提供了能够唯一识别镜像或容器的信息，即使它短到只有 1 个字符，Docker 都是可以处理的。")]),s._v(" "),a("p",[s._v("例如我们有以下镜像：")]),s._v(" "),a("div",{staticClass:"language-bash line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[s._v("👨 huidong 📌  ~ ⌚ "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("24")]),s._v("-01-08 "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("21")]),s._v(":54:18\n$ "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("docker")]),s._v(" images              \nREPOSITORY            TAG               IMAGE ID       CREATED         SIZE\nubuntu                latest            da935f064913   "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("3")]),s._v(" weeks ago     "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("69")]),s._v(".3MB\nredis                 "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("6")]),s._v("                 f4c42847bb1a   "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("5")]),s._v(" months ago    146MB\nmysql/mysql-server    "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("5.7")]),s._v("               a4ad24fe52cd   "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("11")]),s._v(" months ago   432MB\nzookeeper             "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("3.7")]),s._v(".1             3df55730d9e2   "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("14")]),s._v(" months ago   266MB\nzookeeper             "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("3.5")]),s._v(".9             5b252279904a   "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("14")]),s._v(" months ago   257MB\nwurstmeister/kafka    latest            db97697f6e28   "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("19")]),s._v(" months ago   457MB\nelasticsearch         "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("7.16")]),s._v(".2            e082d8ac7e5e   "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("2")]),s._v(" years ago     634MB\nkibana                "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("7.16")]),s._v(".2            8bcb4cae919c   "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("2")]),s._v(" years ago     "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("1")]),s._v(".45GB\nopenresty/openresty   "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("1.13")]),s._v(".6.2-alpine   ef57f6ca4202   "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("4")]),s._v(" years ago     "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("49")]),s._v(".1MB\n👨 huidong 📌  ~ ⌚ "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("24")]),s._v("-01-08 "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("21")]),s._v(":58:58\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br"),a("span",{staticClass:"line-number"},[s._v("7")]),a("br"),a("span",{staticClass:"line-number"},[s._v("8")]),a("br"),a("span",{staticClass:"line-number"},[s._v("9")]),a("br"),a("span",{staticClass:"line-number"},[s._v("10")]),a("br"),a("span",{staticClass:"line-number"},[s._v("11")]),a("br"),a("span",{staticClass:"line-number"},[s._v("12")]),a("br"),a("span",{staticClass:"line-number"},[s._v("13")]),a("br")])]),a("p",[s._v("我们注意到镜像 ID 前缀为 8 的只有 kibana:7.16.2 这个镜像，那么我们就可以使用 8 来指代这个镜像。")]),s._v(" "),a("div",{staticClass:"language-bash line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[s._v("👨 huidong 📌  ~ ⌚ "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("24")]),s._v("-01-08 "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("21")]),s._v(":58:58\n$ "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("docker")]),s._v(" inspect "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("8")]),s._v("           \n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n        "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"Id"')]),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"sha256:8bcb4cae919c78fe2a75fbe77f711ca3f8de0829edf9c5ce23928ee2e23a4e2f"')]),s._v(",\n        "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"RepoTags"')]),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),s._v("\n            "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"kibana:7.16.2"')]),s._v("\n        "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),s._v(",\n        "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"RepoDigests"')]),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),s._v("\n            "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"kibana@sha256:cbff0e7f8200798130dc9ebca666c89d440f203272d66b007763ef554b21d0f0"')]),s._v("\n        "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),s._v(",\n  //"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("..")]),s._v(".\n👨 huidong 📌  ~ ⌚ "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("24")]),s._v("-01-08 "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("21")]),s._v(":58:58\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br"),a("span",{staticClass:"line-number"},[s._v("7")]),a("br"),a("span",{staticClass:"line-number"},[s._v("8")]),a("br"),a("span",{staticClass:"line-number"},[s._v("9")]),a("br"),a("span",{staticClass:"line-number"},[s._v("10")]),a("br"),a("span",{staticClass:"line-number"},[s._v("11")]),a("br"),a("span",{staticClass:"line-number"},[s._v("12")]),a("br"),a("span",{staticClass:"line-number"},[s._v("13")]),a("br")])]),a("p",[s._v("而前缀为 z 的镜像有0个，这时候如果我们直接使用 z 来指代镜像的话，Docker 会提示未能匹配到镜像。")]),s._v(" "),a("div",{staticClass:"language-bash line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[s._v("👨 huidong 📌  ~ ⌚ "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("24")]),s._v("-01-08 "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("22")]),s._v(":01:52\n$ "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("docker")]),s._v(" inspect z\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),s._v("\nError: No such object: z\n👨 huidong 📌  ~ ⌚ "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("24")]),s._v("-01-08 "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("22")]),s._v(":03:46\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br")])]),a("hr"),s._v(" "),a("h3",{attrs:{id:"_3-2-删除镜像"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_3-2-删除镜像"}},[s._v("#")]),s._v(" 3.2 删除镜像")]),s._v(" "),a("p",[s._v("虽然 Docker 镜像占用的空间比较小，但日渐冗杂的镜像和凌乱的镜像版本会让管理越来越困难，所以有时候我们需要清理一些无用的镜像，将它们从本地的 Docker Engine 中移除。")]),s._v(" "),a("p",[s._v("删除镜像的命令是 "),a("code",[s._v("docker rmi")]),s._v("，参数是镜像的名称或 ID。")]),s._v(" "),a("div",{staticClass:"language-bash line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[s._v("👨 huidong 📌  ~ ⌚ "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("24")]),s._v("-01-08 "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("22")]),s._v(":04:56\n$ "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("docker")]),s._v(" rmi ubuntu:latest          \nUntagged: ubuntu:latest\nUntagged: ubuntu@sha256:6042500cf4b44023ea1894effe7890666b0c5c7871ed83a97c36c76ae560bb9b\nDeleted: sha256:da935f0649133cbea2f5ad83db14bf782aa5ee9ad17cd609253e3750201a9298\nDeleted: sha256:3e798a66607c97d027570dbbc112c32956981fbcc244bb2d4d1fddbce4cda84c\n👨 huidong 📌  ~ ⌚ "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("24")]),s._v("-01-08 "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("22")]),s._v(":05:16\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br"),a("span",{staticClass:"line-number"},[s._v("7")]),a("br")])]),a("p",[s._v("删除镜像的过程其实是删除镜像内的镜像层，在删除镜像命令打印的结果里，我们可以看到被删除的镜像层以及它们的 ID。当然，如果存在两个镜像共用一个镜像层的情况，你也不需要担心 Docker 会删除被共享的那部分镜像层，只有当镜像层只被当前被删除的镜像所引用时，Docker 才会将它们从硬盘空间中移除。")]),s._v(" "),a("p",[a("code",[s._v("docker rmi")]),s._v(" 命令也支持同时删除多个镜像，只需要通过空格传递多个镜像 ID 或镜像名即可。")]),s._v(" "),a("div",{staticClass:"language-bash line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[s._v("👨 huidong 📌  ~ ⌚ "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("24")]),s._v("-01-08 "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("22")]),s._v(":07:29\n$ "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("docker")]),s._v(" rmi openresty/openresty:1.13.6.2-alpine zookeeper:3.5.9\nUntagged: openresty/openresty:1.13.6.2-alpine\nUntagged: openresty/openresty@sha256:5b154033344cde8928b969c64206620fa5b296d2cb94cdd00e1ddb5781007c26\nDeleted: sha256:ef57f6ca420289b995eca2d716bd283845a88c24a274bf8daa98bacf740ba9dd\nDeleted: sha256:2df7c65cf32e8e3d9e870b4d8da8550c88c9650a34911386d2c6a4f2a8efa6e0\nDeleted: sha256:18792dfd6e6547c7e9b26f72415b3a9c2b9ffdc8dfeaf19094967118f97f43c9\nDeleted: sha256:dc01439c32644dddf3912b46e37e3fe78334ddda7ac317b54c05ae7fc5da413f\nDeleted: sha256:d9ff549177a94a413c425ffe14ae1cc0aa254bc9c7df781add08e7d2fba25d27\n👨 huidong 📌  ~ ⌚ "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("24")]),s._v("-01-08 "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("22")]),s._v(":07:54\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br"),a("span",{staticClass:"line-number"},[s._v("7")]),a("br"),a("span",{staticClass:"line-number"},[s._v("8")]),a("br"),a("span",{staticClass:"line-number"},[s._v("9")]),a("br"),a("span",{staticClass:"line-number"},[s._v("10")]),a("br")])]),a("hr")])}),[],!1,null,null,null);a.default=t.exports}}]);