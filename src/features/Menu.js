import React, { useState } from 'react';
import'./menu.css'
import { useSelector, useDispatch } from 'react-redux';
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import memorySong from './audio/memory.mp3'
import {Howl, Howler} from 'howler';
import {Tema,selectTema,selectTemaColor,color} from './counter/counterSlice'
import moon from '../features/counter/menuImg/Moon-icon.png'
import son from '../features/counter/menuImg/son.png'
export function Menu(){
const dispatch = useDispatch();
const color = useSelector(selectTemaColor)
const cheked = useSelector(selectTema)
const onChangeTems = () =>{
  dispatch(Tema(!cheked));
  }
  
        return(
 
      <div className='menu' style={{background:cheked ? 'linear-gradient(-180deg,#000000, #5E546A)' : 'linear-gradient(-1deg,rgba(42, 67, 89, 0.702), #78C0FF 53%)' }}>
        <div className='animation'>
          <div className='son' style={{backgroundImage: cheked ? `url(${moon})` :  `url(${son})`}}></div>
          <div className='ski_1'></div>
          <div className='ski_2'></div>
          </div>
          <div className='startBlock'>
          <div className='play'><Link to="/logo/starting" className="Start">
         <button className='btnPlay'></button>
        </Link>

            <div class="check">
            <input id="check" type="checkbox" onClick={onChangeTems} checked={cheked}></input>
            <label for="check"><span className='textLabel' style={{paddingRight: cheked ? '50px' : '0px',color:cheked ? 'white': ''}}>{color}</span></label>
           </div>
        </div>
      </div>

      </div>
   )
  }