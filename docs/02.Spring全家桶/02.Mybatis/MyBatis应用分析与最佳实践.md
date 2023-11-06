写在前面：全文代码git地址：[https://gitee.com/yin_huidong/mybatis-use.git](https://gitee.com/yin_huidong/mybatis-use.git)
# 一，MyBatis入门


# 二，基于Mybatis实现基本的增删改查


# 三，Mybatis连接池和事务深入


# 四，动态SQL

我们根据实体类的不同取值，使用不同的 SQL 语句来进行查询。比如在 id 如果不为空时可以根据 id 查询，

如果 username 不同空时还要加入用户名作为条件。这种情况在我们的多条件组合查询中经常会碰到。

## 1.抽取重复代码片段

```java
<!-- 抽取重复的语句代码片段 -->
<sql id="defaultSql">
   select * from user
</sql>
<!-- 然后就可以在标签中对抽取出来的语句进行引用 -->
<include refid="defaultSql"/>
```
## 2.if
```java
/**
     * 根据id查询
     */
User findById(User user);
```
```java
    <!--根据id查询-->
    <select id="findById" parameterType="com.yhd.domain.User" resultType="com.yhd.domain.User">
       <include refid="defaultSql"/>
        where 1=1
        <if test="id!=null and id!=''">
        and id = #{id};
        </if>
    </select>
```
**注意 where 1=1 的作用~！**
```java
    <!--Account selectByIdSelective(Integer id);-->
    <select id="selectByIdSelective" parameterType="int" resultMap="baseAccountMap">
        select id ,name ,money from account where 1=1
        <if test="_parameter!=null and _parameter !=''">
            and id = #{_parameter}
        </if>
    </select>
```
## 3. where
```java
     /**
     * 根据id查询
     */
    User findById(User user);
```
```java
 <!--根据id查询-->
    <select id="findById" parameterType="com.yhd.domain.User" resultType="com.yhd.domain.User">
       <include refid="defaultSql"/>
        <where>
            <if test="id!=null and id!=''">
                and id = #{id}
            </if>
        </where>
    </select>
```
有了where就不用写1=1了。

## 4.foreach

```java
List<Account> selectByIds(Integer []ids);
```
```java
    <!--List<Account> selectByIds(Integer []ids);-->
    <select id="selectByIds" parameterType="int" resultMap="baseAccountMap">
        select id ,name ,money from account
        <where>
          <if test="_parameter!=null and _parameter.size()>0">
              id in
              <foreach collection="array" item="id" open="(" close=")" separator=",">
                  #{id}
              </foreach>
          </if>

        </where>
    </select>
```
> SQL 语句：
> select 字段 from user where id in (?)
> <foreach>标签用于遍历集合，它的属性：
> collection:代表要遍历的集合元素，注意编写时不要写#{}
> open:代表语句的开始部分
> close:代表结束部分
> item:代表遍历集合的每个元素，生成的变量名
> sperator:代表分隔符

# 五，Mybatis多表查询

## 1.一对一查询
代码：mybatis-04
## 2.一对多查询
代码：mybatis-05
## 3.多对多查询

代码：mybatis-06

# 六，延迟加载

延迟加载：就是在需要用到数据时才进行加载，不需要用到数据时就不加载数据。延迟加载也称懒加载.

> 好处：先从单表查询，需要时再从关联表去关联查询，大大提高数据库性能，因为查询单表要比关联查询多张表速度要快。
> 
> 坏处：因为只有当需要用到数据时，才会进行数据库查询，这样在大批量数据查询时，因为查询工作也要消耗时间，所以可能造成用户等待时间变长，造成用户体验下降。


如何开启懒加载策略？

```java
<!-- 开启延迟加载的支持 -->
<settings> 
    <setting name="lazyLoadingEnabled" value="true"/>
    <setting name="aggressiveLazyLoading" value="false"/>
</settings>
```
## 1.一对一懒加载

mybatis-07

## 2.多对一懒加载

mybatis-08

# 七，缓存机制
## 1.一级缓存

一级缓存也叫本地缓存，MyBatis 的一级缓存是在会话（SqlSession）层面进行缓存的。MyBatis 的一级缓存是默认开启的，不需要任何的配置。

要在同一个会话里面共享一级缓存，这个对象肯定是在 SqlSession 里面创建的，作为 SqlSession 的一个属性。

DefaultSqlSession 里面只有两个属性，Configuration 是全局的，所以缓存只可能放在 Executor 里面维护——SimpleExecutor/ReuseExecutor/BatchExecutor 的父类BaseExecutor 的构造函数中持有了 PerpetualCache。

在同一个会话里面，多次执行相同的 SQL 语句，会直接从内存取到缓存的结果，不会再发送 SQL 到数据库。但是不同的会话里面，即使执行的 SQL 一模一样（通过一个Mapper 的同一个方法的相同参数调用），也不能使用到一级缓存。

![image.png](https://cdn.nlark.com/yuque/0/2021/png/12610368/1638281439341-2cdfcd49-6e34-434f-9a19-ba428b3cc96d.png#clientId=u78257d8c-e436-4&from=paste&height=265&id=u4a2f8428&originHeight=387&originWidth=746&originalType=binary&ratio=1&size=48861&status=done&style=none&taskId=u707cef9a-ce0b-4159-85a0-2e7c7c11375&width=511)
一级缓存在 BaseExecutor 的 query()——queryFromDatabase()中存入。在queryFromDatabase()之前会 get()。

一级缓存是在 BaseExecutor 中的 update()方法中调用 clearLocalCache()清空的（无条件），query 中会判断。

**一级缓存的 不足**

使用一级缓存的时候，因为缓存不能跨会话共享，不同的会话之间对于相同的数据可能有不一样的缓存。在有多个会话或者分布式环境下，会存在脏数据的问题。如果要解决这个问题，就要用到二级缓存。

虽然在上面的代码中我们查询了两次，但最后只执行了一次数据库操作，这就是 Mybatis 提供给我们的一级缓存在起作用了。因为一级缓存的存在，导致第二次查询 id 为 41 的记录时，并没有发出 sql 语句从数据库中查询数据，而是从一级缓存中查询。

**如何清空一级缓存？**

一级缓存是 SqlSession 范围的缓存，当调用 SqlSession 的修改，添加，删除，commit()，close()等方法时，就会清空一级缓存。

第一次发起查询用户 id 为 1 的用户信息，先去找缓存中是否有 id 为 1 的用户信息，如果没有，从数据库查询用户信息。得到用户信息，将用户信息存储到一级缓存中。

如果 sqlSession 去执行 commit 操作（执行插入、更新、删除），清空 SqlSession 中的一级缓存，这样做的目的为了让缓存中存储的是最新的信息，避免脏读。

第二次发起查询用户 id 为 1 的用户信息，先去找缓存中是否有 id 为 1 的用户信息，缓存中有，直接从缓存中获取用户信息。

## 2.二级缓存

二级缓存是用来解决一级缓存不能跨会话共享的问题的，范围是 namespace 级别的，可以被多个 SqlSession 共享（只要是同一个接口里面的相同方法，都可以共享），生命周期和应用同步。

作为一个作用范围更广的缓存，它肯定是在 SqlSession 的外层，否则不可能被多个SqlSession 共享。而一级缓存是在 SqlSession 内部的，所以，肯定是工作在一级缓存之前，也就是只有取不到二级缓存的情况下才到一个会话中去取一级缓存。

要跨会话共享的话，SqlSession 本身和它里面的 BaseExecutor 已经满足不了需求了，那我们应该在 BaseExecutor 之外创建一个对象。

实际上 MyBatis 用了一个装饰器的类来维护，就是 CachingExecutor。如果启用了二级缓存，MyBatis 在创建 Executor 对象的时候会对 Executor 进行装饰。CachingExecutor 对于查询请求，会判断二级缓存是否有缓存结果，如果有就直接返回，如果没有委派交给真正的查询器 Executor 实现类，比如 SimpleExecutor 来执行查询，再走到一级缓存的流程。最后会把结果缓存起来，并且返回给用户。

![image.png](https://cdn.nlark.com/yuque/0/2021/png/12610368/1638281511187-dcf9fa12-d1a2-4db6-a350-6ecc032d9e5b.png#clientId=u78257d8c-e436-4&from=paste&height=308&id=u05bc3e75&originHeight=616&originWidth=1221&originalType=binary&ratio=1&size=437873&status=done&style=none&taskId=ub688ef96-e799-4965-9531-0bfe5b15c0a&width=610.5)

**二级缓存的开启与关闭**

1. 主配置文件
```java
<!-- 声明这个 namespace 使用二级缓存 -->
<cache type="org.apache.ibatis.cache.impl.PerpetualCache" size="1024" eviction="LRU" flushInterval="120000"
       readOnly=" false">
    <!--自动刷新时间 ms，未配置时只有调用时刷新 -->
    <!-- 回收策略-->
    <!-- 最多缓存对象个数，默认 1024-->
    <!-- 默认是  false（安全），改为 true 可读写时，对象必须支持序列化-->
</cache>
```
因为 cacheEnabled 的取值默认就为 true，所以这一步可以省略不配置。为 true 代表开启二级缓存；为false 代表不开启二级缓存。

2. mapper映射文件
```java
<mapper namespace="com.itheima.dao.IUserDao">
    <!-- 开启二级缓存的支持 -->
    <cache></cache>
    <!-- 根据 id 查询 --> 
    <!-- 在此处将userCache属性设置为true -->
    <select id="findById" resultType="user" parameterType="int" useCache="true">
    	select * from user where id = #{uid}
    </select>
</mapper>
```
标签表示当前这个 mapper 映射将使用二级缓存，区分的标准就看 mapper 的 namespace 值。

将 UserDao.xml 映射文件中的标签中设置 useCache=”true”代表当前这个 statement 要使用

二级缓存，如果不使用二级缓存可以设置为 false。

注意：针对每次查询都需要最新的数据 sql，要设置成 useCache=false，禁用二级缓存。

**当我们在使用二级缓存时，所缓存的类一定要实现 java.io.Serializable 接口，这种就可以使用序列化方式来保存对象。否则会报java,io.SerializableException。**

Mapper.xml 配置了之后，select()会被缓存。update()、delete()、insert()会刷新缓存。

如果 cacheEnabled=true，Mapper.xml 没有配置标签，还有二级缓存吗？还会出现 CachingExecutor 包装对象吗？

只要 cacheEnabled=true 基本执行器就会被装饰。有没有配置，决定了在启动的时候会不会创建这个 mapper 的 Cache 对象，最终会影响到 CachingExecutorquery 方法里面的判断：

```java
if (cache !=  null)
```

如果某些查询方法对数据的实时性要求很高，不需要二级缓存，怎么办？

可以在单个 Statement ID 上显式关闭二级缓存（默认是 true）

```xml
<select id="selectBlog" resultMap="BaseResultMap" useCache="false">
</select>
```

**为什么事务不提交，二级缓存不生效？**

因为二级缓存使用 TransactionalCacheManager（TCM）来管理，最后又调用了TransactionalCache的getObject()、putObject和commit()方法，TransactionalCache里面又持有了真正的 Cache 对象，比如是经过层层装饰的 PerpetualCache。在 putObject 的时候，只是添加到了 entriesToAddOnCommit 里面，只有它的commit()方法被调用的时候才会调用 flushPendingEntries()真正写入缓存。它就是在DefaultSqlSession 调用 commit()的时候被调用的。

**为什么增删改操作会清空缓存？**

在 CachingExecutor 的 update()方法里面会调用 flushCacheIfRequired(ms)，isFlushCacheRequired 就是从标签里面渠道的 flushCache 的值。而增删改操作的flushCache 属性默认为 true。

**第三方缓存 做 二级缓存**

除了 MyBatis 自带的二级缓存之外，我们也可以通过实现 Cache 接口来自定义二级缓存。

MyBatis 官方提供了一些第三方缓存集成方式，比如 ehcache 和 redis。

# 八，Mybatis扩展

## 1.批量操作

在 MyBatis 里面是支持批量的操作的，包括批量的插入、更新、删除。我们可以直接传入一个 List、Set、Map 或者数组，配合动态 SQL 的标签，MyBatis 会自动帮我们生成语法正确的 SQL 语句。

### 1.1 批量插入

批量插入的语法是这样的，只要在 values 后面增加插入的值就可以了。

```
insert into tbl_emp (emp_id, emp_name, gender,email, d_id) values ( ?,?,?,?,? ) , ( ?,?,?,?,? ) , ( ?,?,?,?,? ) , ( ?,?,?,?,? ) ,( ?,?,?,?,? ) , ( ?,?,?,?,? ) , ( ?,?,?,?,? ) , ( ?,?,?,?,? ) , ( ?,?,?,?,? ) , ( ?,?,?,?,? )
```

在 Mapper 文件里面，我们使用 foreach 标签拼接 values 部分的语句：

```xml
<!-- 批量插入 -->
<insert id="batchInsert" parameterType="java.util.List" useGeneratedKeys="true">
    <selectKey resultType="long" keyProperty="id" order="AFTER">
        SELECT LAST_INSERT_ID()
    </selectKey>
    insert into tbl_emp (emp_id, emp_name, gender,email, d_id) values
    <foreach collection="list" item="emps" index="index" separator=",">
        (#{emps.empId},#{emps.empName},#{emps.gender},#{emps.email},#{emps.dId})
    </foreach>
</insert>
```

Java 代码里面，直接传入一个 List 类型的参数。

效率要比循环发送 SQL 执行要高得多。最关键的地方就在于减少了跟数据库交互的次数，并且避免了开启和结束事务的时间消耗。

### 1.2 批量更新

批量更新的语法是这样的，通过 case when，来匹配 id 相关的字段值。

```
update tbl_emp set
emp_name =
    case emp_id
        when ? then ?
        when ? then ?
        when ? then ? end ,
    gender =
        case emp_id
            when ? then ?
            when ? then ?
            when ? then ? end ,
    email =
        case emp_id
            when ? then ?
            when ? then ?
            when ? then ? end
where emp_id in ( ? , ? , ? )
```

所以在 Mapper 文件里面最关键的就是 case when 和 where 的配置。需要注意一下 open 属性和 separator 属性。

```xml
<update id="updateBatch">
    update tbl_emp set
    emp_name =
    <foreach collection="list" item="emps" index="index" separator=" " opene="case  emp_id"
             close="end">
        when #{emps.empId} then #{emps.empName}
    </ foreach>
    ,gender =
    <foreach collection="list" item="emps" index="index" separator=" " opene="case  emp_id"
             close="end">
        when #{emps.empId} then #{emps.gender}
    </foreach>
    ,email =
    <foreach collection="list" item="emps" index="index" separator=" " opene="case  emp_id"
             close="end">
        when #{emps.empId} then #{emps.email}
    </foreach>
    where emp_id in
    <foreach collection="list" item="emps" index="index" separator="," open="(" close=")">
        #{emps.empId}
    </foreach>
</update>
```

### 1.3 BatchExecutor

当然 MyBatis 的动态标签的批量操作也是存在一定的缺点的，比如数据量特别大的时候，拼接出来的 SQL 语句过大。

MySQL 的服务端对于接收的数据包有大小限制，max_allowed_packet 默认是4M，需要修改默认配置才可以解决这个问题。在我们的全局配置文件中，可以配置默认的 Executor 的类型。其中有一种BatchExecutor。

```
<setting  name ="defaultExecutorType"  value ="BATCH" />
```

也可以在创建会话的时候指定执行器类型

```
SqlSession session = sqlSessionFactory.openSession(ExecutorType. BATCH );
```

BatchExecutor 底层是对 JDBC ps.addBatch()的封装，原理是攒一批 SQL 以后再发。
## 2.翻页

在我们查询数据库的操作中，有两种翻页方式，一种是逻辑翻页（假分页），一种是物理翻页（真分页）。逻辑翻页的原理是把所有数据查出来，在内存中删选数据。 物理翻页是真正的翻页，比如 MySQL 使用 limit 语句，Oracle 使用 rownum 语句，SQLServer 使用 top 语句。

### 2.1逻辑翻页

MyBatis 里面有一个逻辑分页对象 RowBounds，里面主要有两个属性，offset 和limit（从第几条开始，查询多少条）。

我们可以在Mapper接口的方法上加上这个参数，不需要修改xml里面的SQL语句。

```
public List<Blog> selectBlogList(RowBounds rowBounds);
```

它的底层其实是对 ResultSet 的处理。它会舍弃掉前面 offset 条数据，然后再取剩下的数据的 limit 条。

如果数据量大的话，这种翻页方式效率会很低（跟查询到内存中再使用subList(start,end)没什么区别）。所以我们要用到物理翻页。

### 2.2物理翻页

物理翻页是真正的翻页，它是通过数据库支持的语句来翻页。

第一种简单的办法就是传入参数（或者包装一个 page 对象），在 SQL 语句中翻页。

```xml
<select id="selectBlogPage" parameterType="map" resultMap="BaseResultMap">
    select * from blog limit #{curIndex} , #{pageSize}
</ select>
```

第一个问题是我们要在 Java 代码里面去计算起止序号；第二个问题是：每个需要翻页的 Statement 都要编写 limit 语句，会造成 Mapper 映射器里面很多代码冗余。

需要一种通用的方式，不需要去修改配置的任何一条 SQL 语句，只要在我们需要翻页的地方封装一下翻页对象就可以了。

使用翻页的插件，这个是基于 MyBatis 的拦截器实现的，比如 PageHelper。

```java
// pageSize 每一页几条
PageHelper. startPage (pn, 10);
List<Employee> emps =  employeeService.getAll();
// navigatePages 导航页码数
PageInfo page = w new PageInfo(emps, 10);
return Msg. success ().add( "pageInfo", page);
```

## 3.通用Mapper

问题：当我们的表字段发生变化的时候，我们需要修改实体类和 Mapper 文件定义的字段和方法。如果是增量维护，那么一个个文件去修改。如果是全量替换，我们还要去对比用 MBG 生成的文件。字段变动一次就要修改一次，维护起来非常麻烦。

解决这个问题，我们有两种思路。

第 一 个 ， 因 为 MyBatis 的 Mapper 是 支 持 继 承 的 。 所 以 我 们 可 以 把 我 们 的Mapper.xml 和 Mapper 接口都分成两个文件。一个是 MBG 生成的，这部分是固定不变的。然后创建 DAO 类继承生成的接口，变化的部分就在 DAO 里面维护。

[GitHub地址](https://github.com/abel533/Mapper/wiki)

## 4.MyBatis-Plus

MyBatis-Plus 是原生 MyBatis 的一个增强工具，可以在使用原生 MyBatis 的所有功能的基础上，使用 plus 特有的功能。

# 九，Mybatis注解开发

## 1.常用注解

> @Insert:实现新增
> @Update:实现更新
> @Delete:实现删除
> @Select:实现查询
> @Result:实现结果集封装
> @Results:可以与@Result 一起使用，封装多个结果集
> @ResultMap:实现引用@Results 定义的封装
> @One:实现一对一结果集封装
> @Many:实现一对多结果集封装
> @SelectProvider: 实现动态 SQL 映射
> @CacheNamespace:实现注解二级缓存的使用


## 2.使用Mybatis注解实现CRUD

### 2.1 复杂映射

实现复杂关系映射之前我们可以在映射文件中通过配置<resultMap>来实现，在使用注解开发时我们需要借助@Results 注解，@Result 注解，@One 注解，@Many 注解。

> @Results 注解
> 代替的是标签<resultMap>
> 该注解中可以使用单个@Result 注解，也可以使用@Result 集合
> @Results（{@Result（），@Result（）}）或@Results（@Result（））
> @Resutl 注解
> 代替了 <id>标签和<result>标签
> @Result 中 属性介绍：
> id 是否是主键字段
> column 数据库的列名
> property 需要装配的属性名
> one 需要使用的@One 注解（@Result（one=@One）（）））
> many 需要使用的@Many 注解（@Result（many=@many）（）））
> @One 注解（一对一）
> 代替了<assocation>标签，是多表查询的关键，在注解中用来指定子查询返回单一对象。
> @One 注解属性介绍：
> select 指定用来多表查询的 sqlmapper
> fetchType 会覆盖全局的配置参数 lazyLoadingEnabled。。
> 使用格式：
> @Result(column=" ",property="",one=@One(select=""))
> @Many 注解（多对一）
> 代替了<Collection>标签,是是多表查询的关键，在注解中用来指定子查询返回对象集合。
> 注意：聚集元素用来处理“一对多”的关系。需要指定映射的 Java 实体类的属性，属性的 javaType
> （一般为 ArrayList）但是注解中可以不定义；
> 使用格式：
> @Result(property="",column="",many=@Many(select=""))

### 2.2 二级缓存

1. 主配置文件

```java
<!-- 配置二级缓存 --> 
<settings>
	<!-- 开启二级缓存的支持 --> 
    <setting name="cacheEnabled" value="true"/>
</settings>
```

2. 映射文件
```java
@CacheNamespace(blocking=true)//mybatis 基于注解方式实现配置二级缓存
public interface UserMapper {
    
}
```

