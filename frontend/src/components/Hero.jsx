import React from 'react';
import '../style.css';
import { Link } from 'react-router-dom';

function Hero() {
  return (
    <div className='container' style={{  display:'flex' }}> {/* Add marginTop to accommodate the navbar */}
      <div className='left' style={{
        height: '800px',
        width: '60%',        
      }}></div>
      <div className='right' style={{
        height: '800px',
        width: '40%',
        marginTop:'8%'

      }}><h1 style={{
        fontSize:'3rem',
        marginLeft:'60px',
        marginRight:'40px',
        marginTop:'100px',
        fontWeight:'bolder'
      }}>Make your home a better place to live in</h1>
          {/* <button style={{
            marginLeft:'20%',
            height:'50px',
            width:'60%',
            marginTop:'2%',
            border:'none'

          }}><img src='https://www.transparentpng.com/thumb/google-logo/google-logo-png-icon-free-download-SUF63j.png' style={{
            height:'30px',
            width:'30px'
          }}></img>Continue with google</button> */}
          {/* <p style={{
             marginLeft:'47%',
             marginTop:'5px'
          }}>or</p> */}
          <input type='text' placeholder='enter email' style={{marginLeft:'20%',
            height:'50px',
            width:'60%',
            marginTop:'10%',
            paddingLeft:'5px'
            }}></input>

            <button style={{
                height:'50px',
                width:'60%',
                marginTop:'2%',
                paddingLeft:'5px',
                marginLeft:'20%',
                border:'none',
                backgroundColor:'rgb(0, 117, 98)',
                color:'white',
                fontWeight:'600',
            }} ><Link to='/signup' style={{
              textDecoration:'none'
            }}><p style={{
              color:'white',
              textDecoration:'none',
             marginTop:'10px'
            }}>SignUp with Email</p></Link></button>
            <p style={{
               height:'50px',
               width:'60%',
               marginTop:'2%',
               paddingLeft:'5px',
               marginLeft:'20%',
               fontSize:'12px'
            }}>By signing up, signing in or continuing, I agree to the HomeCraftsMan Terms of Use and acknowledge the HomeCraftsMan Privacy Policy. I agree that Houzz may use my email address for marketing purposes. I can opt out at any time through my settings.</p>
      </div>
    </div>
  );
}

export default Hero;
