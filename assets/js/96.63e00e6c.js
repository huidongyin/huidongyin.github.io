(window.webpackJsonp=window.webpackJsonp||[]).push([[96],{439:function(t,e,a){"use strict";a.r(e);var r=a(4),v=Object(r.a)({},(function(){var t=this,e=t._self._c;return e("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[e("p",[t._v("上面分析源码的时候其实已经分析过，mybatis的拦截器实际上就是代理模式加拦截器来实现的（同AOP），而pagehelper实际上是基于插件机制实现的。")]),t._v(" "),e("p",[t._v("先看 PageHelper jar 包中 PageInterceptor 的源码。拦截的是 Executor 的两个query()方法。在这里对 SQL 进行了改写。")]),t._v(" "),e("p",[t._v("跟踪到最后，是在 MySqlDialect.getPageSql()对 SQL 进行了改写，翻页参数是从一个 Page 对象中拿到的，那么 Page 对象是怎么传到这里的呢？")]),t._v(" "),e("p",[t._v("上一步，AbstractHelperDialect.getPageSql()中：Page 对象是从一个 ThreadLocal<>变量中拿到的，那它是什么时候赋值的？")]),t._v(" "),e("p",[t._v("PageHelper.startPage()方法，把分页参数放到了 ThreadLocal<>变量中。")]),t._v(" "),e("p",[t._v("扩展：插件机制的应用场景：")]),t._v(" "),e("table",[e("thead",[e("tr",[e("th",[t._v("作用")]),t._v(" "),e("th",[t._v("实现方式")])])]),t._v(" "),e("tbody",[e("tr",[e("td",[t._v("水平分表")]),t._v(" "),e("td",[t._v("对 query update 方法进行拦截在接口上添加注解，通过反射获取接口注解，根据注解上配置的参数进行分表，修改原 SQL，例如 id 取模，按月分表")])]),t._v(" "),e("tr",[e("td",[t._v("数据加解密")]),t._v(" "),e("td",[t._v("update——加密；query——解密获得入参和返回值")])]),t._v(" "),e("tr",[e("td",[t._v("菜单权限控制")]),t._v(" "),e("td",[t._v("对 query 方法进行拦截在方法上添加注解，根据权限配置，以及用户登录信息，在 SQL 上加上权限过滤条件")])])])]),t._v(" "),e("hr")])}),[],!1,null,null,null);e.default=v.exports}}]);