---
title: 状态（State）
---

许多 Web 应用程序都需要维护状态。这可以像维护访问次数计数器一样简单，也可以像需要访问作业队列和多个数据库一样复杂。Axum 提供了以安全简单的方式实现此类交互的工具。


## 定义结构体
需要实现 Clone 这个 trait

``` rust
#[derive(Clone)]
struct StateCount {
    pub count: Arc<Mutex<u32>>,
}
```

## 初始化
定义初始值，并添加到链路上
```rust
Router::new().with_state(StateCount { count: Arc::new(Mutex::new(0)) });
```

## 获取并更新状态
```rust
// 增加计数器
async fn increasing(State(state): State<StateCount>) -> String {
    // 获取锁
    let mut count = state.count.lock().expect("锁定失败");
    // 解引用并加1
    *count += 1;
}
```

## 参考案例
```rust
use std::net::SocketAddr;
use std::sync::{Arc, Mutex};

use axum::{
    Router,
    routing::get,
};
use axum::extract::State;

// 需要实现 Clone 这个 trait
#[derive(Clone)]
struct StateCount {
    pub count: Arc<Mutex<u32>>,
}

#[tokio::main]
async fn main() {

    // 构建项目处理器
    let app = Router::new()
        .route("/incr", get(increasing))
        // 初始化状态，并添加到链路上
        .with_state(StateCount { count: Arc::new(Mutex::new(0)) })
        ;

    // 监听端口
    let listener = tokio::net::TcpListener::bind("localhost:8000").await.unwrap();
    // 运行项目
    axum::serve::serve(listener, app.into_make_service_with_connect_info::<SocketAddr>())
        .await
        .unwrap();
}

// 增加计数器
async fn increasing(State(state): State<StateCount>) -> String {
    // 获取锁
    let mut count = state.count.lock().expect("锁定失败");
    // 解引用并加1
    *count += 1;

    format!("count: {}", count)
}

```