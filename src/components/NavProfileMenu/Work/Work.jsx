import React, {useState, useReducer, useEffect} from 'react'
import styles from '../Work/Work.module.css'
import Edit from '../../../assets/Buttons/Edit.svg'
import Pen from '../../../assets/Edit/Pen.svg'
import Trash from '../../../assets/Edit/Trash.svg'
import axios from 'axios'
import ModalWork from '../../../components/NavProfileMenu/Work/ModalWork'
import UpdateWork from '../../../components/NavProfileMenu/Work/UpdateWork'
import { useLocation } from 'react-router'

export default function Work() {

  const [data, setData] = useState([])
  // const [loading, setLoading] = useState(false)
  const [deleteId, setDeleteId] = useState(0)
  //  console.log(data)

  const location = useLocation();
  console.log(location.state)

  const listExperience = async() => {
    try {
      await axios.get("http://127.0.0.1:8000/accounts/api/experience/")
                .then((resp) => {setData(resp.data.Experience.find((i)=> i.user_id == 3))})
      setLoading(true)
    }
    catch(error) {
      console.log(error)
    }
  }

  useEffect(()=>{
    listExperience();
  },[])

  useEffect (() => {
    axios.delete(`http://127.0.0.1:8000/accounts/api/experience/${deleteId}`)
    .then(response =>  listExperience())
    .catch(error => {
        console.error( error);
    })
  }, [deleteId]) 
  
  

  const reducer = (state, action) => {
    switch (action.type) {
      case "toggleEdit":
        return{showEditIcons: state.showEditIcons = true, showEdit: !state.showEdit, showEditButtons: state.showEditButtons = true}
      case "closeEdit": 
        return{showEditIcons: !state.showEditIcons, showEdit: state.showEdit = true, showEditButtons: !state.showEditButtons}
      default: 
        return state;    
    }
  }

  const [modalShow, setModalShow] = useState(false);
  const [updateShow, setUpdateShow] = useState(false);
  const [id, setId] = useState(0);
  const [state, dispatch] = useReducer(reducer, {showEditIcons:false, showEdit:true, showEditButtons:false })
  // console.log(id)

  return (
    <div style={{position:'relative'}}>
      
          <div className={`${styles.educationTag}`}>
            <div className={`${styles.educationTitle}`}>
              <div className={`${styles.tagTitle}`}>
                <p>{data.assignment}</p>
              </div>
              <div className={`${styles.tagDate}`}>
                <p>From {data.init_year}</p> <p>to {data.end_year ? data.end_year : data.still_working}</p>
              </div>
            </div>
            <div>
              <div className={`${styles.subtitle}`}>
                <p>{data.organisation}</p>
              </div>
              {state.showEditIcons && <div style={{display: 'flex', justifyContent: 'flex-end', width: '28%', 
              alignContent: 'center', position: 'relative', left: '72%', gap: '2rem', marginBottom:'-1rem', 
              bottom:'2rem'}}><button style={{border:'none', background:'none'}} onClick={() => {setId(data.id), setUpdateShow(true)}}><img style={{backgroundColor:'white'}} src={Pen} /></button>
                  <button style={{border:'none', background:'none'}} onClick={() => {setDeleteId(data.id)}}>
                  <img style={{backgroundColor:'white'}} src={Trash} />
                  </button></div> }
              <div className={`${styles.text}`}>
                <p>{data.description}</p>
              </div>
            </div>
      <div className={`${styles.buttonSet}`}>
       {state.showEdit && <button variant="primary" style={{backgroundColor: '#ffff',
        border: 'none'}}  onClick={() => dispatch({type:"toggleEdit"})}>
            <img className={`${styles.imgButton}`} src={Edit} alt="Chatbutton" /> 
        </button>}
       {state.showEditButtons && <div style={{position: 'fixed', top:'90%', width:'60%', left:'72%'}}>
           <button onClick={() => setModalShow(true)} style={{padding:'1rem', backgroundColor:'#142157', width:'140px', height:'52px', fontSize:'14px', fontWeight:'400', borderRadius:'3rem', lineHeight:'20px', color:'white'}}>ADD</button>
           <button style={{padding:'1rem', backgroundColor:'#F14281', width:'140px', height:'52px', fontSize:'14px', fontWeight:'400', borderRadius:'3rem', lineHeight:'20px', color:'white', marginLeft:'10px', border:'none'}} onClick={() => dispatch({type:"closeEdit"})} >SAVE</button>
        </div> }
       <ModalWork show={modalShow} onHide={() => setModalShow(false)}/>
      <UpdateWork show={updateShow} onHide={() => setUpdateShow(false)} id={id}/>
       </div>
           </div>
        
      
    </div>
  )
}
