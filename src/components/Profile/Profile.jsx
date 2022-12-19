import { useReducer, useState, useEffect } from 'react'
import { Modal, Button, Form } from 'react-bootstrap'
// import { dataUser } from '../../helpers/dataUser'
import Edit from '../../assets/Profile/Edit.svg'
import styles from './Profile.module.css'
import PersonalDataModal from './PersonalDataModal'
import axios from 'axios'
import phone from '../../assets/Profile/phone.svg'
import mail from '../../assets/Profile/mail.svg'
import website from '../../assets/Profile/website.svg'
import linkedln from '../../assets/Profile/linkedin.svg'
// =======
// import PersonalDataModal, { objetoUser } from './PersonalDataModal'
// import phone from '../../assets/Profile/phone.svg'
// import mail from '../../assets/Profile/mail.svg'
// import website from '../../assets/Profile/website.svg'
// import linkedin from '../../assets/Profile/Linkedin.svg'
// >>>>>>> refs/remotes/origin/master

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

const Profile = () => {

  const [modalShow, setModalShow] = useState(false);
  const [state, dispatch] = useReducer(reducer, {showEditIcons: false, showEdit: true, showEditButtons: false })

  const [user, setUser] = useState([])
  const getUsers = async () => {
    try{
       const response = await axios.get('http://127.0.0.1:8000/accounts/api/user/')
            .then(resp => setUser(resp.data.Users.find((i)=> i.id == 1)))
            .catch(err => console.log(err))
    } catch(err){
        console.log(err)
    }
  }

  const [profile, setProfile] = useState([])
  // console.log(profile)
  const getProfiles = async () => {
    try{
       const response = await axios.get('http://127.0.0.1:8000/accounts/api/profile/')
            .then(resp => setProfile(resp.data.Profiles.find((i)=> i.id == 1)))
            .catch(err => console.log(err))
    } catch(err){
        console.log(err)
    }
  }

  useEffect(()=>{
    getUsers();
    getProfiles();
  },[])

  return (
    <div style={{width:'100%'}}>
      <div className={ `${ styles.userCard }` } style={ { backgroundColor: '#FFFF' } } >
          <div className={ `text-start card-header ${ styles.userCardHeader_modifier }` }>
              <p className={`${ styles.userName }`}>
                  { user.username} {user.last_name }
              </p>

                <div className={`${styles.buttonSet}`}>

                  {
                    state.showEdit && 
                    
                    <Button 
                      className={ styles.buttonWrapper } 
                      variant="primary" 
                      onClick={() => setModalShow(true)}
                    >
                        <span className='me-2'>Edit</span>
                        <img className = {`${ styles.imgButton }`} src = { Edit } alt="Edit Button" /> 
                    </Button>
                  }

                    <PersonalDataModal show = { modalShow } onHide={ () => setModalShow(false) }/>
                    
                </div>

          </div>
          {/* <div className='text-start ms-3 mt-0'>
              <img className={ styles.userCardImage } src={ dataUser[0].user.img } alt="User Image" />
          </div> */}

            <div className={ `${ styles.professionText }` }>
                <p>{user.type}</p>

            </div>

            <div className={`${ styles.divPersonalData }`} >
                <p className={ `${ styles.paragraphPersonalData }` }>
                  Name: 
                  <span className={ `${ styles.spanPersonalData }` }> { user.username}</span>
                </p>
                <p className={ `${ styles.paragraphPersonalData }` }>
                  Last Name: 
                  <span className={ `${ styles.spanPersonalData }` }> { user.last_name }</span>
                </p>
                <p className={ `${ styles.paragraphPersonalData }` }>
                  Company: 
                  <span className={ `${ styles.spanPersonalData }` }> { user.company_name }</span>
                </p>
            </div>
            <hr className={`${ styles.divLine }`}></hr>

          <div className={ `${ styles.contactMainDiv }` }>
            <div className={ `d-flex { styles.contactDiv }` }>
              <img className= { `${ styles.contactIcon }` } src={phone} alt="phone" />
              <p className={`mt-3 ms-4 ${ styles.contactInfo }`}>{ user.phone_number }</p>
            </div>
            <div className={ `d-flex { styles.contactDiv }` }>
              <img className= { `${ styles.contactIcon }` } src={mail} alt="mail" />
              <p className={`mt-3 ms-4 ${ styles.contactInfo }`}>{ user.email }</p>
            </div>
            <div className={ `d-flex { styles.contactDiv }` }>
              <img className= { `${ styles.contactIcon }` } src={website} alt="website" />
              <p className={`mt-3 ms-4 ${ styles.contactInfo }`}>{ user.web_link }</p>
            </div>
            <div className={ `d-flex { styles.contactDiv }` }>
              <img className= { `${ styles.contactIcon }` } src={linkedln} alt="linkedln" />
              <p className={`mt-3 ms-4 ${ styles.contactInfo }`}>{ profile.social_link }</p>

            </div>
          </div>
          <hr className={`${ styles.divLine }`}></hr>

          <div style={{padding:'1rem 2rem'}}>
            <p className={ `${styles.paragraphIntroduction}` }>
            Introduction: <span className={ `${ styles.spanIntroduction }` }>{profile.introduction}</span>
            </p>
          </div>
      </div>
    </div>
  )
}

export default Profile