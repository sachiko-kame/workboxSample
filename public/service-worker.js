importScripts('https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js');

if (workbox) {
    console.log(`Yay! Workbox is loaded 🎉`);
} else {
    console.log(`Boo! Workbox didn't load 😬`);
}

//開発用本藩用のフラグ設定 debug trueが開発用
workbox.setConfig({
    debug: true
});

workbox.routing.registerRoute(
    '/',
    new workbox.strategies.CacheFirst({
        cacheName: 'cache',
        plugins: []
    })
);

workbox.routing.registerRoute(
    new RegExp(/.*\.js/),
    new workbox.strategies.NetworkFirst({
        cacheName: 'js-cache',
    })
);


workbox.routing.registerRoute(
    '/favicon.ico',
    new workbox.strategies.NetworkFirst({
        cacheName: 'icon'
    })
);


const matchFunction = ({
    url,
    event
}) => {
    let name = url.searchParams.get("a");
    if (name == 'aaa') {
        return true;
    } else {
        return false;
    }
};


workbox.routing.registerRoute(
    matchFunction,
    new workbox.strategies.NetworkFirst({
        cacheName: 'urls',
        plugins: [
            new workbox.cacheableResponse.Plugin({
                statuses: [0, 200]
            }),
            new workbox.expiration.Plugin({
                maxEntries: 60, 
                maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
            }),
            new workbox.backgroundSync.Plugin('myQueueName', {
              maxRetentionTime: 24 * 60 // 最大24時間の間にリクエストを再試行します
            })
        ]
    })
);


/*
[JavaScript 正規表現まとめ](https://qiita.com/iLLviA/items/b6bf680cd2408edd050f)
[正規表現パターンの記述](https://developer.mozilla.org/ja/docs/Web/JavaScript/Guide/Writing_a_Regular_Expression_Pattern)

正規表現の書き方　文字　＋　特殊文字　+ 文字　とか

ABC 文字にマッチ
[ABC] ABC文字のいずれかにマッチ
[^ABC] ABC文字以外ののいずれかにマッチ
[A~Z] A~Zの間の文字全部


^　行の先頭にマッチ

$　行の末尾にマッチ

文字 + * で　文字がが表示されないか文字が連続で表示されるか
文字　+ + で　文字が一回以上繰り返すの範囲指定できる
文字 + ? で　文字が表示されないパターンか1回のみの表示となる


文字{n}　　直前の文字をn回繰り返すということ　 "[0-9]{3}"は3桁の数字
文字{n,}    直前の文字をn回以上
文字{m,n}　　　直前の文字をm~n回以上


(?:x) キャプチャしない括弧 データを保持しておかないでいいのかな　なんかめんどくさい
\　次の文字をエスケープ　どういったものエスケープに必要？　正規表現で特殊文字として扱われるもの
.　改行文字以外ならなんでもマッチ！

/\.css$/,
/\.(?:png|jpg|jpeg|svg|gif)$/,


[0-9]　数字に一致
[^0-9]　数字以外に一致

\n　改行
\t　タブ
\s　空白


否定は　[^◯◯]で！
*/


