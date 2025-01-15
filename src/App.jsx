import { useEffect } from 'react'
import './App.css'
import * as Cesium from 'cesium'
import '../public/Cesium/Widgets/widgets.css'


window.CESIUM_BASE_URL = '/public/Cesium/'

function App() {

  useEffect(() => {
    // 设置自己的token
    Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJmZmFmOWMzNS01NGM5LTQyZWItOGVkZS02NTQ1NzgwNzJhZDMiLCJpZCI6MTE1NzM1LCJpYXQiOjE3MzY5NDcxNjh9.1qDttoLbk0UUEgZQCNDPK6vf6D0f1tGE12Lxior1c88'
    // 设置默认视角 
    Cesium.Camera.DEFAULT_VIEW_RECTANGLE = Cesium.Rectangle.fromDegrees(
      // 西经,
      89.5,
      // 南纬
      20.4,
      // 东经
      110.4,
      // 北纬 
      61.2
    )
    const viewer = new Cesium.Viewer('cesiumContainer', {  
      // 搜索框控件隐藏
      geocoder: false,
      // 回到默认视角
      homeButton: false,
      // 2D/3D视角切换
      sceneModePicker: false,
      // 图层切换
      baseLayerPicker: false,
      // 帮助按钮
      navigationHelpButton: false,
      // 自转动画
      animation: false,
      // 时间轴
      timeline: false,
      // 全屏按钮
      fullscreenButton:false
    })
    // 隐藏版权信息
    viewer.cesiumWidget.creditContainer.style.display = 'none'
  },[])

  return (
    <>
      <div id='cesiumContainer'></div>
    </>
  )
}

export default App
