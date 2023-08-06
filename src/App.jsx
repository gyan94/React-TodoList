/* eslint react-hooks/exhaustive-deps:off */
import React, { useState } from "react";
import "./styles.css";
import { InputTodo } from './components/inputTodo';
import { IcompleteTodos, IncompleteTodos } from "./components/incompleteTodos";
import { CompleteTodos } from "./components/completeTodos";

export const App = () => {

  // タスク入力部分のステート
  const [todoText, setTodoText] = useState('');

  // 未完了のモック
  const [incompleteTodos, setIncompleteTodos] = useState([]);

  // 完了のモック
  const [completeTodos, setCompleteTodos] = useState([]);
  
  // タスク追加のinput部分
  const onChangeTodoText = (event) => setTodoText(event.target.value);

  // タスクの追加機能
  const onClickAdd = () => {
    if (todoText) { // if(todoText === "") return; でもOK
      const newTodos = [...incompleteTodos, todoText];
      setIncompleteTodos(newTodos);
      setTodoText("");
      }
  }

  // タスクの削除機能 
  const onClickDelete = (index) => {
    const newTodos = [...incompleteTodos];
    newTodos.splice(index, 1); // n番目の要素か,いくつ削除するか
    setIncompleteTodos(newTodos);
  }

  // タスクの完了機能
  const onClickComplete = (index) => {

    const newIncompleteTodos = [...incompleteTodos];
    newIncompleteTodos.splice(index, 1); 

    // ↑未完了のTODOから消した後 ↓完了のTODOに挿入

    const newCompleteTodos = [...completeTodos, incompleteTodos[index]];
    setIncompleteTodos(newIncompleteTodos);  
    setCompleteTodos(newCompleteTodos);    
  }

  // 「戻す」→ 未完了のTODOにタスクを戻す
  const onClickBack = (index) => {

    // 完了のTODOから削除
    const newCompleteTodos = [...completeTodos];
    newCompleteTodos.splice(index, 1);
    setCompleteTodos(newCompleteTodos);
    
    // 未完了のTODOに追加
    const newIncompleteTodos = [...incompleteTodos, completeTodos[index]];
    setIncompleteTodos(newIncompleteTodos);
  }

  return (
    <>
      < InputTodo
        todoText={todoText} 
        onChange={onChangeTodoText} 
        onClick={onClickAdd}
        disabled={incompleteTodos.length >= 5}
      />
      {incompleteTodos.length >= 5 && 
      <p style={{color: "red"}}>登録できるタスクは５個までです！消化して下さい！</p> }
      <IncompleteTodos
        todos={incompleteTodos} 
        onClickComplete={onClickComplete}
        onClickDelete={onClickDelete}
      />
      <CompleteTodos
        todos={completeTodos}
        onClickBack={onClickBack}
      />
    </>
  );
};









































// import React, { useEffect, useState } from "react";
// import { ColorfulMessage } from "./components/ColorfulMessage";

// const App = () => {
//   console.log("さいしょ");
//   const [num, setNum] =  useState(0);
//   const [faceShowFlag, setFaceShowFlag] = useState(false);

//   const onClickCountUp = () => {
//     setNum(num + 1);
//   }

//   const onClickSwitchShowFlag = () => {
//     setFaceShowFlag(!faceShowFlag);
//   }

//   useEffect(() => {
//     if (num > 0) { 
//       if (num % 3 === 0) {
//         faceShowFlag || setFaceShowFlag(true);
//       } else {
//         faceShowFlag && setFaceShowFlag(false);
//       }
//     }
//     console.log("use");
//   }, [num]);
  
  



//   return (
//     <> 
//       <h1 style={{ color: 'red' }}>こんにちは</h1>
//       <ColorfulMessage color="blue">お元気ですか？</ColorfulMessage>
//       <ColorfulMessage color="red">元気です</ColorfulMessage>
//       <button onClick={onClickCountUp} >カウントアップ</button>
//       <br />
//       <button onClick={onClickSwitchShowFlag}>ON/OFF</button>
//       <p>{num}</p>
//       {faceShowFlag && <p>!(^^)!</p>}
//     </>
//   );
// }

// // App関数を別ファイルへ(コンポーネント)
// export default App;