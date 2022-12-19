import React, {useState, useEffect} from 'react'
import styles from './chat.module.css'
import man from '../../assets/Img/imageman.png'
import woman from '../../assets/Img/imagewoman.png'
import lupa from '../../assets/Img/Search.svg'
import logo from '../../assets/Img/Logo.png'
import send from '../../assets/Img/Send.svg'
import report from '../../assets/Img/Report.svg'
import axios from 'axios'

const  url = 'ws://127.0.0.1:8000/ws/messenger/room/1'
const chatSocket = new WebSocket(url)
console.log(chatSocket)

const Chat = () => {
  const [data, setData] = useState([])
  const [msg, setMsg] = useState([])
  const [username, setUsername] = useState([])
  const [datetime, setDateTime] = useState('')  
    // console.log(msg)

  const sendMsj = () => {
        if (msg.trim() !== "") {
            chatSocket.send(JSON.stringify({ 'message': msg.trim() }))
            setMsg('')
        }
    }
    
    chatSocket.onopen = (e) =>{
    console.log("WS open")
    }
    chatSocket.onmessage = function (msg) {
        console.log(msg)
        const user = 3
        
        setData(JSON.parse(msg.data))
        setMsg(msg.message)
        setUsername(msg.username)
        setDateTime(msg.datetime)
    }
    chatSocket.onclose = function (e){
        console.log(e)
    }

    const [user, setUser] = useState([])
    const getUsers = async () => {
        try{
           const response = await axios.get('http://127.0.0.1:8000/accounts/api/user/')
                .then(resp => setUser(resp.data.Users.find((i)=>i.id == 1)))
                .catch(err => console.log(err))
        } catch(err){
            console.log(err)
        }
      }
    
    const [dataRooms, setDataRooms] = useState([])
    // console.log(dataRooms)
    const getRooms = async () => {
      try{
         const response = await axios.get('http://127.0.0.1:8000/messenger/api/')
              .then(resp => setDataRooms(resp.data.rooms))
              .catch(err => console.log(err))
      } catch(err){
          console.log(err)
      }
      
    }

    const [inbox, setInbox] = useState([])

    // let dates = [{}]
    // let date = inbox.forEach((i)=> dates.push(i.created_at.slice(0,10), i.id))
    // console.log(dates)
    const getInbox = async () => {
        try{
           const response = await axios.get('http://127.0.0.1:8000/messenger/api/message/')
                .then(resp => setInbox(resp.data.messages))
                .catch(err => console.log(err))
        } catch(err){
            console.log(err)
        }
        
      }

    useEffect(()=>{
      getRooms();
      getUsers();
      getInbox();
      
    },[])
  return (
    <div className={styles.flex}>
        <div className={styles.divOne}>
            <div className={styles.title}>
                <p>Messages</p>
            </div>
            <div className={styles.search}>
                <input className={styles.inputMessage} type="text" placeholder='Search in messages' />
                <img src={lupa} alt="" className={styles.buscar} />
            </div>
            <div style={{backgroundColor:'white', boxShadow: '4px 4px 16px rgba(0, 0, 0, 0.06)', 
                         overflow:'scroll'}}>
                {dataRooms.map((room) => (
                    <div className={styles.flexMessages} key={room.id}> 
                        {/* <div>
                            <img src={man} alt="" className={styles.image} />
                        </div> */}
                        <div style={{width:'100%'}}>
                        <div className={styles.flexName}>
                            <p className={styles.name}>{user.username}</p>
                            <p className={styles.date}>{room.messages.at(-1).created_at}</p>
                        </div>
                        <div>
                            <p className={styles.message}>{room.messages.at(-1).content}</p>
                        </div>
                    </div>
                </div>
                ))} 
            </div>
        </div>


        <div className={styles.divTwo}>
            <div className={styles.flex}>
                <img src={woman} alt="" className={styles.image} />
                <p>{user.username}</p>
            </div>
            <div>
                <div>
                    {inbox.map((i) => (
                        i.user_id == 1 ?
                        <div className={styles.message} key={i.id}>
                        <p className={styles.one}>{i.content}</p>
                        <p className={styles.two}>{i.created_at}</p>
                        </div> :
                        <div className={styles.messageWhite} key={i.id}>
                        <p className={styles.one}>{i.content}</p>
                        <p className={styles.two}>{i.created_at}</p>
                    </div>))}
                </div>
                <div className={styles.divInput}>
                    <input className={styles.inputTwo} type="text" onChange={(e)=>{setMsg(e.target.value)}} />
                    <button onClick={sendMsj} style={{background:'none', border:'none'}}><img src={send} alt="" className={styles.image} /></button>
                </div>
            </div>
        </div>

        {/* <div className={styles.flexColumn}>
            <div className={styles.divThree}>
                <div className={styles.divImg}>
                    <img src={woman} alt="" className={styles.image} />
                </div>
                <div className={styles.divName}>
                    <p className={styles.name}>{user.username}</p>
                    <p className={styles.job}>{user.email}</p>
                </div>
                <div className={styles.divLogo}>
                    <img src={logo} alt="" className={styles.logo} />
                </div>
                <div className={styles.divButton}>
                    <button>VIEW PROFILE</button>
                </div>
            </div>
            <br />
            <div className={styles.flex}>
                <img src={report} alt="" />
                <a href='#'>Report abuse of scam</a>
            </div>
        </div> */}
        
    </div>
  )

}
export default Chat