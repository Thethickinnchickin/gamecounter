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

export default {
  name: 'IndexPage',
  middleware: "auth",
    auth: "guest",
    components: {
    FallGuysButton,
    WarzoneButton,
    NavBar
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

.counterCard {
  height: 60vh;
  width: 20vw;
  background-color: rgba(7, 69, 69, 0.9);
  border-radius: 20px;
  font-family: countach, sans-serif;
  font-weight: bold;
  color: white
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
  font-size: 60px;
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
</style>
