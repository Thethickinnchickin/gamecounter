<template>

    
    <div class="App">
      <div v-if="$auth.$state.loggedIn">
        <div class="App-header">
          
          <div class='row'>
            <div id="warzone" class='col'>

           

              <div class='counterCard'>
                <div class='cardBody'></div>
                  <div id="card-header">Warzone Victories</div>
                  <div id='body'>
                    
                    
                    <div class="waviy">
                      <p class="pt-3">Fall 2021</p>
                      <span style='--i :1'>{{warzoneFall2021}}</span>
                    </div>
                    <div class="waviy">
                      <p>Spring 2022</p>
                      <span style='--i :1'>{{warzoneSpring2022}}</span>
                    </div>
                    <div class="waviy">
                      <p>Fall 2022</p>
                      <span style='--i :1'>{{warzoneFall2022}}</span>
                    </div>
                    <div class="mt-5"  @click="addPoint('warzone')">
                      <WarzoneButton/>
                    </div>
                    
                    
                  </div>
                  
              </div>
            </div>
            <div class="col mt-5 pt-5"  id="HOF">
              
              <div id="card-header-names" class="">GamerTag HOF</div>
              <div class="america">
                AMERICA!
              </div>
                <div id="body-HOF" class="mt-5 pt-5">
                  <div class="counterCard-names">
                    <div class="pt-3 ml-4" >
                      <TypingDiv />
                    </div>
                  </div>
                </div>
              </div>
            <div id="fallguys" class='col'>

            <div class='counterCard-fall'>
                <div class='cardBody'></div>
                  <div id="card-header-fall">Fall Guys Victories</div>
                  <div id='body'>
                    <div class="waviy">
                      <p class="pt-3">Fall 2022</p>
                      <span style='--i :1'>{{fallGuysFall2022}}</span>
    

                    </div>
                    <div class="mt-5" @click="addPoint('fallguys')">
                        <FallGuysButton/>
                    </div>
                    
                    
                  </div>
                  
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-else>
        
        <div id="login" class="col">
          <div class='counterCardLogin'>
                  <div class='cardBody'></div>
                    <div id="card-header-login" >Come on in</div>
                    <div id='body-login'>
                      
                      <form @submit.prevent="userLogin" class="mt-4">
                          <div class="a-box a-spacing-extra-large">
                              <div class="a-box-inner">
                                  <h1 class="a-spacing-small">Login Better Be Correct...</h1>

                                  <!--- Your Email --->
                                  <div class="a-row a-spacing-base">
                                      <label for="email" class="a-form-label">User Name</label>
                                      <input v-model="username" type="text" name="email"
                                          id="email" 
                                          class="a-input-text form-control auth-authofocus auth-required-field auth-contact-verification-request-info" >
                                  </div>
                                  <!--- Your Password --->
                                  <div class="a-row a-spacing-base">
                                      <label for="password" class="a-form-label">Password</label>
                                      <input v-model="password" name="password" type="password"
                                          id="password" 
                                          class="a-input-text form-control auth-authofocus auth-required-field auth-contact-verification-request-info" >
                                  </div>
                                  <!---- Button --->
                                  <div class="a-row a-spacing-extra-large mb-4">
                                      <div class="a-row a-spacing-extra-large mb-4">
                                          <span class="mt-5">
                                            <button type="submit" class="button-49 mt-5" role="button">Login</button>
                                          </span>
                                      </div>
                                  </div>
                                  <hr>

                              </div>
                          </div>
                      </form>
                    </div>
                    
                </div>        
        </div>

      </div>
      <NavBar v-if="$auth.$state.loggedIn" />

    </div>

  
</template>

<script>
import FallGuysButton from '../components/FallGuysButton.vue'
import WarzoneButton from '../components/WarzoneButton.vue'
import NavBar from '../components/NavBar.vue'
import TypingDiv from '../components/typingDiv.vue'

export default {
  name: 'IndexPage',
  middleware: "auth",
    auth: "guest",
    components: {
    FallGuysButton,
    WarzoneButton,
    NavBar,
    TypingDiv
},
    async asyncData({$axios}) {
      let response = await $axios.$get('http://localhost:7000/icenarc/points');
      let warzoneFall2021;
      let warzoneSpring2022;
      let warzoneFall2022;
      let fallGuysFall2022;
      for(let season of response.points[0].warzone) {
        switch(season.name) {
          case 'Fall, 2021': 
            warzoneFall2021 = season.wins;
            break;
          case 'Spring, 2022': 
            warzoneSpring2022 = season.wins;
            break;
          case 'Fall, 2022': 
            warzoneFall2022 = season.wins;
            break;
          default:
            break;
        }

      }
      for(let season of response.points[0].fallguys) {
        if(season.name === 'Fall Guys, 2022') {
          fallGuysFall2022 = season.wins
        }
      }
      
      return {
        warzoneFall2021,
        warzoneSpring2022,
        warzoneFall2022,
        fallGuysFall2022
      }
    },  
    data() {
        return {
            username: '',
            password: ''                
        }

    },
    methods: {
        async userLogin() {
            try {

                let response = await this.$auth.loginWith('local',
                 {data: {username: this.username, password: this.password}})
                
                

                this.$router.push("/");                   

            } catch (err) {
                window.location.replace("https://planet-randy.com/blog/en/erstes-mal-schwuler-sex/");
                console.log(err)
                return
            }
        },
        async addPoint(pointType) {
          if(pointType === "fallguys") {
            let response = await this.$axios.$post('http://localhost:7000/icenarc/addpoint', {pointType: "fallguys"})
            let newPoints = response.wins
            await this.$router.push(`/victoryCelebration/${newPoints}`)
          } else {
            let response = await this.$axios.$post('http://localhost:7000/icenarc/addpoint', {pointType: "warzone"})

            let newPoints = response.wins
            await this.$router.push(`/victoryCelebration/${newPoints}`)
          }
        }
    }
}
</script>



<style scoped>
.App {
  text-align: center;
  overflow-y: hidden;
}

.App-logo {
  height: 40vmin;
  pointer-events: none;
}

.App-header {
  background-color: #282c34;
  min-height: 100vh;
  display: flex;
  flex-direction: column;

  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: navy;
}

#warzone {
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-image: url(static/images/rebirth.jpeg);
}

#login {
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-image: radial-gradient(circle farthest-side, #fceabb, #f8b500);
}
#fallguys {
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-image: url(static/images/fallguys.jpg);
}

.App-link {
  color: #61dafb;
}

#button {
  border: 2px solid white;
  color: white;
}

#card-header {
  border-bottom: 10px solid white;
}

#card-header-fall {
  background-color: pink;
  color: black;
  border-bottom: 10px solid white;
  border-radius: 20px 20px 0 0;
}

#card-header-login {
  background-color: rgb(8, 2, 75);
  color: rgb(209, 103, 4);
  border-bottom: 10px solid white;
  border-radius: 20px 20px 0 0;
}
#card-header-names {
  margin-top: 50px;
  font-family: impact, sans-serif;
  font-style: italic;
  color: white;
  background-color: black;
  border-radius: 20px;
  font-size: 60px;
}
.america {
  margin-top: 150px;
  margin-bottom: 0;
  font-family: impact, sans-serif;
  font-style: italic;
  color: white;
  border-radius: 50px;
  font-size: 100px;
}

.counterCard {
  height: 50vh;
  width: 20vw;
  background-color: rgba(7, 69, 69, 0.9);
  border-radius: 20px;
  font-family: countach, sans-serif;
  font-weight: bold;
  color: white
}
.counterCard-names {
  height: 15vh;
  width: 20vw;
  background-color: none;
  border-radius: 20px;
  font-family: countach, sans-serif;
  font-weight: bold;
  color: white;
  z-index: 1;
  margin-bottom:225px;
  
}

.counterCard-fall {
  height: 35vh;
  width: 20vw;
  background-color: rgba(7, 69, 69, 0.9);
  border-radius: 20px;
  font-family: countach, sans-serif;
  font-weight: bold;
  color: white
}


p {
  font-size: 25px;
}
.counterCardLogin {
  height: 50vh;
  width: 20vw;
  background-color: rgba(7, 69, 69, 0.9);
  border-radius: 20px;
  font-family: countach, sans-serif;
  font-weight: bold;
  color: white
}

.cardBody {
  display: flex;
  justify-content: center;
  margin:auto;
  font-family: countach;
  font-style: bold, italic;
  font-weight: 300;
  color: white
}

.waviy {
  position: relative;
  -webkit-box-reflect: below -20px linear-gradient(transparent, rgba(0,0,0,.2));
  font-size: 30px;
}
.waviy span {
  position: relative;
  display: inline-block;
  color: #fff;
  text-transform: uppercase;
  animation: waviy 1s infinite;
  animation-delay: calc(.1s * var(--i));
  color: gold;
}

#body {
  background-color:  #151719;
  justify-content: center;
  height: 100%;
  border-radius: 20px;
}
@keyframes waviy {
  0%,40%,100% {
    transform: translateY(0)
  }
  20% {
    transform: translateY(-20px)
  }
}
/* CSS */
.button-49,
.button-49:after {
  width: 150px;
  height: 76px;
  line-height: 78px;
  font-size: 20px;
  font-family: 'Bebas Neue', sans-serif;
  background: linear-gradient(45deg, transparent 5%, #FF013C 5%);
  border: 0;
  color: #fff;
  letter-spacing: 3px;
  box-shadow: 6px 0px 0px #00E6F6;
  outline: transparent;
  position: relative;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
}

.button-49:after {
  --slice-0: inset(50% 50% 50% 50%);
  --slice-1: inset(80% -6px 0 0);
  --slice-2: inset(50% -6px 30% 0);
  --slice-3: inset(10% -6px 85% 0);
  --slice-4: inset(40% -6px 43% 0);
  --slice-5: inset(80% -6px 5% 0);
  
  content: 'ALTERNATE TEXT';
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(45deg, transparent 3%, #00E6F6 3%, #00E6F6 5%, #FF013C 5%);
  text-shadow: -3px -3px 0px #F8F005, 3px 3px 0px #00E6F6;
  clip-path: var(--slice-0);
}

.button-49:hover:after {
  animation: 1s glitch;
  animation-timing-function: steps(2, end);
}

@keyframes glitch {
  0% {
    clip-path: var(--slice-1);
    transform: translate(-20px, -10px);
  }
  10% {
    clip-path: var(--slice-3);
    transform: translate(10px, 10px);
  }
  20% {
    clip-path: var(--slice-1);
    transform: translate(-10px, 10px);
  }
  30% {
    clip-path: var(--slice-3);
    transform: translate(0px, 5px);
  }
  40% {
    clip-path: var(--slice-2);
    transform: translate(-5px, 0px);
  }
  50% {
    clip-path: var(--slice-3);
    transform: translate(5px, 0px);
  }
  60% {
    clip-path: var(--slice-4);
    transform: translate(5px, 10px);
  }
  70% {
    clip-path: var(--slice-2);
    transform: translate(-10px, 10px);
  }
  80% {
    clip-path: var(--slice-5);
    transform: translate(20px, -10px);
  }
  90% {
    clip-path: var(--slice-1);
    transform: translate(-10px, 0px);
  }
  100% {
    clip-path: var(--slice-1);
    transform: translate(0);
  }
}

@media (min-width: 768px) {
  .button-49,
  .button-49:after {
    width: 200px;
    height: 86px;
    line-height: 88px;
  }
}

#HOF{
    box-sizing: border-box;

    --black :#1a1c20 ;
    --white : #fff ;
    --green : #00c380 ;
    --d-green : #019b66 ;
    --gray : #c1c1c1 ;
    --l-gray: #c4c4c4 ;
    --m-gray : #373838 ;
    --d-gray : #282724 ;
    --d-blue: #202428 ;
    --orange : #ef6206 ; 
    --yellow : #dfa500 ;
    --l-yellow: #deb953;
    --light: #fbfbfb ;
    --n-road : -4em;
    --p-road : 7em;

    background-color: var(--green) ;


}

#HOF,
#HOF::before,
#HOF::after{

    box-sizing: inherit ;

}

#body-HOF::before,
#body-HOF::after {

    content: " " ;
    position: absolute ;

}

#body-HOF{

    margin-top: 100px ;
    height: auto ;
    display: flex ;
    overflow: hidden ;
    position: relative ;
    align-items: center ;
    justify-content: center ;
    background-repeat: no-repeat ;
    animation: car 3.5s cubic-bezier(0.57, 0.63, 0.49, 0.65) infinite ;


    background-image : 


    /* ===rubber-l */ 

        radial-gradient(circle at 49% 117%, var(--black) 37%, transparent 38%) ,
        radial-gradient(circle at -24% 50%, var(--white) 31%, transparent 49%) ,
        radial-gradient(2.95em 2.5em at 52% 1.2%, var(--black) 37%, transparent 38%) ,
        radial-gradient(2.95em 2.5em at 52% 1.2%, var(--black) 37%, transparent 38%) ,
        linear-gradient(var(--black) 100%, transparent 0) ,

    /* rubber-l=== */ 

    
    /* ===rubber-r */ 

        radial-gradient(circle at 49% 117%, var(--black) 37%, transparent 38%) ,
        radial-gradient(circle at 124% 50%, var(--white) 31%, transparent 49%) ,
        radial-gradient(2.95em 2.5em at 48% 1.2%, var(--black) 37%, transparent 38%) ,
        radial-gradient(2.95em 2.5em at 48% 1.2%, var(--black) 37%, transparent 38%) ,
        linear-gradient(var(--black) 100%, transparent 0) ,

    /* rubber-r=== */ 


    /* ===shadow */ 

        linear-gradient( var(--d-green) 100% , transparent 0) ;

    /* shadow=== */


    background-size : 


    /* ===rubber-l */ 

        2.5em 2.5em ,
        0.7em 0.6em ,
        2.5em .9em ,
        2.5em .9em ,
        1.95em 3.9em ,

    /* rubber-l=== */


    /* ===rubber-r */ 

        2.5em 2.5em ,
        0.7em 0.6em ,
        2.5em .9em ,
        2.5em .9em ,
        1.95em 3.9em ,

    /* rubber-r=== */ 


    /* ===shadow */ 

        13em .9em ;

    /* shadow=== */

   
    background-position : 


    /* ===rubber-l */ 

        calc(50% - 6.4em) calc(50% - 1.7em) ,
        calc(50% - 5.26em) calc(50% - -3.4em) ,
        calc(50% - 6.5em) calc(50% - -3.8em) ,
        calc(50% - 4.3em) calc(50% - -3.2em) ,
        calc(50% - 6.58em) calc(50% - -1.5em) ,

    /* rubber-l=== */ 

    
    /* ===rubber-r */ 

        calc(50% - -6.45em) calc(50% - 1.7em) ,
        calc(50% - -5.26em) calc(50% - -3.4em) ,
        calc(50% - -6.5em) calc(50% - -3.8em) ,
        calc(50% - -4.3em) calc(50% - -3.2em) ,
        calc(50% - -6.58em) calc(50% - -1.5em) ,

    /* rubber-r=== */ 


    /* ===shadow */ 

        center calc(50% - -3.8em) ;

    /* shadow=== */


}



#body-HOF::before{
    
    width: 100% ;
    height: 62.9em ;
    top: calc(50% - 26.2em) ;
    background-size: 24.6% 491% ;
    background-repeat: no-repeat ;
    background-position: center 0 ;
    animation: line 1.5s infinite linear, move-road 3.5s infinite linear ;
    transform: perspective(311px) rotateX(83deg) translate3d(var(--n-road) ,-11.975em, 0) ;
    background-image: repeating-linear-gradient(to top, var(--white) , var(--white) 4.6%, transparent 0 , transparent 13.01%) ;

}





#body-HOF::after{

    width: 15.2em ;
    height: 13.2em ;
    top: calc(50% - 8.8em) ;
    left: calc(50% - 7.55em) ;
    background-repeat: no-repeat ;
    animation: light 1s linear infinite,  shake 3.5s linear infinite ;  
    


    background-image : 

    /* ===ceiling */ 

        radial-gradient(58em 20em at 50% 215% , transparent 20% , var(--white) 20.5% , var(--white) 20.8% , var(--green) 21.5%) ,

    /* ceiling=== */


    /* ===antenna */ 

        radial-gradient( circle at center 100% , var(--black)  30% , transparent 0) ,

    /* antenna=== */
    
    
    /* ===antenna */ 

        linear-gradient(var(--white) 100% , transparent 0) ,

    /* antenna=== */


    /* ===glass-l */ 

        radial-gradient( 17.8em 37em at 70% 240% , var(--black) 30% , transparent 30.5%) ,

    /* glass-l=== */


    /* ===glass-r */ 

        radial-gradient( 17.8em 37em at 31% 240% , var(--black) 30% , transparent 30.5%) ,

    /* glass-r=== */


    /* ===light */ 

        radial-gradient( circle , var(--light) 48% ,  var(--black) 52%, var(--black) 59% , transparent 62%) ,

    /* light=== */


    /* ===light */ 

        radial-gradient( circle , var(--light) 48% ,  var(--black) 52%, var(--black) 59% , transparent 62%) ,

    /* light=== */


    /* ===hood-ro */ 

        radial-gradient( 1em 1em at 102% 100% ,   var(--m-gray)  28%, #f3f3f3 30% ) ,

    /* hood-ro=== */


    /* ===hood-ro */ 

        radial-gradient( 1em 1em at 97% -7% ,  var(--m-gray)  28%, var(--l-gray)  30% ) ,

    /* hood-ro=== */


    /* ===hood-ro */ 

        radial-gradient( 1em 1em at -6% 102% ,  var(--m-gray)  28%, #efefef 30% ) ,

    /* hood-ro=== */


    /* ===hood-ro */ 

        radial-gradient( 1em 1em at -6% -1% ,  var(--m-gray)  28%, var(--l-gray)  30% ) ,

    /* hood-ro=== */


    /* ===hood-f */ 

        linear-gradient( to top , var(--m-gray) 50% ,  var(--d-gray) 0, var(--d-gray) 58% , var(--m-gray) 0) ,

    /* hood-f=== */


    /* ===hood-e */ 

        linear-gradient( to top , var(--l-gray) 30% , var(--white) 100% , transparent 0) ,

    /* hood-e=== */


    /* ===hood-l */ 

        radial-gradient( 16.4em 30.1em at 209% 333% , var(--white)  30% , transparent 30.2%) ,

    /* hood-l=== */


    /* ===hood-r */ 

        radial-gradient( 16.4em 30.1em at -109% 333% , var(--white) 30% , transparent 30.2%) ,

    /* hood-r=== */


    /* ===hood-o */ 

        linear-gradient(  var(--gray) 100% , transparent 0) ,

    /* hood-o=== */


    /* ===hood */ 

        linear-gradient( var(--white) 100% , transparent 0) ,

    /* hood=== */


    /* ===mirror */ 

        radial-gradient( 6.7em 2.5em at 154% 8% , var(--black) 30% , transparent 33%) ,

    /* mirror=== */


    /* ===mirror */ 

        radial-gradient( 6.7em 2.5em at -53% 8% , var(--black) 30% , transparent 33%) ,

    /* mirror=== */


    /* ===guide-l */ 

        linear-gradient( var(--orange) 100% , transparent 0) ,

    /* guide-l=== */


    /* ===guide-r */ 

        linear-gradient( var(--orange) 100% , transparent 0) ,

    /* guide-r=== */


    /* ===plaque */ 

        linear-gradient( var(--yellow) 100% , transparent 0) ,

    /* plaque=== */

    
    /* ===plaque */ 

        linear-gradient( var(--l-yellow) 100% , transparent 0) ,

    /* plaque=== */


    /* ===bumper */ 

        linear-gradient( var(--d-blue) 100% , transparent 0) ,

    /* bumper=== */


    /* ===bumper-l */ 

        radial-gradient( circle at 124% 39% , var(--d-blue) 60% , transparent 64%) ,

    /* bumper-l=== */


    /* ===bumper-r */ 

        radial-gradient( circle at -44% 39% , var(--d-blue) 60% , transparent 64%) ,

    /* bumper-r=== */


    /* ===bumper-d */ 

        radial-gradient(13.2em 2em at 50% 59% , var(--l-gray) 96% , transparent 100% ) ,

    /* bumper-d=== */
 
 
    /* ===bumper-l */ 
 
        radial-gradient( 1.6em 1.6em at 75% -9% , var(--l-gray) 60% , transparent 64%) ,

    /* bumper-l=== */


    /* ===bumper-r */ 
 
        radial-gradient( 1.6em 1.6em at 15% -9% , var(--l-gray) 60% , transparent 64%) ,

    /* bumper-r=== */


    /* ===floor */ 
 
        linear-gradient( var(--d-blue) 100% , transparent 0) ,

    /* floor=== */


    /* ===floor-l */ 

        radial-gradient( 6.9em 4.6em at 295% 3% , var(--d-blue) 30% , transparent 31%) ,

    /* floor-l=== */


    /* ===floor-r */ 

        radial-gradient( 6.9em 4.6em at -189% 3% , var(--d-blue) 30% , transparent 31%) ;

    /* floor-r=== */



    background-size : 

    /*=== ceiling */ 

        61.5% 20% ,

    /* ceiling=== */  


    /* ===antenna */ 

        5% 6% ,

    /* antenna=== */


    /*=== antenna */ 

        .4% 39% ,

    /* antenna=== */


    /* ===glass-l */ 

        60% 30% ,

    /* glass-l=== */


    /* ===glass-r */ 

        60% 30% ,

    /* glass-r=== */


    /* ===light */ 

        16% 16% ,

    /* light=== */


    /* ===light */ 

        16% 16% ,

    /* light=== */


    /* ===hood-ro */ 

        2.4% 2%  ,

    /* hood-ro=== */


    /* ===hood-ro */ 

        2.4% 2.3% ,

    /* hood-ro=== */


    /* ===hood-ro */ 

        2.4% 2.3% ,

    /* hood-ro=== */


    /* ===hood-ro */ 

        2.4% 2.3% ,

    /* hood-ro=== */


    /* ===hood-f */ 

        91% 12%  ,

    /* hood-f=== */


    /* ===hood-e */ 

        93.9% 17% ,

    /* hood-e=== */


    /* ===hood-l */ 

        12% 17.5% ,

    /* hood-l=== */


    /* ===hood-r */ 

        12% 17.5% ,

    /* hood-r=== */


    /* ===hood-o */ 

        38% 1.1% ,

    /* hood-o=== */


    /* ===hood */ 

        77% 25% ,

    /* hood=== */


    /* ===mirror */ 

        9% 30% ,

    /* mirror=== */


    /* ===mirror */ 

        9% 30% ,

    /* mirror=== */


    /* ===guide-l */ 

        8.4% 3% ,

    /* guide-l=== */


    /* ===guide-r */ 

        8.4% 3% ,

    /* guide-r=== */


    /* ===plaque */ 

        33% 6.5% ,

    /* plaque=== */


    /* ===plaque */ 

        36% 9% ,

    /* plaque=== */


    /* ===bumper */ 

        87% 30% ,

    /* bumper=== */


    /* ===bumper-l */ 

        10% 12% ,

    /* bumper-l=== */


    /* ===bumper-r */ 

        10% 12% ,

    /* bumper-r=== */


    /* ===bumper-d */ 

        78% 35% ,

    /* bumper-d=== */


    /* ===bumper-l */ 

        11% 8% ,

    /* bumper-l=== */


    /* ===bumper-r */ 

        11% 8% ,

    /* bumper-r=== */


    /* ===floor */ 

        68%  8% ,

    /* floor=== */


    /* ===floor-l */ 

        5% 7% ,

    /* floor-l=== */


    /* ===floor-r */ 

        5% 7% ;

    /* floor-r=== */


    background-position : 


    /*=== ceiling */ 

        50.5% 0 ,
        
    /* ceiling=== */ 


    /* ===antenna */ 

        90% 37% ,

    /* antenna=== */


    /*=== antenna */ 

        88% 1.2% ,
        
    /* antenna=== */ 


    /* ===glass-l */ 

        0 11.7% ,

    /* glass-l=== */


    /* ===glass-r */ 

        100% 11.7% ,

    /* glass-r=== */   


    /* ===light */ 

        5% 63% ,

    /* light=== */ 


    /* ===light */ 

        95% 63% ,

    /* light=== */ 


    /* ===hood-ro */ 

        4.1% 55.7% ,

    /* hood-ro=== */ 


    /* ===hood-ro */ 

        4.1% 65.9% ,

    /* hood-ro=== */ 


    /* ===hood-ro */ 

        95.8% 55.7% ,

    /* hood-ro=== */ 


    /* ===hood-ro */ 

        95.8% 65.8% ,

    /* hood-ro=== */ 


    /* ===hood-f */ 

        center 62% ,

    /* hood-f=== */ 


    /* ===hood-e */ 

        49% 63.6% ,

    /* hood-e=== */

 

    /* ===hood-l */ 

        3.4% 46.2% ,

    /* hood-l=== */ 


    /* ===hood-r */ 

        96.5% 46.2% ,

    /* hood-r=== */


    /* ===hood-o */ 

        center 40.9% ,

    /* hood-o=== */


    /* ===hood */ 

        center 50.3% ,

    /* hood=== */


    /* ===mirror */ 

        5.7% 48.6% ,

    /* mirror=== */ 


    /* ===mirror */ 

        95% 48.6% ,

    /* mirror=== */


    /* ===guide-l */ 

        5% 75.2% ,

    /* guide-l=== */


    /* ===guide-r */ 

        95% 75.2% ,

    /* guide-r=== */


    /* ===plaque */ 

        51% 86%  ,

    /* plaque=== */


    /* ===plaque */ 

        51.5% 87.3%  ,

    /* plaque=== */


    /* ===bumper */ 

        center 71.9% ,

    /* bumper=== */


    /* ===bumper-l */ 

        -0.8% 77.8% ,

    /* bumper-l=== */


    /* ===bumper-r */ 

        101.7% 77.8% ,

    /* bumper-r=== */


    /* ===bumper-d */ 

        center 80.2% ,

    /* bumper-d=== */


    /* ===bumper-l */ 

        4% 85.9% ,

    /* bumper-l=== */


    /* ===bumper-r */ 

        97% 85.9% ,

    /* bumper-r=== */


    /* ===floor */ 

        center 92.5% ,

    /* floor=== */


    /* ===floor-l */ 

        11.7% 92.6% ,

    /* floor-l=== */


    /* ===floor-r */ 

        88.3% 92.6% ;

    /* floor-r=== */

    
}


@keyframes line{

    100%{

        background-position: center 100% ;

    }

} 


@keyframes car{

    15%, 23%{

        transform: translate3d(-2.3em, 0, 0) ;

    }

    36% , 42%{

        transform: translate3d(-.8em, 0, 0) ;

    }

    61%, 71.5%{

        transform: translate3d(2.8em, 0, 0) ;

    }

    81%, 88%{

        transform: translate3d(1.5em, 0, 0) ;
    }

}

@keyframes move-road {

    5.5%{

        transform: perspective(311px) rotateX(83deg) translate3d(var(--n-road) ,-11.975em, 0) ;

    }

    27%, 51%{

        transform: perspective(311px) rotateX(83deg) translate3d(var(--p-road) ,-11.975em, 0) ;

    }

    73%, 100% {

        transform: perspective(311px) rotateX(83deg) translate3d(var(--n-road) ,-11.975em, 0) ;


    }

}

@keyframes light{

    0% , 37%{

        --light: #fbfbfb ;
    }

    50%{

        --light : #f1f1f1 ;
    }
    
    62%{

        --light : #fbfbfb ;
    }

    65%{

        --light: #f1f1f1 ;

    }

    95%{

        --light: #fbfbfb ;

    }

    100%{

         --light: #f1f1f1 ;

    }

}

@keyframes shake {

    5%, 26%{

        transform:  rotate(-1.5deg) ;

    }

    33%, 41%{

        transform:  rotate(-.5deg) ;

    }

    48%, 69%{

        transform: rotate(1.5deg) ;

    }

    80%, 95%{

        transform:  rotate(.5deg) ;
        
    }

}


@media screen and (max-width: 36em) {
    
    html{

        transform: scale(.5) ;

    }


    body::before{
      
        width: 11em ;
        --n-road: -4em ;
        --p-road: 4em ;
      
    }
    

}

</style>
