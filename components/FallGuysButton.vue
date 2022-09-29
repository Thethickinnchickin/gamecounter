<template>
    <div class="buttonbody">
    <span><a href="#"></a></span>
    </div>

</template>

<style scoped>
    
.buttonbody{
  margin: 0;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #151719;
}
span{
  position: relative;
  display: inline-flex;
  width: 180px;
  height: 55px;
  margin: 0 15px;
  perspective: 1000px;
}
span a{
  font-size: 19px;
  letter-spacing: 1px;
  transform-style: preserve-3d;
  transform: translateZ(-25px);
  transition: transform .25s;
  font-family: 'Montserrat', sans-serif;
  
}
span a:before,
span a:after{
  position: absolute;
  content: "Add Win";
  height: 55px;
  width: 180px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 3px solid rgb(7, 151, 218);
  box-sizing: border-box;
  border-radius: 5px;
}
span a:before{
  color: #fff;
  background: rgb(7, 151, 218);
  border: 2px solid pink;
  transform: rotateY(0deg) translateZ(25px);
}
span a:after{
  color:pink;
  transform: rotateX(90deg) translateZ(25px);
}
span a:hover{
  transform: translateZ(-25px) rotateX(-90deg);
}
</style>