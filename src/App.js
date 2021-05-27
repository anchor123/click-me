import React from "react";
import "./App.scss";
import tcb from './tcb';

const app = tcb.getApp();
const db = app.database();

function App() {
  const ref = React.useRef();
  const [count, setCount] = React.useState('');
  const onClick = () => {
    setTimeout(() => {
      ref.current.blur();
    },
      500);
    app.callFunction({
      name: "click-fn"
    }).catch(console.error);
  }

  React.useEffect(() => {
    const watcher = db
      .collection("testclicks")
      .watch({
        onChange: function (snapshot) {
          if(Array.isArray(snapshot.docs)){
            const sum = snapshot.docs.reduce((sum,cur) => {
              return sum + cur.count;
            },0);
            setCount(sum);
          }
        },
        onError: function (err) {
          console.error("the watch closed because of error", err);
        }
      });

    return () => {
      watcher.close();
    }
  }, []);

  return (
    <div className="App">
      <h2>目前已收到 {count} 次点击</h2>
      <button ref={ref} className="loading-container click-btn" onClick={onClick}>点我</button>
    </div>
  );
}

export default App;
