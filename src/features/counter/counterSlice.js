import { createSlice } from '@reduxjs/toolkit';
import {Howl, Howler} from 'howler';
import limee from './jus/limee.jpg'
import abricos from './jus/abricos.jpg'
import mango from './jus/mango.jpg'
import granat from './jus/granat.jpg'
import malina from './jus/malina.jpg'
import agrus from './jus/agrus.jpg'
import grusa from './jus/grusa.jpg'
import klubnika from './jus/klubnika.jpg'
import yabko from './jus/yabko.jpg'
import redAple from './jus/redaple.jpg'
import greenJus from './jus/greenjus.jpg'
import sliva from './jus/sliva.jpg'
import som1 from './jus/kartinki-frukty.jpg'
import chery from './jus/kartinki-frukty-65.jpg'
import madarin from './jus/kartinki-frukty-60.jpg'
import som2 from './jus/kartinki-frukty-52.jpg'
import cocos from './jus/kartinki-frukty-46.jpg'
import som3 from './jus/kartinki-frukty-38.jpg'
import yes from '../audio/a3f66032fbe4f26.mp3'
import sond1 from '../audio/sm-sounds-game-ping-1.mp3'
import nop from '../audio/Nope-Sound-Effect.mp3'
import complited from '../audio/Rockstar North Mission completed (GTA SA Version)_JFt7.mp3'
const soundPlay = (src) => {
  const sound = new Howl({src});
  sound.play();
}



const imgArr1 = [limee,abricos,granat,malina,agrus,grusa,klubnika,yabko,mango,redAple,greenJus,sliva,som1,chery,madarin,som2,cocos,som3]
const imgArr = [limee,abricos,granat,malina,agrus,grusa,klubnika,yabko]
const arrImg = imgArr.sort(() => 0.5 - Math.random());
const arrImg1 = imgArr1.sort(() => 0.5 - Math.random());
const initialState = {size:4,count:0,counter:0,cells:[] ,prev:[],finishGame:false,cheked:false,countPlayers:0,color:"Light", 
players: [{id: 0, name: "Player 1", points: 0, victory: false, mount: 0}, {id: 1, name: "Player 2", points: 0, victory: false, mount: 0}]}




export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    addCells:(state ,action)=>{
      state.size = Number(action.payload);
      state.cells = Array.from(Array(state.size), () => new Array(state.size));
      let val = 0;
      for(let i = 0; i< state.cells.length; i++) {
        for (let j = 0; j< state.cells[i].length; j++) {
          if (val == 9 || val == state.size * state.size / 2) {
            val = 0;
          }
          if(state.size === 6){
            state.cells[i][j] = {value: arrImg1[val], visible: false};
            val++;
          }
          else{
            state.cells[i][j] = {value: arrImg[val], visible: false};
            val++;
          }
        }
      }
       for(let j = 0; j < 20; j++) {
        for(let i = 0; i< state.cells.length; i++) {
          state.cells[i].sort(() => Math.random() - 0.5);
          state.cells.sort(() => Math.random() - 0.5);
        }
      }
  },
  addElem:(state,action)=>{
    let i = Math.trunc(action.payload/state.size);
    let j = action.payload - Math.trunc(action.payload/state.size) * state.size
    state.cells[i][j].visible = true;
 
    state.counter++;
    state.prev.unshift({i: i, j: j})
    if(state.count % 2 == 0){
      state.prevStep = {i: i, j: j}
    }

    if(state.countPlayers % 2 == 0) {
      state.players[0].mount++;
    } else {
      state.players[1].mount++;
    }  



    if(state.counter != 1 && state.counter % 2 == 1 ){
        if(state.cells[state.prev[2].i][state.prev[2].j].value != state.cells[state.prev[1].i][state.prev[1].j].value){
          state.cells[state.prev[2].i][state.prev[2].j].visible = false
          state.cells[state.prev[1].i][state.prev[1].j].visible = false
        }
        else{
         state.cells[state.prev[2].i][state.prev[2].j].visible = true
         state.cells[state.prev[1].i][state.prev[1].j].visible = true
        }
      }
      state.count++
      if (state.count % 2 == 0 ) {
         if(state.cells[state.prevStep.i][state.prevStep.j].value != state.cells[i][j].value){
          soundPlay(nop);
          state.countPlayers++;
         }
         else{
          soundPlay(yes);
          if(state.countPlayers % 2 == 0) {
            state.players[0].points++;
          } else {
            state.players[1].points++;
          }
        }
      }
      if (state.count % 2 == 1 ) {
        soundPlay(sond1);
       }

     },
     addRes:(state,action)=>{
      state.counter = 0;
      state.count = 0;
     },
     getFinish:(state)=>{
      state.finishGame = state.cells.every(cell => {
        return cell.every(item => {
          return item.visible
      })
      })
      if(state.finishGame) {
        soundPlay(complited);
      }  
     },
     Tema:(state,action) =>{

      state.cheked = action.payload
         if(state.cheked){
        state.color = 'Darck'
      }else{
        state.color = 'Light'
      }
     }
     ,
     setPlayers: (state, action) => {
      state.players[action.payload.id].name = action.payload.value
    }
   }

  });
export const { addElem,addCells,addRes,getFinish,Tema,setPlayers} = counterSlice.actions;


export const selectPlayers = (state) => state.counter.players;
export const selectSize = (state) => state.counter.size;
export const selectCells = (state) => state.counter.cells.flat();
export const selectCounter = (state) => state.counter.counter;
export const selectFinishGame = (state) => state.counter.finishGame;
export const selectTema = (state) => state.counter.cheked;
export const selectTemaColor = (state) => state.counter.color;
export default counterSlice.reducer;
