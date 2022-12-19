import React, { useState, useEffect } from 'react'
import styles from './CreateNewAccount.module.css'
// import logo from '../../assets/Register/LogoWorkConnect.svg'
import Logo from '../../assets/Login/Logo.svg'
import Vector from '../../assets/Register/Vector.svg'
import Elipse from '../../assets/Register/Elipse.svg'
import { Button } from 'react-bootstrap'
import AccountDataForm from './AccountDataForm' 
import AboutYouForm from './AboutYouForm' // Company
import AboutYouFreeForm from './AboutYouFreeForm' // Freelancer
import AboutYouPersonForm from './AboutYouPersonForm' // Private User
import ProfileDataForm from './ProfileDataForm' // Company
import ProfileDataFyPForm from './ProfileDataFyPForm' // Freelancer & Private User
import { Navigate, useNavigate, NavLink } from 'react-router-dom'
import axios from 'axios'

const CreateNewAccount = ({ companyButton, freelaButton, personButon }) => {

    const [accountData, setAccountData] = useState(true)
    const [aboutYou, setAboutYou] = useState(false)
    const [profileData, setProfileData] = useState(false)
    const [created, setCreated] = useState(false)
    
    const navigateTo = useNavigate();
    
    const handleVerify = () =>{
        created ? postUser() & navigateTo("/usercreated") : console.log('usuario no creado')
    }


    // User
    const [username, setUsername] = useState('')
    const [company, setCompany] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [location, setLocation] = useState('')
    const [phone, setPhone] = useState('')
    const [web, setWeb] = useState('')
    const [kvk, setKvk] = useState('')
    const [type, setType] = useState('')
    const [email, setEmail] = useState('')
    const [province, setProvince] = useState('')
    const [pass, setPass] = useState('')

    const postUser = () => {
        axios.post('http://127.0.0.1:8000/accounts/api/user/',{
            password: pass,
            is_superuser: false,
            username: username,
            company_name: company,
            contact_person: null,
            first_name: firstName,
            last_name: lastName,
            location: location,
            phone_number: phone,
            web_link : web,
            kvk : kvk,
            type: type,
            email: email,
            registration_code: null,
            is_staff: false,
            is_active: true,
            longitude: null,
            latitude: null,
            province: 'bs as',
            subscription_code: null,
            subscription_end_date: null
        })
        .then(resp => console.log('usuario creado'))
        .catch(err => console.log(err))
    }

    return (
        <div className= { styles.mainDiv }>
                <div style={{display:'flex', justifyContent:'flex-end', flexDirection:'column'}}>
                    <div style={{ position: 'absolute', top: '2rem', right: '3rem' }}>
                        <img src={ Elipse } alt="menu" />
                    </div>
                    <div style={{position:'absolute', top: '2.8rem', right:'3.76rem'}}>
                        <img src={ Vector } alt="vector" />
                    </div>

                <div className={ styles.registerCard } style={ freelaButton && aboutYou ? { height: '560px' } : { height: '460px' }  }>
                    <h2 className= { styles.registerTitle }>Create New Account</h2>
                    {/* ⬇️ Acá va la barra de navegación. Probar Router ⬇️ */}
                    <div className={ styles.cardButtonsDiv }>
                        <span
                            onClick={ () => { setAccountData(true); setAboutYou(false); setProfileData(false) } }
                            style={ accountData ? { backgroundColor: '#2898EE', color: 'white', padding: '1rem 2rem', marginLeft: '-1rem', borderRadius: '42px', cursor: 'pointer'} : { color: '#2898EE', padding: '1rem 2.5rem', marginLeft: '-1rem', borderRadius: '42px', cursor: 'pointer'} } 
                            className= ''>
                                <span 
                                style={ accountData ? { border: 'solid', borderRadius: '50%', padding: '0.1rem 0.4rem', marginRight: '0.5rem' } : { border: 'solid #2898EE', borderRadius: '50%', padding: '0.1rem 0.4rem', marginRight: '0.5rem', backgroundColor: '#2898EE', color: '#FFFFFF' } }>
                                    1
                                </span>
                                Account Data
                        </span>
                        <span 
                            onClick={() => { setAccountData(false); setAboutYou(true); setProfileData(false) } }
                            style={ aboutYou ? { backgroundColor: '#2898EE', color: 'white', padding: '1rem ', borderRadius: '42px', position: 'relative', left: '0.75rem', cursor: 'pointer' } : accountData ? {padding: '1rem 3rem', color: '#B3B1B4', borderRadius: '42px', position: 'relative', left: '0.75rem', cursor: 'pointer'} : {padding: '1rem 3rem', color: '#2898EE', borderRadius: '42px', position: 'relative', left: '0.75rem', cursor: 'pointer'} } 
                            className= ''>
                                <span style={ aboutYou ? { border: 'solid', borderRadius: '50%', padding: '0.1rem 0.4rem', marginRight: '0.5rem' } : accountData ? { border: 'solid #B3B1B4', borderRadius: '50%', padding: '0.1rem 0.4rem', marginRight: '0.5rem', backgroundColor: '#B3B1B4', color: '#FFFFFF' } : { border: 'solid #2898EE', borderRadius: '50%', padding: '0.1rem 0.4rem', marginRight: '0.5rem', backgroundColor: '#2898EE', color: '#FFFFFF' } }>
                                    2
                                </span>
                                About You
                        </span>
                        <span 
                            onClick={ () => { setAccountData(false); setAboutYou(false); setProfileData(true) } }
                            style={ profileData ? { backgroundColor: '#2898EE', color: 'white', position: 'relative', left: '1.4rem', borderRadius: '42px' } : {padding: '1rem 3rem', color: '#B3B1B4', cursor: 'pointer', position: 'relative', left: '1.4rem'} }
                            className= ''>
                                <span style={ profileData ? { border: 'solid', borderRadius: '50%', padding: '0.1rem 0.4rem', marginRight: '0.5rem' } : { border: 'solid #B3B1B4', borderRadius: '50%', padding: '0.1rem 0.4rem', marginRight: '0.5rem', backgroundColor: '#B3B1B4', color: '#FFFFFF' } }>
                                    3
                                </span>
                                Profile Data
                        </span>
                    </div>
                    
                    <div className='ms-4 mt-4'>
                        {
                            accountData ? <AccountDataForm setUsername={setUsername} setEmail={setEmail} setPass={setPass} /> : companyButton 
                            && aboutYou ? <AboutYouForm setCompany={setCompany} setPhone={setPhone} setLocation={setLocation} setKvk={setKvk} /> : freelaButton 
                            && aboutYou ? <AboutYouFreeForm setFirstName={setFirstName} setLastName={setLastName} setCompany={setCompany} setPhone={setPhone} setLocation={setLocation} setKvk={setKvk} /> : personButon 
                            && aboutYou ? <AboutYouPersonForm setFirstName={setFirstName} setLastName={setLastName} setPhone={setPhone} setLocation={setLocation} /> : companyButton 
                            && profileData ? <ProfileDataForm setType={setType} setWeb={setWeb} /> : <ProfileDataFyPForm setType={setType} setWeb={setWeb} />
                        }
                    </div>
                    <div className='mb-3' style={ accountData || aboutYou ? { marginTop: '0rem', paddingTop: '2rem', textAlign: 'center'} : { marginTop: '0rem', paddingTop: '0rem', textAlign: 'center'} } >
                        <NavLink to="/register" type="button"
                            style={{padding:'1rem', backgroundColor:'#142157', width:'160px', height:'52px', fontSize:'14px', fontWeight:'400', borderRadius:'3rem', border: 'none', lineHeight:'20px', color:'#FFFFFF', marginRight:'10px', marginLeft: '-1.5rem', textDecoration:'none'}}> 
                            {/* onClick={ () => {props.onHide(); setPersonalData(true); setContactData(false); setSettingsModal(false)}  }> */}
                                CANCEL
                        </NavLink >
                        <Button  
                            onClick= { () => { accountData ?  setAccountData(false) & setAboutYou(true) & setProfileData(false) : aboutYou ? setAccountData(false) & setAboutYou(false) & setProfileData(true) : profileData ? setCreated(true) & handleVerify() : '' } }
                            style={{ padding:'1rem', backgroundColor:'#F14281', width:'160px', height:'52px', fontSize:'14px', fontWeight:'400', border: 'none', borderRadius:'3rem', lineHeight:'20px' }} 
                            type="submit">
                                {
                                    accountData ? 'NEXT' : aboutYou ? 'NEXT' : 'DONE'
                                }
                        </Button>
                    </div>

                    
                </div>
            
            {/* Footer */}
            <div className={`${styles.footer}`} style={{background:'#1870ca'}}>
                    <div className="col-12 d-flex justify-content-center py-4">
                        <img style={{width:'20%'}} src={Logo} alt="logo" />
                    </div>
                    <div className="col-12 d-flex justify-content-center py-3 mb-1">
                        <div style={{borderRight: '1px white solid'}}>
                            <span style={{color: '#f6f6f6', paddingRight: '11px',
                        paddingLeft: '25px', fontSize:'14px'}} 
                        > Privacy Policy</span>
                        </div>
                        <div style={{borderRight: '1px white solid'}}>
                            <span style={{color: '#f6f6f6', paddingRight: '11px',
                            paddingLeft: '15px', fontSize: '14px'}}> Terms of Use</span>
                        </div>
                        <span className="" style={{color: '#f6f6f6', paddingRight: '11px',
                        paddingLeft: '25px', fontSize: '14px'}}>Cookies Policy</span>
                    </div>
                    <div className="row" style={{background:'#00007c', width:'101%'}}>
                        <div className=" text-center text-white " style={{width:'50%', margin:'auto'}}>
                            <p className="my-2" style={{backgroundColor: '#00007c', fontSize:'15px'}}>Copyright © 	2022 WorkConnect 2022. Alle reachten voorbeh ouden</p>
                        </div>
                    </div>
            </div>
        </div>
        </div>
    )
}

export default CreateNewAccount