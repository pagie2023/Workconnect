import React, { useState } from 'react'
import {Button, Modal, Form, CloseButton} from 'react-bootstrap'
import styles from '../Education/Education.module.css'
import axios from 'axios';
import { useEffect } from 'react';

function UpdateEducation(props) {

    // console.log(props.id.id)
  const [grade, setGrade] = useState('');
  const [institution, setInstitution] = useState('');
  const [init_year, setInitYear] = useState('');
  const [dateFin, setDateFin] = useState('');
  const [study, setStudy] = useState('');
  const [stillStudying, setStillStudying] = useState(false);
  const [id, setId] = useState(0)
  const [user_id, setUserId] = useState(0)

  const putEducation = () =>{
    axios.put(`http://127.0.0.1:8000/accounts/api/education/${props.id.id}`,{ 
        grade: grade,   
        init_year : init_year, 
        institution : institution, 
        study : study, 
        still_studying : stillStudying})
        .then((resp) => console.log('actualizado'))
        .catch((error) => console.log(error))
  }  
  // useEffect(()=>{setId(props.id), setUserId(props.user_id)},[props])

  return (
    <div>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <CloseButton style={{position:'relative', top:'-3rem', left:'55rem'}} onClick={props.onHide} variant='white' />
        <Modal.Header style={{margin: 'auto', borderBottom:'none'}}>
          <Modal.Title style={{color: '#107ACC'}} id="contained-modal-title-vcenter">
            Update Education
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form onSubmit={()=>{putEducation()}}>
            <div className={`${styles.inputWork}`}>
                <Form.Group style={{width: '100%'}} className="mb-3" controlId="formBasicEmail">
                    <Form.Label style={{fontWeight: '500', paddingLeft: '5px'}}>Carrer</Form.Label>
                    <Form.Control style={{width: '90%', borderRadius: '1rem'}} type="text" onChange={(e) => {setGrade(e.target.value)}} placeholder={props.id.title}/>
                </Form.Group>
                <Form.Group style={{width: '100%'}} className="mb-3" controlId="formBasicPassword">
                    <Form.Label style={{fontWeight: '500', paddingLeft: '5px'}}>Degree</Form.Label>
                    <Form.Control style={{paddingLeft:'20px', width: '90%', borderRadius: '1rem'}} type="text" onChange={(e) => {setInstitution(e.target.value)}} placeholder={props.id.subtitle}/>
                </Form.Group>
            </div>
            <Form.Group>
                <Form.Label style={{fontWeight: '500', paddingLeft: '5px', marginTop:'1rem'}}>Institution</Form.Label>
                <Form.Control as="textarea" style={{paddingLeft:'20px', width: '100%', height:'86px', borderRadius: '1rem'}} type="number" onChange={(e) => {setStudy(e.target.value)}} placeholder={props.id.text}/>
            </Form.Group>
            <div className={`${styles.inputJobs}`}>
                <Form.Label style={{fontWeight: '500', paddingLeft: '5px', marginTop:'1rem'}}>From</Form.Label>
                <Form.Select style={{width: '13%', padding:'8px', borderRadius:'1rem', marginLeft:'10px'}} aria-label="Default select example" onChange={(e) => {setInitYear(e.target.value)}}>
                    <option>Select</option>
                    <option>2022</option>
                    <option>2021</option>
                    <option>2020</option>
                    <option>2019</option>
                    <option>2018</option>
                    <option>2017</option>
                    <option>2016</option>
                </Form.Select>
                <Form.Label style={{fontWeight: '500', paddingLeft: '5px'}}>Until</Form.Label>
                <Form.Select style={{width: '13%', padding:'8px', borderRadius:'1rem', marginLeft:'10px'}} aria-label="Default select example" onChange={(e) => {setDateFin(e.target.value)}}>
                    <option>Select</option>
                    <option>2022</option>
                    <option>2021</option>
                    <option>2020</option>
                    <option>2019</option>
                    <option>2018</option>
                </Form.Select>
                <Form.Group style={{marginLeft:'10px'}} controlId="formBasicCheckbox">
                  {/* {props.id.stillStudyin ?  
                  <Form.Check checked={stillStudyin} type="switch" label="Still Working" onChange={() => {setStillStudyin(true)}} onClick={() => setStillStudyin((c)=>!c)}/> :
                  <Form.Check type="switch" label="Still Working" onChange={() => {setStillStudyin(true)}}/>} */}
                    <Form.Check type="switch" label="Still Working" onChange={() => {setStillStudying(true)}}/>
                </Form.Group>
            </div>
            <div>
                <Button  style={{padding:'1rem', backgroundColor:'#F14281', width:'160px', height:'52px', fontSize:'14px', fontWeight:'400', borderRadius:'3rem', lineHeight:'20px', border:'none', margin:'2rem 0' }} 
                type='submit'>UPDATE</Button>
                <Button style={{padding:'1rem', backgroundColor:'white', width:'160px', height:'52px', fontSize:'14px', fontWeight:'400', borderRadius:'3rem', border: '2px solid #F14281', lineHeight:'20px', color:'#F14281', marginLeft:'10px'}} onClick={props.onHide}>CANCEL</Button>
            </div>
        </Form>
        </Modal.Body>
      </Modal>
    </div>
  )
}

export default UpdateEducation
