# MyBatis SQL Mapper Framework for Java

![](https://github.com/mybatis/mybatis-3/workflows/Java%20CI/badge.svg#id=hPgEc&originHeight=20&originWidth=118&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)
![](https://coveralls.io/repos/mybatis/mybatis-3/badge.svg?branch=master&service=github#id=D2fWk&originHeight=20&originWidth=99&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)
![](https://maven-badges.herokuapp.com/maven-central/org.mybatis/mybatis/badge.svg#id=Iw8So&originHeight=20&originWidth=128&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)
![](https://img.shields.io/nexus/s/https/oss.sonatype.org/org.mybatis/mybatis.svg#id=L72MX&originHeight=20&originWidth=154&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)
![](http://img.shields.io/:license-apache-brightgreen.svg#id=m38XK&originHeight=20&originWidth=96&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)
![](http://img.shields.io/:stack%20overflow-mybatis-brightgreen.svg#id=ckH8S&originHeight=20&originWidth=142&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)
![](https://www.openhub.net/p/mybatis/widgets/project_thin_badge.gif#id=D58xZ&originHeight=21&originWidth=135&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)

![](http://mybatis.github.io/images/mybatis-logo.png#id=j9pq9&originHeight=88&originWidth=350&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)

The MyBatis SQL mapper framework makes it easier to use a relational database with object-oriented applications.
MyBatis couples objects with stored procedures or SQL statements using an XML descriptor or annotations.
Simplicity is the biggest advantage of the MyBatis data mapper over object relational mapping tools.

# 一，Mybatis原生使用方式

```java
public class EsTest {
  /**
   * 字节流
   */
  private InputStream in;
  /**
   * 数据库连接工厂
   */
  private SqlSessionFactory sqlSessionFactory;
  /**
   * 数据库连接
   */
  private SqlSession sqlSession;

  {
    try {

      //将配置文件以二进制字节流的方式加载到内存
      in = Resources.getResourceAsStream("mybatis-config.xml");
      //通过构建者模式创建一个数据库连接工厂
      sqlSessionFactory = new SqlSessionFactoryBuilder().build(in);
      //通过工厂来管理和获取数据库连接
      sqlSession = sqlSessionFactory.openSession();
    } catch (IOException e) {

      e.printStackTrace();
    }
  }

  public void query() {
    //获取一个指定类型的mapper代理对象
    UserMapper userMapper = sqlSession.getMapper(UserMapper.class);
    //代理对象执行目标方法
    List<Object> users = userMapper.queryUser(1L);
    users.forEach(System.out::println);
  }


  private static interface UserMapper {
    List<Object> queryUser(Long id);
  }

  /**
   * 利用对象的finalize 方法进行资源回收
   * @throws Throwable
   */
  @Override
  protected void finalize() throws Throwable {
    sqlSession.commit(true);
    assert sqlSession != null;
    sqlSession.close();
    assert in != null;
    try {
      in.close();
    } catch (IOException e) {
      e.printStackTrace();
    }
  }
}
```

分析下流程：

1. 通过Resources对象加载Mybatis主配置文件到内存形成一个二进制的字节流。
2. 将上一步生成的二进制字节流当做参数传递到SqlSessionFactoryBuilder 的build()，用来构建数据库连接工厂 SqlSessionFactory。
3. 通过生成的数据库连接工厂获取数据库连接。
4. 通过数据库连接获取指定类型的Mapper的代理对象。
5. 通过代理对象调用方法，获得结果。
6. 关闭数据库连接，关闭字节流。

# 二，Mybatis源码执行流程分析

1. 首先，通过Resources对象里面的方法去加载配置文件，这里会默认传入一个类加载器数组，循环尝试使用各种类加载器加载配置文件，直到获取到二进制字节流，如果最终仍然没有获取到，会抛出异常。
2. 如果成功加载配置文件生成了二进制字节流，那么会将二进制字节流传入到SqlSessionFactoryBuilder的build方法，为生成一个数据库连接工厂对象 SqlSessionFactory 对象赋能。
3. 首先在build方法里面会去构建一个xml解析器对象 XMLConfigBuilder，用来解析主配置文件。
4. 通过解析器的parse()返回了一个Configuration对象，用来构建数据库连接工厂。 
   1. 判断是否已经加载过主配置文件，如果已经加载过，会抛出异常。
   2. 从configuration标签开始解析配置文件。
   3. mybatis的主配置文件里面的标签是有顺序的，他会按照顺序来解析配置文件中的标签，重点在于解析mappers标签。
   4. 他会循环获取到所有的mapper.xml文件，利用mapper解析器解析mapper.xml文件，解析封装的到Configuration对象中。
   5. 具体的解析过程：首先去定位根标签mapper，然后绑定mapper的命名空间，把所有的命名空间放到configuration对象的一个set集合里面，把当前mapper的类型通过MapperRegistry对象添加到一个map里面。
   6. 具体放到Mapper注册中心的其实是Mapper对象的类型和Mapper接口的代理工厂。
   7. 最终解析完mappers标签以后，返回了一个Configuration对象。
5. 最终通过build方法返回了一个默认的数据库连接工厂对象，DefaultSqlSessionFactory，这个工厂里面持有一个Configuration对象。
6. 获取到数据库连接工厂以后就是去通过openSession()去获取数据库连接。
7. SqlSession的获取主要是通过SqlSessionFactory的默认实现类DefaultSqlSessionFactory的openSessionFromDataSource封装一个DefaultSqlSession(实现SqlSession接口）返回。 
   1. 首先通过Configuration对象获取环境信息。
   2. 再通过环境信息获取事务工厂，事务工厂主要是看配置文件有没有配置，没有配置的话就创建一个新的。
   3. 通过事务工厂来获取事务对象。
   4. 通过一个Configuration对象来创建一个Executor对象，使用它来执行SQL。 
      1. 判断executorType的类型，分为批处理，可复用和普通三种类型的Executor对象。
      2. SimpleExecutor：每执行一次 update 或 select，就开启一个 Statement 对象，用完立刻关闭 Statement 对象
      3. ReuseExecutor：用完后，不关闭 Statement 对象，而是放置于 Map 内，供下一次使用
      4. BatchExecutor：里面缓存了多个statement用来做批处理
      5. 上面选择完具体的Executor对象后，判断是否开启了二级缓存，如果开启了二级缓存的话，使用装饰器模式对Executor进行一个包装，生成一个CachingExecutor对象，里面持有一个Executor对象。
      6. 在此处会执行插件的拦截器链，这个拦截器链是mybatis的一个很核心的扩展点机制，最终会返回一个executor对象。
      7. 回头看一下Configuration对象，这个Configuration对象很有意思，里面间接的持有几个对象 ，为什么是间接？因为类里面没有这几个对象的属性，但是却可以通过当前类创建这几个对象。 
         1. Executor 对象
         2. StatementHandler 对象
         3. PameterHandler 对象
         4. ResultSetHandler 对象
      8. mybatis的插件拦截器会对这四个接口进行拦截，也就是说会对这四种对象生成代理对象，mybatis 的拦截器用到了责任链+代理+反射机制。（通过源码可以知道：所有可能被拦截的处理类都会生成一个代理类，如果有N个拦截器，就会有N个代理，层层生成动态代理是比较消耗性能的。而且虽然能指定插件拦截的位置，但这个是在执行方法的时候利用反射动态判断的，初始化的时候就是简单的把拦截器插入到了所有可以拦截的地方。所以尽量不要编写不必要的拦截器。）其实mybatis的插件实现原理和spring的aop的实现原理是一样的，就是一个多重的代理，多重的代理有两种实现方式，一个是通过责任链
   5. 返回一个默认的 SQLSession ，这个DefaultSQLSession里面持有 Configuration对象 executor对象 ，executor对象里面持有一个事务对象。
8. 通过SqlSession对象的getMapper方法获取一个指定类型的mapper代理对象。 
   1. 数据库连接对象里面的getMapper实际上调用了configuration对象的getMapper方法。
   2. 通过mapperRegistry去获取一个mapper的代理对象。
   3. 前面解析配置文件的时候，将mapper对象类型和mapper的代理工厂封装到了一个map，这里实际上从这个map里面拿出来了一个mapper的代理工厂。
   4. 使用代理工厂去创建对象，通过传递数据库连接去创建一个mapperProxy对象，这个mapperProxy实现了InvocationHandler接口。
   5. 通过mapperProxy返回一个代理对象，实际上就是使用JDK的动态代理创建一个代理对象。
9. 当代理对象执行目标方法的时候：实际上就是执行mapperProxy的invoke方法。 
   1. 这里对目标方法进行一个包装，生成一个invoker，通过invoker执行invoke()。
   2. 实际上这里调用了MapperMethod的execute方法。
   3. 在execute方法里面实际上就是判断执行的增删改查的类型，然后调用SqlSession的crud方法。(动态代理实际上就是生成了一个statement的字符串，然后调用SqlSession的crud方法。)
   4. 以sqlSession.selectOne()进行分析
   5. 从configuration对象构建一个MappedStatement对象，然后执行executor的query方法进行查询，executor分为三种： 
      1. 一个是批处理的
      2. 一个是走二级缓存的
      3. 一个是BaseExecutor，直接执行的
   6. 接下来看executor的query方法： 
      1. 组装构建待执行的SQL。
      2. 创建一级缓存的缓存key，一级缓存默认是开启的。
      3. 方法重载query()
      4. 判断如果命中一级缓存的话，直接返回。
      5. 否则的话，queryFromDatabase 直接去查询数据库
      6. 委派给子类取走真正的查询逻辑，然后将查询结果房放到一级缓存。
      7. 在子类里面通过原生jdbc的prepareStatement执行查询sql，查询之后通过ResultHandler对象去处理结果，最终返回。

![](./img/Mybatis%E6%BA%90%E7%A0%81%E6%B5%81%E7%A8%8B%E5%88%86%E6%9E%90.png#id=XJoNy&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)![Mybatis源码流程分析.png](https://cdn.nlark.com/yuque/0/2021/png/12610368/1638288287914-247c0cf0-9495-44f1-a320-6936ce363c7a.png#clientId=u31ca8eab-2f58-4&from=ui&id=udf27405b&originHeight=1017&originWidth=2978&originalType=binary&ratio=1&rotation=0&showTitle=false&size=370626&status=done&style=none&taskId=u0d586430-f6e9-4776-9f68-811549f3984&title=)

二十中文注释版源码地址：[https://gitee.com/yin_huidong/mybatis-3.git](https://gitee.com/yin_huidong/mybatis-3.git)

# 三，mybatis整体架构分析

mybatis的整体架构分为三层，分别是基础支持层，核心处理层，接口层。

![](./img/mybatis%E6%9E%B6%E6%9E%84%E5%9B%BE.png#id=k4wm3&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)![mybatis架构图.png](https://cdn.nlark.com/yuque/0/2021/png/12610368/1638288310199-f0f2591f-5398-4650-ae8a-a7e9300b181e.png#clientId=u31ca8eab-2f58-4&from=ui&id=u81690442&originHeight=624&originWidth=1007&originalType=binary&ratio=1&rotation=0&showTitle=false&size=64278&status=done&style=none&taskId=u51e0185b-2294-4529-8232-ca2594916bb&title=)

### 接口层

核心对象是 SqlSession，它是上层应用和 MyBatis打交道的桥梁，SqlSession 上定义了非常多的对数据库的操作方法。接口层在接收到调用请求的时候，会调用核心处理层的相应模块来完成具体的数据库操作。

### 核心处理层

既然叫核心处理层，也就是跟数据库操作相关的动作都是在这一层完成的。

核心处理层主要做了这几件事：

把接口中传入的参数解析并且映射成 JDBC 类型；

解析 xml 文件中的 SQL 语句，包括插入参数，和动态 SQL 的生成；

执行 SQL 语句；

处理结果集，并映射成 Java 对象。

插件也属于核心层，这是由它的工作方式和拦截的对象决定的。

### 基础支持层

基础支持层主要是一些抽取出来的通用的功能（实现复用），用来支持核心处理层的功能。比如数据源、缓存、日志、xml 解析、反射、IO、事务等等这些功能。

![](./img/mybatis%E6%9E%B6%E6%9E%84.jpg#id=efrEP&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)![mybatis架构.jpg](https://cdn.nlark.com/yuque/0/2021/jpeg/12610368/1638288319116-f01a1454-868b-4ae3-8629-80938cb19246.jpeg#clientId=u31ca8eab-2f58-4&from=ui&id=u3f171fd9&originHeight=742&originWidth=1325&originalType=binary&ratio=1&rotation=0&showTitle=false&size=95091&status=done&style=none&taskId=u6ed3cd29-a9af-4d63-ab29-2af413dd926&title=)

## 2.再看mybatis的SQL执行流程

![](./img/mybatis%E7%9A%84SQL%E6%89%A7%E8%A1%8C%E6%B5%81%E7%A8%8B%E5%9B%BE.png#id=iEIXo&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)![mybatis的SQL执行流程图.png](https://cdn.nlark.com/yuque/0/2021/png/12610368/1638288332390-8a517c76-60f5-4405-ac99-5bfaddb4487d.png#clientId=u31ca8eab-2f58-4&from=ui&id=u673d8dfd&originHeight=763&originWidth=949&originalType=binary&ratio=1&rotation=0&showTitle=false&size=67060&status=done&style=none&taskId=ub914c6e7-e1f2-4491-947f-a006f60aecc&title=)

SQL语句的执行设涉及到很多个组件，其中比较重要的就是Executor，StatementHandler，ParameterHandler，ResultSetHandler。Executor主要负责维护一级缓存和二级缓存，并提供事务管理的相关操作。他会将数据库相关的操作交给StatementHandler完成。StatementHandler首先通过ParameterHandler完成SQL语句的实参绑定，然后通过jdk内置的Statement对象执行SQL语句并得到结果集，最后通过ResultSetHandler完成结果集的映射，得到结果对象并返回。

## 3. 核心对象生命周期

### 3.1 SqlSessionFactoryBuiler

它 是 用 来 构 建 SqlSessionFactory 的 ， 而SqlSessionFactory 只需要一个，所以只要构建了这一个 SqlSessionFactory，它的使命就完成了，也就没有存在的意义了。所以它的生命周期只存在于方法的局部。

### 3.2 SqlSessionFactory

SqlSessionFactory 是用来创建 SqlSession 的，每次应用程序访问数据库，都需要创建一个会话。因为我们一直有创建会话的需要，所以 SqlSessionFactory 应该存在于应用的整个生命周期中（作用域是应用作用域）。创建 SqlSession 只需要一个实例来做这件事就行了，否则会产生很多的混乱，和浪费资源。所以我们要采用单例模式。

### 3.3 SqlSession

SqlSession 是一个会话，因为它不是线程安全的，不能在线程间共享。所以我们在请求开始的时候创建一个 SqlSession 对象，在请求结束或者说方法执行完毕的时候要及时关闭它（一次请求或者操作中）。

### 3.4 Mapper

Mapper（实际上是一个代理对象）是从 SqlSession 中获取的。它的作用是发送 SQL 来操作数据库的数据。它应该在一个 SqlSession 事务方法之内。

| 对象 | 生命周期 |
| --- | --- |
| SqlSessionFactoryBuiler | 方法局部（method） |
| SqlSessionFactory（单例） | 应用级别（application） |
| SqlSession | 请求和操作（request/method） |
| Mapper | 方法（method） |


# 四，扩展：PageHelper原理

上面分析源码的时候其实已经分析过，mybatis的拦截器实际上就是代理模式加拦截器来实现的（同AOP），而pagehelper实际上是基于插件机制实现的。

先看 PageHelper jar 包中 PageInterceptor 的源码。拦截的是 Executor 的两个query()方法。在这里对 SQL 进行了改写。

跟踪到最后，是在 MySqlDialect.getPageSql()对 SQL 进行了改写，翻页参数是从一个 Page 对象中拿到的，那么 Page 对象是怎么传到这里的呢？

上一步，AbstractHelperDialect.getPageSql()中：Page 对象是从一个 ThreadLocal<>变量中拿到的，那它是什么时候赋值的？

PageHelper.startPage()方法，把分页参数放到了 ThreadLocal<>变量中。

扩展：插件机制的应用场景：

| 作用 | 实现方式 |
| --- | --- |
| 水平分表 | 对 query update 方法进行拦截在接口上添加注解，通过反射获取接口注解，根据注解上配置的参数进行分表，修改原 SQL，例如 id 取模，按月分表 |
| 数据加解密 | update——加密；query——解密获得入参和返回值 |
| 菜单权限控制 | 对 query 方法进行拦截在方法上添加注解，根据权限配置，以及用户登录信息，在 SQL 上加上权限过滤条件 |


# 五，整合Spring

大部分时候我们不会在项目中单独使用 MyBatis 的工程，而是集成到 Spring 里面使用，但是却没有看到这三个对象在代码里面的出现。我们直接注入了一个 Mapper 接口，调用它的方法。

**SqlSessionFactory 是什么时候创建的？**

**SqlSession 去哪里了？为什么不用它来 getMapper？**

**为什么@Autowired**  **注入一个接口，在使用的时候却变成了代理对象？在 IOC的容器里面我们注入的是什么？ 注入的时候发生了什么事情？**

## 1.关键配置

```xml
        <dependency>
            <groupId>org.mybatis</groupId>
            <artifactId>mybatis-spring</artifactId>
            <version>2.0.6</version>
        </dependency>
```

然后在 Spring 的 applicationContext.xml 里面配置 SqlSessionFactoryBean，它是用来帮助我们创建会话的，其中还要指定全局配置文件和 mapper 映射器文件的路径。

```xml
<bean id="sqlSessionFactory" class="org.mybatis.spring.SqlSessionFactoryBean">
    <property name="configLocation" value="classpath:mybatis-config.xml"></ property>
    <property name="mapperLocations" value="classpath:mapper/*.xml"></ property>
    <property name="dataSource" ref="dataSource"/>
</ bean>
```

然后在 applicationContext.xml 配置需要扫描 Mapper 接口的路径。

```xml
<bean id="mapperScanner" class="org.mybatis.spring.mapper.MapperScannerConfigurer">
    <property name="basePackage" value="com.yhd.crud.dao"/>
</ bean>
```

```xml
<mybatis-springn:scan  base-package ="com.yhd.crud.dao"/>
```

```java
@MapperScan( "com.yhd.crud.dao")
```

**Spring 对 MyBatis 的对象进行了管理，但是并不会替换 MyBatis 的核心对象。也就意味着：MyBatis jar 包中的 SqlSessionFactory、SqlSession、MapperProxy 这些都会用到。而 mybatis-spring.jar 里面的类只是做了一些包装或者桥梁的工作。**

## 2.创建会话工厂

我们在 Spring 的配置文件中配置了一个 SqlSessionFactoryBean，我们来看一下这个类。

![](./img/1.jpg#id=Gc4L5&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)![1.jpg](https://cdn.nlark.com/yuque/0/2021/jpeg/12610368/1638288348686-e9c44002-00e9-4233-8cfc-917b18f59949.jpeg#clientId=u31ca8eab-2f58-4&from=ui&id=u17bc1218&originHeight=317&originWidth=879&originalType=binary&ratio=1&rotation=0&showTitle=false&size=32546&status=done&style=none&taskId=ue25d03f8-51d2-4749-9b53-781d6e19d4e&title=)

它实现了 InitializingBean 接口，所以要实现 afterPropertiesSet()方法，这个方法会在 bean 的属性值设置完的时候被调用

另外它实现了 FactoryBean 接口，所以它初始化的时候，实际上是调用 getObject()方法，它里面调用的也是 afterPropertiesSet()方法。

在 afterPropertiesSet()方法里面：解析配置文件，指定事务工厂。

## 3.创建SqlSession

### 3.1可以直接使用  DefaultSqlSession  吗？

现在已经有一个 DefaultSqlSessionFactory，按照编程式的开发过程，我们接下来就会创建一个 SqlSession 的实现类，但是在 Spring 里面，我们不是直接使用DefaultSqlSession 的，而是对它进行了一个封装，这个 SqlSession 的实现类就是SqlSessionTemplate。这个跟 Spring 封装其他的组件是一样的，比如 JdbcTemplate，RedisTemplate 等等，也是 Spring 跟 MyBatis 整合的最关键的一个类。

**为什么不用 DefaultSqlSession？它是线程不安全的，注意看类上的注解：而 SqlSessionTemplate 是线程安全的。**

```
Note that this class is not Thread-Safe.
```

### 3.2怎么拿到一个  SqlSessionTemplate ？

MyBatis提供了一个 SqlSessionDaoSupport，里面持有一个SqlSessionTemplate 对象，并且提供了一个 getSqlSession()方法，让我们获得一个SqlSessionTemplate。

```java
public  abstract  class SqlSessionDaoSupport  extends DaoSupport {
     private SqlSessionTemplate  sqlSessionTemplate;
     public SqlSession getSqlSession() {
     	return  this.sqlSessionTemplate;
    }
}
```

先创建一个 BaseDao 继承 SqlSessionDaoSupport。在BaseDao 里面封装对数据库的操作，包括 selectOne()、selectList()、insert()、delete()这些方法，子类就可以直接调用。

然后让我们的实现类继承 BaseDao 并且实现我们的 DAO 层接口，这里就是我们的Mapper 接口。实现类需要加上@Repository  的注解。

在实现类的方法里面，我们可以直接调用父类（BaseDao）封装的 selectOne()方法，那么它最终会调用 sqlSessionTemplate 的 selectOne()方法。

### 3.3有没有更好的拿到 SqlSessionTemplate

我们的每一个 DAO 层的接口（Mapper 接口也属于），如果要拿到一个 SqlSessionTemplate，去操作数据库，都要创建实现一个实现类，加上@Repository  的注解，继承 BaseDao，这个工作量也不小。

另外一个，我们去直接调用 selectOne()方法，还是出现了 Statement ID 的硬编码，MapperProxy 在这里根本没用上。

## 4.接口的扫描注册

在 applicationContext.xml 里 面 配 置 了 一 个MapperScannerConfigurer。

MapperScannerConfigurer 实现了 BeanDefinitionRegistryPostProcessor 接口，BeanDefinitionRegistryPostProcessor 是 BeanFactoryPostProcessor 的子类，可以通过编码的方式修改、新增或者删除某些 Bean 的定义。

![](./img/2.jpg#id=cHu6e&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)![2.jpg](https://cdn.nlark.com/yuque/0/2021/jpeg/12610368/1638288362145-4c8ccb88-00a4-4f92-96df-fe05e9125518.jpeg#clientId=u31ca8eab-2f58-4&from=ui&id=ufb33cb12&originHeight=418&originWidth=1326&originalType=binary&ratio=1&rotation=0&showTitle=false&size=41231&status=done&style=none&taskId=ua8e15e86-015a-4126-9dd3-99fb5cc4135&title=)

我们只需要重写 postProcessBeanDefinitionRegistry()方法，在这里面操作 Bean就可以了。

在这个方法里面：

scanner.scan() 方 法 是 ClassPathBeanDefinitionScanner 中 的 ， 而 它 的 子 类ClassPathMapperScanner 覆 盖 了 doScan() 方 法 ， 在 doScan() 中 调 用 了processBeanDefinitions，它先调用父类的 doScan()扫描所有的接口。

processBeanDefinitions 方法里面，在注册 beanDefinitions 的时候，BeanClass被改为 MapperFactoryBean（注意灰色的注释）。

**为什么要把 BeanClass 修改成 MapperFactoryBean，这个类有什么作用？**

MapperFactoryBean 继 承 了 SqlSessionDaoSupport ， 可 以 拿 到SqlSessionTemplate。

## 5.接口注入使用

我们使用 Mapper 的时候，只需要在加了 Service 注解的类里面使用@Autowired注入 Mapper 接口就好了。

```java
 @Service
 public  class EmployeeService {
    @Autowired
    EmployeeMapper  employeeMapper;
     
     public List<Employee> getAll() {
     	return  employeeMapper.selectByMap( null);
     }
}
```

Spring 在启动的时候需要去实例化 EmployeeService。

EmployeeService 依赖了 EmployeeMapper 接口（是 EmployeeService 的一个属性）。

Spring 会根据 Mapper 的名字从 BeanFactory 中获取它的 BeanDefination，再从BeanDefination 中 获 取 BeanClass ，EmployeeMapper 对 应 的 BeanClass 是MapperFactoryBean（上一步已经分析过）。

接下来就是创建 MapperFactoryBean，因为实现了 FactoryBean 接口，同样是调用 getObject()方法。

```java
// MapperFactoryBean.java
 public T getObject()  throws Exception {
 return getSqlSession().getMapper( this. mapperInterface);
}
```

因为 MapperFactoryBean 继 承 了 SqlSessionDaoSupport ， 所 以 这 个getSqlSession()就是调用父类的方法，返回 SqlSessionTemplate。

```java
// SqlSessionDaoSupport.java
public SqlSession getSqlSession() {
 return  this. sqlSessionTemplate;
}
```

我们注入到 Service 层的接口，实际上还是一个 MapperProxy 代理对象。所以最后调用 Mapper 接口的方法，也是执行 MapperProxy 的 invoke()方法。

DaoSupport ， 所 以 这 个getSqlSession()就是调用父类的方法，返回 SqlSessionTemplate。

```java
// SqlSessionDaoSupport.java
public SqlSession getSqlSession() {
 return  this. sqlSessionTemplate;
}
```

我们注入到 Service 层的接口，实际上还是一个 MapperProxy 代理对象。所以最后调用 Mapper 接口的方法，也是执行 MapperProxy 的 invoke()方法。
## 6.总结

![mybatis整合spring.png](https://cdn.nlark.com/yuque/0/2021/png/12610368/1638459809873-452facf7-301d-4eb9-abfc-090d383853bd.png#clientId=uc586ad2a-e390-4&from=ui&id=ud14f95e8&originHeight=1373&originWidth=1725&originalType=binary&ratio=1&rotation=0&showTitle=false&size=219950&status=done&style=none&taskId=uc1896de1-b5ee-4e13-b1ab-69c7ce244de&title=)
Mybatis整合Spring框架首先利用的是Spring框架的SPI机制，在项目的META-INF目录下有一个文件【spring.handlers】，里面给Spring容器中导入了一个类【NamespaceHandler】。
【NamespaceHandler】
    继承关系上：实现了spring的扩展点接口
    【init】给容器中注册了一个【BeanDefinitionParser】bean定义信息的解析器 【MapperScannerBeanDefinitionParser】
【MapperScannerBeanDefinitionParser】
    他会在spring容器创建过程中去解析【mapperScanner】标签
    解析出来的属性会给【MapperScannerConfigurer】赋能
另一个需要配置的bean就是【SqlSessionFactoryBean】
    继承关系
        FactoryBean
        InitializingBean   初始化的时候会执行【afterPropertiesSet()】
        ApplicationListener
    afterPropertiesSet()
        buildSqlSessionFactory()
            创建Mybatis的主配置文件解析器，解析主配置文件
            创建mapper映射文件的解析器，解析mapper映射文件
            构建出一个Configuration对象传入到【SqlSessionFactoryBuilder】的【build()】
            最终返回了一个【SqlSessionFactory】对象实例
【MapperScannerConfigurer】
    继承关系
        【BeanDefinitionRegistryPostProcessor】
            【postProcessBeanDefinitionRegistry()】
                在系统初始化的过程中被调用，扫描了配置文件中配置的basePackage 下的所有 Mapper 类，最终生成 Spring 的 Bean 对象，注册到容器中
                这里面调用了包扫描的方法【scanner.scan()】经过一系列调用，调用到了
                    【ClassPathMapperScanner】的【doScan】
                        调用父类的doScan()方法，遍历basePackages中指定的所有包，扫描每个包下的Java文件并进行解析。
                        使用之前注册的过滤器进行过滤，得到符合条件的BeanDefinitionHolder对象
                        【processBeanDefinitions()】处理扫描得到的BeanDefinitionHolder集合
                            循环
                                将BeanDefinition中记录的Bean类型修改为【MapperFactoryBean】
                                将扫描到的接口类型作为构造方法的参数
                                构造MapperFactoryBean的属性，将sqlSessionFactory、sqlSessionTemplate 等信息填充到BeanDefinition中，修改自动注入方式
                                重新注册到容器
 ClassPathMapperScanner 在处理 Mapper 接口的时候用到了 MapperFactoryBean 类，动态代理的实现，可以直接将 Mapper 接口注入到 Service 层的 Bean 中，这样就不需要编写任何 DAO 实现的代码。
【MapperFactoryBean】
    继承关系
        InitializingBean
        DaoSupport
        SqlSessionDaoSupport    FactoryBean
        MapperFactoryBean
    MapperFactoryBean 类的动态代理功能是通过实现了 Spring 提供的 FactoryBean 接口实现的，该接口是一个用于创建 Bean 对象的工厂接口，通过 getObject() 方法获取真实的对象。
    【getObject()】
        【getSqlSession().getMapper(this.mapperInterface)】
            【getSqlSession()】是她父类【SqlSessionDaoSupport】的方法
            【getMapper()】
                通过sqlSession获取到mapper代理对象
这里面涉及到了一个类 【SqlSessionDaoSupport】
    构造器
        通过 Spring 容器自动注入 sqlSessionFactory 属性
        【createSqlSessionTemplate()】
            创建了一个【SqlSessionTemplate】对象并且里面持有【SqlSessionFactory】
【SqlSessionTemplate】
    SqlSessionTemplate 实现了 SqlSession 接口，在 MyBatis 与 Spring 集成开发时，用来代替 MyBatis 中的 DefaultSqlSession 的功能。
    SqlSessionTemplate 是线程安全的，可以在 DAO 之间共享使用，比如上面生成的 Mapper 对象会持有一个 SqlSessionTemplate 对象，每次请求都会共用该对象。
    在 MyBatis 中 SqlSession 的 Scope 是会话级别，请求结束后需要关闭本次会话，怎么集成了 Spring 后，可以共用了？
    首先，在集成 Spring 后，Mapper 对象是单例，由 Spring 容器管理，供 Service 层使用，SqlSessionTemplate 在设计的时候，功能分成了如下两部分：
    1. 获取 MapperProxy 代理对象；
    2. 执行 SQL 操作，该部分功能通过代理对象 SqlSessionInterceptor 实现；
    【构造器】
        sqlSession通过动态代理来创建的，【SqlSessionInterceptor】实现了 【InvocationHandler】
当调用mapper里面的方法的时候，就会执行【SqlSessionInterceptor】的【invoke()】
    通过SqlSessionUtils.getSqlSession()获取SqlSession对象，同一个事务共享SqlSession
    通过【invoke】调用SqlSession对象的相应方法
    检测事务是否由Spring进行管理，并据此决定是否提交事务。

Mybatis-Spring 中文注释源码地址：[https://gitee.com/yin_huidong/mybatis-spring.git](https://gitee.com/yin_huidong/mybatis-spring.git)
 
