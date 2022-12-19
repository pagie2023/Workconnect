import React, { useState, useEffect } from 'react'
import {Button, Modal, Form, CloseButton} from 'react-bootstrap'
import styles from '../Work/Work.module.css'
import axios from 'axios'
// import { useDispatch } from 'react-redux'
// import { updateTitle} from '../../../features/WorkFeatures'

function UpdateWork(props) {

  // console.log(props.id)

  const putExp = () =>{
    axios.put(`http://127.0.0.1:8000/accounts/api/experience/${props.id}`,{ 
        assignment: assignment,   
        init_year : init_year, 
        organisation : organisation, 
        end_year : end_year, 
        description : description, 
        still_working : still_workin,  
        end_month : end_month, 
        init_month : init_month})
        .then((resp) => console.log('actualizado'))
        .catch((error) => console.log(error))
  }     
  
  const [assignment, setAsignment] = useState('');
  const [description, setDescription] = useState('');
  const [init_year, setInitYear] = useState('');
  const [end_year, setEndYear] = useState('');
  const [organisation, setOrganisation] = useState('');
  const [still_workin, setStillWorkin] = useState(false);
  const [end_month, setEndMonth] = useState('Apr')
  const [init_month, setInitMonth] = useState('Aug')
  const [id, setId] = useState(0)
  // useEffect(()=>{setId(props.id)},[id])
  // console.log(id)

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
            Update Work Experience
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form onSubmit={()=>{putExp()}}>
            <div className={`${styles.inputWork}`}>
                <Form.Group style={{width: '100%'}} className="mb-3" controlId="formBasicEmail">
                    <Form.Label style={{fontWeight: '500', paddingLeft: '5px'}}>Company</Form.Label>
                    <Form.Control style={{width: '90%', borderRadius: '1rem'}} type="text" onChange={(e) => {setAsignment(e.target.value)}} />
                </Form.Group>
                <Form.Group style={{width: '100%'}} className="mb-3" controlId="formBasicPassword">
                    <Form.Label style={{fontWeight: '500', paddingLeft: '5px'}}>Assignment(s)</Form.Label>
                    <Form.Label style={{fontWeight: '300'}}>(Seperate with comma)</Form.Label>
                    <Form.Control style={{paddingLeft:'20px', width: '90%', borderRadius: '1rem'}} type="text" onChange={(e) => {setOrganisation(e.target.value)}}/>
                </Form.Group>
            </div>
            <Form.Group>
                <Form.Label style={{fontWeight: '500', paddingLeft: '5px', marginTop:'1rem'}}>Job description</Form.Label>
                <Form.Control as="textarea" style={{paddingLeft:'20px', width: '100%', height:'86px', borderRadius: '1rem'}} type="number" onChange={(e) => {setDescription(e.target.value)}}/>
            </Form.Group>
            <div className={`${styles.inputJobs}`}>
                <Form.Label style={{fontWeight: '500', paddingLeft: '5px', marginTop:'1rem'}}>From</Form.Label>
                <Form.Select style={{width: '13%', padding:'8px', borderRadius:'1rem', marginLeft:'10px'}} aria-label="Default select example" onChange={(e) => {setInitYear(e.target.value)}}>
                    <option>Select</option>
                    <option>2020</option>
                    <option>2019</option>
                    <option>2018</option>
                    <option>2017</option>
                    <option>2016</option>
                </Form.Select>
                <Form.Label style={{fontWeight: '500', paddingLeft: '5px'}}>Until</Form.Label>
                <Form.Select style={{width: '13%', padding:'8px', borderRadius:'1rem', marginLeft:'10px'}} aria-label="Default select example" onChange={(e) => {setEndYear(e.target.value)}}>
                    <option>Select</option>
                    <option>2022</option>
                    <option>2021</option>
                    <option>2020</option>
                    <option>2019</option>
                    <option>2018</option>
                </Form.Select>
                <Form.Group style={{marginLeft:'10px'}} controlId="formBasicCheckbox">
                    <Form.Check type="switch" label="Still Working" onChange={() => {setStillWorkin(true)}}/>
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

export default UpdateWork
