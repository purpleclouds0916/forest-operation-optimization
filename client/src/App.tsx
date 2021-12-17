/* eslint-disable react/no-array-index-key */
/* eslint-disable react/button-has-type */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable react/state-in-constructor */
import { VFC, useEffect } from 'react';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Route, Routes, useLocation } from 'react-router';

import Home from './components/pages/Home';
import Form from './components/pages/Form';
import Result from './components/pages/Result';

const documentDescription =
  'このアプリケーションの具体的な説明が入ります。テキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト';

const App: VFC = () => {
  const { hash, pathname } = useLocation();

  useEffect(() => {
    if (!hash) window.scrollTo(0, 0);
  }, [hash, pathname]);

  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            <Home
              title="林業の経営シミュレーション"
              description="経営に必要なデータを入力するだけで、最適な施業方法を提案します"
              isMainPage
            />
          }
        />
        <Route
          path="/document"
          element={
            <Home
              title="このサイトについて"
              description={documentDescription}
              isMainPage={false}
            />
          }
        />
        <Route path="/form" element={<Form />} />
        <Route path="/submit" element={<Result />} />
      </Routes>
    </div>
  );
};

export default App;

// import React, { Component } from 'react';
// import './App.css';

// class App extends Component {
//   // Initialize state
//   state = { passwords: [] }

//   // Fetch passwords after first mount
//   componentDidMount() {
//     this.getPasswords();
//   }

//   getPasswords = () => {
//     // Get the passwords and store them in state
//     fetch('/api/passwords')
//       .then(res => res.json())
//       .then(passwords => this.setState({ passwords }));
//   }

//   render() {
//     const { passwords } = this.state;

//     return (
//       <div className="App">
//         {/* Render the passwords if we have them */}
//         {passwords.length ? (
//           <div>
//             <h1>5 Passwords.</h1>
//             <ul className="passwords">
//               {/*
//                 Generally it's bad to use "index" as a key.
//                 It's ok for this example because there will always
//                 be the same number of passwords, and they never
//                 change positions in the array.
//               */}
//               {passwords.map((password, index) =>
//                 <li key={index}>
//                   {password}
//                 </li>
//               )}
//             </ul>
//             <button
//               className="more"
//               onClick={this.getPasswords}>
//               Get More
//             </button>
//           </div>
//         ) : (
//           // Render a helpful message otherwise
//           <div>
//             <h1>No passwords :(</h1>
//             <button
//               className="more"
//               onClick={this.getPasswords}>
//               Try Again?
//             </button>
//           </div>
//         )}
//       </div>
//     );
//   }
// }

// export default App;
