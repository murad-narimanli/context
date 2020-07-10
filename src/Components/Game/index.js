import React , {useState} from "react";
import { BrowserRouter as Router, Route , Link  } from 'react-router-dom';
import "./styles.css"
import Box from "../Box";

const board = [[],[],[]]
function Game () {
        const [turn , setturn] = useState('X');
        const [winner , setWinner] = useState('');
        const [start , setStart] = useState(false)
        const [wins , setWins] = useState(false)
        const changeTurn = (row , col ) =>{
            setturn( turn => turn === 'X' ? 'O' : 'X'  )
            board[row][col] = turn;
            let w = checkForWin()
            if (!w){
                setWins(true)
                setStart(true)
            }
            else if (w){
                setWinner ( "'" + w + "'" + '- Wins 😁');
                setStart(true)

            }
        }

        const checkForWin = () =>{
            // setir ucun yoxlamaq
            for (let i = 0 ; i < board.length; i++) {
                const row = board[i]
                if(row[0] === row[1] &&  row[1] === row[2]&&row[0] ){
                    return row[0]
                }
            }
            // sutun ucun
            for (let i = 0 ; i < board.length; i++){
                const  el0  = board[0][i]
                const  el1  = board[1][i]
                const  el2  = board[2][i]

                if (el0===el1 && el1===el2 && el0){
                    return el0
                }
            }

            // diaqonal
            const sag0 = board[0][0]
            const sag1 = board[1][1]
            const sag2 = board[2][2]
            if (sag0=== sag1 && sag1=== sag2 && sag0){
                return sag0
            }

            const sol0 = board[0][2]
            const sol1 = board[1][1]
            const sol2 = board[2][0]
            if (sol0=== sol1 && sol1=== sol2 && sol0){
                return sol0
            }
            return false
        }

        const [begin , setBegin] = useState(false)
        const starter = () =>{
            setBegin(true)
        }
         return (
             <div id="game">
                 <Router>
                     <h1 className="winner">
                         Tic-Tac-Toe
                     </h1>

                     <Route path="/" exact render={
                         () => {
                             return(
                                 <div>
                                     <Link to="/play" className="again">Start game</Link>
                                     <h4 className="winner">NOTE : "X" starts first</h4>
                                 </div>
                             );
                         }
                     } />
                     <Route path="/play" exact render={
                         () => {
                             return(
                                <div className="maingame">
                                    {
                                        !wins ? '' : <h2 className="winner">{winner}</h2>
                                    }
                                    <div className="row">
                                        <Box row={0} col={0} currentState={turn} changeTurn={changeTurn} />
                                        <Box row={0} col={1} currentState={turn} changeTurn={changeTurn} />
                                        <Box row={0} col={2} currentState={turn} changeTurn={changeTurn} />
                                    </div>

                                    <div className="row">
                                        <Box row={1} col={0} currentState={turn} changeTurn={changeTurn} />
                                        <Box row={1} col={1} currentState={turn} changeTurn={changeTurn} />
                                        <Box row={1} col={2} currentState={turn} changeTurn={changeTurn} />
                                    </div>

                                    <div className="row">
                                        <Box row={2} col={0} currentState={turn} changeTurn={changeTurn} />
                                        <Box row={2} col={1} currentState={turn} changeTurn={changeTurn} />
                                        <Box row={2} col={2} currentState={turn} changeTurn={changeTurn} />
                                    </div>
                                    { start ? <Link to='/' className="again"> Play again ☘</Link> : '' }
                                </div>
                             );
                         }
                     } />




                 </Router>
             </div>
           )
}

export default Game