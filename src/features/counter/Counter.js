import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {selectCells,selectSize,addElem,addCells,selectCounter,getFinish,selectFinishGame,selectTema} from './counterSlice'
// import { createSlice } from '@reduxjs/toolkit';
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import jus from '../counter/jus/611094158.jpg'
import Darckjus from '../counter/jus/darck_jus.jpg'
import icon from '../counter/jus/pngtree-cartoon-fruit-cute-strawberry-image-png-image_602437.jpg'
import iconDark from './/jus/26258PICmE5waRdJ3pQIA_PIC2018.png_860.png'
// import { CSSTransition,Transition } from 'react-transition-group';
// import ReactCardFlip from 'react-card-flip';
import'./Counter.css'
// import styled from 'styled-components'

export function Counter() {
const [flip,setFlip] = useState(false)
const [time,setTime] = useState(0)
const dispatch = useDispatch();
const cells = useSelector(selectCells)
const size = useSelector(selectSize);
const counter = useSelector(selectCounter)
const cheked = useSelector(selectTema)
const finichGame = useSelector(selectFinishGame)
  const handleClick = (e) => {
  dispatch(addElem(e.target.id));

  dispatch(getFinish());
  setFlip(!flip)
  }
 useEffect(() =>{
  let timer = setInterval(() =>{
    !finichGame && counter > 0 ? setTime(time + 1) : setTime(0);
  },1000)
    if(finichGame){
    clearInterval(timer)
    }
    
  return () => {
    clearInterval(timer)
  }
 }) 

  return (
    <div className='row' style={{backgroundImage: cheked ?`url(${Darckjus})` : `url(${jus})`}}>

      <div className='menuDiv'>
              <Link to="/logo" className="">
            <button className='menuBtn' >Menu</button>
              </Link>
        <div className='counter' style={{display: finichGame ? 'none' : 'flex'}} >
      {counter} Step
      </div>

        </div>
        
       <div className='block'  style={{display: finichGame ? 'none' : 'flex'}}>
       {cells.map((item, idx)=>  
        <button 
       style={{width: `${100/size}%`, height: `${100/size*9}px`,backgroundImage: cheked ? `url(${iconDark})`: `url(${icon})` }} 
       className={`btn ${ flip ? 'flip' : ''}`}
       id={idx}
        key={idx}
        onClick={handleClick}
        disabled={item.visible}> 
      { item.visible ? <img  src={item.value} alt="" height='100%' width="100%" ></img>  : ''}
    </button>


      )} 
 </div>

          <div className={finichGame ? 'newBlock' : 'none'}>
          { finichGame ? <div className='counteFinish'>{counter} Step</div> : '' }
          { finichGame ? <div className='counteFinish'>{time} Sec</div> : '' }
          </div>



 <div className='menuDiv'>
        <Link to="/logo/starting" className="" >
      <button className='backBtn' >Back</button>
        </Link>
        <div className='counterTime' style={{display: finichGame ? 'none' : 'flex'}} >
      {time} Sec
      </div>
        
        </div>
 
</div>
  );
}
