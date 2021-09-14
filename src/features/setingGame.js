import './setingGame.css'
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import {selectSize,addCells,addElem,addRes,selectFinishGame,getFinish,selectTema,setPlayers} from './counter/counterSlice'
export function StartGame(){
    const dispatch = useDispatch();
    const finichGame = useSelector(selectFinishGame)
    const cheked = useSelector(selectTema)
    const handleChange = (e) => {
        dispatch(addCells(e.target.value));
        dispatch(addRes());
        dispatch(getFinish(false));
      }

    return(


        
        <div className='nav' style={{background:cheked ? 'rgb(57, 58, 59);' : 'cornflowerblue'}}>
        <div className='menuDiv'>
        <Link to="/logo" className="">
            <button className='menuBtn'>Menu</button>
        </Link>
        </div>

        <div className='pole'>



        <Link to="/logo/starting/Counter" className="">
        <button className='poleBtn' value='2' onClick={handleChange}>3x3</button>
        </Link>

        <Link to="/logo/starting/Counter" className="">
        <button className='poleBtn' value='4'onClick={handleChange}>4x4</button>
        </Link>
        <Link to="/logo/starting/Counter" className="">
          <button className='poleBtn' value='6'onClick={handleChange}>6x6</button>
        </Link>

         </div>    

        </div>
    )
}